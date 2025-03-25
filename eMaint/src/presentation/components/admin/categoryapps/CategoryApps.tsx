import useResponsive from '@/presentation/shared/mediaQuery';
import { Avatar, Box, Center, Flex, Menu, ScrollArea, Text } from '@mantine/core';
import { Category, Notification } from 'iconsax-react';
import React from 'react';

// Define the types for the notification data
interface NotificationData {
	id: string;
	sender: string;
	time: string; // Date string
	comment: string;
}

interface NotificationNavProps {
	data: NotificationData[];
}

// Function to format dates as "31 Jan 2023"
const formatDate = (date: Date): string => {
	const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' };
	return date.toLocaleDateString('en-GB', options);
};

// Function to check if the notification is today, yesterday, or a specific date
const getDateLabel = (notificationTime: string): string => {
	const notificationDate = new Date(notificationTime);
	const now = new Date();

	// Compare date only (ignore time)
	const isToday = notificationDate.toDateString() === now.toDateString();
	const isYesterday =
		notificationDate.getDate() === now.getDate() - 1 &&
		notificationDate.getMonth() === now.getMonth() &&
		notificationDate.getFullYear() === now.getFullYear();

	if (isToday) {
		return 'Today';
	}

	if (isYesterday) {
		return 'Yesterday';
	}

	return formatDate(notificationDate); // Return formatted date like "31 Jan 2023"
};

const CategoryApps: React.FC<NotificationNavProps> = ({ data }) => {
	const { isMobile } = useResponsive();
	return (
		<Menu shadow='md' width={200} position='bottom-end' offset={2}>
			<Menu.Target>
				<Category size='25' color='#6c757d' variant='Bold' style={{ cursor: 'pointer' }} />
			</Menu.Target>

			<Menu.Dropdown w={'25%'}>
				<Menu.Label fw={'600'} pb={'1em'} pt={'1em'}>
					Corporate Apps{' '}
				</Menu.Label>

				<ScrollArea h={'9em'} pt={'0.5em'}>
					{data.map((notification) => (
						<Menu.Item key={notification.id} p={'0.7em'}>
							<Flex gap={'0.5em'} align={'center'}>
								<Avatar src={''} />
								<Text fz={'13px'} fw={'500'}>
									{notification.sender}
								</Text>
							</Flex>
						</Menu.Item>
					))}
				</ScrollArea>
				<Menu.Divider />
				<Menu.Label fw={'600'} pb={'1em'} pt={'1em'}>
					Demo Apps
				</Menu.Label>

				<ScrollArea h={'9em'} pt={'0.5em'}>
					{/* Mapping through the data prop to display each notification */}
					{data.map((notification) => (
						<Menu.Item key={notification.id} p={'0.7em'}>
							<Flex gap={'0.5em'} align={'center'}>
								<Avatar src={''} />
								<Text fz={'13px'} fw={'500'}>
									{notification.sender}
								</Text>
							</Flex>
						</Menu.Item>
					))}
				</ScrollArea>
			</Menu.Dropdown>
		</Menu>
	);
};

export default CategoryApps;
