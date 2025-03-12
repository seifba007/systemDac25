import { Avatar, Flex, Menu, ScrollArea, SimpleGrid, Text } from '@mantine/core';
import { Category } from 'iconsax-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define the interface for an individual app
interface App {
	name: string;
	logo?: string;
	path: string;
	type: string;
	[key: string]: any;
}

// Update the props interface
interface NotificationNavProps {
	data?: App[]; // Make data optional and explicitly an array of App objects
}

const CategoryApps: React.FC<NotificationNavProps> = ({ data = [] }) => {
	// Add a type guard to ensure data is an array
	const apps = Array.isArray(data) ? data : [];
	const navigate = useNavigate();

	// Filter apps by type
	const corporateApps = apps.filter((app) => app.type !== 'demo');
	const demoApps = apps.filter((app) => app.type === 'demo');

	return (
		<Menu shadow='md' width={200} position='bottom-end' offset={2}>
			<Menu.Target>
				<Category size='25' color='#6c757d' variant='Bold' style={{ cursor: 'pointer' }} />
			</Menu.Target>

			<Menu.Dropdown w={'20%'}>
				<Menu.Label fw={'600'} pb={'1em'} pt={'1em'}>
					Corporate Apps
				</Menu.Label>

				<ScrollArea h={'5em'} pt={'0.5em'}>
					{corporateApps.length > 0 ? (
						<SimpleGrid cols={3}>
							{corporateApps.map((app, index) => (
								<Menu.Item
									key={index}
									p={'0.7em'}
									onClick={() => {
										navigate(`/apploader/${app.path.replace(/^https?:\/\//, '')}` || '#');
									}}
								>
									<Flex gap={'0.3em'} direction={'column'} align={'center'}>
										<Avatar src={app.logo || ''} size={'20px'} radius={0} />
										<Text fz={'10px'} fw={'500'}>
											{app.name}
										</Text>
									</Flex>
								</Menu.Item>
							))}
						</SimpleGrid>
					) : (
						<Text fz={'13px'} c={'gray'} p={'0.7em'}>
							No apps available
						</Text>
					)}
				</ScrollArea>

				<Menu.Divider />

				<Menu.Label fw={'600'} pb={'1em'} pt={'1em'}>
					Demo Apps
				</Menu.Label>

				<ScrollArea h={'5em'} pt={'0.5em'}>
					<SimpleGrid cols={3}>
						{demoApps.length > 0 ? (
							demoApps.map((app, index) => (
								<Menu.Item
									key={index}
									p={'0.7em'}
									onClick={() => {
										navigate(`/apploader/${app.path.replace(/^https?:\/\//, '')}` || '#');
									}}
								>
									<Flex gap={'0.3em'} direction={'column'} align={'center'}>
										<Avatar src={app.logo || ''} size={'20px'} radius={0} />
										<Text fz={'10px'} fw={'500'}>
											{app.name}
										</Text>
									</Flex>
								</Menu.Item>
							))
						) : (
							<Text fz={'13px'} c={'gray'} p={'0.7em'}>
								No apps available
							</Text>
						)}
					</SimpleGrid>
				</ScrollArea>
			</Menu.Dropdown>
		</Menu>
	);
};

export default CategoryApps;
