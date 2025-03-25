import { Button, Text } from '@mantine/core';
import React from 'react';

interface notificationsTabProps {
	label: string; // Label for the button, e.g., 'All', 'Active'
	page: string; // Unique page identifier for each tab
	currentPage: string; // The currently active page
	onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
	isMobile: boolean | undefined;
}
const NotificationsTab: React.FC<notificationsTabProps> = ({
	label,
	page,
	currentPage,
	onClick,
	isMobile,
}) => {
	const isActive = currentPage === page;
	return (
		<Button
			onClick={onClick}
			style={{
				background: 'none',
				borderBottom: isActive ? '3px solid blue' : 'none',
				borderRadius: '0',
				cursor: 'pointer',
			}}
		>
			<Text c={isActive ? '#0A0C0E' : '#575B60'} fz={isMobile ? '12px' : '14px'}>
				{label}
			</Text>
		</Button>
	);
};

export default NotificationsTab;
