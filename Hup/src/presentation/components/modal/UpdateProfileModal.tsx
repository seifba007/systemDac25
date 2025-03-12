import React, { useEffect, useState, useCallback } from 'react';
import { Button, Flex, Input, Modal, Text, Title, rem } from '@mantine/core';
import toast from 'react-hot-toast';
import { fetchAndSetConnectedUser } from '@/presentation/shared/fetchAndSetConnectedUser';
import { useAppDispatch } from '@/core/store/hooks';
import { addUserAvatar, getConnectedUser, updateUser } from '@/core/services/modulesServices/user.service';
import { setConnectedUser } from '@/core/store/modules/authSlice';

type UpdateProfileProps = {
	width: string;
	open: () => void;
	opened: boolean;
	close: () => void;
	data?: any;
	getuserinfo: () => void;
};

const UpdateProfileModal = ({ opened, close, data, getuserinfo }: UpdateProfileProps) => {
	const [profileInfo, setProfileInfo] = useState({
		title: '',
		email: '',
	});

	useEffect(() => {
		if (data) {
			setProfileInfo({
				title: data.fullName || '',
				email: data.email || '',
			});
		}
	}, [data]);

	const handleChange = useCallback(
		(field: keyof typeof profileInfo) => (value: string) => {
			setProfileInfo((prev) => ({ ...prev, [field]: value }));
		},
		[],
	);
	const dispatch = useAppDispatch();
  console.log(data)
	const handleSave = async () => {
	
			const formData = new FormData();
			formData.append('fullName', profileInfo.title);
			updateUser(formData,data?.id)
				.then(() => {
					toast.success('photo profile successfully updated');
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
					close();
				})
				.catch();

	};
	const isButtonDisabled = !profileInfo.title;

	return (
		<Modal
			opened={opened}
			onClose={close}
			withCloseButton={false}
			radius='md'
			centered
			styles={{
				body: {
					padding: '0',
				},
			}}
		>
			<Flex direction='column' p='4%' gap={rem(12)}>
				<Title order={4}>Profile</Title>
				<Flex direction='column' gap='1.5em'>
					<Flex direction='column' gap='1em'>
						<Text c='var(--Grey-1, #575B60)' ff='Inter' fz='14px' fw='500'>
							Name
						</Text>
						<Input
							radius='8px'
							style={{
								border: '1px solid #EFEFEF',
								borderRadius: '8px',
							}}
							value={profileInfo.title}
							onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
								handleChange('title')(event.currentTarget.value)
							}
						/>
					</Flex>

					<Flex direction='column' gap='1em'>
						<Text c='var(--Grey-1, #575B60)' ff='Inter' fz='14px' fw='500'>
							Email
						</Text>
						<Input
							radius='8px'
							style={{
								border: '1px solid #EFEFEF',
								borderRadius: '8px',
							}}
							disabled={true}
							value={profileInfo.email}
						/>
					</Flex>

					<Flex justify='end' gap='1em'>
						<Button
							size='sm'
							variant='outline'
							style={{ borderColor: 'white', color: '#0A0C0E', width: '100px' }}
							onClick={close}
						>
							Cancel
						</Button>
						<Button
							size='sm'
							variant='filled'
							style={{ width: '100px', background: '#5596e6' }}
							disabled={isButtonDisabled}
							onClick={handleSave}
						>
							Update
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Modal>
	);
};

export default UpdateProfileModal;
