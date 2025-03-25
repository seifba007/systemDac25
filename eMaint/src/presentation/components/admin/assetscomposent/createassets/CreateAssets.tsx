import React from 'react';
import DynamicForm from '@/presentation/components/input/DynamicForm';
import { Box, Stack, Text } from '@mantine/core';
import { formFieldsAssets } from '@/data/formCreate';

const CreateAssets = () => {
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
				Add New Asset
			</Text>

			<Box className='BoxTableForms' p={'1em'}>
				<DynamicForm
					buttonanme='Add Assets'
					fields={formFieldsAssets}
					onSubmit={handleFormSubmit}
				/>
			</Box>
		</Stack>
	);
};

export default CreateAssets;
