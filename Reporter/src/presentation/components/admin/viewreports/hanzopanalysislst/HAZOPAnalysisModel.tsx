import React, { useState } from 'react';
import { Stack, Flex, Text, Button, ActionIcon, Modal, Paper } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import DetailedHAZOPAnalysis from './detalshazop/DetailedHAZOPAnalysis';

interface TeamMember {
	name: string;
	department: string;
	role: string;
	companyName: string;
}

interface FormData {
	[key: string]: any;
	teamMembers: TeamMember[];
}

interface ModelHAZOPAnalysisProps {
	open: boolean;
	onClose: () => void;
	data?: FormData;
	isUpdte?: boolean;
}

const HAZOPAnalysisModel: React.FC<ModelHAZOPAnalysisProps> = ({
	open,
	onClose,
	data,
	isUpdte,
}) => {
	const [teamMembers, setTeamMembers] = useState<TeamMember[]>(data?.teamMembers || []);
	const [files, setFiles] = useState<File[]>([]);

	const handleFormSubmit = (formData: Record<string, string | number | File[]>) => {
		console.log('Form Submitted Data:', formData);
	};

	const addTeamMember = () => {
		setTeamMembers((prev) => [...prev, { name: '', department: '', role: '', companyName: '' }]);
	};

	const removeTeamMember = (index: number) => {
		setTeamMembers((prev) => prev.filter((_, i) => i !== index));
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			setFiles((prev) => [...prev, ...Array.from(files)]);
		}
	};

	const removeFile = (index: number) => {
		setFiles((prev) => prev.filter((_, i) => i !== index));
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
					ff='"Roboto", sans-serif'
					fw='700'
					c='#6c757d'
					fz='18px'
				>
					HAZOP Analysis
				</Text>
			}
			fullScreen
			radius={0}
			styles={{
				body: {
					paddingTop: '1em',
					backgroundColor: '#f2f2f7',
				},
			}}
			transitionProps={{ transition: 'fade', duration: 200 }}
		>
			<Stack>
				{/* Header */}
				<Flex justify='space-between' align='center' wrap='wrap'>
					<Text
						style={{
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
						}}
						ff='"Roboto", sans-serif'
						fw='600'
						c='#6c757d'
						fz='12px'
					>
						Risk Assessment Reference: [Reference Number]
					</Text>
				</Flex>

				{/* Form Section */}
				<Paper>
					<div className='card p-4' style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleFormSubmit({});
							}}
						>
							{/* System/Process Name */}
							<div className='mb-3'>
								<label
									className='form-label'
									htmlFor='systemProcessName'
									style={{ fontSize: '13px', fontWeight: '600', color: '#6c757d' }}
								>
									System/Process Name <span style={{ color: '#dc3545' }}>*</span>
								</label>
								<input
									type='text'
									className='form-control'
									id='systemProcessName'
									placeholder='Well Testing System'
									style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
									required
								/>
							</div>

							{/* Objectives */}
							<div className='mb-3'>
								<label
									className='form-label'
									htmlFor='objectives'
									style={{ fontSize: '13px', fontWeight: '600', color: '#6c757d' }}
								>
									Objectives <span style={{ color: '#dc3545' }}>*</span>
								</label>
								<textarea
									className='form-control'
									id='objectives'
									rows={3}
									placeholder='Identify and mitigate potential risks during well testing operations.'
									style={{ fontSize: '13px', padding: '8px', borderRadius: '4px', resize: 'none' }}
									required
								></textarea>
							</div>

							{/* Boundaries */}
							<div className='mb-3'>
								<label
									className='form-label'
									htmlFor='boundaries'
									style={{ fontSize: '13px', fontWeight: '600', color: '#6c757d' }}
								>
									Boundaries <span style={{ color: '#dc3545' }}>*</span>
								</label>
								<textarea
									className='form-control'
									id='boundaries'
									rows={3}
									placeholder='The HAZOP study focuses on the well testing equipment and operations including flowlines, separators, manifolds, and measurement instruments.'
									style={{ fontSize: '13px', padding: '8px', borderRadius: '4px', resize: 'none' }}
									required
								></textarea>
							</div>

							{/* Dates and Review Frequency */}
							<div className='row mb-4 ' style={{ gap: '0em' }}>
								<div className='col-md-4'>
									<label
										className='form-label'
										htmlFor='startDate'
										style={{ fontSize: '13px', fontWeight: '600', color: '#6c757d' }}
									>
										Start Date <span style={{ color: '#dc3545' }}>*</span>
									</label>
									<input
										type='date'
										className='form-control'
										id='startDate'
										defaultValue='2024-09-01'
										style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
										required
									/>
								</div>
								<div className='col-md-4'>
									<label
										className='form-label'
										htmlFor='endDate'
										style={{ fontSize: '13px', fontWeight: '600', color: '#6c757d' }}
									>
										End Date <span style={{ color: '#dc3545' }}>*</span>
									</label>
									<input
										type='date'
										className='form-control'
										id='endDate'
										defaultValue='2024-09-05'
										style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
										required
									/>
								</div>
								<div className='col-md-4'>
									<label
										className='form-label'
										htmlFor='reviewFrequency'
										style={{ fontSize: '13px', fontWeight: '600', color: '#6c757d' }}
									>
										Review Frequency <span style={{ color: '#dc3545' }}>*</span>
									</label>
									<select
										className='form-control'
										id='reviewFrequency'
										style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
										required
									>
										<option value='Annually'>Annually</option>
									</select>
								</div>
							</div>

							{/* Client, Project ID, Location */}
							<div className='row mb-4' style={{ gap: '0em' }}>
								<div className='col-md-4'>
									<label
										className='form-label'
										htmlFor='client'
										style={{ fontSize: '13px', fontWeight: '600', color: '#6c757d' }}
									>
										Client <span style={{ color: '#dc3545' }}>*</span>
									</label>
									<input
										type='text'
										className='form-control'
										id='client'
										defaultValue='ABC Oil Company'
										style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
										required
									/>
								</div>
								<div className='col-md-4'>
									<label
										className='form-label'
										htmlFor='projectID'
										style={{ fontSize: '13px', fontWeight: '600', color: '#6c757d' }}
									>
										Project ID <span style={{ color: '#dc3545' }}>*</span>
									</label>
									<input
										type='text'
										className='form-control'
										id='projectID'
										defaultValue='WT-101'
										style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
										required
									/>
								</div>
								<div className='col-md-4'>
									<label
										className='form-label'
										htmlFor='location'
										style={{ fontSize: '13px', fontWeight: '600', color: '#6c757d' }}
									>
										Location <span style={{ color: '#dc3545' }}>*</span>
									</label>
									<input
										type='text'
										className='form-control'
										id='location'
										defaultValue='Offshore Platform A'
										style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
										required
									/>
								</div>
							</div>

							{/* Team Members Section */}
							<div className='mb-4'>
								<Text ff='"Roboto", sans-serif' fw='600' c='#6c757d' fz='13px'>
									Team Members
								</Text>
								{teamMembers.map((member, index) => (
									<div className='row align-items-center mb-4' style={{ gap: '0em' }} key={index}>
										<div className='col-md-3'>
											<input
												type='text'
												className='form-control'
												placeholder='Team Member Name'
												value={member.name}
												onChange={(e) =>
													setTeamMembers((prev) =>
														prev.map((m, i) => (i === index ? { ...m, name: e.target.value } : m)),
													)
												}
												style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
											/>
										</div>
										<div className='col-md-3'>
											<input
												type='text'
												className='form-control'
												placeholder='Department'
												value={member.department}
												onChange={(e) =>
													setTeamMembers((prev) =>
														prev.map((m, i) =>
															i === index ? { ...m, department: e.target.value } : m,
														),
													)
												}
												style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
											/>
										</div>
										<div className='col-md-2'>
											<input
												type='text'
												className='form-control'
												placeholder='Role'
												value={member.role}
												onChange={(e) =>
													setTeamMembers((prev) =>
														prev.map((m, i) => (i === index ? { ...m, role: e.target.value } : m)),
													)
												}
												style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
											/>
										</div>
										<div className='col-md-3'>
											<input
												type='text'
												className='form-control'
												placeholder='Company Name'
												value={member.companyName}
												onChange={(e) =>
													setTeamMembers((prev) =>
														prev.map((m, i) =>
															i === index ? { ...m, companyName: e.target.value } : m,
														),
													)
												}
												style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
											/>
										</div>
										<div className='col-md-1'>
											<ActionIcon
												variant='filled'
												color='red'
												onClick={() => removeTeamMember(index)}
												style={{ width: '25px', height: '25px' }}
											>
												<IconTrash size={15} />
											</ActionIcon>
										</div>
									</div>
								))}
								{isUpdte && (
									<Button
										onClick={addTeamMember}
										style={{
											fontSize: '11px',
											backgroundColor: '#6c757d',
											border: 'none',
											padding: '5px 10px',
											borderRadius: '4px',
											width: 'fit-content',
										}}
									>
										Add Member
									</Button>
								)}
							</div>

							{/* File Input and Table */}
							<div className='mb-3'>
								<div className='mb-3'>
									<label
										className='form-label'
										style={{ fontSize: '13px', fontWeight: '600', color: '#6c757d' }}
									>
										Attach Files
									</label>
									<input
										type='file'
										className='form-control'
										multiple
										onChange={handleFileChange}
										style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
									/>
								</div>
								<table className='table table-bordered'>
									<thead>
										<tr>
											<th style={{ fontSize: '13px' }}>File Name</th>
											<th style={{ fontSize: '13px' }}>File Size</th>
											<th style={{ fontSize: '13px' }}>Preview</th>
											<th style={{ fontSize: '13px' }}>Action</th>
										</tr>
									</thead>
									<tbody>
										{files.map((file, index) => (
											<tr key={index}>
												<td style={{ fontSize: '13px' }}>{file.name}</td>
												<td style={{ fontSize: '13px' }}>{(file.size / 1024).toFixed(2)} KB</td>
												<td>
													{file.type.startsWith('image/') && (
														<img
															src={URL.createObjectURL(file)}
															alt={file.name}
															style={{ width: '50px', height: '50px', objectFit: 'cover' }}
														/>
													)}
												</td>
												<td>
													<Button
														variant='outline'
														color='red'
														onClick={() => removeFile(index)}
														style={{ fontSize: '13px', padding: '2px 8px' }}
													>
														Remove
													</Button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							<button
								type='submit'
								className='btn btn-primary'
								style={{ fontSize: '13px', padding: '8px 16px', borderRadius: '4px' }}
							>
								Update Information
							</button>
						</form>
					</div>
				</Paper>

				<Flex justify='space-between' direction={'column'}>
					<Text
						style={{
							textOverflow: 'ellipsis',
							overflow: 'hidden',
							whiteSpace: 'nowrap',
						}}
						ff='"Roboto", sans-serif'
						fw='600'
						c='#6c757d'
						fz='12px'
					>
						Detailed HAZOP Analysis
					</Text>
					<DetailedHAZOPAnalysis />
				</Flex>
			</Stack>
		</Modal>
	);
};

export default HAZOPAnalysisModel;
