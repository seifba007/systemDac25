import { Avatar, Flex, Menu, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import { Category } from 'iconsax-react';
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

const CategoryApps: React.FC<NotificationNavProps> = ({ data }) => {
	return (
		<Menu shadow='md' width={200} position='bottom-end' offset={2}>
			<Menu.Target>
				<Category size='25' color='#6c757d' variant='Bold' style={{ cursor: 'pointer' }} />
			</Menu.Target>

			<Menu.Dropdown w={'28%'}>
				<Menu.Label fw={'600'} pb={'1em'} pt={'1em'}>
					Corporate Apps{' '}
				</Menu.Label>

				<ScrollArea h={'9em'} pt={'0.5em'}>
					<SimpleGrid cols={3}>
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
					</SimpleGrid>
				</ScrollArea>
				<Menu.Divider />
				<Menu.Label fw={'600'} pb={'1em'} pt={'1em'}>
					Demo Apps
				</Menu.Label>

				<ScrollArea h={'9em'} pt={'0.5em'}>
					{/* Mapping through the data prop to display each notification */}
					<SimpleGrid cols={3}>
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
					</SimpleGrid>
				</ScrollArea>
			</Menu.Dropdown>
		</Menu>
	);
};

export default CategoryApps;
