import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../';

type TokenSliceStateEntity = {
	refreshToken: string;
	accessToken: string;
};

const initialState: TokenSliceStateEntity = {
	refreshToken: '',
	accessToken: '',
};

const tokenSlice = createSlice({
	name: 'token',
	initialState,
	reducers: {
		setUserToken(state, action: PayloadAction<TokenSliceStateEntity>) {
			state.refreshToken = action.payload.refreshToken;
			state.accessToken = action.payload.accessToken;
		},
		clearUserToken(state) {
			state.refreshToken = '';
			state.accessToken = '';
		},
	},
});

export const { setUserToken, clearUserToken } = tokenSlice.actions;

export const selectToken = (state: RootState) => state.token;
export const selectRefreshToken = (state: RootState) => state.token.accessToken;
export const selectAccessToken = (state: RootState) => state.token.refreshToken;

export default tokenSlice.reducer;
