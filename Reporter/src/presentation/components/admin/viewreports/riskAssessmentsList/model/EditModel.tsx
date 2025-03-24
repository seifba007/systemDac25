import { updateIncidentReporting } from '@/core/services/modulesServices/incidentreporting.service';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import { Button, Grid, Group, Modal, MultiSelect, Stack, Switch, Table, Text } from '@mantine/core';
import React, {
	useCallback,
	useMemo,
	useState,
	CSSProperties,
	ChangeEvent,
	useEffect,
} from 'react';
import TableRisk from '../../../incidentreporting/addlIncidentReporting/TableRisk';
import { IconCheck, IconX } from '@tabler/icons-react';
import toast from 'react-hot-toast';

interface Props {
	opened: boolean;
	onClose: () => void;
	getdatainc: () => void;
	data: any;
	visble: boolean;
}

interface InputStyles {
	input: CSSProperties;
	inputFocus: CSSProperties;
	select: CSSProperties;
	textarea: CSSProperties;
	label: CSSProperties;
	required: CSSProperties;
	fileButton: CSSProperties;
	fileInputWrapper: CSSProperties;
}

const inputStyles: InputStyles = {
	input: {
		backgroundColor: '#fff',
		border: '1px solid #ced4da',
		borderRadius: '4px',
		padding: '8px 12px',
		fontSize: '14px',
		color: '#333',
		width: '100%',
		transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
	},
	inputFocus: {
		borderColor: '#007bff',
		boxShadow: '0 0 5px rgba(0, 123, 255, 0.3)',
		outline: 'none',
	},
	select: {
		backgroundColor: '#fff',
		border: '1px solid #ced4da',
		borderRadius: '4px',
		padding: '8px 12px',
		fontSize: '14px',
		color: '#333',
		width: '100%',
		appearance: 'none',
		backgroundImage:
			'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 20 20%27 fill=%27%236c757d%27%3E%3Cpath d=%27M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z%27/%3E%3C/svg%3E")',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'right 12px center',
		backgroundSize: '12px',
	},
	textarea: {
		backgroundColor: '#fff',
		border: '1px solid #ced4da',
		borderRadius: '4px',
		padding: '8px 12px',
		fontSize: '14px',
		color: '#333',
		width: '100%',
		minHeight: '100px',
		resize: 'vertical',
	},
	label: { fontSize: '14px', color: '#6c757d', marginBottom: '6px', display: 'block' },
	required: { color: 'red' },
	fileButton: {
		display: 'inline-block',
		padding: '8px 16px',
		backgroundColor: '#007bff',
		color: '#fff',
		borderRadius: '4px',
		fontSize: '14px',
		cursor: 'pointer',
		border: 'none',
		transition: 'background-color 0.2s ease',
	},
	fileInputWrapper: { position: 'relative' as const, display: 'inline-block' },
};

interface FormState {
	checked: boolean;
	visibleTo: string[]; // Store as array of ids
	files: File[];
	reportClassification: string;
	reportType: string;
	dateTime: string;
	incidentSite: string;
	siteName: string;
	businessDepartment: string;
	client: string;
	projectID: string;
	location: string;
	contractorInvolved: string;
	equipmentInvolved: string;
	equipmentName: string;
	reportTitle: string;
	reportDescription: string;
	likelihood: string;
	severity: string;
}

const EditModel: React.FC<Props> = ({ opened, data, onClose, visble, getdatainc }) => {
	const user = useAppSelector(selectConnectedUser);
	const [state, setState] = useState<FormState>({
		checked: false,
		visibleTo: [],
		files: [],
		reportClassification: '',
		reportType: '',
		dateTime: '',
		incidentSite: '',
		siteName: '',
		businessDepartment: '',
		client: '',
		projectID: '',
		location: '',
		contractorInvolved: '',
		equipmentInvolved: '',
		equipmentName: '',
		reportTitle: '',
		reportDescription: '',
		likelihood: '',
		severity: '',
	});

	const updateState = (updates: Partial<FormState>) =>
		setState((prev) => ({ ...prev, ...updates }));

	// Populate state with data when it changes
	useEffect(() => {
		if (data) {
			setState({
				checked:
					data.visibleTo &&
					data.visibleTo.length > 0 &&
					!data.visibleTo.some((item: { Fullname: string }) => item.Fullname === 'all'),
				visibleTo: data.visibleTo?.map((item: { id: string }) => item.id) || [], // Extract ids
				files: data.attachedFiles || [],
				reportClassification: data.reportClassification || '',
				reportType: data.reportType || '',
				dateTime: data.dateTime?.$date
					? new Date(data.dateTime.$date).toISOString().slice(0, 16)
					: '',
				incidentSite: data.incidentSite || '',
				siteName: data.siteName || '',
				businessDepartment: data.businessDepartment || '',
				client: data.client || '',
				projectID: data.projectID || '',
				location: data.location || '',
				contractorInvolved: data.contractorInvolved ? 'Yes' : 'No',
				equipmentInvolved: data.equipmentInvolved || '',
				equipmentName: data.equipmentName || '',
				reportTitle: data.reportTitle || '',
				reportDescription: data.reportDescription || '',
				likelihood: data.likelihood
					? `${data.likelihood} (${
							['Very Low', 'Low', 'Moderate', 'High', 'Very High'].indexOf(data.likelihood) + 1
					  })`
					: '',
				severity: data.severity
					? `${
							['Minor', 'Moderate', 'Serious', 'Major', 'Catastrophic'][parseInt(data.severity) - 1]
					  } (${data.severity})`
					: '',
			});
		}
	}, [data]);

	const handleSwitchChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) =>
			updateState({
				checked: e.target.checked,
				visibleTo: e.target.checked ? state.visibleTo : [],
			}),
		[state.visibleTo],
	);
	const handleFileChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) =>
			e.target.files && updateState({ files: [...state.files, ...Array.from(e.target.files)] }),
		[state.files],
	);
	const handleRemoveFile = useCallback(
		(index: number) => updateState({ files: state.files.filter((_, i) => i !== index) }),
		[state.files],
	);
	const handleRiskCellClick = useCallback(
		(likelihood: string, severity: string) => updateState({ likelihood, severity }),
		[],
	);

	const staticData = useMemo(
		() => ({
			multiSelect: (data?.visibleTo || []).map((item: { id: string; Fullname: string }) => ({
				value: item.id,
				label: item.Fullname,
			})), // Use id as value, Fullname as label
			reportClassification: ['HSE', 'Both'],
			reportType: ['Accident/Non Compliance', 'Environment'],
			incidentSite: ['Field Location', 'Office', 'Warehouse'],
			businessDepartment: ['Operations', 'Development', 'Management'],
			client: ['Client A', 'Client B', 'Client C'],
			location: ['Location A', 'Location B', 'Location C'],
			contractor: ['Yes', 'No'],
			equipment: ['SmartDac', '3rd Party', 'None'],
			equipmentName: ['Equipment A', 'Equipment B', 'None'],
			likelihoodSeverity: ['Very Low (1)', 'Low (2)', 'Moderate (3)', 'High (4)', 'Very High (5)'],
			severityOfEvent: [
				'Minor (1)',
				'Moderate (2)',
				'Serious (3)',
				'Major (4)',
				'Catastrophic (5)',
			],
		}),
		[data?.visibleTo],
	);

	const tableRows = useMemo(
		() =>
			state.files.map((file, index) => (
				<Table.Tr key={file.name}>
					<Table.Td>
						{file.type?.startsWith('image/') && (
							<img
								src={URL.createObjectURL(file)}
								alt={file.name}
								style={{ width: '50px', height: '50px', objectFit: 'cover' }}
							/>
						)}
					</Table.Td>
					<Table.Td fz='13px' c='rgb(34 34 34 / 58%)'>
						{file.name}
					</Table.Td>
					<Table.Td fz='13px' c='rgb(34 34 34 / 58%)'>
						{(file.size / 1024).toFixed(2)} KB
					</Table.Td>
					<Table.Td>
						<Button variant='subtle' color='red' onClick={() => handleRemoveFile(index)} fz='13px'>
							Remove
						</Button>
					</Table.Td>
				</Table.Tr>
			)),
		[state.files, handleRemoveFile],
	);

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			const dataToSubmit = {
				...state,
				dateTime: state.dateTime || new Date().toISOString(),
				client: state.client || null,
				projectID: state.projectID || null,
				location: state.location || null,
				equipmentName: state.equipmentName || null,
				likelihood: state.likelihood.split(' (')[0] || '',
				severity: state.severity.split(' ')[1]?.replace('(', '').replace(')', '') || '',
				visibleTo: state.checked ? state.visibleTo : ['all'], // Send as raw array
				attachedFiles: JSON.stringify(
					state.files.map((file) => ({ name: file.name, size: file.size })),
				),
			};

			try {
				await updateIncidentReporting(dataToSubmit, data._id, user?.organization);
				toast.success('Updated Incident Report created');
				getdatainc();
				onClose();
			} catch (error) {
				toast.error('Failed to create Incident Report');
				console.error(error);
			}
		},
		[state, user?.organization, data._id, getdatainc, onClose],
	);

	const inputProps = (key: keyof FormState, type: string = 'text', placeholder?: string) => ({
		type,
		style: inputStyles.input,
		value: state[key] as string,
		onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			updateState({ [key]: e.target.value }),
		onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			Object.assign(e.target.style, inputStyles.inputFocus),
		onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' }),
		placeholder,
	});

	const selectProps = (key: keyof FormState, options: string[]) => ({
		style: inputStyles.select,
		value: state[key] as string,
		onChange: (e: ChangeEvent<HTMLSelectElement>) => updateState({ [key]: e.target.value }),
		onFocus: (e: React.FocusEvent<HTMLSelectElement>) =>
			Object.assign(e.target.style, inputStyles.inputFocus),
		onBlur: (e: React.FocusEvent<HTMLSelectElement>) =>
			Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' }),
		children: [
			<option key='' value=''>
				Select {key}
			</option>,
			...options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			)),
		],
	});

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={visble ? 'View Incident Report' : 'Edit Incident Report'}
			fullScreen
			radius={0}
			transitionProps={{ transition: 'fade', duration: 200 }}
		>
			<Stack>
				<Group justify='space-between' align='center'>
					<Text ff='"Roboto", sans-serif' fw={700} c='#6c757d' fz='18px'>
						Incident Reporting
					</Text>
					<Text fz='sm' c='#6c757d'>
						Report Reference: {data?.reportReference || '[Reference Number]'}
					</Text>
				</Group>
				<Stack
					p='1em'
					style={{ backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px' }}
				>
					<form onSubmit={handleSubmit}>
						<Grid>
							<Grid.Col span={4}>
								<label style={inputStyles.label}>
									<span style={inputStyles.required}>*</span> Report Classification
								</label>
								<select
									disabled={visble}
									{...selectProps('reportClassification', staticData.reportClassification)}
								/>
							</Grid.Col>
							<Grid.Col span={4}>
								<label style={inputStyles.label}>
									<span style={inputStyles.required}>*</span> Report Type
								</label>
								<select disabled={visble} {...selectProps('reportType', staticData.reportType)} />
							</Grid.Col>
							<Grid.Col span={4}>
								<label style={inputStyles.label}>Date and Time</label>
								<input disabled={visble} {...inputProps('dateTime', 'datetime-local')} />
							</Grid.Col>
						</Grid>
						<Grid>
							<Grid.Col span={4}>
								<label style={inputStyles.label}>
									<span style={inputStyles.required}>*</span> Incident Site
								</label>
								<select
									disabled={visble}
									{...selectProps('incidentSite', staticData.incidentSite)}
								/>
							</Grid.Col>
							<Grid.Col span={4}>
								<label style={inputStyles.label}>
									<span style={inputStyles.required}>*</span> Site Name
								</label>
								<input disabled={visble} {...inputProps('siteName', 'text', 'Site Name')} />
							</Grid.Col>
							<Grid.Col span={4}>
								<label style={inputStyles.label}>
									<span style={inputStyles.required}>*</span> Business Department
								</label>
								<select
									disabled={visble}
									{...selectProps('businessDepartment', staticData.businessDepartment)}
								/>
							</Grid.Col>
						</Grid>
						<Grid>
							<Grid.Col span={4}>
								<label style={inputStyles.label}>Client</label>
								<select disabled={visble} {...selectProps('client', staticData.client)} />
							</Grid.Col>
							<Grid.Col span={4}>
								<label style={inputStyles.label}>Project ID</label>
								<input disabled={visble} {...inputProps('projectID', 'text', 'Enter Project ID')} />
							</Grid.Col>
						</Grid>
						<Grid>
							<Grid.Col span={4}>
								<label style={inputStyles.label}>Location</label>
								<select disabled={visble} {...selectProps('location', staticData.location)} />
							</Grid.Col>
							<Grid.Col span={4}>
								<label style={inputStyles.label}>
									<span style={inputStyles.required}>*</span> Contractor Involved
								</label>
								<select
									disabled={visble}
									{...selectProps('contractorInvolved', staticData.contractor)}
								/>
							</Grid.Col>
							<Grid.Col span={4}>
								<label style={inputStyles.label}>Equipment Involved</label>
								<select
									disabled={visble}
									{...selectProps('equipmentInvolved', staticData.equipment)}
								/>
							</Grid.Col>
							<Grid.Col span={4}>
								<label style={inputStyles.label}>Equipment Name</label>
								<select
									disabled={visble}
									{...selectProps('equipmentName', staticData.equipmentName)}
								/>
							</Grid.Col>
						</Grid>
						<div>
							<label style={inputStyles.label}>
								<span style={inputStyles.required}>*</span> Report Title
							</label>
							<input disabled={visble} {...inputProps('reportTitle', 'text', 'Report Title')} />
						</div>
						<div>
							<label style={inputStyles.label}>
								<span style={inputStyles.required}>*</span> Report Description
							</label>
							<textarea
								disabled={visble}
								{...inputProps('reportDescription', 'text', 'Enter report description')}
							/>
						</div>
						<Stack gap='xs'>
							<Group align='center'>
								<Switch
									disabled={visble}
									checked={state.checked}
									onChange={handleSwitchChange}
									onLabel={<IconCheck size={16} />}
									offLabel={<IconX size={16} />}
								/>
								<Text fz='sm' c='#6c757d'>
									CUSTOMIZE VISIBILITY
								</Text>
							</Group>
							<MultiSelect
								label={
									<Text fz='sm' c='#6c757d'>
										Visible To
									</Text>
								}
								placeholder='Select users'
								data={staticData.multiSelect} // Array of { value: id, label: Fullname }
								value={state.visibleTo} // Array of selected ids
								onChange={(visibleTo: string[]) => updateState({ visibleTo })}
								disabled={!state.checked || visble}
								styles={{
									input: {
										backgroundColor: '#fff',
										border: '1px solid #ced4da',
										borderRadius: '4px',
									},
									label: { marginBottom: '8px' },
								}}
							/>
							<Text fz='xs' c='#6c757d'>
								When the toggle is OFF, the report is visible to all users.
							</Text>
						</Stack>
						<Stack gap='xs'>
							<div style={inputStyles.fileInputWrapper}>
								<label style={inputStyles.label}>ATTACH FILES</label>
								<label style={inputStyles.fileButton} htmlFor='file-upload'>
									Choose Files
								</label>
								<input
									disabled={visble}
									id='file-upload'
									type='file'
									multiple
									style={{ ...inputStyles.input, display: 'none' }}
									onChange={handleFileChange}
									onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
										Object.assign(e.target.style, inputStyles.inputFocus)
									}
									onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
										Object.assign(e.target.style, { borderColor: '#ced4da', boxShadow: 'none' })
									}
								/>
								<Text fz='xs' c='#6c757d' mt='4px'>
									{state.files.length > 0
										? `${state.files.length} file(s) selected`
										: 'No files chosen'}
								</Text>
							</div>
							{state.files.length > 0 && (
								<Table>
									<Table.Thead>
										<Table.Tr>
											<Table.Th>Preview</Table.Th>
											<Table.Th>File Name</Table.Th>
											<Table.Th>File Size</Table.Th>
											<Table.Th>Action</Table.Th>
										</Table.Tr>
									</Table.Thead>
									<Table.Tbody>{tableRows}</Table.Tbody>
								</Table>
							)}
						</Stack>
						<Grid>
							<Grid.Col span={6}>
								<label style={inputStyles.label}>
									<span style={inputStyles.required}>*</span> Likelihood of the Event
								</label>
								<select
									disabled={visble}
									{...selectProps('likelihood', staticData.likelihoodSeverity)}
								/>
							</Grid.Col>
							<Grid.Col span={6}>
								<label style={inputStyles.label}>
									<span style={inputStyles.required}>*</span> Severity of the Event
								</label>
								<select
									disabled={visble}
									{...selectProps('severity', staticData.severityOfEvent)}
								/>
							</Grid.Col>
						</Grid>
						{!visble ? (
							<Button
								type='submit'
								mt='md'
								bg='#007bff'
								style={{ color: '#fff', borderRadius: '4px' }}
							>
								Submit
							</Button>
						) : null}
					</form>
					<TableRisk
						likelihood={state.likelihood}
						severity={state.severity}
						onCellClick={handleRiskCellClick}
					/>
				</Stack>
			</Stack>
		</Modal>
	);
};

export default EditModel;
