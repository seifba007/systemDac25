import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectConnectedUser } from '../store/modules/authSlice';
import { useNavigate } from 'react-router-dom';

const useRedirectIfConn = () => {
	const user = useAppSelector(selectConnectedUser);
	const navigate = useNavigate();

	useEffect(() => {
		if (user?.role) {
			navigate('/');
		}
	}, [user, navigate]);
};

export default useRedirectIfConn;
