import React, { useState, useEffect } from 'react';
import {
	Modal,
	TextInput,
	Button,
	Flex,
	Box,
	Title,
	FileInput,
	Text,
	Textarea,
	Avatar,
	Switch,
	MultiSelect,
} from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
import { Folder } from 'iconsax-react';
import toast from 'react-hot-toast';
import { createApps, updateApps } from '@/core/services/modulesServices/apps.service';
import { getConnectedUser } from '@/core/services/modulesServices/user.service';
import { setConnectedUser } from '@/core/store/modules/authSlice';
import { useAppDispatch } from '@/core/store/hooks';

// Define the type for the Apps state
interface AppsState {
	name: string;
	UploadLogo: File | null | string;
	path: string;
	active: boolean;
	categories: string[];
	tags: string[];
	description: string;
}

interface EditAppsModelProps {
	opened: boolean;
	isUpdate: boolean;
	getApp: () => void;
	onClose: () => void;
	data?: {
		logo: string;
		name: string;
		path: string;
		isActive: boolean;
		categories: string[];
		tags: string[];
		description: string;
		id: string;
	};
}

const CreationApps: React.FC<EditAppsModelProps> = ({
	opened,
	onClose,
	data,
	getApp,
	isUpdate,
}) => {
	const [Apps, setApps] = useState<AppsState>({
		name: '',
		UploadLogo: null,
		path: '',
		active: data?.isActive ?? false, // Ensure the initial value is a boolean
		categories: [],
		tags: [],
		description: '',
	});
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (data) {
			setApps({
				name: data.name || '',
				UploadLogo: data.logo || null,
				path: data.path || '',
				active: data.isActive,
				categories: Array.isArray(data.categories) ? data.categories : [], // Ensure it's an array
				tags: Array.isArray(data.tags) ? data.tags : [], // Ensure it's an array
				description: data.description || '',
			});
		}
	}, [data]);

	// Handle input changes for all fields
	const handleInputChange = (key: keyof AppsState, value: any) => {
		setApps((prev) => ({ ...prev, [key]: value }));
	};

	// Handle file input change (for Upload Logo)
	const handleFileChange = (file: File | null) => {
		setApps((prev) => ({ ...prev, UploadLogo: file }));
	};

	const handleSave = () => {
		const formData = new FormData();

		// Append all fields to FormData
		formData.append('name', Apps.name);
		if (Apps.UploadLogo instanceof File) {
			formData.append('logo', Apps.UploadLogo);
		}
		formData.append('path', Apps.path);
		formData.append('description', Apps.description);
		formData.append('isActive', Apps.active.toString());
		formData.append('categories', JSON.stringify(Apps.categories)); // Convert to string if needed
		formData.append('tags', JSON.stringify(Apps.tags)); // Convert to string if needed

		if (isUpdate && data) {
			// Update logic
			updateApps(formData, data.id)
				.then(() => {
					toast.success('App Updated successfully');
					getApp();
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
				});
		} else {
			// Create logic
			createApps(formData)
				.then(() => {
					toast.success('New App created successfully');
					getApp();
					onClose();
				})
				.catch((error) => {
					toast.error(error.message || 'An unexpected error occurred');
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
					{data ? 'Edit App' : 'Create App'}
				</Title>
			}
			styles={{
				body: { paddingTop: '5px' },
				header: { gap: '6em', alignItems: 'self-start' },
			}}
			size='440px'
			radius='5px'
		>
			<Flex direction='column' gap='0.6em'>
				{/* Logo Preview */}
				{data && (
					<Avatar
						src={
							Apps.UploadLogo instanceof File ? URL.createObjectURL(Apps.UploadLogo) : data?.logo
						}
						className={'avatar'}
						radius='sm'
						w={'6.5rem'}
						h={'5.5rem'}
					/>
				)}
				{/* Upload Logo */}
				<FileInput
					accept='.png,.csv,.jpg'
					leftSection={<Folder size='20' color='#868e96' variant='Bold' />}
					label={
						<Text pb='0.3em' color='#868e96'>
							Upload Logo
						</Text>
					}
					placeholder='Choose Logo'
					value={Apps.UploadLogo as File | null}
					onChange={handleFileChange}
					leftSectionPointerEvents='none'
				/>

				{/* Name Input */}
				<TextInput
					value={Apps.name}
					label={
						<Text pb='0.3em' color='#868e96'>
							Name
						</Text>
					}
					onChange={(e) => handleInputChange('name', e.target.value)}
				/>

				{/* Description */}
				<Textarea
					value={Apps.description}
					label={
						<Text pb='0.3em' color='#868e96'>
							Description
						</Text>
					}
					onChange={(e) => handleInputChange('description', e.target.value)}
				/>

				{/* Path Input */}
				<TextInput
					value={Apps.path}
					label={
						<Text pb='0.3em' color='#868e96'>
							Path
						</Text>
					}
					onChange={(e) => handleInputChange('path', e.target.value)}
				/>

				{/* Active Switch */}
				<Box>
					<Text pb='0.3em' color='#868e96'>
						Active
					</Text>
					<Switch
						checked={String(Apps.active) == 'true' ? true : false}
						onChange={(e) => handleInputChange('active', e.currentTarget.checked)}
						label={String(Apps.active) == 'true' ? 'Yes' : 'No'}
					/>
				</Box>

				{/* Categories MultiSelect */}
				<MultiSelect
					value={Apps.categories}
					data={['Category 1', 'Category 2', 'Category 3']} // Example data
					label={
						<Text pb='0.3em' color='#868e96'>
							Categories
						</Text>
					}
					placeholder='Select Categories'
					onChange={(value) => handleInputChange('categories', value)}
				/>

				{/* Tags MultiSelect */}
				<MultiSelect
					pb={'1.5em'}
					value={Apps.tags}
					data={['Tag 1', 'Tag 2', 'Tag 3']} // Example data
					label={
						<Text pb='0.3em' color='#868e96'>
							Tags
						</Text>
					}
					placeholder='Select Tags'
					onChange={(value) => handleInputChange('tags', value)}
				/>

				{/* Divider */}
				<Box
					style={{
						height: '0.7px',
						background: '#DFDFDF',
					}}
				></Box>

				{/* Action Buttons */}
				<Flex pt='1em' gap={20} justify='end'>
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

export default CreationApps;
