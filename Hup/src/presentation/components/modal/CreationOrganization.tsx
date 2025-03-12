import React, { useState, useEffect } from 'react';
import {
	Modal,
	TextInput,
	Button,
	Flex,
	Title,
	FileInput,
	Text,
	Textarea,
	Avatar,
} from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
import { Folder } from 'iconsax-react';
import {
	createOrganizations,
	updateOrganizations,
} from '@/core/services/modulesServices/organizations.service';
import toast from 'react-hot-toast';

// Define the type for the organization state
interface OrganizationState {
	OrganizationName: string;
	UploadLogo: File | null | string;
	Address: string;
	PhoneNumber: string;
	Email: string;
	Description: string;
}

interface EditUserModelProps {
	opened: boolean;
	getOrg: () => void;
	isUpdate: boolean;
	onClose: () => void;
	data?: {
		id: string;
		logo: string;
		name: string;
		address: string;
		email: string;
		description: string;
		phoneNumber: string;
	};
}

const CreationOrganization: React.FC<EditUserModelProps> = ({
	opened,
	onClose,
	data,
	getOrg,
	isUpdate,
}) => {
	const [Organization, setOrganization] = useState<OrganizationState>({
		OrganizationName: '',
		UploadLogo: null,
		Address: '',
		PhoneNumber: '',
		Email: '',
		Description: '',
	});

	// Update the state when `data` changes
	useEffect(() => {
		if (data) {
			setOrganization({
				OrganizationName: data.name || '',
				UploadLogo: data.logo || null,
				Address: data.address || '',
				PhoneNumber: data.phoneNumber || '', // Add a field in data if needed
				Email: data.email || '',
				Description: data.description || '',
			});
		}
	}, [data]);

	// Handle input changes for all fields
	const handleInputChange = (key: keyof OrganizationState, value: string) => {
		setOrganization((prev) => ({ ...prev, [key]: value }));
	};

	// Handle file input change (for Upload Logo)
	const handleFileChange = (file: File | null) => {
		setOrganization((prev) => ({ ...prev, UploadLogo: file }));
	};

	// Handle Save action
	const handleSave = () => {
		const formData = new FormData();

		// Append all fields to FormData
		formData.append('name', Organization.OrganizationName);
		if (Organization.UploadLogo instanceof File) {
			formData.append('logo', Organization.UploadLogo);
		} else {
			console.warn('UploadLogo is not a valid file:', Organization.UploadLogo);
		}
		formData.append('address', Organization.Address);
		formData.append('phoneNumber', Organization.PhoneNumber);
		formData.append('email', Organization.Email);
		formData.append('description', Organization.Description);

		if (isUpdate && data) {
			updateOrganizations(formData, data.id)
				.then(() => {
					toast.success(' Organization Updated successfully');
					getOrg();
					onClose();
				})
				.catch((error) => {
					toast.error(error.message || 'An unexpected error occurred');
				})
				.finally(() => {
					console.log('Finalizing process');
				});
		} else {
			createOrganizations(formData)
				.then((response) => {
					if (response?.status === 201) {
						toast.success('New Organization created successfully');
						getOrg();
						onClose();
					} else {
						toast.error(response?.message || 'Failed to create organization');
					}
				})
				.catch((error) => {
					toast.error(error.message || 'An unexpected error occurred');
				})
				.finally(() => {
					console.log('Finalizing process');
				});
		}
	};

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
					{data ? 'Edit Organization' : 'Create Organization'}
				</Title>
			}
			styles={{
				body: { paddingTop: '5px' },
				header: { gap: '6em', alignItems: 'self-start' },
			}}
			size={'440px'}
			radius={'5px'}
		>
			<Flex direction='column' gap='0.6em'>
				{data && (
					<Avatar src={data?.logo} className='avatar' radius='sm' w={'7.5rem'} h={'7.5rem'} />
				)}
				<FileInput
					leftSection={<Folder size='20' color='#868e96' variant='Bold' />}
					label={
						<Text pb={'0.3em'} c={'#868e96'}>
							Upload Logo
						</Text>
					}
					accept='.png,.jpg,.jpeg'
					placeholder='Choose Logo'
					value={Organization.UploadLogo as File | null}
					onChange={handleFileChange}
					leftSectionPointerEvents='none'
				/>
				<TextInput
					value={Organization.OrganizationName}
					label={
						<Text pb={'0.3em'} c={'#868e96'}>
							Organization Name
						</Text>
					}
					onChange={(e) => handleInputChange('OrganizationName', e.target.value)}
				/>
				<TextInput
					value={Organization.Address}
					label={
						<Text pb={'0.3em'} c={'#868e96'}>
							Address
						</Text>
					}
					onChange={(e) => handleInputChange('Address', e.target.value)}
				/>
				<TextInput
					type='Number'
					value={Organization.PhoneNumber}
					label={
						<Text pb={'0.3em'} c={'#868e96'}>
							Phone Number
						</Text>
					}
					onChange={(e) => handleInputChange('PhoneNumber', e.target.value)}
				/>
				<TextInput
					value={Organization.Email}
					label={
						<Text pb={'0.3em'} c={'#868e96'}>
							Email
						</Text>
					}
					onChange={(e) => handleInputChange('Email', e.target.value)}
				/>
				<Textarea
					value={Organization.Description}
					label={
						<Text pb={'0.3em'} c={'#868e96'}>
							Description
						</Text>
					}
					onChange={(e) => handleInputChange('Description', e.target.value)}
				/>

				<Flex pt={'1em'} gap={20} justify='end'>
					<Button variant='outline' size='md' color='black' onClick={onClose} radius={10}>
						Cancel
					</Button>
					<Button
						variant='filled'
						size='md'
						color='black'
						loading={false}
						onClick={handleSave}
						radius={10}
					>
						Confirm
					</Button>
				</Flex>
			</Flex>
		</Modal>
	);
};

export default CreationOrganization;
