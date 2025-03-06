import { EntityWithId, ListProps, Request } from '@/core/entities/http.entity';
import HttpService from '../httpServices/http.service';

class RequestService {
	static async createAndUpload({ entity, data }: Request) {
		return HttpService.getInstance().executeRequest(
			{
				method: 'post',
				endPoint: entity,
				data,
			},
			'',
			'',
			'multipart/form-data',
		);
	}

	static async updateAndUpload({ entity, data, method = 'put' }: Request) {
		return HttpService.getInstance().executeRequest(
			{
				method: method,
				endPoint: entity,
				data,
			},
			'',
			'',
			'multipart/form-data',
		);
	}

	static async create({ entity, data }: Omit<Request, 'method'>) {
		return HttpService.getInstance().executeRequest({
			method: 'post',
			endPoint: entity,
			data,
		});
	}

	static async update({ entity, data, method = 'put' }: Request) {
		return HttpService.getInstance().executeRequest({
			method: method,
			endPoint: entity,
			data,
		});
	}

	static async delete({ entity }: { entity: string }) {
		return HttpService.getInstance().executeRequest({
			method: 'delete',
			endPoint: entity,
		});
	}

	static async read({ entity, id }: EntityWithId) {
		let endPoint = entity;
		if (id) endPoint += `/${id}`;

		return HttpService.getInstance().executeRequest({
			method: 'get',
			endPoint: endPoint,
		});
	}

	static async list({ entity, options = {} }: ListProps) {
		let query = '?';
		for (const key in options) {
			query += `${key}=${options[key]}&`;
		}
		query = query.slice(0, -1);

		const endPoint = `${entity}${query}`;

		return HttpService.getInstance().executeRequest({
			method: 'get',
			endPoint,
		});
	}
}

export default RequestService;
