import React, { useEffect, useState } from 'react';
import { Box, Flex, Text } from '@mantine/core';
import { Calendar, Call, Edit2, Location, Sms, TextBlock } from 'iconsax-react';
import { useDisclosure } from '@mantine/hooks';

import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import { getConnectedUser } from '@/core/services/modulesServices/user.service';
import toast from 'react-hot-toast';
import ChangeAvatarModel from '../../modal/ChangeAvatarModel';
import UpdateProfileModal from '../../modal/UpdateProfileModal';
import UpdateContactProfileModal from '../../modal/UpdateContactProfileModal';
const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string | undefined }> = ({
	icon,
	label,
	value,
}) => (
	<>
		<Flex align='center' gap='1em'>
			{icon}
			<Flex direction='column' gap='0.2em'>
				<Text ff='Inter' fz='14px' fw='400' lh='16px' c='#0A0C0E'>
					{label}
				</Text>
				<Text ff='Inter' fz='14px' fw='400' lh='16px' c='#686F7C'>
					{value}
				</Text>
			</Flex>
		</Flex>
		{label === 'Birthdate' || label === 'Address' ? null : <Box h='1px' bg='#EFEFEF' />}
	</>
);

const AccountInformation = () => {
	const [opened, { open, close }] = useDisclosure();
	const [openedInfo, { open: openUpdate, close: closeUpdate }] = useDisclosure();
	const [openedcontact, { open: openUpdateC, close: closeUpdateC }] = useDisclosure();
	const currentUser = useAppSelector(selectConnectedUser);
	const [userData, setUserData] = useState<any>();
	const fetchData = async () => {
		try {
			const rows = await getConnectedUser();
			if (rows) {
				setUserData(rows.data.user);
			}
		} catch (error) {
			toast.error('Error fetching data');
		}
	};

	useEffect(() => {
		fetchData();
	}, []);
	return (
		<Flex gap='1em' direction='column' pt={'1em'}>
			<Text c='#0A0C0E' ff='Inter' fz='24px' fs='normal' fw='700' lh='28px'>
				Account information
			</Text>

			{/* Main Box */}
			<Flex
				direction='column'
				gap={'1.5em'}
				h='539px'
				p='12px'
				bg='var(--Primary-Base-White, #FFF)'
				style={{
					border: '1px solid #DCDCDC',
					boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.04)',
					borderRadius: '12px',
				}}
			>
				<Box>
					<Flex
						h='48px'
						bg='#F7F7F7'
						style={{ borderRadius: '8px 8px 0px 0px', border: '1px solid #E2E2E2' }}
						align={'center'}
						justify={'space-between'}
						px='12px'
					>
						<Text ff='Inter' fz='14px' fw='600' lh='16px' c='#0A0C0E'>
							Profile
						</Text>
						<Edit2 size='18' color='#575B60' style={{ cursor: 'pointer' }} onClick={openUpdate} />
					</Flex>
					<Flex
						direction='column'
						justify='space-between'
						pb={'0.5em'}
						h='235px'
						bg='var(--Primary-Base-White, #FFF)'
						style={{ borderRadius: '0px 0px 8px 8px', border: '1px solid #E2E2E2' }}
						p='10px'
					>
						<Flex gap='1em' align='center'>
							<ChangeAvatarModel width='80px' opened={opened} close={close} open={open} />

							<Flex
								w='131px'
								h='40px'
								style={{ borderRadius: '4px', cursor: 'pointer', border: '1px solid #E3E5E8' }}
								bg='var(--Primary-Base-White, #FFF)'
								justify={'center'}
								align='center'
								ff='Inter'
								fz='14px'
								fw='500'
								lh='20px'
								c='#0A0C0E'
								onClick={open}
							>
								Upload photo
							</Flex>
						</Flex>
						<Box h='1px' bg='#EFEFEF' />

						<InfoItem
							icon={<TextBlock size='20' color='#222' />}
							label='Name'
							value={userData?.fullName}
						/>
						<InfoItem
							icon={<Sms size='20' color='#222' />}
							label='Email'
							value={userData?.email ? userData?.email : '--'}
						/>
					</Flex>
				</Box>

				<Box>
					{/* Contact Section */}
					<Flex
						h='48px'
						bg='#F7F7F7'
						style={{ borderRadius: '8px 8px 0px 0px', border: '1px solid #E2E2E2' }}
						align={'center'}
						justify={'space-between'}
						px='12px'
					>
						<Text ff='Inter' fz='14px' fw='600' lh='16px' c='#0A0C0E'>
							Contact
						</Text>
						<Edit2 size='18' color='#575B60' style={{ cursor: 'pointer' }} onClick={openUpdateC} />
					</Flex>
					{/* Contact Body */}
					<Flex
						direction='column'
						justify='space-between'
						h='138px'
						bg='var(--Primary-Base-White, #FFF)'
						style={{ borderRadius: '0px 0px 8px 8px', border: '1px solid #E2E2E2' }}
						p='10px'
					>
						<InfoItem
						   
							icon={<Call size='20' color='#222' />}
							label='Phone number'
							value={userData?.phone ? userData?.phone : '--'}
						/>
						<InfoItem
							icon={<Location size='20' color='#222' />}
							label='Address'
							value={userData?.address ? userData?.address : '--'}
						/>
					</Flex>
				</Box>
			</Flex>

			<UpdateContactProfileModal
			 getdta={fetchData}
				data={currentUser}
				opened={openedcontact}
				close={closeUpdateC}
				open={openUpdateC}
				width={''}
			/>
			<UpdateProfileModal
				data={currentUser}
				opened={openedInfo}
				close={closeUpdate}
				open={openUpdate}
				width={''}
				getuserinfo={fetchData}
			/>
		</Flex>
	);
};

export default AccountInformation;
