import useResponsive from '@/presentation/shared/mediaQuery';
import { Avatar, Box, Center, Flex, Menu, ScrollArea, Text } from '@mantine/core';
import { Notification } from 'iconsax-react';
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

const NotificationNav: React.FC<NotificationNavProps> = ({ data }) => {
	const { isMobile } = useResponsive();
	return (
		<Menu shadow='md' width={200} position='bottom-end' offset={2}>
			<Menu.Target>
				<Box mt={isMobile ? '0em' : '0.5em'} style={{ position: 'relative' }}>
					{isMobile ? (
						<Box className='buttonham'>
							<Notification
								size='25'
								color='#6c757d'
								variant='Bold'
								style={{ cursor: 'pointer' }}
							/>
						</Box>
					) : (
						<Notification size='25' color='#6c757d' variant='Bold' style={{ cursor: 'pointer' }} />
					)}

					{/* Show a red circle if there is data */}
					{data.length > 0 && (
						<Box
							style={{
								position: 'absolute',
								top: '-2px',
								right: '-1px',
								width: '8px',
								height: '8px',
								borderRadius: '50%',
								backgroundColor: 'red',
							}}
						/>
					)}
				</Box>
			</Menu.Target>

			<Menu.Dropdown w={isMobile ? '97%' : '20%'}>
				<Menu.Item>
					<Flex justify={'space-between'} style={{ flexWrap: 'wrap' }} pt={'0.5em'}>
						<Text fz={'15px'} fw={'600'} c={'#6c757d'}>
							Notification
						</Text>
						<Text fz={'12px'} td={'underline'} c={'#6c757d'}>
							Clear All
						</Text>
					</Flex>
				</Menu.Item>
				<Menu.Divider />
				<ScrollArea h={'15em'} pt={'0.5em'}>
					<Menu.Label fw={'600'}>TODAY</Menu.Label>

					{/* Mapping through the data prop to display each notification */}
					{data.map((notification) => (
						<Menu.Item key={notification.id} p={'1em'}>
							<Flex gap={'0.5em'}>
								<Avatar src={''} />
								<Flex direction={'column'} w={'100%'}>
									<Flex justify={'space-between'}>
										<Text fz={'13px'} fw={'500'}>
											{notification.sender}
										</Text>
										<Text fz={'12px'} fw={'400'} c={'rgba(108, 117, 125, 0.75)'}>
											{getDateLabel(notification.time)} {/* Show the date label */}
										</Text>
									</Flex>
									<Text
										fz={'0.65rem'}
										style={{
											maxWidth: '20em', // Set your desired maxWidth
											whiteSpace: 'nowrap',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											opacity: '1',
										}}
										fw={'500'}
										c={'rgba(108, 117, 125, 0.75)'}
									>
										{notification.comment}
									</Text>
								</Flex>
							</Flex>
						</Menu.Item>
					))}
				</ScrollArea>
				<Menu.Divider />
				<Menu.Item p={'2%'}>
					<Center>
						<Text fz={'15px'} fw={'600'} td={'underline'} c={'#4254ba'}>
							View All
						</Text>
					</Center>
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default NotificationNav;
