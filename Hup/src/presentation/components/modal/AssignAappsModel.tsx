import React, { useEffect, useState } from 'react';
import {
	Modal,
	Button,
	Flex,
	Box,
	Title,
	Text,
	Avatar,
	Table,
	Checkbox,
	rem,
	Select,
	ScrollArea,
	Input,
} from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
import { Calendar } from 'iconsax-react';
import { DatePickerInput } from '@mantine/dates';
import useResponsive from '@/presentation/shared/mediaQuery';
import { getApps } from '@/core/services/modulesServices/apps.service';
import { ListOptions } from '@/core/entities/http.entity';
import { AssingAppOrganizations } from '@/core/services/modulesServices/organizations.service';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/core/store/hooks';
import { setConnectedUser } from '@/core/store/modules/authSlice';
import { getConnectedUser } from '@/core/services/modulesServices/user.service';

interface EditUserModelProps {
	opened: boolean;
	onClose: () => void;
	data: any;
	getOrgr: () => void;
}

const AssignAappsModel: React.FC<EditUserModelProps> = ({ opened, onClose, data, getOrgr }) => {
	const { isMobile } = useResponsive();
	const [apps, setApps] = useState<any[]>([]);
	const [checkboxStates, setCheckboxStates] = useState<any>({});
	const [startDates, setStartDates] = useState<any>({});
	const [endDates, setEndDates] = useState<any>({});
	const [licenses, setLicenses] = useState<any>({});
	const dispatch = useAppDispatch();

	// Function to fetch apps
	const getapps = () => {
		const options: ListOptions['options'] = {};
		getApps({ options })
			.then((res) => {
				const fetchedApps = res.data.apps;
				setApps(fetchedApps);

				// Pre-populate states based on data.availableApps
				if (data?.availableApps && data.availableApps.length > 0) {
					const newCheckboxStates: any = {};
					const newStartDates: any = {};
					const newEndDates: any = {};
					const newLicenses: any = {};
					const updatedApps = [...fetchedApps];

					data.availableApps.forEach((availableApp: any) => {
						const appIndex = fetchedApps.findIndex(
							(app: any) => (app.id || app.appId) === availableApp._id?.$oid,
						);

						if (appIndex !== -1) {
							// Set checkbox as checked
							newCheckboxStates[appIndex] = true;

							// Set access type
							updatedApps[appIndex].accessType = availableApp.accessType || 'Free';

							// Only set dates and licenses if accessType is not "Free"
							if (updatedApps[appIndex].accessType !== 'Free') {
								if (availableApp.licenseStartDate) {
									newStartDates[appIndex] = new Date(availableApp.licenseStartDate);
								}
								if (availableApp.licenseEndDate) {
									newEndDates[appIndex] = new Date(availableApp.licenseEndDate);
								}
								newLicenses[appIndex] = availableApp.licenseNbr || 0;
							}
						}
					});

					setCheckboxStates(newCheckboxStates);
					setStartDates(newStartDates);
					setEndDates(newEndDates);
					setLicenses(newLicenses);
					setApps(updatedApps);
				}
			})
			.catch((error) => {
				console.error('Error fetching apps:', error);
			});
	};

	useEffect(() => {
		if (opened) {
			getapps();
		}
	}, [opened, data]);

	// Handle checkbox state change
	const handleCheckboxChange = (index: number, checked: boolean) => {
		setCheckboxStates((prevState: any) => ({
			...prevState,
			[index]: checked,
		}));
	};

	// Handle access type change
	const handleAccessTypeChange = (index: number, value: string) => {
		setApps((prevApps: any) => {
			const updatedApps = [...prevApps];
			updatedApps[index].accessType = value;

			// If accessType is set to "Free", clear the corresponding dates and licenses
			if (value === 'Free') {
				setStartDates((prev: any) => {
					const newStartDates = { ...prev };
					delete newStartDates[index];
					return newStartDates;
				});
				setEndDates((prev: any) => {
					const newEndDates = { ...prev };
					delete newEndDates[index];
					return newEndDates;
				});
				setLicenses((prev: any) => {
					const newLicenses = { ...prev };
					delete newLicenses[index];
					return newLicenses;
				});
			}

			return updatedApps;
		});
	};

	// Handle date changes
	const handleStartDateChange = (index: number, date: Date | null) => {
		setStartDates((prev: any) => ({
			...prev,
			[index]: date,
		}));
	};

	const handleEndDateChange = (index: number, date: Date | null) => {
		setEndDates((prev: any) => ({
			...prev,
			[index]: date,
		}));
	};

	// Handle license number change
	const handleLicenseChange = (index: number, value: string) => {
		setLicenses((prev: any) => ({
			...prev,
			[index]: value,
		}));
	};

	// Function to format date to YYYY-MM-DD
	const formatDate = (date: Date | null) => {
		if (!date) return null;
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	};

	// Function to get all form data in the desired format
	const getAllFormData = () => {
		const availableApps = apps
			.map((app: any, index: number) => {
				if (!checkboxStates[index]) return null; // Skip unchecked apps

				// If accessType is "Free", ensure all other fields are null
				const isFree = app.accessType === 'Free';
				return {
					appId: app.id || app.appId || index.toString(),
					accessType: app.accessType || 'Free',
					licenseNbr: isFree ? 0 : licenses[index] || 0,
					licenseStartDate: isFree ? null : formatDate(startDates[index]),
					licenseEndDate: isFree ? null : formatDate(endDates[index]),
				};
			})
			.filter((item) => item !== null);

		return { availableApps };
	};

	// Handle form submission
	const handleSubmit = () => {
		const allData = getAllFormData();
		AssingAppOrganizations(JSON.stringify(allData, null, 2), data.id)
			.then(() => {
				toast.success('AssignApp updated successfully');
				getOrgr();
				getConnectedUser().then((userData) => {
					const user = userData.data.user;
					dispatch(
						setConnectedUser({
							id: user.id,
							fullName: user.fullName,
							email: user.email,
							avatar: user.picture,
							role: user.role,
							apps: user?.organization?.availableApps,
						}),
					);
				});
				onClose();
			})
			.catch((error) => {
				toast.error(error.message || 'An unexpected error occurred');
			})
			.finally(() => {
				console.log('Finalizing process');
			});
	};

	const rows = apps?.map((element: any, key: any) => {
		const isDisabled = !checkboxStates[key];
		const isFree = element.accessType === 'Free';

		return (
			<Table.Tr key={key}>
				<Table.Td>
					<Flex gap={'0.5em'} align={'center'}>
						<Checkbox
							checked={checkboxStates[key] || false}
							onChange={(e) => handleCheckboxChange(key, e.target.checked)}
							label={
								<Text
									c='#6c757d'
									fw={400}
									fz='13px'
									style={{
										maxWidth: '90px',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{element.name}
								</Text>
							}
							color='#4254ba'
							styles={{ label: { fontWeight: 600, fontSize: rem(14) } }}
						/>
					</Flex>
				</Table.Td>
				<Table.Td>
					<Avatar src={element.logo} className={'avatar'} />
				</Table.Td>
				<Table.Td>
					<Select
						w={isMobile ? '8em' : '100%'}
						data={[
							{ value: 'Free', label: 'Free' },
							{ value: 'Licensed', label: 'Licensed' },
							{ value: 'Expired', label: 'Expired' },
						]}
						value={element.accessType || 'Free'}
						onChange={(value) => handleAccessTypeChange(key, value as any)}
						disabled={isDisabled}
						styles={(theme) => ({
							input: {
								fontSize: isMobile ? '12px' : '14px',
							},
							item: {
								fontSize: isMobile ? '12px' : '14px',
							},
						})}
						withCheckIcon={false}
					/>
				</Table.Td>
				<Table.Td>
					<DatePickerInput
						w={'11em'}
						placeholder='mm/dd/yyyy'
						rightSection={<Calendar size='15' color='#6c757d' variant='Bold' />}
						value={isFree ? null : startDates[key] || null}
						onChange={(date) => handleStartDateChange(key, date)}
						disabled={isDisabled || isFree}
					/>
				</Table.Td>
				<Table.Td>
					<DatePickerInput
						w={'11em'}
						placeholder='mm/dd/yyyy'
						rightSection={<Calendar size='15' color='#6c757d' variant='Bold' />}
						value={isFree ? null : endDates[key] || null}
						onChange={(date) => handleEndDateChange(key, date)}
						disabled={isDisabled || isFree}
					/>
				</Table.Td>
				<Table.Td>
					<Input
						type='number'
						value={isFree ? '' : licenses[key] || ''}
						onChange={(e: any) => handleLicenseChange(key, e.currentTarget.value)}
						disabled={isDisabled || isFree}
					/>
				</Table.Td>
			</Table.Tr>
		);
	});

	return (
		<Modal
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3,
			}}
			opened={opened}
			onClose={onClose}
			title={
				<Title className='titremodel' style={{ marginTop: '9px', textAlign: 'center' }} order={6}>
					<Text
						fz={isMobile ? '12px' : '16px'}
						fw={'700'}
						c={'#6c757d'}
						maw={isMobile ? '10em' : '100%'}
					>
						Assign apps to Guests Organization
					</Text>
				</Title>
			}
			styles={{
				body: { paddingTop: '5px' },
				header: { gap: '6em', alignItems: 'self-start' },
			}}
			size={'50em'}
			radius={'5px'}
		>
			<Box style={{ height: '0.7px', background: '#DFDFDF' }}></Box>

			<ScrollArea h={360}>
				<Table highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>
								<Text fz={'15px'} c={'#6c757d'} fw={'600'}>
									App
								</Text>
							</Table.Th>
							<Table.Th>
								<Text fz={'15px'} c={'#6c757d'} fw={'600'}>
									Icon
								</Text>
							</Table.Th>
							<Table.Th>
								<Text fz={'15px'} c={'#6c757d'} fw={'600'}>
									Access Type
								</Text>
							</Table.Th>
							<Table.Th>
								<Text fz={'15px'} c={'#6c757d'} fw={'600'}>
									Start Date
								</Text>
							</Table.Th>
							<Table.Th>
								<Text fz={'15px'} c={'#6c757d'} fw={'600'}>
									End Date
								</Text>
							</Table.Th>
							<Table.Th>
								<Text fz={'15px'} c={'#6c757d'} fw={'600'}>
									Nbr of Licenses
								</Text>
							</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{rows}</Table.Tbody>
				</Table>
			</ScrollArea>
			<Box style={{ height: '0.7px', background: '#DFDFDF' }}></Box>
			<Flex pt={'1em'} gap={20} justify='end'>
				<Button variant='outline' size='md' color='black' onClick={onClose} radius={10}>
					Cancel
				</Button>
				<Button
					variant='filled'
					size='md'
					color='black'
					loading={false}
					radius={10}
					onClick={handleSubmit}
				>
					Update Organization Apps
				</Button>
			</Flex>
		</Modal>
	);
};

export default AssignAappsModel;
