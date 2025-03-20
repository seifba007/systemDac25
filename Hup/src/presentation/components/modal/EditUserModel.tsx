import React, { useEffect, useState } from 'react';
import { Modal, TextInput, Button, Flex, Box, Title, FileInput, Text, Select, PasswordInput } from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
import { Folder } from 'iconsax-react';
import { getConnectedUser, updateUser } from '@/core/services/modulesServices/user.service';
import toast from 'react-hot-toast';
import { getOrganizations } from '@/core/services/modulesServices/organizations.service';
import { ListOptions } from '@/core/entities/http.entity';
import { setConnectedUser } from '@/core/store/modules/authSlice';
import { useAppDispatch } from '@/core/store/hooks';

interface UserData {
	status: string;
	email: string;
	organization: any; // Can be string or object
	fullName: string;
	password: string;
	picture: string;
	role: string;
	createdAt: string;
	action: string;
	confirmpassword: string;
	id: any;
}

interface EditUserModelProps {
	opened: boolean;
	onClose: () => void;
	userdata: UserData;
	getUse: () => void;
}

const EditUserModel: React.FC<EditUserModelProps> = ({ opened, onClose, userdata, getUse }) => {
	const [formData, setFormData] = useState<UserData>({
		...userdata,
		organization:
			typeof userdata.organization === 'object' ? userdata.organization?.id : userdata.organization,
	});
	const [fileUploaded, setFileUploaded] = useState<File | null>(null);
	const [organizations, setOrganizations] = useState<any[]>([]);

	// Handle input changes
	const handleInputChange = (key: keyof UserData, value: string) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	// Fetch organizations
	const fetchOrganizations = () => {
		const options: ListOptions['options'] = {};
		getOrganizations({ options })
			.then((res) => {
				setOrganizations(res.data.organizations);
			})
			.catch((error) => {
				console.error('Error fetching organizations:', error);
				toast.error('Failed to load organizations');
			});
	};
	const dispatch = useAppDispatch();

	// Update user
	const handleUpdate = () => {
		const updateFormData = new FormData();
		updateFormData.append('fullName', formData.fullName);
		updateFormData.append('email', formData.email);
		updateFormData.append('organization', formData.organization); // This is the organization ID
		updateFormData.append('role', formData.role);
		updateFormData.append('password', formData.password);
		updateFormData.append('confirmpassword', formData.confirmpassword);
		if (fileUploaded) {
			updateFormData.append('picture', fileUploaded);
		}

		updateUser(updateFormData, userdata?.id?.$oid || userdata?.id)
			.then(() => {
				toast.success('User updated successfully!');
				getUse();
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
				console.error('Error updating user:', error);
				toast.error('Failed to update user');
			});
	};

	// Fetch organizations on mount
	useEffect(() => {
		fetchOrganizations();
	}, []);

	// Update formData when userdata changes
	useEffect(() => {
		setFormData({
			...userdata,
			organization:
				typeof userdata.organization === 'object'
					? userdata?.organization?.id
					: userdata.organization,
		});
	}, [userdata]);

	// Prepare select data for organizations
	const organizationOptions = organizations.map((org) => ({
		value: org?.id, // Use ID as value
		label: org?.name, // Use name as display label
	}));

	// Add the current user's organization to options if not already present
	const currentOrg = typeof userdata.organization === 'object' ? userdata.organization : null;
	if (currentOrg && !organizationOptions.some((opt) => opt.value === currentOrg.id)) {
		organizationOptions.unshift({
			value: currentOrg.id,
			label: currentOrg.name,
		});
	}

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
					Edit User
				</Title>
			}
			styles={{
				body: { padding: '20px' },
				header: { gap: '6em', alignItems: 'self-start' },
			}}
			size={'440px'}
			radius={'5px'}
		>
			<Flex direction='column' gap='md'>
				<TextInput
					value={formData.fullName}
					label={
						<Text pb={'0.5em'} c={'#868e96'}>
							Full Name
						</Text>
					}
					onChange={(e) => handleInputChange('fullName', e.target.value)}
				/>
				<TextInput
					disabled
					label={
						<Text pb={'0.5em'} c={'#868e96'}>
							Email
						</Text>
					}
					value={formData.email}
					onChange={(e) => handleInputChange('email', e.target.value)}
				/>
							<PasswordInput
				value={formData.password}
				onChange={(e) => handleInputChange('password', e.target.value)}
				label={<Text  pb={'0.5em'} c={'#868e96'}> Password</Text>}
				/>
				<PasswordInput
				onChange={(e) => handleInputChange('confirmpassword', e.target.value)}
				label={<Text  pb={'0.5em'} c={'#868e96'}>Confirm Password</Text>}
				value={formData.confirmpassword}
				/>
				<Select
					label={
						<Text pb={'0.5em'} c={'#868e96'}>
							Organization
						</Text>
					}
					value={formData.organization}
					onChange={(value) => handleInputChange('organization', value || '')}
					data={organizationOptions}
					placeholder='Select an organization'
					searchable
				/>
				<Select
					label={
						<Text pb={'0.5em'} c={'#868e96'}>
							Role
						</Text>
					}
					value={formData.role}  
					onChange={(value) => handleInputChange('role', value || '')}
					data={[
						{ value: 'SmarDac Administrator', label: 'SmarDac Administrator' },
						{ value: 'SmarDac Manager', label: 'SmarDac Manager' },
						{ value: 'Organization IT Admin', label: 'Organization IT Admin' },
						{ value: 'Organization Supervisor', label: 'Organization Supervisor' },
						{ value: 'Organization User', label: 'Organization User' },
						{ value: 'Organization Manager', label: 'Organization Manager' },
						{ value: 'Organization Viewer', label: 'Organization Viewer' },
						{ value: 'Invited User', label: 'Invited User' },

					]}
				/>
				<FileInput
					leftSection={<Folder size='20' color='#868e96' variant='Bold' />}
					label={
						<Text pb={'0.5em'} c={'#868e96'}>
							Picture
						</Text>
					}
					accept='.png,.jpg'
					placeholder={
						<Text style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
							{formData.picture || 'Upload a picture'}
						</Text>
					}
					leftSectionPointerEvents='none'
					onChange={(file) => setFileUploaded(file)}
				/>
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
						type='submit'
						radius={10}
						onClick={handleUpdate}
					>
						Confirm
					</Button>
				</Flex>
			</Flex>
		</Modal>
	);
};

export default EditUserModel;
