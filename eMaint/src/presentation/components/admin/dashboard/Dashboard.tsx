import { Center, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import {
	AlignBottom,
	Calendar,
	DocumentText,
	I3Square,
	Location,
	PathTool,
	Setting4,
} from 'iconsax-react';
import React, { useState } from 'react';
import DashboardCard from './DashboardCard ';
import useResponsive from '@/presentation/shared/mediaQuery';

const Dashboard = () => {
	// Get the current date
	const [date, setDate] = useState(new Date());
	const { isMobile } = useResponsive();

	const cards = [
		{
			title: 'Asset Management',
			value: '180',
			badgeColor: '#159488',
			badgeText: '12%',
			icon: <AlignBottom color='#FFF' variant='Bold' />,
			subText: 'Since last month',
			actionColor: '#159488',
		},
		{
			title: 'Work Orders',
			value: '63',
			badgeColor: '#f7473a',
			badgeText: '12%',
			icon: <Setting4 color='#FFF' variant='Bold' />,
			subText: 'Since last month',
			actionColor: '#299bf6',
		},
		{
			title: 'Spare Parts Inventory',
			value: '180',
			badgeColor: '#159488',
			badgeText: '12%',
			icon: <I3Square color='#FFF' variant='Bold' />,
			subText: 'Since last month',
			actionColor: '#f7473a',
		},
		{
			title: 'Location Management',
			value: '180',
			badgeColor: '#fec20d',
			badgeText: '12%',
			icon: <Location color='#FFF' variant='Bold' />,
			subText: 'Location Management',
			actionColor: '#4254ba',
		},
		{
			title: 'Maintenance Documents',
			value: '180',
			badgeColor: '#159488',
			badgeText: '12%',
			icon: <DocumentText color='#FFF' variant='Bold' />,
			subText: 'Since last month',
			actionColor: '#343a40',
		},
	];
	return (
		<Stack pl={isMobile ? '0%' : '4em'} pr={isMobile ? '0%' : '4em'}>
			<Flex justify={'space-between'} align={'center'}>
				<Text
					style={{
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
					ff={'"Roboto",sans-serif'}
					fw={'700'}
					c={'#6c757d'}
					fz={'18px'}
				>
					eMaint Dashboard
				</Text>
				<DateInput
					placeholder='Select a date'
					value={date} // Default value is today's date
					style={{
						border: 'none',
						boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
						borderRadius: '0px',
					}}
					rightSection={
						<Center
							w={'100%'}
							h={'36px'}
							style={{
								borderRadius: '20%',
								borderTopLeftRadius: '0px',
								borderBottomLeftRadius: '0px',
							}}
							bg={'#4254ba'}
						>
							<Calendar size='20' color='#fff' variant='Bold' />
						</Center>
					}
				/>
			</Flex>

			<SimpleGrid cols={isMobile ? 1 : 3} spacing='lg'>
				{cards.map((card, index) => (
					<DashboardCard key={index} {...card} />
				))}
			</SimpleGrid>
		</Stack>
	);
};

export default Dashboard;
