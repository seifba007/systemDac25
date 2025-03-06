import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { store } from '@/core/store';
import { setRootLoading } from '@/core/store/modules/rootSlice';
import { ExecutorInterface, QueueItem } from '@/core/entities/http.entity';
import { LOGOUT, REFRESH_TOKEN } from '../endPoint/auth.endPoint';
import { setUserToken } from '@/core/store/modules/tokenSlice';
import { persistStore } from 'redux-persist';

class HttpService {
	private static instance: HttpService;
	private static interceptor: AxiosInstance;
	private static requestsQueue: Array<QueueItem> = [];
	private static isRefreshingToken = false;
	private static Status = {
		success: 200,
		badRequestError: 400,
		notAuthorizedError: 403,
		refreshTokenError: 426,
		serverError: 500,
		notFoundError: 404,
		conflictError: 409,
		TooManyRequests: 429,
	};
	private constructor() {
		HttpService.interceptor = axios.create({
			timeout: 10000,
		});
		this.setupInterceptorRequest();
	}

	private setupInterceptorRequest(): void {
		const token = store.getState().token.accessToken;
		HttpService.interceptor.interceptors.request.use((config) => {
			(config.headers as Record<string, any>).common = {
				Authorization: token ? `Bearer ${token}` : '',
				'Content-Type': 'application/json',
			};
			return config;
		});
	}

	public static getInstance(): HttpService {
		if (!HttpService.instance) {
			HttpService.instance = new HttpService();
		}
		return HttpService.instance;
	}

	public executeRequest(
		config: ExecutorInterface,
		idToken?: string,
		token?: string,
		contentType = 'application/json',
	): Promise<any> {
		// Retrieve the accessToken as you want here
		const accessToken = token ? token : store.getState().token.accessToken;
		return new Promise((resolve, reject) => {
			if (HttpService.isRefreshingToken) {
				HttpService.requestsQueue.push({
					config: config,
					resolve,
					reject,
				});
			} else {
				store.dispatch(setRootLoading(true));
				HttpService.interceptor({
					url: config.endPoint,
					method: config.method,
					data: config.data,
					params: config.params,
					headers: {
						'Content-Type': contentType,
						'id-token': idToken,
						//see accessToken at line 51
						Authorization: `Bearer ${accessToken}`,
					},
				})
					.then((res: AxiosResponse) => {
						switch (res.status) {
							case HttpService.Status.badRequestError:
								// TODO Logic for Form validation error, it can be in here or down on catch.
								resolve(res);
								break;
							case HttpService.Status.success:
							default:
								store.dispatch(setRootLoading(false));
								resolve(res);
								break;
						}
					})
					.catch((err: AxiosError) => {
						store.dispatch(setRootLoading(false));
						switch (err.response?.status) {
							case HttpService.Status.refreshTokenError:
								if (!HttpService.isRefreshingToken) {
									HttpService.isRefreshingToken = true;
									HttpService.requestsQueue.push({
										config,
										resolve,
										reject,
									});
									store.dispatch(setRootLoading(true));
									this.refreshMyToken()
										.then(() => {
											store.dispatch(setRootLoading(false));
											HttpService.isRefreshingToken = false;
											this.retryApiCalls();
											setTimeout(() => {
												window.location.reload();
											}, 2000);
										})
										.catch(() => {
											store.dispatch(setRootLoading(false));
											HttpService.isRefreshingToken = false;
											this.abortAllRequests();
											this.logout();
										});
								} else {
									HttpService.requestsQueue.push({
										config,
										resolve,
										reject,
									});
								}
								break;

							default:
								reject({
									status: err.response?.status,
									data: err.response?.data,
								});
								store.dispatch(setRootLoading(false));
								this.clearQueue();
								break;
						}
					});
			}
		});
	}

	public logout = () => {
		//TODO: Implement logout
		const state = store.getState();
		const refreshToken = state.token.refreshToken;
		const accessToken = state.token.accessToken;

		return new Promise(() => {
			HttpService.interceptor({
				url: LOGOUT,
				method: 'post',
				headers: {
					Accept: 'application/json',
					'x-refresh': `${refreshToken}`,
					Authorization: `Bearer ${accessToken}`,
				},
			}).finally(() => {
				persistStore(store).purge();
				window.location.href = '/';
			});
		});
	};

	private refreshMyToken = (): Promise<any> => {
		//retrieve refrest token from cookie, localstorage or redux persist
		const refreshToken = store.getState().token.refreshToken;
		return new Promise((resolve, reject) => {
			HttpService.interceptor({
				url: REFRESH_TOKEN,
				method: 'post',
				headers: {
					Accept: 'application/json',
					'x-refresh': `${refreshToken}`,
				},
			})
				.then((res) => {
					store.dispatch(
						setUserToken({
							accessToken: res.data.accessToken,
							refreshToken: res.data.refreshToken,
						}),
					);
					resolve(res);
				})
				.catch((err) => {
					reject(err);
				})
				.finally(() => {
					store.dispatch(setRootLoading(false));
				});
		});
	};

	private clearQueue = (index?: number) => {
		if (typeof index === 'number') {
			HttpService.requestsQueue.splice(index, 1);
		} else {
			HttpService.requestsQueue.length = 0;
		}
	};

	private abortAllRequests = () => {
		HttpService.requestsQueue.forEach((item, index) => {
			item.reject('Request aborted due to un-updatable token');
			this.clearQueue(index);
		});
	};

	private retryApiCalls = () => {
		store.dispatch(setRootLoading(true));
		Promise.all(
			HttpService.requestsQueue.map((_) =>
				this.executeRequest(_.config)
					.then((res: AxiosResponse) => _.resolve(res.data))
					.catch((err: AxiosError) => _.reject(err)),
			),
		).then(() => {
			this.clearQueue();
			store.dispatch(setRootLoading(false));
		});
	};
}

export default HttpService;
