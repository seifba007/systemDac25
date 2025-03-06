import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import PasswordValidationView from './PasswordValidationView';
import { Eye } from 'iconsax-react';
import { findInputError, isFormInvalid } from '@/utils/helpers';

type ValidationRule = {
	value: boolean | number | RegExp;
	message?: string;
};
type CustomValidation = {
	validate: (value: string, values: { [key: string]: string }) => boolean | string;
};
type InputPropsPassword = {
	id: string;
	type: string;
	label: string;
	name: string;
	placeholder: string;
	validation?: CustomValidation | { [key: string]: ValidationRule };
};

const InputPassword: React.FC<InputPropsPassword> = ({
	id,
	type,
	label,
	placeholder,
	validation,
	name,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const {
		register,
		formState: { errors },
		watch,
	} = useFormContext();

	const inputError = findInputError(errors, name);
	const isInvalid = isFormInvalid(inputError);

	return (
		<div id='input-container'>
			<div className='input' style={{ marginBottom: `${1.5}rem` }}>
				<div className='eye-container'>
					<input
						id={id}
						type={showPassword ? 'text' : type}
						placeholder={placeholder}
						{...register(name, validation)}
					/>
					<label>{label}</label>
					<fieldset>
						<legend className={`${label.split(' ').join('').toLocaleLowerCase()}`}>
							<span>{label}</span>
						</legend>
					</fieldset>
					<Eye
						className='eye'
						size='32'
						color={showPassword ? '#2C74FF' : '#53545E'}
						onClick={togglePasswordVisibility}
					/>
				</div>
				{name === 'newPassword' ? <PasswordValidationView value={watch(name)} /> : null}
				{isInvalid && name !== 'password' && (
					<span className='error'>{inputError.error.message}</span>
				)}
			</div>
		</div>
	);
};

export default InputPassword;
