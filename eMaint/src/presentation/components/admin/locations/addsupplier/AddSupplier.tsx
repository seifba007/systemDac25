import React from 'react';
import DynamicForm from '@/presentation/components/input/DynamicForm';
import { Stack, Text } from '@mantine/core';
import { formFieldsSupplier } from '@/data/formCreate';

const AddSupplier = () => {
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
					buttonanme='Add Supplier'
					fields={formFieldsSupplier}
					onSubmit={handleFormSubmit}
				/>
			</Stack>
		</Stack>
	);
};

export default AddSupplier;
