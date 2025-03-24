import React from 'react';
import { ActionIcon, Badge, Box, Flex, Paper, Stack, Text } from '@mantine/core';
import { ArrowUp } from 'iconsax-react';

type DashboardCardProps = {
	title: string;
	value: string;
	badgeColor: string;
	badgeText: string;
	icon: React.ReactNode;
	subText: string;
	actionColor: string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({
	title,
	value,
	badgeColor,
	badgeText,
	icon,
	subText,
	actionColor,
}) => {
	return (
		<Paper shadow='xs' p='xl' w={'100%'} className='cartDashboard'>
			<Flex justify={'space-between'}>
				<Stack>
					<Text
						style={{ lineHeight: '1.1' }}
						tt={'uppercase'}
						fz={'11px'}
						fw={'600'}
						c={'rgba(108, 117, 125, 0.75)'}
					>
						{title}
					</Text>
					<Text fz={'calc(1.271125rem + .2535vw)'} c={'rgb(128 128 128)'} fw={'600'}>
						{value}
					</Text>
					<Flex align={'center'} gap={'1em'}>
						<Badge color={badgeColor} radius='xs' leftSection={<ArrowUp size='13' color='#FFF' />}>
							<Text fz={'10px'} ff={'"Roboto",sans-serif'} fw={'600'}>
								{badgeText}
							</Text>
						</Badge>
						<Text fz={'13px'} ff={'"Roboto",sans-serif'} c={'rgba(108, 117, 125, 0.75)'}>
							{subText}
						</Text>
					</Flex>
				</Stack>
				<ActionIcon
					className='hoverIcon'
					radius={'md'}
					variant='filled'
					color={actionColor}
					size='40px'
				>
					<Box className='iconrotate'> {icon}</Box>
				</ActionIcon>
			</Flex>
		</Paper>
	);
};

export default DashboardCard;
