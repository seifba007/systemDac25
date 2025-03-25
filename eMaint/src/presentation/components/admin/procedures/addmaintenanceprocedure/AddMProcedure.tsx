import React, { useState } from 'react';
import DynamicForm from '@/presentation/components/input/DynamicForm';
import { Box, Button, Stack, Text, Input, Table, Flex, ActionIcon } from '@mantine/core';
import { formFieldsProcedures } from '@/data/formCreate';
import { Add, Trash } from 'iconsax-react';

const AddMProcedure = () => {
	const [sections, setSections] = useState<
		{ id: number; items: { id: number; description: string; comment: string }[] }[]
	>([]);

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
							items: [...section.items, { id: Date.now(), description: '', comment: '' }],
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
							items: section.items.filter((item) => item.id !== itemId),
						}
					: section,
			),
		);
	};

	const handleItemChange = (
		sectionId: number,
		itemId: number,
		field: 'description' | 'comment',
		value: string,
	) => {
		setSections((prevSections) =>
			prevSections.map((section) =>
				section.id === sectionId
					? {
							...section,
							items: section.items.map((item) =>
								item.id === itemId ? { ...item, [field]: value } : item,
							),
						}
					: section,
			),
		);
	};

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
				Add Maintenance Procedure
			</Text>

			<Stack className='BoxTableForms' p={'1em'}>
				<DynamicForm
					buttonanme='Add New Spare Part'
					fields={formFieldsProcedures}
					onSubmit={handleFormSubmit}
				>
					<Box>
						<Text
							style={{
								display: 'flex',
								fontSize: '13px',
								fontWeight: '600',
								paddingBottom: '1em',
								color: 'rgb(34 34 34 / 58%)',
							}}
						>
							Checklist Sections
						</Text>
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

						{/* Render dynamic sections */}
						{sections.map((section) => (
							<Box
								key={section.id}
								mt='1em'
								p='1em'
								bg='#f9f9f9'
								style={{ border: '1px solid #e0e0e0', borderRadius: '8px' }}
							>
								<Flex justify='space-between' align='center' mb='1em'>
									<Input
										placeholder='Section Name'
										value={`Section ${sections.indexOf(section) + 1}`}
										readOnly
									/>

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

								<Table.ScrollContainer minWidth={500} type='native'>
									<Table>
										<Table.Thead>
											<Table.Tr>
												<Table.Th fz={'13px'}>Checklist Item</Table.Th>
												<Table.Th fz={'13px'}>Attached File</Table.Th>
												<Table.Th fz={'13px'}>Comments</Table.Th>
												<Table.Th fz={'13px'}>Actions</Table.Th>
											</Table.Tr>
										</Table.Thead>
										<Table.Tbody>
											{section.items.map((item) => (
												<Table.Tr key={item.id}>
													<Table.Td>
														<Input
															placeholder='Item Description'
															value={item.description}
															onChange={(e: any) =>
																handleItemChange(section.id, item.id, 'description', e.target.value)
															}
														/>
													</Table.Td>
													<Table.Td>
														<div className='file-input-wrapper'>
															<label className='file-input-label'>
																<input type='file' className='file-input' />
																Choose File
															</label>
															<span className='file-name'>{'fileName'}</span>
														</div>
													</Table.Td>
													<Table.Td>
														<Input
															placeholder='Comments'
															value={item.comment}
															onChange={(e: any) =>
																handleItemChange(section.id, item.id, 'comment', e.target.value)
															}
														/>
													</Table.Td>
													<Table.Td>
														<ActionIcon
															variant='filled'
															color='red'
															w={'25px'}
															h={'20px'}
															onClick={() => handleDeleteItem(section.id, item.id)}
														>
															<Trash color='#fff' size={'15'} variant='Bold' />
														</ActionIcon>
													</Table.Td>
												</Table.Tr>
											))}
										</Table.Tbody>
									</Table>
								</Table.ScrollContainer>

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
				</DynamicForm>
			</Stack>
		</Stack>
	);
};

export default AddMProcedure;
