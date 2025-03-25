import React, { useState, useCallback, useEffect } from 'react';
import {
	Modal,
	Stack,
	Flex,
	Text,
	Select,
	TextInput,
	Textarea,
	Switch,
	MultiSelect,
	FileInput,
	Table,
	Button,
	ActionIcon,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Folder2, FolderOpen, Trash } from 'iconsax-react';
import TableSection from '@/presentation/tablesection/TableSection';
import toast from 'react-hot-toast';
import { updateMeetingReport } from '@/core/services/modulesServices/meetingreport.service';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import { DateTimePicker } from '@mantine/dates';

// Types
type FormData = {
	meetingType: string;
	meetingTitle: string;
	dateTime: Date | null;
	businessDepartment: string;
	businessLocation: string;
	meetingLocation: string;
	meetingObjective: string;
	note: string;
};

type TeamMember = { name: string; department: string; role: string; companyName: string };
type AgendaItem = { agendaItem: string; presenter: string; timeAllocated: string };
type ActionItem = {
	Status: string;
	Description: string;
	'Assigned To': string;
	Priority: string;
	'Due Date': string;
	'Control Date': string;
	'Efficiency Check': string;
};
type AttachedFile = { name: string; size: number }; // Type for attachedFiles from dataMeeting
type VueandEditModelProps = {
	issView: boolean;
	open: boolean;
	onClose: () => void;
	isEdit: boolean;
	dataMeeting: any;
	getdata: () => void;
};

// Constants
const INPUT_STYLES = {
	label: { marginBottom: '5px' },
	input: { borderColor: '#ced4da', borderRadius: '4px', height: '38px' },
};
const TEXTAREA_STYLES = { ...INPUT_STYLES, input: { ...INPUT_STYLES.input, minHeight: '80px' } };
const DATA_HEADERS = [
	'Status',
	'Description',
	'Assigned To',
	'Priority',
	'Due Date',
	'Control Date',
	'Efficiency Check',
] as const;

const VueandEditModel: React.FC<VueandEditModelProps> = ({
	open,
	onClose,
	issView,
	dataMeeting,
	getdata,
}) => {
	const user = useAppSelector(selectConnectedUser);
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
	const [checked, setChecked] = useState(false);
	const [selectedValues, setSelectedValues] = useState<string[]>([]);
	const [files, setFiles] = useState<File[]>([]);
	const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]); // State for pre-existing files from dataMeeting
	const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
	const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
	const [actionItems, setActionItems] = useState<ActionItem[]>([]);

	// Initialize form data when dataMeeting changes
	useEffect(() => {
		if (dataMeeting) {
			setFormData({
				meetingType: dataMeeting.meetingType || '',
				meetingTitle: dataMeeting.meetingTitle || '',
				dateTime: dataMeeting.dateTime ? new Date(dataMeeting.dateTime) : null,
				businessDepartment: dataMeeting.businessDepartment || '',
				businessLocation: dataMeeting.businessLocation || '',
				meetingLocation: dataMeeting.meetingLocation || '',
				meetingObjective: dataMeeting.meetingObjective || '',
				note: dataMeeting.notes || '',
			});
			setChecked(dataMeeting.visibleTo && dataMeeting.visibleTo[0] !== 'all');
			setSelectedValues(
				dataMeeting.visibleTo && dataMeeting.visibleTo[0] !== 'all' ? dataMeeting.visibleTo : [],
			);
			setTeamMembers(dataMeeting.attendees || []);
			setAgendaItems(dataMeeting.agenda || []);
			setAttachedFiles(dataMeeting.attachedFiles || []); // Set pre-existing attached files
			setFiles([]); // New files to be uploaded
			setActionItems(dataMeeting.actionItems || []); // Assuming actionItems might be present
		}
	}, [dataMeeting]);

	const updateForm = useCallback(
		(field: keyof FormData, value: any) => setFormData((p) => ({ ...p, [field]: value })),
		[],
	);
	const toggleSwitch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(e.target.checked);
		if (!e.target.checked) setSelectedValues([]);
	}, []);
	const handleFiles = useCallback(
		(newFiles: File[] | null) => setFiles((p) => (newFiles ? [...p, ...newFiles] : [])),
		[],
	);
	const removeFile = useCallback(
		(index: number) => setFiles((p) => p.filter((_, i) => i !== index)),
		[],
	);
	const removeAttachedFile = useCallback(
		(index: number) => setAttachedFiles((p) => p.filter((_, i) => i !== index)),
		[],
	); // Remove pre-existing file
	const addItem = useCallback(
		<T,>(setFn: React.Dispatch<React.SetStateAction<T[]>>, defaultItem: T) =>
			setFn((p) => [...p, defaultItem]),
		[],
	);
	const removeItem = useCallback(
		<T,>(setFn: React.Dispatch<React.SetStateAction<T[]>>, index: number) =>
			setFn((p) => p.filter((_, i) => i !== index)),
		[],
	);
	const updateItem = useCallback(
		<T,>(
			setFn: React.Dispatch<React.SetStateAction<T[]>>,
			index: number,
			key: keyof T,
			value: string,
		) => setFn((p) => p.map((item, i) => (i === index ? { ...item, [key]: value } : item))),
		[],
	);

	const handleSubmit = useCallback(async () => {
		const formattedActionItems = actionItems.map((item) => ({
			status: item.Status || 'Pending',
			description: item.Description || '',
			assignedPerson: item['Assigned To'] || '',
			priority: item.Priority || '',
			targetDate: item['Due Date'] || '',
			controlDate: item['Control Date'] || 'N/A',
			efficiencyCheck: item['Efficiency Check'] || 'N/A',
		}));

		const data = {
			...formData,
			dateTime: formData.dateTime?.toISOString() || new Date().toISOString(),
			attendees: JSON.stringify(teamMembers),
			agenda: JSON.stringify(agendaItems),
			attachedFiles: JSON.stringify([
				...attachedFiles,
				...files.map((f) => ({ name: f.name, size: f.size })),
			]), // Combine existing and new files
			visibleTo: JSON.stringify(checked ? selectedValues : ['all']),
			actionItems: JSON.stringify(formattedActionItems),
			incidentReports: JSON.stringify([]),
			notes: formData.note,
		};
		try {
			await updateMeetingReport(data, user?.organization, dataMeeting?.id);
			toast.success('Meeting Report created successfully');
			getdata();
			onClose();
		} catch (error: any) {
			toast.error(error.response?.data?.message || 'Failed to create Meeting Report');
			console.error(error);
		}
	}, [
		formData,
		teamMembers,
		agendaItems,
		files,
		attachedFiles,
		selectedValues,
		checked,
		actionItems,
		user,
	]);

	return (
		<Modal
			opened={open}
			onClose={onClose}
			title={
				<Text fw={700} c='#6c757d' fz='18px'>
					{' '}
					{issView ? 'View Meeting Report' : 'Update Meeting Report'}
				</Text>
			}
			fullScreen
			radius={0}
			transitionProps={{ transition: 'fade', duration: 200 }}
		>
			<Stack
				p='1em'
				style={{ backgroundColor: '#fff', border: '1px solid #e9ecef', borderRadius: '5px' }}
			>
				<Flex gap='md' wrap='wrap'>
					<Select
						disabled={issView}
						label='Meeting Type *'
						placeholder='Select type'
						data={['Team Meeting', 'Client Meeting', 'Board Meeting', 'Other']}
						value={formData.meetingType}
						onChange={(v) => updateForm('meetingType', v)}
						w='32%'
						styles={INPUT_STYLES}
					/>
					<TextInput
						disabled={issView}
						label='Meeting Title *'
						placeholder='Enter title'
						value={formData.meetingTitle}
						onChange={(e) => updateForm('meetingTitle', e.target.value)}
						w='32%'
						styles={INPUT_STYLES}
					/>
					<DateTimePicker
						disabled={issView}
						label='Date and Time *'
						placeholder='mm/dd/yyyy'
						value={formData.dateTime}
						onChange={(v) => updateForm('dateTime', v)}
						w='32%'
						styles={INPUT_STYLES}
					/>
				</Flex>
				<Flex gap='md' wrap='wrap'>
					<Select
						disabled={issView}
						label='Business Department *'
						placeholder='Select department'
						data={['Finance', 'HR', 'IT', 'Marketing', 'Operations']}
						value={formData.businessDepartment}
						onChange={(v) => updateForm('businessDepartment', v)}
						w='32%'
						styles={INPUT_STYLES}
					/>
					<Select
						disabled={issView}
						label='Business Location *'
						placeholder='Select location'
						data={['New York', 'London', 'Tokyo', 'Sydney', 'Remote']}
						value={formData.businessLocation}
						onChange={(v) => updateForm('businessLocation', v)}
						w='32%'
						styles={INPUT_STYLES}
					/>
					<Select
						disabled={issView}
						label='Meeting Location *'
						placeholder='Select location'
						data={['Conference Room A', 'Conference Room B', 'Online', 'Client Office']}
						value={formData.meetingLocation}
						onChange={(v) => updateForm('meetingLocation', v)}
						w='32%'
						styles={INPUT_STYLES}
					/>
				</Flex>
				<Textarea
					disabled={issView}
					label='Meeting Objective *'
					placeholder='Enter objective'
					value={formData.meetingObjective}
					onChange={(e) => updateForm('meetingObjective', e.target.value)}
					styles={TEXTAREA_STYLES}
				/>

				<Text fw={600} c='#6c757d' fz='13px' mt='md'>
					Team Members
				</Text>
				{teamMembers.map((m, i) => (
					<Flex key={i} gap='sm' align='center'>
						<TextInput
							disabled={issView}
							placeholder='Name'
							w='25%'
							value={m.name}
							onChange={(e) => updateItem(setTeamMembers, i, 'name', e.target.value)}
							styles={INPUT_STYLES}
						/>
						<TextInput
							disabled={issView}
							placeholder='Department'
							w='25%'
							value={m.department}
							onChange={(e) => updateItem(setTeamMembers, i, 'department', e.target.value)}
							styles={INPUT_STYLES}
						/>
						<TextInput
							disabled={issView}
							placeholder='Role'
							w='20%'
							value={m.role}
							onChange={(e) => updateItem(setTeamMembers, i, 'role', e.target.value)}
							styles={INPUT_STYLES}
						/>
						<TextInput
							disabled={issView}
							placeholder='Company'
							w='25%'
							value={m.companyName}
							onChange={(e) => updateItem(setTeamMembers, i, 'companyName', e.target.value)}
							styles={INPUT_STYLES}
						/>
						<ActionIcon
							disabled={issView}
							color='red'
							onClick={() => removeItem(setTeamMembers, i)}
						>
							<Trash size='15' />
						</ActionIcon>
					</Flex>
				))}
				<Button
					disabled={issView}
					w='150px'
					bg='#6c757d'
					onClick={() =>
						addItem(setTeamMembers, { name: '', department: '', role: '', companyName: '' })
					}
				>
					<Text fz='12px'>Add Member</Text>
				</Button>

				<Text fw={600} c='#6c757d' fz='13px' mt='md'>
					Agenda
				</Text>
				{agendaItems.map((a, i) => (
					<Flex key={i} gap='sm' align='center'>
						<TextInput
							disabled={issView}
							placeholder='Item'
							w='32%'
							value={a.agendaItem}
							onChange={(e) => updateItem(setAgendaItems, i, 'agendaItem', e.target.value)}
							styles={INPUT_STYLES}
						/>
						<TextInput
							disabled={issView}
							placeholder='Presenter'
							w='32%'
							value={a.presenter}
							onChange={(e) => updateItem(setAgendaItems, i, 'presenter', e.target.value)}
							styles={INPUT_STYLES}
						/>
						<TextInput
							disabled={issView}
							placeholder='Time'
							w='32%'
							value={a.timeAllocated}
							onChange={(e) => updateItem(setAgendaItems, i, 'timeAllocated', e.target.value)}
							styles={INPUT_STYLES}
						/>
						<ActionIcon
							disabled={issView}
							color='red'
							onClick={() => removeItem(setAgendaItems, i)}
						>
							<Trash size='15' />
						</ActionIcon>
					</Flex>
				))}
				<Button
					disabled={issView}
					w='150px'
					bg='#6c757d'
					onClick={() =>
						addItem(setAgendaItems, { agendaItem: '', presenter: '', timeAllocated: '' })
					}
				>
					<Text fz='12px'>Add Agenda Item</Text>
				</Button>

				<Stack mt='md'>
					<Switch
						disabled={issView}
						checked={checked}
						onChange={toggleSwitch}
						label='Customize Visibility'
						color='green'
						size='sm'
						thumbIcon={checked ? <IconCheck size={12} /> : <IconX size={12} />}
					/>
					<MultiSelect
						label='Visible To'
						placeholder='Pick value'
						data={[]}
						value={selectedValues}
						onChange={setSelectedValues}
						disabled={!checked}
						w='50%'
						styles={INPUT_STYLES}
					/>
					<Textarea
						disabled={issView}
						label='Note'
						placeholder='Enter note'
						value={formData.note}
						onChange={(e) => updateForm('note', e.target.value)}
						w='50%'
						styles={TEXTAREA_STYLES}
					/>
					<FileInput
						disabled={issView}
						label='Attach Files'
						placeholder={files.length ? files.map((f) => f.name).join(', ') : 'No file chosen'}
						multiple
						value={files}
						onChange={handleFiles}
						w='50%'
						styles={INPUT_STYLES}
						rightSection={<Folder2 size='25' color='#868e96' />}
					/>
					<Table>
						<Table.Thead>
							<Table.Tr>
								{['Image', 'File Name', 'Size', 'Action'].map((h) => (
									<Table.Th key={h} fz='13px' c='#6c757d'>
										{h}
									</Table.Th>
								))}
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{/* Render pre-existing attached files */}
							{attachedFiles.map((f, i) => (
								<Table.Tr key={`attached-${f.name}-${i}`}>
									<Table.Td>
										{f.name.toLowerCase().match(/\.(jpg|jpeg|png|gif)$/) && <Text>Image</Text>}
									</Table.Td>
									<Table.Td>{f.name}</Table.Td>
									<Table.Td>{(f.size / 1024).toFixed(2)} KB</Table.Td>
									<Table.Td>
										<ActionIcon
											disabled={issView}
											color='red'
											onClick={() => removeAttachedFile(i)}
										>
											<Trash size='15' />
										</ActionIcon>
									</Table.Td>
								</Table.Tr>
							))}
							{/* Render newly uploaded files */}
							{files.map((f, i) => (
								<Table.Tr key={`new-${f.name}-${i}`}>
									<Table.Td>
										{f.type.startsWith('image/') && (
											<img
												src={URL.createObjectURL(f)}
												alt={f.name}
												style={{ width: '50px', height: '50px', objectFit: 'cover' }}
											/>
										)}
									</Table.Td>
									<Table.Td>{f.name}</Table.Td>
									<Table.Td>{(f.size / 1024).toFixed(2)} KB</Table.Td>
									<Table.Td>
										<ActionIcon disabled={issView} color='red' onClick={() => removeFile(i)}>
											<Trash size='15' />
										</ActionIcon>
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
					<TableSection
						isAddItems={false}
						onSubmit={(data) => setActionItems(data.flatMap((s: any) => s.items))}
						data={DATA_HEADERS}
					/>
				</Stack>
				<Flex justify='end' gap={'1em'}>
					{!issView && (
						<Button bg='#4254ba' onClick={handleSubmit}>
							Update Meeting
						</Button>
					)}
					<Button bg='#17a497' leftSection={<FolderOpen size='22' variant='Bold' />}>
						Print Report
					</Button>
				</Flex>
			</Stack>
		</Modal>
	);
};

export default VueandEditModel;
