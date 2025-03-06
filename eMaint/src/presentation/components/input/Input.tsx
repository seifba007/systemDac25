import { findInputError, isFormInvalid } from '@/utils/helpers';
import React from 'react';
import { useFormContext } from 'react-hook-form';

type ValidationRule = {
	value: boolean | number | RegExp;
	message?: string;
};
type CustomValidation = {
	validate: (value: string, values: { [key: string]: string }) => boolean | string;
};
type InputProps = {
	id: string;
	type: string;
	label: string;
	name: string;
	placeholder: string;
	validation?: CustomValidation | { [key: string]: ValidationRule };
};

const Input: React.FC<InputProps> = ({ id, type, label, placeholder, validation, name }) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const inputError = findInputError(errors, name);
	const isInvalid = isFormInvalid(inputError);

	return (
		<div id='input-container'>
			<div className='input'>
				<input id={id} type={type} placeholder={placeholder} {...register(name, validation)} />
				<label>{label}</label>
				<fieldset>
					<legend className={`${label.split(' ').join('').toLocaleLowerCase()}`}>
						<span>{label}</span>
					</legend>
				</fieldset>
			</div>
			{isInvalid && <span className='error'>{inputError.error.message}</span>}
		</div>
	);
};

export default Input;
