import React from 'react';
import { Avatar, Burger, Flex, Image, Menu, Text, rem } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import logo from '../../../assets/logo-dark.png'
import { MenuBar } from '../menu';
import { Notification } from 'iconsax-react';

type NavbarProps = {
	opened: boolean;
	toggle: () => void;
};
const Navbar = ({ opened, toggle }: NavbarProps) => {
	const { pathname } = useLocation();
	const currentPage = pathname.split('/')[1];
	const user = useAppSelector(selectConnectedUser);

	return (
		<Flex h={'100%'} >
			<Link to={'/'}>
				<Flex
					className='tablet-hide'
					align={'center'}
					w={rem(300)}
					pl={rem(16)}
					h={'101%'}
				>
								<Image src={logo}  h={'30px'}/>

				</Flex>
			</Link>
			<Flex
				flex={1}
				h={'100%'}
				px={{ base: '1rem', md: '2rem' }}
				justify={'space-between'}
				align={'center'}
			>
				<Text fz={'1.5rem'} fw={600}>
					{capitalizePageName(currentPage)}
				</Text>
				<Flex gap={{ base: '0', sm: 20, md: 25 }} align={'center'}>
					 <Notification size='24' color='#000' /> 
					<Menu shadow='md' width={200} position='bottom-end' offset={12}>
						<Menu.Target>
							<Avatar
								style={{ cursor: 'pointer' }}
								className='tablet-hide'
								size={'2rem'}
								src={user?.avatar}
							/>
						</Menu.Target>
						<MenuBar />
					</Menu>
					<Burger hiddenFrom='sm' m={'md'} opened={opened} onClick={toggle} size='sm' />
				</Flex>
			</Flex>
		</Flex>
	);
};
const capitalizePageName = (page: string) => {
	return page
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export default Navbar;
