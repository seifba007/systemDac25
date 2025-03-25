import { Icons } from '@/assets/icons/Icons';
import { ERole, LoginEntity } from '@/core/entities/auth/authSlice.entity';
import useGoogleAuth from '@/core/hooks/useGoogleAuth';
import useRedirectIfConn from '@/core/hooks/useRedirectIfConn';
import { login, loginWithGoogle } from '@/core/services/modulesServices/auth.service';
import { getConnectedTalent, getConnectedUser } from '@/core/services/modulesServices/user.service';
import errorHandler from '@/core/services/requestServices/errorHandle';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { clearConnectedUser, setConnectedUser } from '@/core/store/modules/authSlice';

import { selectRootLoading } from '@/core/store/modules/rootSlice';
import { setUserToken } from '@/core/store/modules/tokenSlice';
import Button from '@/presentation/components/button/Button';
import Input from '@/presentation/components/input/Input';
import InputPassword from '@/presentation/components/input/InputPassword';
import useResponsive from '@/presentation/shared/mediaQuery';
import { email_validation, password_validation } from '@/utils/inputValidations';
import { Box, Divider, Image } from '@mantine/core';
import { AxiosResponse, HttpStatusCode } from 'axios';
import { t } from 'i18next';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../../assets/logo-dark.png';

const Login = () => {
	const methods = useForm();
	const isRootLoading = useAppSelector(selectRootLoading);
	const { isTablet } = useResponsive();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	useRedirectIfConn();

	const dispatchNewUser = (res: AxiosResponse) => {
		const { accessToken, refreshToken } = res.data;
		dispatch(setUserToken({ accessToken, refreshToken }));
		getConnectedUser().then((userData) => {
			const userRole = userData.data.data.role.name === ERole.USER;
			if (userRole) {
				switch (userData.data.data.typeOfUser) {
					case ERole.USER:
						window.location.href = '/account-setup/1';
						break;
				}
			}

			if (!userRole) {
				switch (userData.data.data.role.name) {
					case ERole.TALENT:
						getConnectedTalent().then((res) => {
							toast.error('Account setup incomplete');
							getConnectedTalent().then((res) => {
								const talentData = res.data.data;
								return setTimeout(() => {
									window.location.href = '/account-setup/5';
								}, 1000);
							});
						});

						break;
				}
			}
		});
	};

	const onSubmit = methods.handleSubmit((data) => {
		const loginData: LoginEntity = {
			email: data.email,
			password: data.password,
		};

		dispatch(clearConnectedUser());
		login(loginData)
			.then((res) => {
				if (res.data.role == ERole.SUPERADMIN) {
					return toast.error('Can not connect!');
				}
				dispatchNewUser(res);
			})
			.catch((err) => {
				if (err?.data?.send_code) {
					const emailPreference = err.data.user.emailPreference;
					dispatch(
						setConnectedUser({
							id: err.data.user.id,
							fullName: err.data.user.fullName,
							email: err.data.user.email,
							avatar: err.data.user.avatar,
							role: ERole.USER,
							emailPreference: {
								marketing: emailPreference?.marketing,
								confirmation_updates: emailPreference?.confirmation_updates,
								payments: emailPreference?.payments,
								projects_updates: emailPreference?.projects_updates,
								job_application: emailPreference?.job_application,
							},
							oneSignalUserId: err.data.user.oneSignalUserId,
						}),
					);
					navigate('/register/user/2');
				}
				errorHandler(err);
			});
	});

	const handleGoogle = async (response: any) => {
		dispatch(clearConnectedUser());
		loginWithGoogle(response.credential)
			.then((res) => dispatchNewUser(res))
			.catch((error) =>
				error.status === HttpStatusCode.NotFound
					? toast.error(t('account_not_exist'))
					: errorHandler(error),
			);
	};
	const authDivRef = useGoogleAuth(handleGoogle);

	return (
		<main id='login'>
			<header>
				<div className='logo'>
					<Link to={'/'}>
						{isTablet ? (
							<Link to={'/'}>
								<Image src={logo} h={'20px'} />
							</Link>
						) : (
							<Link to={'/'}>
								<Image src={logo} h={'40px'} />
							</Link>
						)}
					</Link>
				</div>
				{!isTablet && (
					<p className='register-link'>
						New to SmarDac? Join us as a{' '}
						<Link to='/register/user/1' className='link'>
							{' '}
							Talent
						</Link>{' '}
						or{' '}
						<Link to='/register/client/1' className='link'>
							{' '}
							Client
						</Link>
					</p>
				)}
			</header>
			<section>
				<div className='box'>
					<h1>Login</h1>
					<FormProvider {...methods}>
						<form onSubmit={(e) => e.preventDefault()} noValidate autoCapitalize='off'>
							<Input {...email_validation} />
							<InputPassword {...password_validation} />
							<p>
								<Link to={'/forgotPassword/1'}>Forgot password?</Link>
							</p>
							<Button
								name='Login'
								onClick={onSubmit}
								loading={isRootLoading}
								style={{ marginTop: '2.5rem' }}
							/>
							<Divider mt='xl' label='Or' labelPosition='center' size='sm' />
							<button style={{ position: 'relative' }}>
								<Box
									ref={authDivRef}
									data-text='signup_with'
									style={{
										opacity: 0,
										position: 'absolute',
										left: '50%',
										top: '50%',
										transform: 'translate(-50%, -50%)',
									}}
								></Box>
								<Icons.google width={24} />
								<span>Continue with Google</span>
							</button>
						</form>
					</FormProvider>
					{isTablet && (
						<p className='register-link'>
							New to Talent619? Join us as a{' '}
							<Link to='/register/user/1' className='link'>
								{' '}
								Talent{' '}
							</Link>{' '}
							or{' '}
							<Link to='/register/client/1' className='link'>
								{' '}
								Client{' '}
							</Link>
						</p>
					)}
				</div>
			</section>
		</main>
	);
};

export default Login;
