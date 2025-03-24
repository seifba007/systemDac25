import React, { useState, useEffect, useCallback } from 'react';
import {
	Modal,
	Stack,
	Flex,
	Text,
	TextInput,
	Textarea,
	Select,
	Button,
	ActionIcon,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import RiskAssessmentTable from './RiskAssessmentTable';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import { updateRiskAssessment } from '@/core/services/modulesServices/riskassessment.service';
import * as XLSX from 'xlsx'; // Import xlsx library

// Define interfaces for TypeScript
interface TeamMember {
	name: string;
	department: string;
	role: string;
	companyName: string;
}

interface RiskAssessmentRow {
	activitySteps: string;
	hazardDescription: string;
	likelihood: string;
	lossCategory: string;
	mitigationMeasures: string;
	preventionMeasures: string;
	residualLikelihood: string;
	residualSeverity: string;
	severity: string;
}

interface FormData {
	assessmentTitle: string;
	projectID: string;
	client: string;
	assessmentDate: string;
	assessmentOverview: string;
	assessmentStatus: string;
	businessDepartment: string;
	location: string;
}

interface ModelAddRiskProps {
	open: boolean;
	onClose: () => void;
	data: any;
	getdata: () => void;
	isview: boolean;
}

const ModelAddRisk: React.FC<ModelAddRiskProps> = ({ open, onClose, isview, data, getdata }) => {
	const user = useAppSelector(selectConnectedUser);

	const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
	const [formData, setFormData] = useState<FormData>({
		assessmentTitle: '',
		projectID: '',
		client: '',
		assessmentDate: '',
		assessmentOverview: '',
		assessmentStatus: '',
		businessDepartment: '',
		location: '',
	});
	const [riskAssessmentRows, setRiskAssessmentRows] = useState<RiskAssessmentRow[]>([]);

	// Initialize state with data when it changes
	useEffect(() => {
		if (data) {
			const mappedTeamMembers = (data.assessmentTeam || []).map((member: any) => ({
				name: member.name || '',
				department: member.department || '',
				role: member.role || '',
				companyName: member.company || '',
			}));
			setTeamMembers(mappedTeamMembers);

			setFormData({
				assessmentTitle: data?.assessmentTitle || '',
				projectID: data?.projectID || '',
				client: data?.client || '',
				assessmentDate: data?.assessmentDate
					? new Date(data.assessmentDate)?.toISOString()?.slice(0, 16)
					: '',
				assessmentOverview: data.assessmentOverview || '',
				assessmentStatus: data.assessmentStatus || '',
				businessDepartment: data.businessDepartment || '',
				location: data.location || '',
			});

			setRiskAssessmentRows(data.riskAssessment || []);
		}
	}, [data]);

	const updateForm = useCallback((field: keyof FormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	}, []);

	const addTeamMember = useCallback(() => {
		setTeamMembers((prev) => [...prev, { name: '', department: '', role: '', companyName: '' }]);
	}, []);

	const removeTeamMember = useCallback((index: number) => {
		setTeamMembers((prev) => prev.filter((_, i) => i !== index));
	}, []);
	const [fileName, setFileName] = useState<string>('No file chosen'); // State to display selected file name

	const handleRowsChange = useCallback((updatedRows: RiskAssessmentRow[]) => {
		setRiskAssessmentRows(updatedRows);
	}, []);

	const handleFormSubmit = async () => {
		const payload = {
			assessmentTitle: formData.assessmentTitle,
			projectID: formData.projectID,
			client: formData.client,
			assessmentDate: formData.assessmentDate || new Date()?.toISOString(),
			location: formData.location,
			businessDepartment: formData.businessDepartment,
			assessmentOverview: formData.assessmentOverview,
			assessmentStatus: formData.assessmentStatus || 'Draft',
			assessmentTeam: teamMembers.map((member) => ({
				name: member.name,
				memberID: null,
				department: member.department,
				role: member.role,
				company: member.companyName,
			})),
			riskAssessment: riskAssessmentRows,
		};

		try {
			if (!user?.organization) throw new Error('User organization is not available');
			await updateRiskAssessment(payload, data.id);
			toast.success('Risk Assessment created successfully');
			getdata();
			onClose();
		} catch (error: any) {
			console.error('Failed to create risk assessment:', error);
			toast.error(error.message || 'Failed to create Risk Assessment');
		}
	};

	const inputStyles = {
		input: {
			borderColor: '#ced4da',
			borderRadius: '4px',
			height: '38px',
			fontSize: '14px',
			backgroundColor: '#fff',
		},
		label: { color: '#6c757d', fontSize: '14px', fontWeight: 500, marginBottom: '5px' },
	};

	const textareaStyles = {
		input: {
			borderColor: '#ced4da',
			borderRadius: '4px',
			minHeight: '80px',
			fontSize: '14px',
			backgroundColor: '#fff',
		},
		label: { color: '#6c757d', fontSize: '14px', fontWeight: 500, marginBottom: '5px' },
	};
	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) {
			alert('No file selected.');
			return;
		}

		// Update file name for display
		setFileName(file.name);

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const data = e.target?.result;
				if (!data) throw new Error('Failed to read file data.');

				// Read the Excel file
				const workbook = XLSX.read(data, { type: 'binary' });
				const sheetName = workbook.SheetNames[0];
				if (!sheetName) throw new Error('No sheets found in the Excel file.');

				// Convert sheet to JSON with headers
				const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

				// Extract headers and data rows
				const headers = worksheet[0] as string[];
				const rows = worksheet.slice(1) as any[][];

				// Define expected columns based on the table
				const expectedHeaders = [
					'Loss Category',
					'Initial Likelihood',
					'Initial Severity',
					'Prevention Measures',
					'Mitigation Measures',
					'Residual Likelihood',
					'Residual Severity',
				];

				// Validate headers
				const missingHeaders = expectedHeaders.filter((header) => !headers.includes(header));
				if (missingHeaders.length > 0) {
					alert(`Missing required columns: ${missingHeaders.join(', ')}`);
					return;
				}

				// Map Excel rows to RiskAssessmentRow
				const formattedRows: RiskAssessmentRow[] = rows
					.filter((row) => row.some((cell) => cell !== undefined && cell !== '')) // Filter out completely empty rows
					.map((row) => {
						const rowData: { [key: string]: string } = {};
						headers.forEach((header, index) => {
							rowData[header] = row[index] !== undefined ? row[index].toString() : '';
						});
						return {
							activitySteps: rowData['Activity Steps'] || '', // Include if present in Excel
							hazardDescription: rowData['Description & Worst Case'] || '', // Include if present in Excel
							lossCategory: rowData['Loss Category'] || '',
							likelihood: rowData['Initial Likelihood'] || '1',
							severity: rowData['Initial Severity'] || '1',
							preventionMeasures: rowData['Prevention Measures'] || '',
							mitigationMeasures: rowData['Mitigation Measures'] || '',
							residualLikelihood: rowData['Residual Likelihood'] || '1',
							residualSeverity: rowData['Residual Severity'] || '1',
						};
					})
					.filter((row) => row.lossCategory); // Ensure lossCategory is not empty

				if (formattedRows.length === 0) {
					toast.error('No valid data found in the Excel file.');
					return;
				}
				setRiskAssessmentRows(formattedRows);
				toast.success('File uploaded and data processed successfully!');
			} catch (error) {
				console.error('Error processing Excel file:', error);
			}
		};
		reader.onerror = () => {
			toast.error('Error reading file.');
		};
		reader.readAsBinaryString(file);
	};
	const handleDownloadTemplate = () => {
		const link = document.createElement('a');
		link.href = '/SmarDac_Reporter_Risk_Assessment_Template.xlsx';
		link.download = 'SmarDac_Reporter_Risk_Assessment_Template.xlsx';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<Modal
			opened={open}
			onClose={onClose}
			title={
				<Text
					style={{
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
					}}
					ff='"Roboto",sans-serif'
					fw='700'
					c='#6c757d'
					fz='18px'
				>
					Risk Assessment Matrix
				</Text>
			}
			fullScreen
			radius={0}
			transitionProps={{ transition: 'fade', duration: 200 }}
		>
			<Stack>
				{/* Header */}
				<Flex justify='space-between' align='center' wrap='wrap' px='1em'>
					<Text
						style={{
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
						}}
						ff='"Roboto",sans-serif'
						fw='600'
						c='#6c757d'
						fz='12px'
					>
						Risk Assessment Reference: {data?.riskAssessmentReference || '[Reference Number]'}
					</Text>
				</Flex>

				{/* Form Section */}
				<Stack className='BoxTableForms' p='1em'>
					{/* First Row: Assessment Title, Project ID, Client */}
					<Flex gap='md' wrap='wrap' justify='space-between'>
						<TextInput
							disabled={isview}
							label={
								<span>
									Assessment Title <span style={{ color: 'red' }}>*</span>
								</span>
							}
							placeholder='Enter title'
							value={formData.assessmentTitle}
							onChange={(e) => updateForm('assessmentTitle', e.target.value)}
							w={{ base: '100%', sm: '32%' }}
							styles={inputStyles}
						/>
						<TextInput
							disabled={isview}
							label='Project ID'
							placeholder='Enter project ID'
							value={formData.projectID}
							onChange={(e) => updateForm('projectID', e.target.value)}
							w={{ base: '100%', sm: '32%' }}
							styles={inputStyles}
						/>
						<Select
							disabled={isview}
							label='Client'
							placeholder='Select client'
							data={['noClient', 'Client A', 'Client B']}
							value={formData.client}
							onChange={(value) => updateForm('client', value || '')}
							w={{ base: '100%', sm: '32%' }}
							styles={inputStyles}
						/>
					</Flex>

					{/* Second Row: Date, Location, Business Department */}
					<Flex gap='md' wrap='wrap' justify='space-between'>
						<TextInput
							disabled={isview}
							label={
								<span>
									Date <span style={{ color: 'red' }}>*</span>
								</span>
							}
							type='datetime-local'
							value={formData.assessmentDate}
							onChange={(e) => updateForm('assessmentDate', e.target.value)}
							w={{ base: '100%', sm: '32%' }}
							styles={inputStyles}
						/>
						<TextInput
							disabled={isview}
							label={
								<span>
									Location <span style={{ color: 'red' }}>*</span>
								</span>
							}
							placeholder='Enter location'
							value={formData.location}
							onChange={(e) => updateForm('location', e.target.value)}
							w={{ base: '100%', sm: '32%' }}
							styles={inputStyles}
						/>
						<Select
							disabled={isview}
							label={
								<span>
									Business Department <span style={{ color: 'red' }}>*</span>
								</span>
							}
							placeholder='Select department'
							data={['administration', 'Finance', 'HR', 'IT']}
							value={formData.businessDepartment}
							onChange={(value) => updateForm('businessDepartment', value || '')}
							w={{ base: '100%', sm: '32%' }}
							styles={inputStyles}
						/>
					</Flex>

					{/* Third Row: Assessment Overview */}
					<Textarea
						disabled={isview}
						label='Assessment Overview'
						placeholder='Enter overview'
						value={formData.assessmentOverview}
						onChange={(e) => updateForm('assessmentOverview', e.target.value)}
						w='100%'
						styles={textareaStyles}
					/>

					{/* Team Members Section */}
					<Text ff='"Roboto",sans-serif' fw='600' c='#6c757d' fz='13px'>
						Team Members
					</Text>
					{teamMembers.map((member, index) => (
						<Flex align='center' justify='space-between' w='100%' key={index}>
							<TextInput
								disabled={isview}
								variant='filled'
								placeholder='Team Member Name'
								w='25%'
								value={member.name}
								onChange={(e) =>
									setTeamMembers((prev) =>
										prev.map((m, i) => (i === index ? { ...m, name: e.target.value } : m)),
									)
								}
								styles={inputStyles}
							/>
							<TextInput
								disabled={isview}
								variant='filled'
								placeholder='Department'
								w='25%'
								value={member.department}
								onChange={(e) =>
									setTeamMembers((prev) =>
										prev.map((m, i) => (i === index ? { ...m, department: e.target.value } : m)),
									)
								}
								styles={inputStyles}
							/>
							<TextInput
								disabled={isview}
								variant='filled'
								placeholder='Role'
								w='10%'
								value={member.role}
								onChange={(e) =>
									setTeamMembers((prev) =>
										prev.map((m, i) => (i === index ? { ...m, role: e.target.value } : m)),
									)
								}
								styles={inputStyles}
							/>
							<TextInput
								disabled={isview}
								variant='filled'
								placeholder='Company Name'
								w='25%'
								value={member.companyName}
								onChange={(e) =>
									setTeamMembers((prev) =>
										prev.map((m, i) => (i === index ? { ...m, companyName: e.target.value } : m)),
									)
								}
								styles={inputStyles}
							/>
							<ActionIcon
								disabled={isview}
								variant='filled'
								color='red'
								w='25px'
								h='20px'
								onClick={() => removeTeamMember(index)}
							>
								<IconTrash size={15} />
							</ActionIcon>
						</Flex>
					))}
					<Button w='9em' bg='#6c757d' onClick={addTeamMember} disabled={isview}>
						<Text fz='11px'>Add Member</Text>
					</Button>
					<RiskAssessmentTable onRowsChange={handleRowsChange} initialRows={riskAssessmentRows} />
					<Flex align={'center'} gap='1em' w={'100%'}>
						<div className='file-input-wrapper' style={{ width: '75%' }}>
							<label className='file-input-label'>
								<input
									type='file'
									className='file-input'
									accept='.xls,.xlsx'
									onChange={handleFileUpload}
								/>
								<span className='file-input-button'>Choose File</span>
							</label>
							<span className='file-name'>{fileName}</span>
						</div>
						<Button
							leftSection={<i className='fas fa-file-excel'></i>}
							onClick={handleDownloadTemplate}
						>
							<Text fz={'13px'}>Download Risk Assessment blank Template</Text>
						</Button>
					</Flex>

					{/* Submit Button */}
					<Flex justify='flex-end'>
						{!isview && (
							<Button
								onClick={handleFormSubmit}
								bg='#0d6efd'
								styles={{
									root: {
										borderRadius: '4px',
										padding: '8px 16px',
										fontSize: '14px',
										fontWeight: 500,
									},
								}}
							>
								Update Risk Assessment
							</Button>
						)}
					</Flex>
				</Stack>
				<style>{`
        .file-input-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .file-input-label {
          position: relative;
          display: inline-block;
        }

        .file-input {
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .file-input-button {
          display: inline-block;
          padding: 8px 16px;
          background-color: #6c757d;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          font-family: 'Roboto', sans-serif;
          transition: background-color 0.3s;
        }

        .file-input-button:hover {
          background-color: #5a6268;
        }

        .file-name {
          font-size: 13px;
          color: #6c757d;
          font-family: 'Roboto', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
      `}</style>
			</Stack>
		</Modal>
	);
};

export default ModelAddRisk;
