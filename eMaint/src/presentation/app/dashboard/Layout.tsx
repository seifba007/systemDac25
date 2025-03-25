import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import '../../../sass/pages/SuperAdmin/SuperAdminNavbar.scss';
import '../../../sass/components/SuperAdminGlobal.scss';

import { useMediaQuery } from '@mantine/hooks';
import '../../../sass/pages/SuperAdmin/sideBar.scss';
import SuperAdminNavbar from '@/presentation/components/admin/SuperAdminNavbar/SuperAdminNavbar';

const SuperAdminPage = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const pathSegments = location.pathname.split('/');
	const isResponsive = useMediaQuery('(max-width: 768px)');
	return (
		<div className={`${!isSidebarOpen && isResponsive ? 'superadminPage2' : 'superadminPage'}`}>
			<div className={`${isSidebarOpen && isResponsive ? 'displnone' : 'contentWrapper'}`}>
				<SuperAdminNavbar />
				<main className={`${'mainContent'} ${isSidebarOpen && isResponsive ? 'sidebarOpen' : ''}`}>
					<Outlet />
				</main>
			</div>
		</div>
	);
};

export default SuperAdminPage;
