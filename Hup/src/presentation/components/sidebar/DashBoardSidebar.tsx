import React, { useState } from 'react';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import { Box, Button, Flex, Menu, Stack, Text, rem } from '@mantine/core';
import PortfolioAvatar from '../avatar/ProtofolioAvatar';
import { Link, useLocation } from 'react-router-dom';
import { Logout, More } from 'iconsax-react';
import { MenuBar } from '../menu';
import { ConfirmationModal } from '../modal';
import { useDisclosure } from '@mantine/hooks';
import useResponsive from '@/presentation/shared/mediaQuery';
import { logout } from '@/core/services/modulesServices/auth.service';

const DashBoardSidebar = () => {
	const { isMobile } = useResponsive();
	const { pathname } = useLocation();
	const currentUser = useAppSelector(selectConnectedUser);
	const user = useAppSelector(selectConnectedUser);
	const [opened, { open, close }] = useDisclosure(false);
	const [isLoading, setIsLoading] = useState(false);

	if (!currentUser || !currentUser?.role) return null;
	const role = currentUser.role;

	return (
		<Box
			className={`dashboard ${role.toLocaleLowerCase()}`}
			w={{ base: '100%', md: rem(300) }}
			bg={'black.0'}
			h={'100%'}
		>
			<>
				<Flex
					style={{ borderRadius: '0.25rem', cursor: 'pointer' }}
					justify={'space-between'}
					align='center'
					w={'95%'}
					ml='2%'
					mt='1.5rem'
					h={'3.5rem'}
					c='black.9'
					gap='1rem'
				>
					<Link to={'/portfolio'}>
						<Flex align={'center'} gap={rem(16)}>
							<Box ml={rem(12)}>
								<PortfolioAvatar width='2.5rem' />
							</Box>
							<Box>
								<Text fz={'0.875rem'}>{user?.fullName}</Text>
								<Text fz={'0.75rem'} c='#7B7E84'>
									Talent
								</Text>
							</Box>
						</Flex>
					</Link>
					<Menu shadow='md' width={200} position='bottom-start' offset={12}>
						<Menu.Target>
							<Box style={{ transform: 'rotate(90deg)' }} mr={'1.5rem'}>
								<More size='22' color='#fff' />
							</Box>
						</Menu.Target>
						<MenuBar />
					</Menu>
				</Flex>
			</>

			{/* <hr className='dh-line' /> */}
			<Stack style={{ height: 'calc(100dvh - 60px' }} justify='space-between'>
				<Flex direction={'column'}>
					<Link to={'/'}>
						<Flex
							w={'95%'}
							ml='2%'
							h={'3rem'}
							gap='0.625rem'
							mt='0.75rem'
							p={'0.75rem'}
							align='center'
							c={'black.9'}
							style={{ cursor: 'pointer', borderRadius: '0.25rem' }}
						>
							{'item.icon'}
							<Text fz={'0.875rem'} fw={500}>
								{'item.text'}
							</Text>
						</Flex>
					</Link>
				</Flex>
				{isMobile && (
					<Button
						leftSection={<Logout size={20} color='#fff' />}
						onClick={open}
						mr={12}
						mb={20}
						ml={'auto'}
						radius={'sm'}
						size='md'
						w={'fit-content'}
					>
						Logout
					</Button>
				)}
			</Stack>
			<ConfirmationModal
				title='Log out from account?'
				subtitle='Are you certain that you want to log out?'
				opened={opened}
				close={close}
				isLoading={isLoading}
				confirmText='Log Out'
				handleConfirm={async () => {
					setIsLoading(true);
					logout().finally(() => setIsLoading(false));
				}}
			/>
		</Box>
	);
};

export default DashBoardSidebar;
