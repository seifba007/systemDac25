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
import { Center, Flex, Image, rem, Text } from '@mantine/core';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import img1 from '../../../../assets/logo-dark.png';
import toast from 'react-hot-toast';

const RegisterForm = ({ goToNextEtape }: { goToNextEtape: () => void }) => {
	const isRootLoading = useAppSelector(selectRootLoading);
	const dispatch = useAppDispatch();
	const { isTablet } = useResponsive();
	const methods = useForm();

	const onSubmit = methods.handleSubmit((data) => {
		const registerData: RegisterEntity = {
			email: data.email,
			fullName: data.fullName,
			password: data.newPassword,
			passwordConfirmation: data.confirmPassword,
		};
		register(registerData)
			.then((res) => {
				toast.success('successText', { duration: 3000 });
				return setTimeout(() => {
					window.location.href = '/login';
				}, 1000);
			})
			.catch((err) => errorHandler(err, { position: 'top-right' }));
	});

	return (
		<div className='signup-form'>
			<Center mb={rem(60)}>
				<Link to={'/'}>
					<Image src={img1} className='logo' w={'223px'} />
				</Link>
			</Center>
			<FormProvider {...methods}>
				<form onSubmit={(e) => e.preventDefault()} noValidate autoCapitalize='off'>
					<Input {...fullName_validation} />
					<Input {...email_validation} />
					<InputPassword {...new_password_validation} />
					<InputPassword {...confirmPassword_validation} />
					<p>
						By continuing, you acknowledge and agree to SmarDAC{' '}
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
			<Text className='link' mt={'2em'}>
				Already have an account?{' '}
				<Link to={'/login'}>
					<span>Login</span>
				</Link>
			</Text>
		</div>
	);
};

export default RegisterForm;
