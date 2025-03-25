import React, { useState } from 'react';
import {
	Stack,
	Text,
	Table,
	Button,
	FileInput,
	ActionIcon,
	Flex,
	TextInput,
	Textarea,
	Select,
} from '@mantine/core';
import { Folder2, Trash } from 'iconsax-react';
import { createHazopeAnalysis } from '@/core/services/modulesServices/hazop.service';
import toast from 'react-hot-toast';
import { useForm } from '@mantine/form';

const HazopAnalysis = () => {
	const [files, setFiles] = useState<File[]>([]);
	const [fileNames, setFileNames] = useState<string[]>([]);
	const [teamMembers, setTeamMembers] = useState<
		{ name: string; department: string; role: string; companyName: string }[]
	>([]);

	// Use Mantine's useForm for form management
	const form = useForm({
		initialValues: {
			systemProcessName: '',
			objectives: '',
			boundaries: '',
			startDate: '',
			endDate: '',
			reviewFrequency: '',
			client: '',
			projectID: '',
			location: '',
		},
	});

	const handleFormSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevent default form submission
		const formData = form.values;

		const formDataToSend = new FormData();

		// Append basic form fields
		formDataToSend.append('systemName', String(formData.systemProcessName || ''));
		formDataToSend.append('objectives', String(formData.objectives || ''));
		formDataToSend.append('boundaries', String(formData.boundaries || ''));
		formDataToSend.append('startDate', String(formData.startDate || ''));
		formDataToSend.append('endDate', String(formData.endDate || ''));
		formDataToSend.append('reviewFrequency', String(formData.reviewFrequency || ''));
		formDataToSend.append('client', String(formData.client || ''));
		formDataToSend.append('projectID', String(formData.projectID || ''));
		formDataToSend.append('location', String(formData.location || ''));

		// Append team members as a JSON string
		formDataToSend.append('teamMembers', JSON.stringify(teamMembers));

		// Append files
		files.forEach((file, index) => {
			formDataToSend.append(`pidFiles[${index}]`, file);
		});
		createHazopeAnalysis(formDataToSend)
			.then(() => {
				form.reset();
				setFiles([]);
				setFileNames([]);
				setTeamMembers([]);
				toast.success('New HAZOP analysis created');
			})

			.catch((error) => {
				toast.error('Failed to create HAZOP analysis');
				console.error(error);
			});
	};

	const handleFileChange = (newFiles: File[] | null) => {
		if (newFiles && newFiles.length > 0) {
			setFiles((prevFiles) => [...prevFiles, ...newFiles]);
			setFileNames((prevNames) => [...prevNames, ...newFiles.map((file) => file.name)]);
		} else {
			setFiles([]);
			setFileNames([]);
		}
	};

	const removeFile = (index: number) => {
		setFiles(files.filter((_, i) => i !== index));
		setFileNames(fileNames.filter((_, i) => i !== index));
	};

	const removeTeamMember = (index: number) => {
		setTeamMembers(teamMembers.filter((_, i) => i !== index));
	};

	const addTeamMember = () => {
		setTeamMembers([...teamMembers, { name: '', department: '', role: '', companyName: '' }]);
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
				HAZOP Analysis
			</Text>

			<Stack className='BoxTableForms' p={'1em'} bg={'#f5f5f5'}>
				<form onSubmit={handleFormSubmit}>
					<Stack>
						{/* System/Process Name */}
						<Stack>
							<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'13px'}>
								System/Process Name{' '}
								<Text component='span' c='red'>
									*
								</Text>
							</Text>
							<TextInput
								placeholder='Enter system/process name'
								required
								{...form.getInputProps('systemProcessName')}
								styles={{
									input: {
										backgroundColor: '#fff',
										border: '1px solid #ced4da',
										borderRadius: '4px',
										padding: '8px',
										fontSize: '14px',
									},
								}}
							/>
						</Stack>

						{/* Objectives */}
						<Stack>
							<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'13px'}>
								Objectives{' '}
								<Text component='span' c='red'>
									*
								</Text>
							</Text>
							<Textarea
								placeholder='Describe the goals of the HAZOP study'
								required
								{...form.getInputProps('objectives')}
								styles={{
									input: {
										backgroundColor: '#fff',
										border: '1px solid #ced4da',
										borderRadius: '4px',
										padding: '8px',
										fontSize: '14px',
										minHeight: '100px',
									},
								}}
							/>
						</Stack>

						{/* Boundaries */}
						<Stack>
							<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'13px'}>
								Boundaries{' '}
								<Text component='span' c='red'>
									*
								</Text>
							</Text>
							<Textarea
								placeholder='Define the scope and limitations'
								required
								{...form.getInputProps('boundaries')}
								styles={{
									input: {
										backgroundColor: '#fff',
										border: '1px solid #ced4da',
										borderRadius: '4px',
										padding: '8px',
										fontSize: '14px',
										minHeight: '100px',
									},
								}}
							/>
						</Stack>

						{/* Start Date, End Date, Review Frequency */}
						<Flex gap={'1em'} wrap='wrap'>
							<Stack w='30%'>
								<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'13px'}>
									Start Date{' '}
									<Text component='span' c='red'>
										*
									</Text>
								</Text>
								<TextInput
									placeholder='Enter yyyy'
									type='date'
									required
									{...form.getInputProps('startDate')}
									styles={{
										input: {
											backgroundColor: '#fff',
											border: '1px solid #ced4da',
											borderRadius: '4px',
											padding: '8px',
											fontSize: '14px',
										},
									}}
								/>
							</Stack>
							<Stack w='30%'>
								<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'13px'}>
									End Date{' '}
									<Text component='span' c='red'>
										*
									</Text>
								</Text>
								<TextInput
									placeholder='Enter yyyy'
									type='date'
									required
									{...form.getInputProps('endDate')}
									styles={{
										input: {
											backgroundColor: '#fff',
											border: '1px solid #ced4da',
											borderRadius: '4px',
											padding: '8px',
											fontSize: '14px',
										},
									}}
								/>
							</Stack>
							<Stack w='37%'>
								<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'13px'}>
									Review Frequency{' '}
									<Text component='span' c='red'>
										*
									</Text>
								</Text>
								<Select
									placeholder='Monthly'
									data={['Monthly', 'Quarterly', 'Annually']}
									required
									{...form.getInputProps('reviewFrequency')}
									styles={{
										input: {
											backgroundColor: '#fff',
											border: '1px solid #ced4da',
											borderRadius: '4px',
											padding: '8px',
											fontSize: '14px',
										},
										dropdown: {
											border: '1px solid #ced4da',
											borderRadius: '4px',
										},
									}}
								/>
							</Stack>
						</Flex>

						{/* Client, Project ID, Location */}
						<Flex gap={'1em'} wrap='wrap'>
							<Stack w='30%'>
								<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'13px'}>
									Client
								</Text>
								<TextInput
									placeholder='Enter client name'
									{...form.getInputProps('client')}
									styles={{
										input: {
											backgroundColor: '#fff',
											border: '1px solid #ced4da',
											borderRadius: '4px',
											padding: '8px',
											fontSize: '14px',
										},
									}}
								/>
							</Stack>
							<Stack w='30%'>
								<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'13px'}>
									Project ID
								</Text>
								<TextInput
									placeholder='Enter project ID'
									{...form.getInputProps('projectID')}
									styles={{
										input: {
											backgroundColor: '#fff',
											border: '1px solid #ced4da',
											borderRadius: '4px',
											padding: '8px',
											fontSize: '14px',
										},
									}}
								/>
							</Stack>
							<Stack w='37%'>
								<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'13px'}>
									Location
								</Text>
								<TextInput
									placeholder='Enter location'
									{...form.getInputProps('location')}
									styles={{
										input: {
											backgroundColor: '#fff',
											border: '1px solid #ced4da',
											borderRadius: '4px',
											padding: '8px',
											fontSize: '14px',
										},
									}}
								/>
							</Stack>
						</Flex>

						{/* Team Members Section */}
						<Stack>
							<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'13px'}>
								Team Members
							</Text>
							{teamMembers.map((member, index) => (
								<Flex align={'center'} justify={'space-between'} w={'100%'} key={index}>
									<TextInput
										placeholder='Team Member Name'
										w={'25%'}
										value={member.name}
										onChange={(e) =>
											setTeamMembers((prev) =>
												prev.map((m, i) => (i === index ? { ...m, name: e.target.value } : m)),
											)
										}
										styles={{
											input: {
												backgroundColor: '#fff',
												border: '1px solid #ced4da',
												borderRadius: '4px',
												padding: '8px',
												fontSize: '14px',
											},
										}}
									/>
									<TextInput
										placeholder='Department'
										w={'25%'}
										value={member.department}
										onChange={(e) =>
											setTeamMembers((prev) =>
												prev.map((m, i) =>
													i === index ? { ...m, department: e.target.value } : m,
												),
											)
										}
										styles={{
											input: {
												backgroundColor: '#fff',
												border: '1px solid #ced4da',
												borderRadius: '4px',
												padding: '8px',
												fontSize: '14px',
											},
										}}
									/>
									<TextInput
										placeholder='Role'
										w={'10%'}
										value={member.role}
										onChange={(e) =>
											setTeamMembers((prev) =>
												prev.map((m, i) => (i === index ? { ...m, role: e.target.value } : m)),
											)
										}
										styles={{
											input: {
												backgroundColor: '#fff',
												border: '1px solid #ced4da',
												borderRadius: '4px',
												padding: '8px',
												fontSize: '14px',
											},
										}}
									/>
									<TextInput
										placeholder='Company Name'
										w={'25%'}
										value={member.companyName}
										onChange={(e) =>
											setTeamMembers((prev) =>
												prev.map((m, i) =>
													i === index ? { ...m, companyName: e.target.value } : m,
												),
											)
										}
										styles={{
											input: {
												backgroundColor: '#fff',
												border: '1px solid #ced4da',
												borderRadius: '4px',
												padding: '8px',
												fontSize: '14px',
											},
										}}
									/>
									<ActionIcon
										variant='filled'
										color='red'
										w='25px'
										h='20px'
										onClick={() => removeTeamMember(index)}
									>
										<Trash color='#fff' size='15' />
									</ActionIcon>
								</Flex>
							))}
							<Button w={'18%'} bg={'#6c757d'} onClick={addTeamMember}>
								<Text fz={'12px'}>Add Member</Text>
							</Button>
						</Stack>

						{/* File Upload Section */}
						<Stack>
							<Text ff={'"Roboto",sans-serif'} fw={'600'} c={'rgb(108 117 125 / 76%)'} fz={'12px'}>
								Attach Files
							</Text>
							<FileInput
								placeholder={fileNames.length > 0 ? fileNames.join(', ') : 'No file chosen'}
								multiple
								value={files}
								onChange={handleFileChange}
								rightSection={<Folder2 size='25' color='#868e96' variant='Bold' />}
								w={'50%'}
								styles={{
									input: {
										backgroundColor: '#fff',
										border: '1px solid #ced4da',
										borderRadius: '4px',
										padding: '8px',
										fontSize: '14px',
									},
								}}
							/>
							<Table>
								<Table.Thead>
									<Table.Tr>
										<Table.Th fz={'13px'} c={'rgb(34 34 34 / 58%)'}>
											Image
										</Table.Th>
										<Table.Th fz={'13px'} c={'rgb(34 34 34 / 58%)'}>
											File Name
										</Table.Th>
										<Table.Th fz={'13px'} c={'rgb(34 34 34 / 58%)'}>
											Size
										</Table.Th>
										<Table.Th fz={'13px'} c={'rgb(34 34 34 / 58%)'}>
											Action
										</Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									{files.map((file, index) => (
										<Table.Tr key={file.name}>
											<Table.Td>
												{file.type.startsWith('image/') && (
													<img
														src={URL.createObjectURL(file)}
														alt={file.name}
														style={{ width: '50px', height: '50px', objectFit: 'cover' }}
													/>
												)}
											</Table.Td>
											<Table.Td fz={'13px'} c={'rgb(34 34 34 / 58%)'}>
												{file.name}
											</Table.Td>
											<Table.Td fz={'13px'} c={'rgb(34 34 34 / 58%)'}>
												{(file.size / 1024).toFixed(2)} KB
											</Table.Td>
											<Table.Td>
												<ActionIcon
													variant='filled'
													color='red'
													w='25px'
													h='20px'
													onClick={() => removeFile(index)}
												>
													<Trash color='#fff' size='15' />
												</ActionIcon>
											</Table.Td>
										</Table.Tr>
									))}
								</Table.Tbody>
							</Table>
						</Stack>
						<Button type='submit' w={'18%'} mt='md'>
							<Text fz={'12px'}>Create New Hazop</Text>
						</Button>
					</Stack>
				</form>
			</Stack>
		</Stack>
	);
};

export default HazopAnalysis;
