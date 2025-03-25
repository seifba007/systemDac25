import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../';
import { AuthSliceStateEntity, UserEntity } from '../../entities/auth/authSlice.entity';

const initialState: AuthSliceStateEntity = {
	connectedUser: undefined,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setConnectedUser: (state, action: PayloadAction<UserEntity | undefined>) => {
			state.connectedUser = action.payload;
		},
		setRoleConnectedUser: (state, action: PayloadAction<Pick<UserEntity, 'role'>>) => {
			if (state.connectedUser) {
				state.connectedUser = {
					...state.connectedUser,
					role: action.payload.role,
				};
			}
		},
		clearConnectedUser: (state) => {
			state.connectedUser = undefined;
		},
	},
});

export const { setConnectedUser, setRoleConnectedUser, clearConnectedUser } = authSlice.actions;

export const selectConnectedUser = (state: RootState) => state.auth.connectedUser;

export default authSlice.reducer;
