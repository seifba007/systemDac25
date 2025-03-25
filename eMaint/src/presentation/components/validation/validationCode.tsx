import React from 'react';
import { Box, PinInput, rem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { selectPwdData, setForgotPassCode } from '@/core/store/modules/forgotPasswordSlice';
import { confirmEmail, verifyCode } from '@/core/services/modulesServices/auth.service';
import { getConnectedUser, sendCode } from '@/core/services/modulesServices/user.service';
import { ERole } from '@/core/entities/auth/authSlice.entity';
import toast from 'react-hot-toast';
import { Icons } from '@/assets/icons/Icons';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import { setUserToken } from '@/core/store/modules/tokenSlice';
import { selectRootLoading } from '@/core/store/modules/rootSlice';
import { BackButton, Button } from '../button';
import errorHandler from '@/core/services/requestServices/errorHandle';

type ValidationCodeProps = {
	goToNextEtape?: () => void;
	goToPreviousEtape?: () => void;
};

type FormValues = {
	verificationCode: string;
};

const ValidationCode = ({ goToNextEtape, goToPreviousEtape }: ValidationCodeProps) => {
	const forgotPasswordMode = !!goToNextEtape;
	const isRootLoading = useAppSelector(selectRootLoading);
	const pwdData = useAppSelector(selectPwdData);
	const connectedUser = useAppSelector(selectConnectedUser);
	const user = forgotPasswordMode ? pwdData : connectedUser;

	const form = useForm<FormValues>({
		initialValues: {
			verificationCode: '',
		},
	});
	const dispatch = useAppDispatch();

	const handleSubmit = (formValues: FormValues) => {
		if (!user) return;

		if (forgotPasswordMode) {
			verifyCode({ email: user.email, verificationCode: formValues.verificationCode })
				.then(() => {
					dispatch(setForgotPassCode({ verificationCode: formValues.verificationCode }));
					goToNextEtape && goToNextEtape();
				})
				.catch((error) => errorHandler(error, { position: 'top-right' }));
		} else {
			confirmEmail({ email: user.email, verificationCode: formValues.verificationCode })
				.then((res) => {
					dispatch(
						setUserToken({
							accessToken: res.data.accessToken,
							refreshToken: res.data.refreshToken,
						}),
					);
					getConnectedUser().then((userData) => {
						switch (userData.data.data.role.name) {
							case ERole.USER:
							case ERole.CLIENT:
								window.location.href = '/account-setup/1';
								break;
						}
					});
				})
				.catch((err) => errorHandler(err, { position: 'top-right' }));
		}
	};

	const handleReset = () => {
		if (!user) return;
		sendCode({ email: user.email })
			.then(() => toast.success('Code sent successfully', { position: 'top-right' }))
			.catch((error) => errorHandler(error, { position: 'top-right' }));
	};

	return (
		<Box w={{ base: '100%', sm: rem(560) }}>
			{!forgotPasswordMode && goToPreviousEtape && <BackButton onClick={goToPreviousEtape} />}
			<div className='verif-code'>
				<Icons.sms width={48} />
				<h1 className='title'>Verification code</h1>
				<p>
					Please check your inbox. We sent the reset code to
					<span> {user?.email}</span>
				</p>
			</div>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<PinInput
					size='lg'
					length={7}
					{...form.getInputProps('verificationCode')}
					styles={{
						root: {
							width: '100%',
							height: '5rem',
							borderRadius: '0.5rem',
							backgroundColor: '#F9FBFC',
							marginBottom: '1.75rem',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-around',
							gap: '0.5rem',
						},
						input: {
							backgroundColor: 'transparent',
							border: 'none',
						},
					}}
				/>
				<Button
					name='Send verification code'
					disabled={form.getInputProps('verificationCode').value.length < 7}
					loading={isRootLoading}
				/>
			</form>
			<p className='resend'>
				You didn’t receive the email? <span onClick={handleReset}>Resend</span>
			</p>
		</Box>
	);
};

export default ValidationCode;
