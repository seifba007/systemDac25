import React from 'react';
import DynamicForm, { FormField } from '@/presentation/components/input/DynamicForm';
import { Box, Stack, Text } from '@mantine/core';
import { formFieldsAssets, formFieldsSpareParts } from '@/data/formCreate';

const SpareCreate = () => {
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
				Add New Spare Part
			</Text>

			<Box className='BoxTableForms' p={'1em'}>
				<DynamicForm
					buttonanme=' Add New Spare Part'
					fields={formFieldsSpareParts}
					onSubmit={handleFormSubmit}
				/>
			</Box>
		</Stack>
	);
};
export default SpareCreate;
