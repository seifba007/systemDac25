import React, { useEffect, useState } from 'react';
import { Button, Flex, Input, Modal, Text, Title, rem } from '@mantine/core';
import { DateValue } from '@mantine/dates';

type UpdateContactProps = {
	width: string;
	open: () => void;
	opened: boolean;
	close: () => void;
	data?: any;
	getdta: () => void;
};

const UpdateContactProfileModal = ({ opened, close, data, getdta }: UpdateContactProps) => {
	const [profileInfo, setProfileInfo] = useState({
		Phone: data?.Phone || '',
		Address: data?.Addresss || null,
	});
	useEffect(() => {
		if (data) {
			setProfileInfo({
				Phone: data.Phone,
				Address: data.birthdate,
			});
		}
	}, [data]);

	const handleChange = (field: keyof typeof profileInfo) => (value: string | DateValue | null) => {
		setProfileInfo((prev) => ({
			...prev,
			[field]: value,
		}));
	};
	const handleSave = () => {};
	const isButtonDisabled =
		!profileInfo.Phone ||
		(profileInfo.Phone === data?.email && profileInfo.Address === data?.Address);

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
				<Title order={4}>Contact</Title>
				<Flex direction='column' gap='1.5em'>
					<Flex direction='column' gap='1em'>
						<Text c='var(--Grey-1, #575B60)' ff='Inter' fz='14px' fw='500'>
							Phone Number
						</Text>
						<Input
							radius='8px'
							style={{
								border: '1px solid #EFEFEF',
								borderRadius: '8px',
							}}
							value={profileInfo.Phone}
							onChange={(event: any) => handleChange('Phone')(event.currentTarget.value)}
						/>
					</Flex>
					<Flex direction='column' gap='0.5em'>
						<Text c='var(--Grey-1, #575B60)' ff='Inter' fz='14px' fw='500'>
							Phone number
						</Text>
					</Flex>
					<Flex direction='column' gap='0.5em'>
						<Text c='var(--Grey-1, #575B60)' ff='Inter' fz='14px' fw='500'>
							Address
						</Text>
						<Input
							radius='8px'
							style={{
								border: '1px solid #EFEFEF',
								borderRadius: '8px',
							}}
							value={profileInfo.Address}
							onChange={(event: any) => handleChange('Address')(event.currentTarget.value)}
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
							onClick={() => {
								handleSave();
							}}
						>
							Update
						</Button>
					</Flex>
				</Flex>
			</Flex>
		</Modal>
	);
};

export default UpdateContactProfileModal;
