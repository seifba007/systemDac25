import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../';
import { RootSliceStatedEntity } from '../../entities/root/rootSlice.entity';

const initialState: RootSliceStatedEntity = {
	isRootLoading: false,
	deviceWidth: document.body.clientWidth,
	currentLanguage: 'en',
};

export const rootSlice = createSlice({
	name: 'root',
	initialState,
	reducers: {
		setRootLoading: (state, action: PayloadAction<boolean>) => {
			state.isRootLoading = action.payload;
		},
		setDeviceWidth: (state, action: PayloadAction<number>) => {
			state.deviceWidth = action.payload;
		},
		setCurrentLanguage: (state, action: PayloadAction<string>) => {
			state.currentLanguage = action.payload;
		},
	},
});

export const { setRootLoading, setDeviceWidth, setCurrentLanguage } = rootSlice.actions;

export const selectRootLoading = (state: RootState) => state.root.isRootLoading;
export const selectDeviceWidth = (state: RootState) => state.root.deviceWidth;

export default rootSlice.reducer;
