import { LoginEntity } from '@/core/entities/auth/authSlice.entity';
import useRedirectIfConn from '@/core/hooks/useRedirectIfConn';
import { login } from '@/core/services/modulesServices/auth.service';
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
import { Divider, Image } from '@mantine/core';
import { AxiosResponse } from 'axios';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/logo-dark.png';
import { getConnectedUser } from '@/core/services/modulesServices/user.service';

const Login = () => {
	const methods = useForm();
	const isRootLoading = useAppSelector(selectRootLoading);
	const { isTablet } = useResponsive();
	const dispatch = useAppDispatch();
	useRedirectIfConn();
	const dispatchNewUser = (res: AxiosResponse) => {
		const { accessToken, refreshToken } = res.data;
		dispatch(setUserToken({ accessToken, refreshToken }));
		getConnectedUser().then((userData) => {
			const user = userData.data.user;
			dispatch(
				setConnectedUser({
					id: user.id,
					fullName: user.fullName,
					email: user.email,
					avatar: user.picture,
					role: user.role,
					apps: user?.organization?.availableApps,
				}),
			);
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
				dispatchNewUser(res);
			})
			.catch((err) => {
				errorHandler(err);
			});
	});

	return (
		<main id='login'>
			<header>
				<div className='logo'>
					<Link to={'/'}>
						{isTablet ? (
							<Link to={'/'}>
								<Image src={logo} h={'40px'} />
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
						New to SmarDac? Go to{' '}
						<Link to='/register/' className='link'>
							SingUp
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
							<Button name='Login' onClick={onSubmit} loading={isRootLoading} />
							<Divider />
						</form>
					</FormProvider>
					{isTablet && (
						<p className='register-link'>
							New to SmarDac? Go to{' '}
							<Link to='/register/' className='link'>
								SingUp
							</Link>
						</p>
					)}
				</div>
			</section>
		</main>
	);
};

export default Login;
