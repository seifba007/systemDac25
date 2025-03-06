import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { email_validation } from '@/utils/inputValidations';
import { sendCode } from '@/core/services/modulesServices/user.service';
import { SendCodeEntity } from '@/core/entities/user/user.entity';
import { setPassEmail } from '@/core/store/modules/forgotPasswordSlice';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { Input } from '@/presentation/components/input';
import { Button } from '@/presentation/components/button';
import { Icons } from '@/assets/icons/Icons';
import { selectRootLoading } from '@/core/store/modules/rootSlice';
import errorHandler from '@/core/services/requestServices/errorHandle';
import toast from 'react-hot-toast';
import { t } from 'i18next';

type EmailSendProps = {
	goToNextEtape: () => void;
};

const EmailSend = ({ goToNextEtape }: EmailSendProps) => {
	const methods = useForm();
	const dispatch = useAppDispatch();
	const isRootLoading = useAppSelector(selectRootLoading);

	const onSubmit = methods.handleSubmit((data) => {
		const sendCodeData: SendCodeEntity = {
			email: data.email,
		};
		dispatch(setPassEmail({ email: data.email }));
		sendCode(sendCodeData)
			.then(() => {
				toast.success(t('code_sent_sucess'), { position: 'top-right' });
				setTimeout(() => {
					goToNextEtape();
				}, 1000);
			})
			.catch((err) => errorHandler(err, { position: 'top-right' }));
	});

	return (
		<div>
			<div className='verif-code'>
				<Icons.key width={48} />
				<h1 className='title'>Forgot password?</h1>
				<p>
					Enter the email address associated with your account, and we&apos;ll will send you a code
					to reset your password.
				</p>
			</div>
			<FormProvider {...methods}>
				<form onSubmit={(e) => e.preventDefault()} noValidate>
					<Input {...email_validation} />
					<Button name='Send verification code' onClick={onSubmit} loading={isRootLoading} />
				</form>
			</FormProvider>
		</div>
	);
};

export default EmailSend;
