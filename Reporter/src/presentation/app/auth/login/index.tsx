import useRedirectIfConnlogin from '@/core/hooks/useRedirectIfConnlogin';
import { useAppDispatch } from '@/core/store/hooks';
import { setConnectedUser } from '@/core/store/modules/authSlice';
import { setUserToken } from '@/core/store/modules/tokenSlice';
import React, { useEffect } from 'react';
import img from '../../../../assets/maintenance.svg';
import { Center, Text } from '@mantine/core';

const Login = () => {
	const dispatch = useAppDispatch();
	useRedirectIfConnlogin();
	const fetchTokenVerification = async () => {
		try {
			const response = await fetch('http://localhost:5000/auth/verify-token', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json', // Just the content-type, no token
				},
			});

			// Check if the response is ok
			if (response.ok) {
				const data = await response.json(); // Parse the response body as JSON
				const accessToken = data.accessToken;
				const refreshToken = data.refreshToken;
				dispatch(setUserToken({ accessToken, refreshToken }));
				// Dispatch the user data to the Redux store
				dispatch(
					setConnectedUser({
						id: data.user._id.$oid,
						organization: data.user.organization,
						fullName: data.user.fullName,
						email: data.user.email,
						avatar: data.user.picture,
						role: data.user.role,
					}),
				);
			}
		} catch (error) {}
	};

	useEffect(() => {
		fetchTokenVerification();
	}, []);

	return (
		<div
			className='authentication-bg position-relative'
			style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
		>
			<div className='position-absolute start-0 end-0 bottom-0 w-100 h-100'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					version='1.1'
					xmlnsXlink='http://www.w3.org/1999/xlink'
					width='100%'
					height='100%'
					preserveAspectRatio='none'
					viewBox='0 0 1920 1024'
				>
					<g mask='url(#SvgjsMask1046)' fill='none'>
						<rect
							width='1920'
							height='1024'
							x='0'
							y='0'
							fill='url(#SvgjsLinearGradient1047)'
						></rect>
						<path d='M1920 0L1864.16 0L1920 132.5z' fill='rgba(255, 255, 255, .1)'></path>
						<path
							d='M1864.16 0L1920 132.5L1920 298.4L1038.6100000000001 0z'
							fill='rgba(255, 255, 255, .075)'
						></path>
						<path
							d='M1038.6100000000001 0L1920 298.4L1920 379.53999999999996L857.7000000000002 0z'
							fill='rgba(255, 255, 255, .05)'
						></path>
						<path
							d='M857.7 0L1920 379.53999999999996L1920 678.01L514.57 0z'
							fill='rgba(255, 255, 255, .025)'
						></path>
						<path d='M0 1024L939.18 1024L0 780.91z' fill='rgba(0, 0, 0, .1)'></path>
						<path
							d='M0 780.91L939.18 1024L1259.96 1024L0 585.71z'
							fill='rgba(0, 0, 0, .075)'
						></path>
						<path
							d='M0 585.71L1259.96 1024L1426.79 1024L0 408.19000000000005z'
							fill='rgba(0, 0, 0, .05)'
						></path>
						<path
							d='M0 408.19000000000005L1426.79 1024L1519.6599999999999 1024L0 404.09000000000003z'
							fill='rgba(0, 0, 0, .025)'
						></path>
					</g>
					<defs>
						<mask id='SvgjsMask1046'>
							<rect width='1920' height='1024' fill='#ffffff'></rect>
						</mask>
						<linearGradient
							x1='11.67%'
							y1='-21.87%'
							x2='88.33%'
							y2='121.88%'
							gradientUnits='userSpaceOnUse'
							id='SvgjsLinearGradient1047'
						>
							<stop stopColor='#0e2a47' offset='0'></stop>
							<stop stopColor='#00459e' offset='1'></stop>
						</linearGradient>
					</defs>
				</svg>
			</div>
			<div className='account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative'>
				<div className='container'>
					<div className='row justify-content-center'>
						<div className='col-xxl-10'>
							<div className='card'>
								<div className='card-body p-4'>
									<div className='text-center'>
										<img src={img} height='150' alt='File not found Image' />
										<h3 className='mt-4'>This Page is Still Under Construction</h3>
										<p className='text-muted'>
											We're making the system more awesome. We'll be back shortly.
										</p>

										<div
											style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0em' }}
										>
											<div className='col-md-4'>
												<div className='text-center mt-3 ps-1 pe-1'>
													<Center mb={'1em'}>
														<Center
															style={{
																borderRadius: '50%',
																background: '#815ac5',
																color: '#fff',
																width: '50px',
																height: '50px',
															}}
														>
															<i className='ri-vip-diamond-line '></i>
														</Center>
													</Center>
													<Text fz={'17px'} className='text-uppercase'>
														Why is the Site Down?
													</Text>
													<Text className='text-muted' fz={'12px'}>
														There are many variations of passages of Lorem Ipsum available, but the
														majority have suffered alteration.
													</Text>
												</div>
											</div>
											<div className='col-md-4'>
												<div className='text-center mt-3 ps-1 pe-1'>
													<Center mb={'1em'}>
														<Center
															style={{
																borderRadius: '50%',
																background: '#815ac5',
																color: '#fff',
																width: '50px',
																height: '50px',
															}}
														>
															<i className='ri-time-line '></i>
														</Center>
													</Center>
													<Text fz={'17px'} className='text-uppercase'>
														What is the Downtime?
													</Text>
													<Text className='text-muted' fz={'12px'}>
														Contrary to popular belief, Lorem Ipsum is not simply random text. It
														has roots in a piece of classical but the majority.
													</Text>
												</div>
											</div>
											<div className='col-md-4'>
												<div className='text-center mt-3 ps-1 pe-1'>
													<Center mb={'1em'}>
														<Center
															style={{
																borderRadius: '50%',
																background: '#815ac5',
																color: '#fff',
																width: '50px',
																height: '50px',
															}}
														>
															<i className='ri-question-mark '></i>
														</Center>
													</Center>
													<Text fz={'17px'} className='text-uppercase'>
														Do you need Support?
													</Text>
													<Text className='text-muted' fz={'12px'}>
														If you are going to use a passage of Lorem Ipsum, you need to be sure
														there isn't anything embar..{' '}
														<Text mt={'3em'}>
															<a href='mailto:support@smardac.com' className='text-muted fw-bold'>
																support@smardac.com
															</a>
														</Text>
													</Text>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
