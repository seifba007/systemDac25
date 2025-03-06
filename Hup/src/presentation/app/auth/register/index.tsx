import { RegisterSidebar } from '@/presentation/components/sidebar';
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import useRedirectIfConn from '@/core/hooks/useRedirectIfConn';
import useResponsive from '@/presentation/shared/mediaQuery';

const Signup = () => {
	useRedirectIfConn();
	const { isMobile } = useResponsive();
	return (
		<main id='signup'>
			{!isMobile && <RegisterSidebar />}
			<div className='right-signup'>
				<div className='content'>
					<RegisterForm
						goToNextEtape={function (): void {
							throw new Error('Function not implemented.');
						}}
					/>
				</div>
			</div>
		</main>
	);
};

export default Signup;
