import React from 'react';
import { Select, SelectProps } from '@mantine/core';
import { ArrowDown2 } from 'iconsax-react';

interface CustomSelectProps extends Pick<SelectProps, 'width'> {
	label: string;
	placeholder: string;
	data: string[];
}

const CustomSelect: React.FC<CustomSelectProps> = ({
	label,
	placeholder,
	data,
	width,
	...props
}) => {
	return (
		<Select
			label={label}
			placeholder={placeholder}
			data={data}
			rightSectionPointerEvents='none'
			rightSection={<ArrowDown2 size='20' color='#53545E' />}
			searchable
			size='lg'
			mt='1rem'
			w={width}
			styles={{
				root: {
					position: 'relative',
					border: '1px solid #DFDFE4',
					borderRadius: '0.5rem',
				},
				input: {
					border: 'none',
				},
				label: {
					color: '#53545E',
					paddingLeft: '1rem',
					fontSize: '0.8rem',
					marginTop: '0.8rem',
				},
			}}
			{...props}
		/>
	);
};

export default CustomSelect;
