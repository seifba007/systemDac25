import React, { useState, useCallback } from 'react';
import {
	MultiSelect,
	Stack,
	Switch,
	Text,
	Table,
	Button,
	FileInput,
	Flex,
	TextInput,
	ActionIcon,
	Textarea,
	Select,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Folder2, Trash } from 'iconsax-react';
import TableSection from '@/presentation/tablesection/TableSection';
import toast from 'react-hot-toast';
import { createMeetingReport } from '@/core/services/modulesServices/meetingreport.service';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import { useAppSelector } from '@/core/store/hooks';

// Define interfaces for type safety
interface FormData {
	meetingType: string;
	meetingTitle: string;
	dateTime: Date | null;
	businessDepartment: string;
	businessLocation: string;
	meetingLocation: string;
	meetingObjective: string;
	note: string;
}

interface TeamMember {
	name: string;
	department: string;
	role: string;
	companyName: string;
}

interface AgendaItem {
	agendaItem: string;
	presenter: string;
	timeAllocated: string;
}

interface User {
	_id: string;
	name: string;
}

interface ActionItem {
	Status: string;
	Description: string;
	'Assigned To': string;
	Priority: string;
	'Due Date': string;
	'Control Date': string;
	'Efficiency Check': string;
}

const AddlMeetingReport = () => {
	const [checked, setChecked] = useState(false);
	const [selectedValues, setSelectedValues] = useState<string[]>([]);
	const [files, setFiles] = useState<File[]>([]);
	const [fileNames, setFileNames] = useState<string[]>([]);
	const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
	const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
	const [actionItems, setActionItems] = useState<ActionItem[]>([]); // New state for action items
	const [formData, setFormData] = useState<FormData>({
		meetingType: '',
		meetingTitle: '',
		dateTime: null,
		businessDepartment: '',
		businessLocation: '',
		meetingLocation: '',
		meetingObjective: '',
		note: '',
	});
	const [usersList] = useState<User[]>([]);

	const handleInputChange = useCallback((field: keyof FormData, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	}, []);

	const handleSwitchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;
		setChecked(isChecked);
		if (!isChecked) setSelectedValues([]);
	}, []);

	const handleFileChange = useCallback((newFiles: File[] | null) => {
		if (newFiles?.length) {
			setFiles((prev) => [...prev, ...newFiles]);
			setFileNames((prev) => [...prev, ...newFiles.map((file) => file.name)]);
		} else {
			setFiles([]);
			setFileNames([]);
		}
	}, []);

	const removeFile = useCallback((index: number) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
		setFileNames((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const addTeamMember = useCallback(() => {
		setTeamMembers((prev) => [...prev, { name: '', department: '', role: '', companyName: '' }]);
	}, []);

	const removeTeamMember = useCallback((index: number) => {
		setTeamMembers((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const addAgendaItem = useCallback(() => {
		setAgendaItems((prev) => [...prev, { agendaItem: '', presenter: '', timeAllocated: '' }]);
	}, []);

	const removeAgendaItem = useCallback((index: number) => {
		setAgendaItems((prev) => prev.filter((_, i) => i !== index));
	}, []);

	const handleActionItemsSubmit = useCallback((data: any) => {
		// Flatten the sections into a single array of action items
		const flattenedActionItems = data.flatMap((section: { items: ActionItem[] }) => section.items);
		setActionItems(flattenedActionItems);
	}, []);
	const handleFormSubmit = useCallback(async () => {
		// Map action items to match backend expected format
		const formattedActionItems = actionItems.map((item) => ({
			status: item.Status || 'Pending', // Default to 'Pending' if not set
			description: item.Description || '',
			assignedPerson: item['Assigned To'] || '',
			priority: item.Priority || '',
			targetDate: item['Due Date'] || '',
			controlDate: item['Control Date'] || 'N/A',
			efficiencyCheck: item['Efficiency Check'] || 'N/A',
		}));

		const data = {
			meetingType: formData.meetingType,
			meetingTitle: formData.meetingTitle,
			dateTime: formData.dateTime?.toISOString() || new Date().toISOString(),
			businessDepartment: formData.businessDepartment,
			businessLocation: formData.businessLocation,
			meetingLocation: formData.meetingLocation,
			meetingObjective: formData.meetingObjective,
			notes: formData.note,
			attendees: JSON.stringify(teamMembers),
			agenda: JSON.stringify(agendaItems),
			attachedFiles: JSON.stringify(files.map((file) => ({ name: file.name, size: file.size }))),
			visibleTo: checked ? JSON.stringify(selectedValues) : JSON.stringify(['all']),
			actionItems: JSON.stringify(formattedActionItems), // Use data from TableSection
			incidentReports: JSON.stringify([]),
		};

		try {
			await createMeetingReport(data, user?.organization);
			setFiles([]);
			setFileNames([]);
			setSelectedValues([]);
			setTeamMembers([]);
			setAgendaItems([]);
			setActionItems([]); // Reset action items
			setFormData({
				meetingType: '',
				meetingTitle: '',
				dateTime: null,
				businessDepartment: '',
				businessLocation: '',
				meetingLocation: '',
				meetingObjective: '',
				note: '',
			});
			setChecked(false);
			toast.success('Meeting Report created successfully');
		} catch (error: any) {
			toast.error(error.response?.data?.message || 'Failed to create Meeting Report');
			console.error(error);
		}
	}, [formData, teamMembers, agendaItems, files, selectedValues, checked, actionItems]);

	const dataHeaders = [
		'Status',
		'Description',
		'Assigned To',
		'Priority',
		'Due Date',
		'Control Date',
		'Efficiency Check',
	] as const;

	const inputStyles = {
		label: { marginBottom: '5px' },
		input: { borderColor: '#ced4da', borderRadius: '4px', height: '38px' },
	};
	const textareaStyles = {
		label: { marginBottom: '5px' },
		input: { borderColor: '#ced4da', borderRadius: '4px', minHeight: '80px' },
	};
	const user = useAppSelector(selectConnectedUser);

	return (
		<Stack>
			<Text
				style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
				ff="'Roboto', sans-serif"
				fw={700}
				c='#6c757d'
				fz='18px'
			>
				Meeting Reports
			</Text>

			<Stack
				p='1em'
				style={{ backgroundColor: '#fff', border: '1px solid #e9ecef', borderRadius: '5px' }}
			>
				<Flex gap='md' wrap='wrap'>
					<Select
						label={
							<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='13px'>
								Meeting Type{' '}
								<Text c='red' span>
									*
								</Text>
							</Text>
						}
						placeholder='Select meeting type'
						data={['Team Meeting', 'Client Meeting', 'Board Meeting', 'Other']}
						value={formData.meetingType}
						onChange={(value) => handleInputChange('meetingType', value)}
						w='32%'
						styles={inputStyles}
					/>
					<TextInput
						label={
							<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='13px'>
								Meeting Title{' '}
								<Text c='red' span>
									*
								</Text>
							</Text>
						}
						placeholder='Enter meeting title'
						value={formData.meetingTitle}
						onChange={(e) => handleInputChange('meetingTitle', e.target.value)}
						w='32%'
						styles={inputStyles}
					/>
					<DateTimePicker
						label={
							<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='13px'>
								Date and Time{' '}
								<Text c='red' span>
									*
								</Text>
							</Text>
						}
						placeholder='mm/dd/yyyy'
						value={formData.dateTime}
						onChange={(value) => handleInputChange('dateTime', value)}
						w='32%'
						styles={inputStyles}
					/>
				</Flex>

				<Flex gap='md' wrap='wrap'>
					<Select
						label={
							<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='13px'>
								Business Department{' '}
								<Text c='red' span>
									*
								</Text>
							</Text>
						}
						placeholder='Select department'
						data={['Finance', 'HR', 'IT', 'Marketing', 'Operations']}
						value={formData.businessDepartment}
						onChange={(value) => handleInputChange('businessDepartment', value)}
						w='32%'
						styles={inputStyles}
					/>
					<Select
						label={
							<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='13px'>
								Business Location{' '}
								<Text c='red' span>
									*
								</Text>
							</Text>
						}
						placeholder='Select location'
						data={['New York', 'London', 'Tokyo', 'Sydney', 'Remote']}
						value={formData.businessLocation}
						onChange={(value) => handleInputChange('businessLocation', value)}
						w='32%'
						styles={inputStyles}
					/>
					<Select
						label={
							<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='13px'>
								Meeting Location{' '}
								<Text c='red' span>
									*
								</Text>
							</Text>
						}
						placeholder='Select meeting location'
						data={['Conference Room A', 'Conference Room B', 'Online', 'Client Office']}
						value={formData.meetingLocation}
						onChange={(value) => handleInputChange('meetingLocation', value)}
						w='32%'
						styles={inputStyles}
					/>
				</Flex>

				<Textarea
					label={
						<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='13px'>
							Meeting Objective{' '}
							<Text c='red' span>
								*
							</Text>
						</Text>
					}
					placeholder='Enter meeting objective'
					value={formData.meetingObjective}
					onChange={(e) => handleInputChange('meetingObjective', e.target.value)}
					styles={textareaStyles}
				/>

				<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='13px' mt='md'>
					Team Members
				</Text>
				{teamMembers.map((member, index) => (
					<Flex align='center' justify='space-between' w='100%' key={index} gap='sm'>
						<TextInput
							placeholder='Team Member Name'
							w='25%'
							value={member.name}
							onChange={(e) =>
								setTeamMembers((prev) =>
									prev.map((m, i) => (i === index ? { ...m, name: e.target.value } : m)),
								)
							}
							styles={{ input: { borderColor: '#ced4da', borderRadius: '4px', height: '38px' } }}
						/>
						<TextInput
							placeholder='Department'
							w='25%'
							value={member.department}
							onChange={(e) =>
								setTeamMembers((prev) =>
									prev.map((m, i) => (i === index ? { ...m, department: e.target.value } : m)),
								)
							}
							styles={{ input: { borderColor: '#ced4da', borderRadius: '4px', height: '38px' } }}
						/>
						<TextInput
							placeholder='Role'
							w='20%'
							value={member.role}
							onChange={(e) =>
								setTeamMembers((prev) =>
									prev.map((m, i) => (i === index ? { ...m, role: e.target.value } : m)),
								)
							}
							styles={{ input: { borderColor: '#ced4da', borderRadius: '4px', height: '38px' } }}
						/>
						<TextInput
							placeholder='Company Name'
							w='25%'
							value={member.companyName}
							onChange={(e) =>
								setTeamMembers((prev) =>
									prev.map((m, i) => (i === index ? { ...m, companyName: e.target.value } : m)),
								)
							}
							styles={{ input: { borderColor: '#ced4da', borderRadius: '4px', height: '38px' } }}
						/>
						<ActionIcon
							variant='filled'
							color='red'
							w='25px'
							h='25px'
							onClick={() => removeTeamMember(index)}
						>
							<Trash color='#fff' size='15' />
						</ActionIcon>
					</Flex>
				))}
				<Button w='150px' bg='#6c757d' onClick={addTeamMember}>
					<Text fz='12px'>Add Member</Text>
				</Button>

				<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='13px' mt='md'>
					Agenda
				</Text>
				{agendaItems.map((agenda, index) => (
					<Flex align='center' justify='space-between' w='100%' key={index} gap='sm'>
						<TextInput
							placeholder='Agenda Item'
							w='32%'
							value={agenda.agendaItem}
							onChange={(e) =>
								setAgendaItems((prev) =>
									prev.map((a, i) => (i === index ? { ...a, agendaItem: e.target.value } : a)),
								)
							}
							styles={{ input: { borderColor: '#ced4da', borderRadius: '4px', height: '38px' } }}
						/>
						<TextInput
							placeholder='Presenter'
							w='32%'
							value={agenda.presenter}
							onChange={(e) =>
								setAgendaItems((prev) =>
									prev.map((a, i) => (i === index ? { ...a, presenter: e.target.value } : a)),
								)
							}
							styles={{ input: { borderColor: '#ced4da', borderRadius: '4px', height: '38px' } }}
						/>
						<TextInput
							placeholder='Time Allocated'
							w='32%'
							value={agenda.timeAllocated}
							onChange={(e) =>
								setAgendaItems((prev) =>
									prev.map((a, i) => (i === index ? { ...a, timeAllocated: e.target.value } : a)),
								)
							}
							styles={{ input: { borderColor: '#ced4da', borderRadius: '4px', height: '38px' } }}
						/>
						<ActionIcon
							variant='filled'
							color='red'
							w='25px'
							h='25px'
							onClick={() => removeAgendaItem(index)}
						>
							<Trash color='#fff' size='15' />
						</ActionIcon>
					</Flex>
				))}
				<Button w='150px' bg='#6c757d' onClick={addAgendaItem}>
					<Text fz='12px'>Add Agenda Item</Text>
				</Button>

				<Stack mt='md'>
					<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='12px'>
						Visibility
					</Text>
					<Switch
						w='28%'
						checked={checked}
						onChange={handleSwitchChange}
						color='green'
						size='sm'
						label={
							<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='12px'>
								Customize Visibility
							</Text>
						}
						thumbIcon={
							checked ? (
								<IconCheck size={12} color='var(--mantine-color-teal-5)' stroke={3} />
							) : (
								<IconX size={12} color='var(--mantine-color-red-6)' stroke={3} />
							)
						}
					/>
					<MultiSelect
						label={
							<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='12px'>
								Visible To
							</Text>
						}
						placeholder='Pick value'
						data={usersList.map((user) => ({ value: user._id, label: user.name }))}
						value={selectedValues}
						onChange={setSelectedValues}
						clearable
						w='50%'
						disabled={!checked}
						withCheckIcon={false}
						styles={inputStyles}
					/>
					<Textarea
						label={
							<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='12px'>
								Note
							</Text>
						}
						placeholder='Enter note'
						value={formData.note}
						onChange={(e) => handleInputChange('note', e.target.value)}
						w='50%'
						styles={textareaStyles}
					/>
					<Text ff="'Roboto', sans-serif" fw={600} c='#6c757d' fz='12px'>
						Attach Files
					</Text>
					<FileInput
						placeholder={fileNames.length > 0 ? fileNames.join(', ') : 'No file chosen'}
						multiple
						value={files}
						onChange={handleFileChange}
						rightSection={<Folder2 size='25' color='#868e96' variant='Bold' />}
						w='50%'
						styles={inputStyles}
					/>
					<Table>
						<Table.Thead>
							<Table.Tr>
								<Table.Th fz='13px' c='#6c757d'>
									Image
								</Table.Th>
								<Table.Th fz='13px' c='#6c757d'>
									File Name
								</Table.Th>
								<Table.Th fz='13px' c='#6c757d'>
									Size
								</Table.Th>
								<Table.Th fz='13px' c='#6c757d'>
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
									<Table.Td fz='13px' c='#6c757d'>
										{file.name}
									</Table.Td>
									<Table.Td fz='13px' c='#6c757d'>
										{(file.size / 1024).toFixed(2)} KB
									</Table.Td>
									<Table.Td>
										<ActionIcon
											variant='filled'
											color='red'
											w='25px'
											h='25px'
											onClick={() => removeFile(index)}
										>
											<Trash color='#fff' size='15' />
										</ActionIcon>
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
					<TableSection isAddItems={false} onSubmit={handleActionItemsSubmit} data={dataHeaders} />
				</Stack>
				<Flex justify='end'>
					<Button bg='#0d6efd' onClick={handleFormSubmit}>
						Submit Meeting
					</Button>
				</Flex>
			</Stack>
		</Stack>
	);
};

export default AddlMeetingReport;
