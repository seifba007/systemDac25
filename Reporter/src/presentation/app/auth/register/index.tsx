import { RegisterSidebar } from '@/presentation/components/sidebar';
import { ValidationCode } from '@/presentation/components/validation';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import RegisterFormClients from './registerFormClient';

const Signup = () => {
	const { role, etapeParm } = useParams();
	const navigate = useNavigate();
	const [etape, setEtape] = useState(Number(etapeParm));

	const goToNextEtape = () => {
		setEtape(etape + 1);
		navigate(`/register/${role}/${etape + 1}`);
	};

	const goToPreviousEtape = () => {
		setEtape(etape - 1);
		navigate(`/register/${role}/${etape - 1}`);
	};
	return (
		<main id='signup'>
			<Link to={'/'}>
				<RegisterSidebar />
			</Link>
			<div className='right-signup'>
				<div className='content'>
					{role == 'client' ? (
						<RegisterFormClients />
					) : (
						[
							<RegisterForm key={1} goToNextEtape={goToNextEtape} />,
							<ValidationCode key={2} goToPreviousEtape={goToPreviousEtape} />,
						][etape - 1]
					)}
				</div>
			</div>
		</main>
	);
};

export default Signup;
