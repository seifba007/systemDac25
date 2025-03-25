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
	Table,
	Checkbox,
	rem,
	Select,
	SelectProps,
	Group,
	ScrollArea,
	Input,
} from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
import { Calendar, Folder } from 'iconsax-react';
import { DatePickerInput } from '@mantine/dates';
import useResponsive from '@/presentation/shared/mediaQuery';

interface EditUserModelProps {
	opened: boolean;
	onClose: () => void;
}

const AssignAappsModel: React.FC<EditUserModelProps> = ({ opened, onClose }) => {
	const { isMobile } = useResponsive();

	const elements = [
		{ position: 6, mass: 12.011, symbol: 'C', name: 'CarbonCarbonCarbonCarbonCarbon' },
		{ position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
		{ position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
		{ position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
		{ position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
		{ position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
		{ position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
	];
	const rows = elements.map((element) => (
		<Table.Tr key={element.name}>
			<Table.Td>
				<Flex gap={'0.5em'} align={'center'}>
					<Checkbox
						label={
							<Text
								c='#6c757d'
								fw={400}
								fz='13px'
								style={{
									maxWidth: '90px', // Set a max width
									whiteSpace: 'nowrap', // Prevent wrapping
									overflow: 'hidden', // Hide overflow content
									textOverflow: 'ellipsis', // Add ellipsis for overflowed text
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
				{' '}
				<Avatar src={'item?.logo'} className={'avatar'} />
			</Table.Td>
			<Table.Td>
				<Select
					w={isMobile ? '8em' : '100%'}
					style={{ input: { width: '30%' } }}
					data={[
						{ value: 'left', label: 'Left' },
						{ value: 'center', label: 'Center' },
						{ value: 'right', label: 'Right' },
						{ value: 'justify', label: 'Justify' },
					]}
				/>
			</Table.Td>
			<Table.Td>
				<DatePickerInput
					w={'11em'}
					placeholder='mm/dd/yyyy'
					rightSection={<Calendar size='15' color='#6c757d' variant='Bold' />}
				/>
			</Table.Td>
			<Table.Td>
				<DatePickerInput
					w={'11em'}
					placeholder='mm/dd/yyyy'
					rightSection={<Calendar size='15' color='#6c757d' variant='Bold' />}
				/>
			</Table.Td>
			<Table.Td>
				<Input type='number' />
			</Table.Td>
		</Table.Tr>
	));

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
			<Box
				style={{
					height: '0.7px',
					background: '#DFDFDF',
				}}
			></Box>

			<ScrollArea h={460}>
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
									Access Type{' '}
								</Text>
							</Table.Th>
							<Table.Th>
								<Text fz={'15px'} c={'#6c757d'} fw={'600'}>
									Start Date{' '}
								</Text>
							</Table.Th>
							<Table.Th>
								<Text fz={'15px'} c={'#6c757d'} fw={'600'}>
									End Date{' '}
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
				<Button variant='filled' size='md' color='black' loading={false} radius={10}>
					Update Organization Apps
				</Button>
			</Flex>
		</Modal>
	);
};

export default AssignAappsModel;
