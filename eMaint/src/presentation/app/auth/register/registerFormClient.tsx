import React from 'react';
import { Link } from 'react-router-dom';
import { Center, rem, Button, Text, Flex, Title } from '@mantine/core';
import { Icons } from '@/assets/icons/Icons';
import useResponsive from '@/presentation/shared/mediaQuery';
import toast from 'react-hot-toast';
import { Copy } from 'iconsax-react';

const RegisterFormClients = () => {
	const { isTablet } = useResponsive();
	const email = 'administration@talent619.com';

	return (
		<div className='signup-form'>
			{isTablet ? (
				<Center mb={rem(60)}>
					<Link to={'/'}>
						<Icons.blueLogoStraght width={180} />
					</Link>
				</Center>
			) : (
				<Center mb={rem(40)}>
					<Link to={'/'}>
						<Icons.blueLogoStraght width={200} />
					</Link>
				</Center>
			)}

			<Title>Hire a Talent</Title>
			<Flex gap='md' justify='center' wrap='wrap'>
				<Text mb={35} c='#0A0C0E' ta={'center'}>
					If you&rsquo;re looking to hire top talent, feel free to send us an email, and we will
					help you connect with the best professionals.
				</Text>
			</Flex>
			<Flex gap='md' justify='center' align={'center'} wrap='wrap' direction={'column'}>
				<Text mb={0}>You can copy our email address below</Text>
				<Flex gap='sm' align={'center'}>
					<Text fw={600} mb={0}>
						{email}
					</Text>
					<Copy
						size={20}
						color='#53545E'
						style={{ cursor: 'pointer' }}
						onClick={() =>
							navigator.clipboard
								.writeText(email)
								.then(() => toast.success('Email copied successfully'))
						}
					/>
				</Flex>
				<Button type='button'>
					<Text href={`mailto:${email}`} component='a'>
						Send email
					</Text>
				</Button>
			</Flex>
			<Text mt={10} ta={'center'}>
				Already have an account?{' '}
				<Link to={'/login'}>
					<span>Login</span>
				</Link>
			</Text>
		</div>
	);
};

export default RegisterFormClients;
