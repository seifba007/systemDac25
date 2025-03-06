import { DashBoardSidebar, Navbar } from '@/presentation/components/sidebar';
import { AppShell, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { FC, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import useResponsive from '@/presentation/shared/mediaQuery';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
	const [opened, { toggle }] = useDisclosure();
	const { isTablet } = useResponsive();
	const location = useLocation();

	const bgColorChanges = () => {
		if (isTablet) return '#FFF';
		if (location.pathname.startsWith('/courses/course-details/')) {
			return '#F4F2F0';
		}
	};

	return (
		<Fragment>
			<AppShell
				header={{ height: 60 }}
				navbar={{
					width: 300,
					breakpoint: 'sm',
					collapsed: { mobile: !opened },
				}}
				padding={0}
				bg={bgColorChanges()}
			>
				<AppShell.Header>
					<Navbar opened={opened} toggle={toggle} />
				</AppShell.Header>

				<AppShell.Navbar>
					<DashBoardSidebar />
				</AppShell.Navbar>

				<AppShell.Main pt={rem(60)}>{children}</AppShell.Main>
			</AppShell>
		</Fragment>
	);
};

export default Layout;
