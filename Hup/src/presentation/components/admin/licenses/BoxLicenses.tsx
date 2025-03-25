import React, { useEffect, useState } from 'react';
import {
	Avatar,
	Center,
	Checkbox,
	Flex,
	Image,
	Pagination,
	ScrollArea,
	Table,
	Text,
	Loader,
} from '@mantine/core';
import BOX from '../../../../assets/boxnodata.png';
import toast from 'react-hot-toast';
import { updateUserAccess } from '@/core/services/modulesServices/user.service';

interface InstalledApp {
	appID: string;
	accessLevel: string;
}

interface User {
	fullName: string;
	id: string;
	organization: {
		name: string;
	};
	InstalledApps?: InstalledApp[];
}

interface App {
	name: string;
	logo: string;
	_id: string;
}

interface BoxTableAdminProps {
	totalCount: number;
	currentPage: number;
	resultsPerPage: number;
	setCurrentPage: (page: number) => void;
	setResultsPerPage: (perPage: number) => void;
	isResponsive: boolean;
	users: User[] | null;
	availableApps: App[] | null;
	titl: string;
	getUsers: () => void;
}

const BoxLicenses: React.FC<BoxTableAdminProps> = ({
	totalCount,
	currentPage,
	resultsPerPage,
	setCurrentPage,
	setResultsPerPage,
	isResponsive,
	users,
	availableApps,
	getUsers,
	titl,
}) => {
	const filteredUsers = users?.filter((user) => user?.organization?.name === titl) || [];
	const totalPages = Math.ceil(totalCount / resultsPerPage);
	const hasUsers = filteredUsers.length > 0;
	const hasApps = availableApps && availableApps.length > 0;
	const [selectedRoles, setSelectedRoles] = useState<{ [key: string]: string }>({});
	const [loading, setLoading] = useState(false);
	// Initialize selectedRoles based on InstalledApps when users or availableApps change
	useEffect(() => {
		if (!users || !availableApps) return;

		const initialRoles: { [key: string]: string } = {};
		filteredUsers?.forEach((user) => {
			availableApps?.forEach((app) => {
				const key = `${user?.id}-${app?.name}`;
				const accessLevel = getUserAppAccessLevel(user, app._id);
				initialRoles[key] = accessLevel;
			});
		});
		setSelectedRoles(initialRoles);
	}, [users, availableApps]);

	const handleRoleChange = async (userId: string, appId: any, appName: string, value: string) => {
		const key = `${userId}-${appName}`;
		setSelectedRoles((prev) => ({
			...prev,
			[key]: value,
		}));

		const formData = new FormData();
		const appIdValue = typeof appId === 'object' && appId.$oid ? appId.$oid : appId;
		formData.append('appID', appIdValue);
		formData.append('accessLevel', value);
		setLoading(true);
		try {
			await updateUserAccess(formData, userId);
			toast.success('User access updated successfully!');
			getUsers(); // Refresh user data
		} catch (error) {
			console.error('Error updating user access:', error);
			toast.error('Failed to update user access');
		} finally {
			setLoading(false);
		}
	};

	// Helper function to get the access level for a specific app from user's InstalledApps
	const getUserAppAccessLevel = (user: any, appId: any): string => {
		if (!user.InstalledApps || user.InstalledApps.length === 0) return 'Demo';
		const installedApp = user.InstalledApps.find((app: any) => app.appID === appId?.$oid);
		return installedApp ? installedApp.accessLevel : 'Demo';
	};

	return (
		<Flex direction={'column'} justify={'space-between'} className={'BoxTablelicence'}>
			<Text pb={'1em'} fw={'600'} c={'#6c757d'} fz={'15px'}>
				Organization Users
			</Text>
			{loading ? (
				<Center>
					<Loader color='blue' size='lg' />
				</Center>
			) : hasUsers || hasApps ? (
				<ScrollArea>
					<Table withTableBorder withColumnBorders className='customTable'>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>
									<Center>
										<Text fw={'600'} c={'#6c757d'}>
											User
										</Text>
									</Center>
								</Table.Th>
								{hasApps ? (
									availableApps?.map((app, index) => (
										<Table.Th key={index}>
											<Flex align={'center'} justify={'center'} gap={'0.5em'}>
												<Avatar src={app?.logo} alt={app?.name} className={'avatar'} radius='sm' />
												<Text className={'txttablename'} c={'#6c757d'}>
													{app?.name}
												</Text>
											</Flex>
										</Table.Th>
									))
								) : (
									<Table.Th>
										<Text className={'txttablename'} c={'#6c757d'}>
											No Apps Available
										</Text>
									</Table.Th>
								)}
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{hasUsers ? (
								filteredUsers.map((user, index) => (
									<Table.Tr key={index}>
										<Table.Td pl={'0.5em'}>
											<Text fw={'600'} fz={'13px'} c={'#6c757d'} ff={'sans-serif'}>
												{user?.fullName}
											</Text>
										</Table.Td>
										{hasApps ? (
											availableApps.map((app, index) => {
												const key = `${user?.id}-${app?.name}`;
												return (
													<Table.Td key={index} pl={'4em'} pr={'4em'}>
														<Flex align={'center'} gap={'1em'}>
															<Checkbox
																color='#4254ba'
																styles={{ label: { fontWeight: 600, fontSize: 14 } }}
															/>
															<Text className={'txttablename'}>Assigned</Text>
															<select
																className='form-select'
																value={selectedRoles[key] || 'Demo'}
																onChange={(e) =>
																	handleRoleChange(user?.id, app?._id, app?.name, e.target.value)
																}
																style={{
																	padding: '0.275rem 1.25rem 0.375rem 0.2em',
																	fontSize: '14px',
																	borderRadius: '4px',
																	border: '1px solid #ced4da',
																	backgroundColor: '#fff',
																	color: '#495057',
																	cursor: 'pointer',
																}}
															>
																<option value='Demo'>Demo</option>
																<option value='Administrator'>Administrator</option>
																<option value='Manager'>Manager</option>
																<option value='User'>User</option>
															</select>
														</Flex>
													</Table.Td>
												);
											})
										) : (
											<Table.Td>
												<Text className={'txttablename'}>No Apps</Text>
											</Table.Td>
										)}
									</Table.Tr>
								))
							) : (
								<Table.Tr>
									<Table.Td colSpan={hasApps ? availableApps.length + 1 : 2}>
										<Center>
											<Text className={'txttablename'}>No Users Available</Text>
										</Center>
									</Table.Td>
								</Table.Tr>
							)}
						</Table.Tbody>
					</Table>
				</ScrollArea>
			) : (
				<Flex
					direction='column'
					justify='center'
					align='center'
					gap='1.5em'
					style={{ height: '350px' }}
				>
					<Image src={BOX} style={{ width: '250px', height: '250px' }} />
					<Text className={'txtnodata'}>No Users or Apps Available</Text>
				</Flex>
			)}

			<Flex pt={'2em'} p={'0%'} className={'paginationContainer'} justify='space-between'>
				{!isResponsive && hasUsers ? (
					<Flex align='center' gap='0.5em'>
						<Text className={'txtselect'}>Nbr of results per page:</Text>
						<select
							className={'customSelect'}
							value={resultsPerPage}
							onChange={(e) => setResultsPerPage(Number(e.target.value))}
						>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={50}>50</option>
						</select>
					</Flex>
				) : null}
				{hasUsers ? (
					<Pagination
						className='pagination'
						total={totalPages}
						value={currentPage}
						onChange={(page) => setCurrentPage(page)}
						color='#2c74ff'
						siblings={0}
						size='sm'
					/>
				) : null}
			</Flex>
		</Flex>
	);
};

export default BoxLicenses;
