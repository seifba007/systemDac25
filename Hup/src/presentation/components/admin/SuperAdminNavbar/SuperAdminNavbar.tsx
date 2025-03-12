import React from 'react';
import { Avatar, Box, Flex, Image, Input, Menu, Text } from '@mantine/core';
import '../../../../sass/pages/SuperAdmin/SuperAdminNavbar.scss';
import {
	HambergerMenu,
	UserCirlceAdd,
	SearchNormal,
	Setting,
	Headphone,
	Bag2,
	Logout,
} from 'iconsax-react';
import logo from '../../../../assets/search_icon.png';
import useResponsive from '@/presentation/shared/mediaQuery';
import Avatardef from '../../../../assets/default.png';
import Avatarsml from '../../../../assets/logo-sm.png';
import NotificationNav from '../notification/Notification';
import CategoryApps from '../categoryapps/CategoryApps';
import { logout } from '@/core/services/modulesServices/auth.service';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import { useNavigate } from 'react-router-dom';

interface SuperAdminNavbarProps {
	onMenuClick: () => void;
}

const SuperAdminNavbar: React.FC<SuperAdminNavbarProps> = ({ onMenuClick }) => {
	const { isMobile } = useResponsive();
	const fakeData = [
		{
			id: '1',
			sender: 'Datacorp',
			time: '2023-02-11T14:30:00Z', // Today's date
			comment: 'Caleb Flakelar commented on Admin',
		},
		{
			id: '1',
			sender: 'Datacorp',
			time: '2023-02-11T14:30:00Z', // Today's date
			comment: 'Caleb Flakelar commented on Admin',
		},
		{
			id: '1',
			sender: 'Datacorp',
			time: '2023-02-11T14:30:00Z', // Today's date
			comment: 'Caleb Flakelar commented on Admin',
		},
		{
			id: '1',
			sender: 'Datacorp',
			time: '2023-02-11T14:30:00Z', // Today's date
			comment: 'Caleb Flakelar commented on Admin',
		},
		{
			id: '2',
			sender: 'Acme Inc.',
			time: '2023-02-10T09:00:00Z', // Yesterday's date
			comment: 'Alex Ross commented on your post',
		},
		{
			id: '3',
			sender: 'TechWorld',
			time: '2023-01-31T12:00:00Z', // A specific past date
			comment: 'Sarah Miller shared a link',
		},
	];
	const nav = useNavigate();
	const handleLogout = () => {
		logout().finally();
	};
	const user = useAppSelector(selectConnectedUser);
	return (
		<Box className='navbar'>
			{!isMobile && (
				<Input
					placeholder='Ask SmarDac Copilot...'
					variant='filled'
					leftSection={<Image src={logo} w={18} h={18} />}
				/>
			)}

			{isMobile ? (
				<Flex align='center' gap='md' justify={'space-between'}>
					<Flex align='center' gap='md'>
						<Image src={Avatarsml} w={'16%'} h={'8%'} />
						<Box className='buttonham'>
							<HambergerMenu size='23' onClick={onMenuClick} color='#6c757d' />
						</Box>
					</Flex>
					<Flex gap='md'>
						<Menu>
							<Menu.Target>
								<Box className='buttonham'>
									<SearchNormal size='20' color='#6c757d' />
								</Box>
							</Menu.Target>
							<Menu.Dropdown>
								<Input
									placeholder='Ask SmarDac Copilot...'
									leftSection={<Image src={logo} w={18} h={18} />}
								/>
							</Menu.Dropdown>
						</Menu>

						<NotificationNav data={fakeData} />

						<Menu transitionProps={{ transition: 'rotate-left', duration: 150 }}>
							<Menu.Target>
								<Flex
									align={'center'}
									gap={'1em'}
									style={{
										cursor: 'pointer',
										borderLeft: '0.5px solid #eef2f7',
										borderRight: '0.5px solid #eef2f7',
									}}
									pl={'1em'}
									pr={'1em'}
								>
									<Avatar src={user?.avatar} alt='User Avatar' size='30' />
								</Flex>
							</Menu.Target>

							<Menu.Dropdown w={'100%'}>
								<Menu.Label> welcome!</Menu.Label>
								<Menu.Item
									p={'4%'}
									onClick={() => {
										nav('/AccountInformation');
									}}
									leftSection={<UserCirlceAdd size='20' color='#6c757d' variant='Bold' />}
								>
									<Text c={'#6c757d'} fz={'12px'} fw={'400'}>
										{' '}
										My Account
									</Text>
								</Menu.Item>
								<Menu.Item
									p={'4%'}
									leftSection={<Setting size='20' color='#6c757d' variant='Bold' />}
								>
									<Text c={'#6c757d'} fz={'12px'} fw={'400'}>
										{' '}
										Settings
									</Text>
								</Menu.Item>
								<Menu.Item
									p={'4%'}
									leftSection={<Headphone size='20' color='#6c757d' variant='Bold' />}
								>
									<Text c={'#6c757d'} fz={'12px'} fw={'400'}>
										{' '}
										Support
									</Text>
								</Menu.Item>
								<Menu.Item p={'4%'} leftSection={<Bag2 size='20' color='#6c757d' variant='Bold' />}>
									<Text c={'#6c757d'} fz={'12px'} fw={'400'}>
										{' '}
										Lock Screen
									</Text>
								</Menu.Item>
								<Menu.Item
									onClick={() => {
										handleLogout();
									}}
									p={'4%'}
									leftSection={<Logout size='20' color='#6c757d' variant='Bold' />}
								>
									<Text c={'#6c757d'} fz={'12px'} fw={'400'}>
										{' '}
										logout
									</Text>
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Flex>
				</Flex>
			) : (
				<Flex align='center' gap='md'>
					<CategoryApps data={user?.apps} />

					<NotificationNav data={fakeData} />

					<Menu
						position='top-end'
						arrowPosition='center'
						transitionProps={{ transition: 'rotate-left', duration: 150 }}
					>
						<Menu.Target>
							<Flex
								align={'center'}
								gap={'1em'}
								style={{
									cursor: 'pointer',
									borderLeft: '0.5px solid #eef2f7',
									borderRight: '0.5px solid #eef2f7',
								}}
								pl={'1em'}
								pr={'1em'}
							>
								<Avatar src={user?.avatar} alt='User Avatar' size='30' />

								<Flex direction={'column'} gap={'0em'}>
									<Text c={'#6c757d'} fz={'13px'} fw={'600'}>
										{user?.fullName}
									</Text>
									<Text c={'#6c757d'} fz={'12px'} fw={'500'}>
										{user?.email}
									</Text>
								</Flex>
							</Flex>
						</Menu.Target>

						<Menu.Dropdown w={'15%'}>
							<Menu.Label> welcome!</Menu.Label>
							<Menu.Item
								p={'4%'}
								onClick={() => {
									nav('/AccountInformation');
								}}
								leftSection={<UserCirlceAdd size='20' color='#6c757d' variant='Bold' />}
							>
								<Text c={'#6c757d'} fz={'12px'} fw={'400'}>
									{' '}
									My Account
								</Text>
							</Menu.Item>
							<Menu.Item
								p={'4%'}
								leftSection={<Setting size='20' color='#6c757d' variant='Bold' />}
							>
								<Text c={'#6c757d'} fz={'12px'} fw={'400'}>
									{' '}
									Settings
								</Text>
							</Menu.Item>
							<Menu.Item
								p={'4%'}
								leftSection={<Headphone size='20' color='#6c757d' variant='Bold' />}
							>
								<Text c={'#6c757d'} fz={'12px'} fw={'400'}>
									{' '}
									Support
								</Text>
							</Menu.Item>
							<Menu.Item p={'4%'} leftSection={<Bag2 size='20' color='#6c757d' variant='Bold' />}>
								<Text c={'#6c757d'} fz={'12px'} fw={'400'}>
									{' '}
									Lock Screen
								</Text>
							</Menu.Item>
							<Menu.Item
								onClick={() => {
									handleLogout();
								}}
								p={'4%'}
								leftSection={<Logout size='20' color='#6c757d' variant='Bold' />}
							>
								<Text c={'#6c757d'} fz={'12px'} fw={'400'}>
									{' '}
									logout
								</Text>
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Flex>
			)}
		</Box>
	);
};

export default SuperAdminNavbar;
