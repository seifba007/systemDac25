import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectConnectedUser } from '../store/modules/authSlice';
import { useNavigate } from 'react-router-dom';
import { ERole } from '../entities/auth/authSlice.entity';

const useRedirectIfConn = () => {
	const user = useAppSelector(selectConnectedUser);
	const navigate = useNavigate();

	useEffect(() => {
		if (user?.role === ERole.TALENT) {
			navigate('/portfolio');
		}
	}, [user, navigate]);
};

export default useRedirectIfConn;
