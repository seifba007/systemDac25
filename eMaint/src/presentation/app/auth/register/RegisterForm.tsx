import { Icons } from '@/assets/icons/Icons';
import { ERole, RegisterEntity, UserRole } from '@/core/entities/auth/authSlice.entity';
import { register } from '@/core/services/modulesServices/auth.service';
import errorHandler from '@/core/services/requestServices/errorHandle';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { setConnectedUser } from '@/core/store/modules/authSlice';
import { selectRootLoading } from '@/core/store/modules/rootSlice';
import Button from '@/presentation/components/button/Button';
import Input from '@/presentation/components/input/Input';
import InputPassword from '@/presentation/components/input/InputPassword';
import useResponsive from '@/presentation/shared/mediaQuery';
import {
	confirmPassword_validation,
	email_validation,
	fullName_validation,
	new_password_validation,
} from '@/utils/inputValidations';
import { Center, rem } from '@mantine/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import GoogleRegister from './GoogleRegister';

const RegisterForm = ({ goToNextEtape }: { goToNextEtape: () => void }) => {
	const { role: roleParam } = useParams();
	const isRootLoading = useAppSelector(selectRootLoading);
	const dispatch = useAppDispatch();
	const { isTablet } = useResponsive();
	const methods = useForm();

	const onSubmit = methods.handleSubmit((data) => {
		const role: UserRole = roleParam ? (roleParam.toUpperCase() as UserRole) : ERole.USER;
		const registerData: RegisterEntity = {
			email: data.email,
			fullName: data.fullName,
			password: data.newPassword,
			passwordConfirmation: data.confirmPassword,
			role,
		};

		register(registerData)
			.then((res) => {
				const emailPreference = res.data.data.emailPreference;
				dispatch(
					setConnectedUser({
						id: res.data.data.id,
						fullName: res.data.data.fullName,
						email: res.data.data.email,
						avatar: res.data.data.avatar,
						role: res.data.data.role.name,
						emailPreference: {
							marketing: emailPreference?.marketing,
							confirmation_updates: emailPreference?.confirmation_updates,
							payments: emailPreference?.payments,
							projects_updates: emailPreference?.projects_updates,
							job_application: emailPreference?.job_application,
						},
						oneSignalUserId: res.data.data.oneSignalUserId,
					}),
				);
				goToNextEtape();
			})
			.catch((err) => errorHandler(err, { position: 'top-right' }));
	});

	return (
		<div className='signup-form'>
			{isTablet && (
				<Center mb={rem(60)}>
					<Link to={'/'}>
						<Icons.blueLogoStraght width={180} />
					</Link>
				</Center>
			)}

			<h1>Join as a Talent</h1>
			<GoogleRegister />
			<FormProvider {...methods}>
				<form onSubmit={(e) => e.preventDefault()} noValidate autoCapitalize='off'>
					<Input {...fullName_validation} />
					<Input {...email_validation} />
					<InputPassword {...new_password_validation} />
					<InputPassword {...confirmPassword_validation} />
					<p>
						By continuing, you acknowledge and agree to Talent619’s{' '}
						<Link to='#'>
							<span>Terms of Use</span>
						</Link>{' '}
						and{' '}
						<Link to='#'>
							<span>Privacy Policy</span>
						</Link>
						.
					</p>
					<Button name='Sign Up' onClick={onSubmit} loading={isRootLoading} />
				</form>
			</FormProvider>
			<p className='link'>
				Already have an account?{' '}
				<Link to={'/login'}>
					<span>Login</span>
				</Link>
			</p>
		</div>
	);
};

export default RegisterForm;
