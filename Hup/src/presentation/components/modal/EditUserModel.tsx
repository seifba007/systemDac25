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
	Select,
} from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
import { Folder } from 'iconsax-react';
import { updateUser } from '@/core/services/modulesServices/user.service';
import toast from 'react-hot-toast';


interface UserData {
	status: string;
	email: string;
	organization: string;
	fullName: string;
	picture: string;
	role: string;
	createdAt: string;
	action: string;
	id: any; 
}

interface EditUserModelProps {
	opened: boolean;
	onClose: () => void;
	userdata: UserData;
	getUse: () => void;
}

const EditUserModel: React.FC<EditUserModelProps> = ({ opened, onClose, userdata,getUse }) => {
	const [formData, setFormData] = useState<UserData>(userdata);
	const [fileUploaded, setFileUploaded] = useState<File | null>(null); // State to track uploaded file
	const handleInputChange = (key: keyof UserData, value: string) => {
		setFormData((prev) => ({ ...prev, [key]: value }));
	};
	const Edit = () => {
		const updateFormData = new FormData();
		updateFormData.append('fullName', formData.fullName);
		updateFormData.append('email', formData.email);
		updateFormData.append('organization', formData.organization);
		updateFormData.append('role', formData.role);
		if (fileUploaded) {
			updateFormData.append('picture', fileUploaded); // Add file to FormData
		}
		updateUser(updateFormData,userdata?.id.$oid)
			.then(() => {
				toast.success('User updated successfully!');
				getUse()
				onClose(); // Close the modal on success
			})
			.catch((error) => {
				console.error('Error updating user:', error);
				toast.error('Failed to update user');
			});
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
				<TextInput
					value={formData.organization}
					label={
						<Text pb={'0.5em'} c={'#868e96'}>
							Organization
						</Text>
					}
					onChange={(e) => handleInputChange('organization', e.target.value)}
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
						{ value: 'SmarDac Super Admin', label: 'SmarDac Super Admin' },
						{ value: 'SmarDac Admin', label: 'SmarDac Admin' },
						{ value: 'Organization Admin', label: 'Organization Admin' },
						{ value: 'Organization Manager', label: 'Organization Manager' },
						{ value: 'Organization User', label: 'Organization User' },
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
					placeholder={<Text
									style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
								>{formData.picture|| 'Upload a picture'} </Text>}
					leftSectionPointerEvents='none'
					onChange={(file) => setFileUploaded(file)}
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
						onClick={Edit} // Call the Edit function on confirm
					>
						Confirm
					</Button>
				</Flex>
			</Flex>
		</Modal>
	);
};

export default EditUserModel;
