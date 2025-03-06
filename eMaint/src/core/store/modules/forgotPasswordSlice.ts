import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../';
import { ForgotPasswordData } from '@/core/entities/auth/authSlice.entity';

const initialState: ForgotPasswordData = {
	email: '',
	verificationCode: '',
};

export const authSlice = createSlice({
	name: 'forgotPassword',
	initialState,
	reducers: {
		setPassEmail: (state, action: PayloadAction<Pick<ForgotPasswordData, 'email'>>) => {
			state.email = action.payload.email;
		},
		setForgotPassCode: (
			state,
			action: PayloadAction<Pick<ForgotPasswordData, 'verificationCode'>>,
		) => {
			state.verificationCode = action.payload.verificationCode;
		},
	},
});

export const { setPassEmail, setForgotPassCode } = authSlice.actions;

export const selectPwdData = (state: RootState): ForgotPasswordData => ({
	email: state.forgotPassword.email,
	verificationCode: state.forgotPassword.verificationCode,
});

export default authSlice.reducer;
