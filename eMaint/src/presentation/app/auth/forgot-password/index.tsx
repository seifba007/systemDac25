import React, { useState } from 'react';
import EmailSend from './EmailSend';
import ResetPassword from './ResetPassword';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { SetupSidebar } from '@/presentation/components/sidebar';
// import { Step, StepStatus } from '@/presentation/components/step';
import { Congratulations } from '@/presentation/components/header';
import { ValidationCode } from '@/presentation/components/validation';
import { ArrowLeft } from 'iconsax-react';
import { BackButton } from '@/presentation/components/button';
import { Flex, Stepper, em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export type UserData = {
	email: string;
	verificationCode: string;
};

const renderBackButton = (
	etape: number,
	isLoginIn: string | null,
	goToPreviousEtape: () => void,
) => {
	if (etape === 1) {
		const destination = isLoginIn ? 'settings' : 'login';
		return (
			<Link to={`/${destination}`}>
				<div className='box-link' style={{ marginBottom: '4rem' }}>
					<ArrowLeft size='20' color='#000' />
					<p className='link'>Back to {destination}</p>
				</div>
			</Link>
		);
	} else {
		return <BackButton onClick={goToPreviousEtape} />;
	}
};

const ForgotPassword = () => {
	const { etapeParm } = useParams();
	const navigate = useNavigate();
	const [etape, setEtape] = useState(Number(etapeParm));
	const [searchParams] = useSearchParams();
	const isLoginIn = searchParams.get('login');
	const isTabet = useMediaQuery(`(max-width: ${em(780)})`);

	const goToNextEtape = () => {
		setEtape(etape + 1);
		!isLoginIn
			? navigate(`/forgotPassword/${etape + 1}`)
			: navigate(`/forgotPassword/${etape + 1}?login=${isLoginIn}`);
	};

	const goToPreviousEtape = () => {
		setEtape(etape - 1);
		!isLoginIn
			? navigate(`/forgotPassword/${etape - 1}`)
			: navigate(`/forgotPassword/${etape - 1}?login=${isLoginIn}`);
	};

	const Steps = (orientation: 'vertical' | 'horizontal' = 'horizontal') => {
		return (
			<Stepper iconSize={32} active={etape - 1} orientation={orientation} color='green'>
				{isLoginIn ? (
					<Stepper.Step
						label={orientation === 'vertical' && 'Email'}
						description={orientation === 'vertical' && 'Enter your email'}
					/>
				) : null}
				<Stepper.Step
					label={orientation === 'vertical' && 'Password'}
					description={orientation === 'vertical' && 'Set new password'}
				/>
				<Stepper.Step
					label={orientation === 'vertical' && 'Done'}
					description={orientation === 'vertical' && 'Congratulations'}
				/>
			</Stepper>
		);
	};

	return (
		<main id='forgot-password'>
			<SetupSidebar
				title='Let’s setup your new password'
				parg='Our guided steps will ensure a seamless process.'
			>
				{Steps('vertical')}
			</SetupSidebar>
			<div className='right'>
				<section
					className={etape === 4 ? 'container congrats' : 'container'}
					style={{ width: '90%' }}
				>
					{/* Render back button */}
					{renderBackButton(1, isLoginIn, goToPreviousEtape)}

					{/* Render steps on tablet and below */}

					{isTabet && Steps()}
					{/* Render step content based on current step */}
					<Flex justify={'center'}>
						{
							[
								<EmailSend key={1} goToNextEtape={goToNextEtape} />,
								<ValidationCode key={2} goToNextEtape={goToNextEtape} />,
								<ResetPassword key={3} goToNextEtape={goToNextEtape} />,
								<Congratulations
									key={4}
									name='Login to account'
									subtitle='Your password has been reset!'
									onClick={() => navigate('/login')}
								/>,
							][etape - 1]
						}
					</Flex>
				</section>
			</div>
		</main>
	);
};

export default ForgotPassword;
