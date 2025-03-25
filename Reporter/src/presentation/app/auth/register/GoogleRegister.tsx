declare global {
	interface Window {
		google: any;
	}
}
import React, { Fragment } from 'react';
import { Icons } from '@/assets/icons/Icons';
import { registerWithGoogle } from '@/core/services/modulesServices/auth.service';
import { useParams } from 'react-router-dom';
import { ERole, UserRole } from '@/core/entities/auth/authSlice.entity';
import useGoogleAuth from '@/core/hooks/useGoogleAuth';
import { useAppDispatch } from '@/core/store/hooks';
import { setUserToken } from '@/core/store/modules/tokenSlice';
import { getConnectedUser } from '@/core/services/modulesServices/user.service';
import errorHandler from '@/core/services/requestServices/errorHandle';

const GoogleRegister = () => {
	const { role: roleParam } = useParams();
	const dispatch = useAppDispatch();

	const handleGoogle = async (response: any) => {
		if (!roleParam) return;
		const role: UserRole = roleParam ? (roleParam.toUpperCase() as UserRole) : ERole.USER;
		registerWithGoogle(role, response.credential)
			.then((res) => {
				const { accessToken, refreshToken } = res.data;
				dispatch(setUserToken({ accessToken, refreshToken }));
				getConnectedUser().then(() => (window.location.href = '/account-setup/1'));
			})
			.catch((err) => errorHandler(err));
	};
	const authDivRef = useGoogleAuth(handleGoogle);

	return (
		<Fragment>
			<button className='google'>
				<div
					ref={authDivRef}
					data-text='signup_with'
					style={{
						opacity: 0,
						position: 'absolute',
						left: '50%',
						top: '50%',
						transform: 'translate(-50%, -50%)',
					}}
				></div>
				<Icons.google width={24} />
				<span>Continue with Google</span>
			</button>
			<div className='wrapper'>
				<span>Or</span>
			</div>
		</Fragment>
	);
};

export default GoogleRegister;
