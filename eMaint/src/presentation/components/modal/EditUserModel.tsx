import React, { useState } from 'react';
import {
	Modal,
	TextInput,
	Button,
	Flex,
	Box,
	Title,
	FileInput,
	Text,
	PasswordInput,
} from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
import { Folder } from 'iconsax-react';

interface UserData {
	Avatar: string;
	Username: string;
	Email: string;
	Organization: string;
	Role: string;
	created: string;
	action: string;
}

interface EditUserModelProps {
	opened: boolean;
	onClose: () => void;
	userdata: UserData; // Updated to expect a single user object
	onSave?: (updatedData: UserData) => void; // Optional onSave handler
}

const EditUserModel: React.FC<EditUserModelProps> = ({ opened, onClose, userdata, onSave }) => {
	const [formData, setFormData] = useState<UserData>(userdata);

	// Handle input changes
	const handleInputChange = (key: keyof UserData, value: string) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};

	// Handle Save action
	const handleSave = () => {
		if (onSave) {
			onSave(formData); // Pass updated data to parent handler
		}
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
					value={formData.Username}
					label={
						<Text pb={'0.5em'} c={'#868e96'}>
							Username
						</Text>
					}
					onChange={(e) => handleInputChange('Username', e.target.value)}
				/>
				<TextInput
					label={
						<Text pb={'0.5em'} c={'#868e96'}>
							Email
						</Text>
					}
					value={formData.Email}
					onChange={(e) => handleInputChange('Email', e.target.value)}
				/>
				<TextInput
					value={formData.Organization}
					label={
						<Text pb={'0.5em'} c={'#868e96'}>
							Organization
						</Text>
					}
					onChange={(e) => handleInputChange('Organization', e.target.value)}
				/>
				<TextInput
					label={
						<Text pb={'0.5em'} c={'#868e96'}>
							Role
						</Text>
					}
					value={formData.Role}
					onChange={(e) => handleInputChange('Role', e.target.value)}
				/>
				<PasswordInput
					value={formData.created}
					label={
						<Text pb={'0.5em'} c={'#868e96'}>
							{' '}
							Password
						</Text>
					}
				/>
				<PasswordInput
					label={
						<Text pb={'0.5em'} c={'#868e96'}>
							Confirm Password
						</Text>
					}
					value={formData.created}
				/>
				<FileInput
					leftSection={<Folder size='20' color='#868e96' variant='Bold' />}
					label={
						<Text pb={'0.5em'} c={'#868e96'}>
							Picture
						</Text>
					}
					placeholder='Choose Picture'
					leftSectionPointerEvents='none'
					pb={'1em'}
				/>
				<Box
					style={{
						height: '0.7px',
						background: '#DFDFDF',
					}}
				></Box>
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
					>
						Confirm
					</Button>
				</Flex>
			</Flex>
		</Modal>
	);
};

export default EditUserModel;
