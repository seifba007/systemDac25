import { Button, Text } from '@mantine/core';
import React from 'react';

interface PrimaryTabProps {
	label: string; // Label for the button, e.g., 'All', 'Active'
	page: string; // Unique page identifier for each tab
	count: number; // count value for each tab
	currentPage: string; // The currently active page
	onClick: (page: string) => void; // Function to handle setting the active page
	isMobile: boolean | undefined;
}
const PrimaryTab: React.FC<PrimaryTabProps> = ({
	label,
	page,
	currentPage,
	onClick,
	isMobile,
	count,
}) => {
	const isActive = currentPage === page;
	return (
		<Button
			// p={10}
			onClick={() => onClick(page)}
			style={{
				background: 'none',
				border: 'none',
				borderBottom: isActive ? '3px solid blue' : 'none',
				borderRadius: '0',
				cursor: 'pointer',
			}}
		>
			<Text c={isActive ? '#0A0C0E' : '#575B60'} fz={isMobile ? '12px' : '14px'}>
				{label}
			</Text>
			<Text
				c={isActive ? '#2C74FF' : '#575B60'}
				fz={10}
				ml={10}
				bg={isActive ? '#E5EEFF' : '#F2F2F2'}
				py={5}
				px={10}
				fw={600}
				style={{ borderRadius: '4px', width: 'max-content' }}
			>
				{count}
			</Text>
		</Button>
	);
};

export default PrimaryTab;
