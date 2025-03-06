import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { confirmPassword_validation, new_password_validation } from '@/utils/inputValidations';
import { resetPassword } from '@/core/services/modulesServices/user.service';
import { ResetPasswordEntity } from '@/core/entities/user/user.entity';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/core/store/hooks';
import { selectPwdData } from '@/core/store/modules/forgotPasswordSlice';
import { InputPassword } from '@/presentation/components/input';
import { Button } from '@/presentation/components/button';
import { Icons } from '@/assets/icons/Icons';
import { selectRootLoading } from '@/core/store/modules/rootSlice';

type ResetPasswordProps = {
	goToNextEtape: () => void;
};
const ResetPassword = ({ goToNextEtape }: ResetPasswordProps) => {
	const { email, verificationCode } = useAppSelector(selectPwdData);
	const isRootLoading = useAppSelector(selectRootLoading);

	const methods = useForm();

	const onSubmit = methods.handleSubmit((data) => {
		const sendCodeData: ResetPasswordEntity = {
			email: email,
			verificationCode: verificationCode,
			newPassword: data.newPassword,
			confirmNewPassword: data.confirmPassword,
		};
		resetPassword(sendCodeData).then(() => {
			toast.success('Password reset successfully');
			setTimeout(() => goToNextEtape(), 1000);
		});
	});

	return (
		<div>
			<div className='verif-code'>
				<Icons.lock width={48} />
				<h1 className='title'>Set new password</h1>
				<p>Please make sure your password is secure.</p>
			</div>
			<FormProvider {...methods}>
				<form onSubmit={(e) => e.preventDefault()} noValidate autoCapitalize='off'>
					<InputPassword {...new_password_validation} />
					<InputPassword {...confirmPassword_validation} />
					<Button
						name='Continue'
						w={{ base: '100%', sm: '35rem' }}
						onClick={onSubmit}
						loading={isRootLoading}
					/>
				</form>
			</FormProvider>
		</div>
	);
};

export default ResetPassword;
