import React from 'react';
import classes from '@/sass/pages/home/HeaderMegaMenu.module.scss';
import { Icons } from '@/assets/icons/Icons';
import {
	Box,
	Burger,
	Button,
	Center,
	Collapse,
	Divider,
	Drawer,
	Group,
	HoverCard,
	ScrollArea,
	SimpleGrid,
	Text,
	ThemeIcon,
	UnstyledButton,
	rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
	AlignBottom,
	ArrowDown2,
	Barcode,
	Brodcast,
	CardEdit,
	CardReceive,
	I24Support,
} from 'iconsax-react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import PortfolioAvatar from '../avatar/ProtofolioAvatar';
import { ERole } from '@/core/entities/auth/authSlice.entity';

const solutionsData = [
	{
		icon: <AlignBottom size='24' color='#000' />,
		title: 'For Talents',
		description: 'Empowering talents to thrive in their freelance careers."',
		link: '/register/user/1',
	},
	{
		icon: <Brodcast size='24' color='#000' />,
		title: 'For Buisness',
		description: 'Connecting businesses with skilled freelancers for success.',
		link: 'register/client/1',
	},
	{
		icon: <CardReceive size='24' color='#000' />,
		title: 'For Expert',
		description: 'Simplifying expert operations to find and manage top talent.',
		link: '/login',
	},
];
const featuresData = [
	{
		icon: <CardEdit size='24' color='#000' />,
		title: 'About',
		description: 'Learn more about our mission, values, and story.',
		link: '#',
	},
	{
		icon: <I24Support size='24' color='#000' />,
		title: 'Support',
		description: 'Get assistance and answers to your questions from our dedicated support team.',
		link: '#',
	},
	{
		icon: <CardReceive size='24' color='#000' />,
		title: 'Contact Us',
		description:
			'Reach out to us directly for inquiries, feedback, or collaboration opportunities.',
		link: '#',
	},
	{
		icon: <Barcode size='24' color='#000' />,
		title: 'Careers',
		description: 'Join our team and discover exciting career opportunities.',
		link: '#',
	},
];

const HomeNavbar = () => {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
	const [linksOpenedFeat, { toggle: toggleLinksFeat }] = useDisclosure(false);
	const user = useAppSelector(selectConnectedUser);

	const links_features = featuresData.map((item) => (
		<UnstyledButton key={item.title}>
			<Group wrap='nowrap' align='flex-start'>
				<ThemeIcon size={34} variant='default' radius='md'>
					{item.icon}
				</ThemeIcon>
				<div>
					<Text size='sm' fw={500}>
						{item.title}
					</Text>
					<Text size='xs' c='dimmed'>
						{item.description}
					</Text>
				</div>
			</Group>
		</UnstyledButton>
	));

	const links_solutions = solutionsData.map((item) => (
		<Link to={item.link} key={item.title}>
			<Group wrap='nowrap' align='flex-start'>
				<ThemeIcon size={34} variant='default' radius='md'>
					{item.icon}
				</ThemeIcon>
				<div>
					<Text size='sm' fw={500}>
						{item.title}
					</Text>
					<Text size='xs' c='dimmed'>
						{item.description}
					</Text>
				</div>
			</Group>
		</Link>
	));

	const whereToNavigate =
		user?.role === ERole.TALENT
			? '/portfolio'
			: user?.role === ERole.EXPERT
			? '/calendar'
			: user?.role === ERole.EDUCATOR
			? '/badges/explore'
			: user?.role === ERole.SUPERADMIN
			? '/super-admin'
			: '';

	return (
		<Box>
			<header className={classes.header}>
				<Group justify='space-between' h='100%'>
					<Group>
						<Text>SmarDac</Text>
						<Group ml={rem(70)} h='100%' gap={0} visibleFrom='sm'>
							<HoverCard width={600} position='bottom' radius='md' shadow='md' withinPortal>
								<HoverCard.Target>
									<Link to='#' className={classes.link}>
										<Center inline>
											<Box component='span' mr={5}>
												Solutions
											</Box>
											<ArrowDown2 size={16} />
										</Center>
									</Link>
								</HoverCard.Target>

								<HoverCard.Dropdown style={{ overflow: 'hidden' }}>
									<Group justify='space-between' px='md'>
										<Text fw={500}>Solutions</Text>
										{/* <Anchor href='#' fz='xs'>
											View all
										</Anchor> */}
									</Group>

									<Divider my='sm' />

									<SimpleGrid cols={2} spacing={0}>
										{links_solutions}
									</SimpleGrid>

									{/* <div className={classes.dropdownFooter}>
										<Group justify='space-between'>
											<div>
												<Text fw={500} fz='sm'>
													Get started
												</Text>
												<Text size='xs' c='dimmed'>
													Empower your freelance career now!
												</Text>
											</div>
											<Link to={'/register/user/1'}>
												<Button variant='default'>Get started</Button>
											</Link>
										</Group>
									</div> */}
								</HoverCard.Dropdown>
							</HoverCard>

							<HoverCard width={600} position='bottom' radius='md' shadow='md' withinPortal>
								<HoverCard.Target>
									<Link to='#' className={classes.link}>
										<Center inline>
											<Box component='span' mr={5}>
												Features
											</Box>
											<ArrowDown2 size={16} />
										</Center>
									</Link>
								</HoverCard.Target>

								<HoverCard.Dropdown style={{ overflow: 'hidden' }}>
									<Group justify='space-between' px='md'>
										<Text fw={500}>Features</Text>
									</Group>

									<Divider my='sm' />

									<SimpleGrid cols={2} spacing={0}>
										{links_features}
									</SimpleGrid>

									{/* <div className={classes.dropdownFooter}>
										<Group justify='space-between'>
											<div>
												<Text fw={500} fz='sm'>
													Get started
												</Text>
												<Text size='xs' c='dimmed'>
													Their food sources have decreased, and their numbers
												</Text>
											</div>
											<Button variant='default'>Get started</Button>
										</Group>
									</div> */}
								</HoverCard.Dropdown>
							</HoverCard>
						</Group>
					</Group>

					{user?.role === ERole.USER || !user ? (
						<>
							<Group visibleFrom='sm'>
								<Link to={'/login'}>
									<Button
										bg={'blue'}
										c={'#fff'}
										w={rem(132)}
										variant='default'
										size='md'
										radius={10}
										style={{ border: 'none' }}
									>
										Log in
									</Button>
								</Link>
							</Group>
							<Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom='sm' color='white' />
						</>
					) : (
						<Link to={whereToNavigate}>
							<PortfolioAvatar width='35' />
						</Link>
					)}
				</Group>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size='100%'
				padding='md'
				title={<Icons.blackLogo width={120} />}
				hiddenFrom='sm'
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(80)})`} mx='-md'>
					<Divider my='sm' />

					<UnstyledButton className={classes.link} onClick={toggleLinks}>
						<Center inline>
							<Box component='span' mr={5}>
								Solutions
							</Box>
							<ArrowDown2 size={16} />
						</Center>
					</UnstyledButton>
					<Collapse in={linksOpened} ml={15} p={2}>
						{links_solutions}
					</Collapse>
					<UnstyledButton className={classes.link} onClick={toggleLinksFeat}>
						<Center inline>
							<Box component='span' mr={5}>
								Features
							</Box>
							<ArrowDown2 size={16} />
						</Center>
					</UnstyledButton>
					<Collapse in={linksOpenedFeat} ml={15} p={2}>
						{links_features}
					</Collapse>
					<Link to={'/register/user/1'} className={classes.link}>
						<Text fw={700}> Join as Talent</Text>
					</Link>
					<Link to={'/register/client/1'} className={classes.link}>
						<Text fw={700}> Hire Client</Text>
					</Link>

					<Divider my='sm' />

					<Group justify='center' grow pb='xl' px='md'>
						<Link to={'/login'}>
							<Button variant='default' bg={'black.0'} c={'#fff'} w={'100%'}>
								Log in
							</Button>
						</Link>
					</Group>
				</ScrollArea>
			</Drawer>
		</Box>
	);
};

export default HomeNavbar;
