const fullName_validation = {
	name: 'fullName',
	label: 'Full Name',
	type: 'text',
	id: 'name',
	placeholder: 'write your full name ...',
	validation: {
		required: {
			value: true,
			message: 'Name is required',
		},
		maxLength: {
			value: 50,
			message: 'Max 50 characters',
		},
	},
};

const email_validation = {
	name: 'email',
	label: 'Email',
	type: 'text',
	id: 'email',
	placeholder: 'Write your full email ...',
	validation: {
		required: {
			value: true,
			message: 'Email is required',
		},
		maxLength: {
			value: 80,
			message: 'Max 80 characters',
		},
		pattern: {
			value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
			message: 'Invalid email format',
		},
	},
};

const new_password_validation = {
	name: 'newPassword',
	label: 'Password',
	type: 'password',
	id: 'newPassword',
	placeholder: 'type password ...',
	validation: {
		required: {
			value: true,
		},
		minLength: {
			value: 8,
		},
		pattern: {
			value: /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[A-Z]).{6,}$/,
		},
	},
};

const password_validation = {
	name: 'password',
	label: 'Password',
	type: 'password',
	id: 'password',
	placeholder: 'type password ...',
	validation: {
		required: {
			value: true,
			message: 'Password required',
		},
		minLength: {
			value: 8,
			message: 'Min 8 characters',
		},
	},
};

const confirmPassword_validation = {
	name: 'confirmPassword',
	label: 'Confirm Password',
	type: 'password',
	id: 'confirmPassword',
	placeholder: 'type confirm password ...',
	validation: {
		required: {
			value: true,
			message: 'Confirmation required',
		},
		validate: (value: string, values: { [key: string]: string }) => {
			return value === values.newPassword || "Passwords don't match";
		},
	},
};

export {
	fullName_validation,
	email_validation,
	password_validation,
	new_password_validation,
	confirmPassword_validation,
};
