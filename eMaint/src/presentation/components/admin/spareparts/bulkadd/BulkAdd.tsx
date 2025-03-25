import React from 'react';
import DynamicForm, { FormField } from '@/presentation/components/input/DynamicForm';
import { Box, Button, FileInput, Flex, Stack, Text } from '@mantine/core';
import { formFieldsAssets, formFieldsSpareParts } from '@/data/formCreate';
import { Folder2 } from 'iconsax-react';

const BulkAdd = () => {
	const handleFormSubmit = (formData: Record<string, string | number | File[]>) => {
		console.log('Form Submitted Data:', formData);
	};

	return (
		<Stack>
			<Text
				style={{
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
				}}
				ff={'"Roboto",sans-serif'}
				fw={'700'}
				c={'#6c757d'}
				fz={'18px'}
			>
				Bulk Add Spare Parts
			</Text>

			<Flex direction={'column'} gap={'1em'} className='BoxTableForms' p={'1em'}>
				<Text
					style={{
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
					ff={'"Roboto",sans-serif'}
					fw={'500'}
					c={'#6c757d'}
					fz={'14px'}
				>
					{' '}
					Upload Spare Parts File{' '}
				</Text>
				<Text
					style={{
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
					ff={'"Roboto",sans-serif'}
					fw={'600'}
					c={'rgb(157 162 167 / 72%)'}
					fz={'12px'}
				>
					Download the sample template, fill it with your spare parts data, and upload it here. You
					can manually assign equipment associations after uploading.
				</Text>

				<Button variant='outline' w={'12em'}>
					<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'13px'}>
						{' '}
						Download{' '}
					</Text>
				</Button>
				<Text
					style={{
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
					ff={'"Roboto",sans-serif'}
					fw={'500'}
					c={'#6c757d'}
					fz={'14px'}
				>
					{' '}
					Upload Spare Parts Excel File (.xls, .xlsx){' '}
				</Text>
				<FileInput
					accept='.xls,.xlsx'
					label=''
					placeholder='No file shosen'
					multiple
					w={'30em'}
					rightSectionPointerEvents='none'
					rightSection={<Folder2 size='25' color='#868e96' variant='Bold' />}
				/>
				<Button w={'8em'}>
					<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#FFF'} fz={'13px'}>
						{' '}
						Upload
					</Text>
				</Button>
			</Flex>
		</Stack>
	);
};
export default BulkAdd;
