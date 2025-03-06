import React from 'react';
import { TickCircle } from 'iconsax-react';
import { Icons } from '@/assets/icons/Icons';

interface PasswordValidationViewProps {
	value: string;
}
const PasswordValidationView = ({ value = '' }: PasswordValidationViewProps) => {
	const isAtLeast8Characters = value.length >= 8;
	const hasNumber = /\d/.test(value);
	const hasUpperCase = /[A-Z]/.test(value);
	const hasSpecialSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);

	return (
		<div className='validation'>
			<ValidationMessage isValid={isAtLeast8Characters} label='Must be at least 8 characters' />
			<ValidationMessage isValid={hasNumber} label='Includes number' />
			<ValidationMessage isValid={hasUpperCase} label='Includes uppercase letter' />
			<ValidationMessage isValid={hasSpecialSymbol} label='Includes special symbol' />
		</div>
	);
};

type ValidationMessageProps = {
	isValid: boolean;
	label: string;
};

const ValidationMessage = ({ isValid, label }: ValidationMessageProps) => (
	<div className={`msg ${isValid ? 'success' : ''}`}>
		{isValid ? <TickCircle size='18' color='#12B886' /> : <Icons.close width={20} />}
		<span>{label}</span>
	</div>
);

export default PasswordValidationView;
