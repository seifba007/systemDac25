import React, { useState, useEffect } from 'react';
import { Box, Button, Text, Input, Table, Flex, ActionIcon, Badge, Select } from '@mantine/core';
import { Add, Trash } from 'iconsax-react';

interface TableSectionProps {
	isAddItems: boolean;
	onSubmit: (data: any) => void;
	data: any; // Array of headers (e.g., ['Checklist Item', 'Due Date', 'Comments'])
}

const TableSection = ({ isAddItems, onSubmit, data }: TableSectionProps) => {
	const [sections, setSections] = useState<{ id: number; items: { [key: string]: string }[] }[]>(
		[],
	);

	useEffect(() => {
		if (sections.length === 0) {
			setSections([{ id: Date.now(), items: [] }]);
		}
	}, [sections]);

	const handleAddSection = () => {
		const newSection = {
			id: Date.now(),
			items: [],
		};
		setSections((prevSections) => [...prevSections, newSection]);
	};

	const handleAddItem = (sectionId: number) => {
		setSections((prevSections) =>
			prevSections.map((section) =>
				section.id === sectionId
					? {
							...section,
							items: [
								...section.items,
								data.reduce((acc: any, header: any) => {
									acc[header] = header === 'Priority' ? 'Low' : ''; // Default "Priority" to "Low"
									return acc;
								}, {} as { [key: string]: string }),
							],
					  }
					: section,
			),
		);
	};

	const handleDeleteSection = (sectionId: number) => {
		setSections((prevSections) => prevSections.filter((section) => section.id !== sectionId));
	};

	const handleDeleteItem = (sectionId: number, itemId: number) => {
		setSections((prevSections) =>
			prevSections.map((section) =>
				section.id === sectionId
					? {
							...section,
							items: section.items.filter((_, index) => index !== itemId),
					  }
					: section,
			),
		);
	};

	const handleItemChange = (sectionId: number, itemId: number, field: string, value: string) => {
		setSections((prevSections) => {
			const updatedSections = prevSections.map((section) =>
				section.id === sectionId
					? {
							...section,
							items: section.items.map((item, index) =>
								index === itemId ? { ...item, [field]: value } : item,
							),
					  }
					: section,
			);

			// Pass the updated data to the parent component
			const formData = updatedSections.map((section) => ({
				sectionId: section.id,
				items: section.items,
			}));
			onSubmit(formData);

			return updatedSections;
		});
	};

	const renderInputField = (header: string, value: string, sectionId: number, itemId: number) => {
		if (header === 'Due Date' || header === 'Control Date' || header === 'Efficiency Check') {
			return (
				<Input
					type='date'
					value={value}
					onChange={(e: any) => handleItemChange(sectionId, itemId, header, e.target.value)}
				/>
			);
		}
		if (header === 'Status') {
			return (
				<Badge bg='#6c757d'>
					<Text fz={'12px'}>Pending</Text>
				</Badge>
			);
		}
		if (header === 'Priority') {
			return (
				<Select
					value={value || 'Low'} // Ensure a default value
					onChange={(val) => handleItemChange(sectionId, itemId, 'Priority', val || 'Low')}
					placeholder='Select priority'
					data={['Low', 'Medium', 'High']}
					styles={{
						input: {
							fontSize: '13px',
							height: '30px',
						},
						dropdown: {
							fontSize: '13px',
						},
					}}
				/>
			);
		}
		return (
			<Input
				placeholder={header}
				value={value}
				onChange={(e: any) => handleItemChange(sectionId, itemId, header, e.target.value)}
			/>
		);
	};

	return (
		<Box>
			{isAddItems && (
				<Button
					rightSection={<Add size={'15'} color='#FFF' />}
					w={'10.3em'}
					bg={'#21089f'}
					onClick={handleAddSection}
				>
					<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#fff'} fz={'11px'}>
						Add Section
					</Text>
				</Button>
			)}

			{sections.map((section) => (
				<Box
					key={section.id}
					mt='1em'
					p='1em'
					bg='#f9f9f9'
					style={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}
				>
					<Flex justify='space-between' align='center' mb='1em'>
						<Text fz={'13px'}>Action Items</Text>
						<ActionIcon
							variant='filled'
							color='red'
							w={'25px'}
							h={'20px'}
							onClick={() => handleDeleteSection(section.id)}
						>
							<Trash color='#fff' size={'15'} variant='Bold' />
						</ActionIcon>
					</Flex>

					<Table>
						<Table.Thead>
							<Table.Tr>
								{data.map((header: any, idx: any) => (
									<Table.Th key={idx} fz={'13px'}>
										{header}
									</Table.Th>
								))}
								<Table.Th fz={'13px'}>Actions</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{section.items.map((item, itemIndex) => (
								<Table.Tr key={itemIndex}>
									{data.map((header: any, idx: any) => (
										<Table.Td key={idx}>
											{renderInputField(header, item[header] || '', section.id, itemIndex)}
										</Table.Td>
									))}
									<Table.Td>
										<ActionIcon
											variant='filled'
											color='red'
											w={'25px'}
											h={'20px'}
											onClick={() => handleDeleteItem(section.id, itemIndex)}
										>
											<Trash color='#fff' size={'15'} variant='Bold' />
										</ActionIcon>
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>

					<Button
						mt='1em'
						leftSection={<Add size='22' />}
						onClick={() => handleAddItem(section.id)}
					>
						<Text fz={'11px'}>Add Item</Text>
					</Button>
				</Box>
			))}
		</Box>
	);
};

export default TableSection;
