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

// Define the type for the Apps state
interface AppsState {
	Name: string;
	UploadLogo: File | null | string;
	Path: string;
	Active: boolean;
	Categories: string[];
	Tags: string[];
	Description: string;
}

interface EditAppsModelProps {
	opened: boolean;
	onClose: () => void;
	data?: {
		logo: string;
		name: string;
		path: string;
		active: boolean;
		categories: string[];
		tags: string[];
		description: string;
	};
}

const CreationApps: React.FC<EditAppsModelProps> = ({ opened, onClose, data }) => {
	const [Apps, setApps] = useState<AppsState>({
		Name: '',
		UploadLogo: null,
		Path: '',
		Active: false,
		Categories: [],
		Tags: [],
		Description: '',
	});

	// Update the state when `data` changes
	useEffect(() => {
		if (data) {
			setApps({
				Name: data.name || '',
				UploadLogo: data.logo || null,
				Path: data.path || '',
				Active: data.active || false,
				Categories: data.categories || [],
				Tags: data.tags || [],
				Description: data.description || '',
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

	// Handle Save action
	const handleSave = () => {
		console.log(Apps); // Pass this data to your parent component or API
		onClose();
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
					<Avatar src={data?.logo} className={'avatar'} radius='sm' w={'6.5rem'} h={'5.5rem'} />
				)}
				{/* Upload Logo */}
				<FileInput
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
					value={Apps.Name}
					label={
						<Text pb='0.3em' color='#868e96'>
							Name
						</Text>
					}
					onChange={(e) => handleInputChange('Name', e.target.value)}
				/>

				{/* Description */}
				<Textarea
					value={Apps.Description}
					label={
						<Text pb='0.3em' color='#868e96'>
							Description
						</Text>
					}
					onChange={(e) => handleInputChange('Description', e.target.value)}
				/>

				{/* Path Input */}
				<TextInput
					value={Apps.Path}
					label={
						<Text pb='0.3em' color='#868e96'>
							Path
						</Text>
					}
					onChange={(e) => handleInputChange('Path', e.target.value)}
				/>

				{/* Active Switch */}
				<Box>
					<Text pb='0.3em' color='#868e96'>
						Active
					</Text>
					<Switch
						checked={Apps.Active}
						onChange={(e) => handleInputChange('Active', e.currentTarget.checked)}
						label={Apps.Active ? 'Yes' : 'No'}
					/>
				</Box>

				{/* Categories MultiSelect */}
				<MultiSelect
					value={Apps.Categories}
					data={['Category 1', 'Category 2', 'Category 3']} // Example data
					label={
						<Text pb='0.3em' color='#868e96'>
							Categories
						</Text>
					}
					placeholder='Select Categories'
					onChange={(value) => handleInputChange('Categories', value)}
				/>

				{/* Tags MultiSelect */}
				<MultiSelect
					pb={'1.5em'}
					value={Apps.Tags}
					data={['Tag 1', 'Tag 2', 'Tag 3']} // Example data
					label={
						<Text pb='0.3em' color='#868e96'>
							Tags
						</Text>
					}
					placeholder='Select Tags'
					onChange={(value) => handleInputChange('Tags', value)}
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
