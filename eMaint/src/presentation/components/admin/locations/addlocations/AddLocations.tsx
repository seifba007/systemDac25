import React from 'react';
import DynamicForm from '@/presentation/components/input/DynamicForm';
import { Box, Button, Stack, Text } from '@mantine/core';
import { formFieldsLocation, formFieldsProcedures } from '@/data/formCreate';
import { Add } from 'iconsax-react';

const AddLocations = () => {
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
				Add New Location
			</Text>

			<Stack className='BoxTableForms' p={'1em'}>
				<DynamicForm
					buttonanme='Add Location'
					fields={formFieldsLocation}
					onSubmit={handleFormSubmit}
				/>
			</Stack>
		</Stack>
	);
};

export default AddLocations;
