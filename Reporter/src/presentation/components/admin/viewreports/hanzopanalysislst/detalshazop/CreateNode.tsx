import React, { useState } from 'react';
import { Button, Modal, Text } from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';

// Define interfaces for TypeScript
interface ParameterEntry {
	parameter: string;
	deviation: string;
	designIntent: string;
	comments: string;
}

interface Node {
	name: string;
	type: string;
	description: string;
	parameters: string[];
	attachments: File[];
}

interface CreateNodeProps {
	opened: boolean;
	onClose: () => void;
	onSave: (node: Node) => void;
}

const CreateNode = ({ opened, onClose, onSave }: CreateNodeProps) => {
	const [newNode, setNewNode] = useState<Node>({
		name: '',
		type: 'Equipment',
		description: '',
		parameters: [],
		attachments: [],
	});
	const [parametersList, setParametersList] = useState<ParameterEntry[]>([]);
	const [newParameter, setNewParameter] = useState<ParameterEntry>({
		parameter: '',
		deviation: '',
		designIntent: '',
		comments: '',
	});
	const [parameters] = useState<string[]>(['Pressure', 'Temperature']);
	const [deviations] = useState<string[]>(['High', 'Low']);

	// Add a new parameter to the list
	const addParameter = () => {
		if (newParameter.parameter && newParameter.deviation) {
			setParametersList((prev) => [...prev, newParameter]);
			setNewNode((prev) => ({
				...prev,
				parameters: [...prev.parameters, `${newParameter.parameter} (${newParameter.deviation})`],
			}));
			setNewParameter({
				parameter: '',
				deviation: '',
				designIntent: '',
				comments: '',
			});
		}
	};

	// Remove a parameter from the list
	const removeParameter = (index: number) => {
		const updatedParametersList = parametersList.filter((_, i) => i !== index);
		setParametersList(updatedParametersList);
		setNewNode((prev) => ({
			...prev,
			parameters: updatedParametersList.map((param) => `${param.parameter} (${param.deviation})`),
		}));
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			setNewNode((prev) => ({
				...prev,
				attachments: [...prev.attachments, ...Array.from(files)],
			}));
		}
	};

	const saveNode = () => {
		if (newNode.name && newNode.description) {
			onSave(newNode);
			setNewNode({
				name: '',
				type: 'Equipment',
				description: '',
				parameters: [],
				attachments: [],
			});
			setParametersList([]);
			onClose();
		}
	};

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={
				<Text fz='17px' fw={600} c='#6c757d'>
					Node Information
				</Text>
			}
			radius={8}
			styles={{ body: { backgroundColor: '#f2f2f7' } }}
			size={'55em'}
		>
			<div className='card p-3' style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}>
				<div className='row mb-3'>
					<div className='col-md-6'>
						<label
							className='form-label'
							style={{ fontSize: '13px', fontWeight: 600, color: '#6c757d' }}
						>
							Node Name
						</label>
						<input
							type='text'
							className='form-control'
							value={newNode.name}
							onChange={(e) => setNewNode({ ...newNode, name: e.target.value })}
							placeholder="Enter new node's name"
							style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
						/>
					</div>
					<div className='col-md-6'>
						<label
							className='form-label'
							style={{ fontSize: '13px', fontWeight: 600, color: '#6c757d' }}
						>
							Node Type
						</label>
						<input
							type='text'
							className='form-control'
							value={newNode.type}
							onChange={(e) => setNewNode({ ...newNode, type: e.target.value })}
							placeholder='Equipment'
							style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
						/>
					</div>
				</div>
				<div className='row mb-3'>
					<div className='col-md-12'>
						<label
							className='form-label'
							style={{ fontSize: '13px', fontWeight: 600, color: '#6c757d' }}
						>
							Node Description
						</label>
						<textarea
							className='form-control'
							value={newNode.description}
							onChange={(e) => setNewNode({ ...newNode, description: e.target.value })}
							placeholder='Enter new node description'
							rows={3}
							style={{
								fontSize: '13px',
								padding: '8px',
								borderRadius: '4px',
								resize: 'none',
							}}
						/>
					</div>
				</div>

				{/* Parameters Table */}
				<div className='mb-3'>
					<Text fz='13px' fw={600} c='#6c757d'>
						Condition/Parameter
					</Text>
					<table className='table table-bordered'>
						<thead>
							<tr>
								<th>Parameter</th>
								<th>Deviation</th>
								<th>Design Intent</th>
								<th>Comments</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{parametersList.map((param, index) => (
								<tr key={index}>
									<td>
										<select
											className='form-control'
											value={param.parameter}
											onChange={(e) => {
												const updatedList = [...parametersList];
												updatedList[index].parameter = e.target.value;
												setParametersList(updatedList);
												setNewNode((prev) => ({
													...prev,
													parameters: updatedList.map((p) => `${p.parameter} (${p.deviation})`),
												}));
											}}
											style={{
												fontSize: '13px',
												padding: '8px',
												borderRadius: '4px',
											}}
										>
											<option value=''>Choose...</option>
											{parameters.map((p, idx) => (
												<option key={idx} value={p}>
													{p}
												</option>
											))}
										</select>
									</td>
									<td>
										<select
											className='form-control'
											value={param.deviation}
											onChange={(e) => {
												const updatedList = [...parametersList];
												updatedList[index].deviation = e.target.value;
												setParametersList(updatedList);
												setNewNode((prev) => ({
													...prev,
													parameters: updatedList.map((p) => `${p.parameter} (${p.deviation})`),
												}));
											}}
											style={{
												fontSize: '13px',
												padding: '8px',
												borderRadius: '4px',
											}}
										>
											<option value=''>Choose...</option>
											{deviations.map((dev, idx) => (
												<option key={idx} value={dev}>
													{dev}
												</option>
											))}
										</select>
									</td>
									<td>
										<input
											type='text'
											className='form-control'
											value={param.designIntent}
											onChange={(e) => {
												const updatedList = [...parametersList];
												updatedList[index].designIntent = e.target.value;
												setParametersList(updatedList);
											}}
											style={{
												fontSize: '13px',
												padding: '8px',
												borderRadius: '4px',
											}}
										/>
									</td>
									<td>
										<input
											type='text'
											className='form-control'
											value={param.comments}
											onChange={(e) => {
												const updatedList = [...parametersList];
												updatedList[index].comments = e.target.value;
												setParametersList(updatedList);
											}}
											style={{
												fontSize: '13px',
												padding: '8px',
												borderRadius: '4px',
											}}
										/>
									</td>
									<td>
										<Button
											variant='outline'
											color='red'
											size='xs'
											onClick={() => removeParameter(index)}
											style={{ fontSize: '13px', padding: '4px 8px' }}
										>
											<IconTrash size={14} />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					{/* Input Row for Adding New Parameter */}
					<div className='row mb-3'>
						<div className='col-md-2'>
							<select
								className='form-control'
								value={newParameter.parameter}
								onChange={(e) =>
									setNewParameter({
										...newParameter,
										parameter: e.target.value,
									})
								}
								style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
							>
								<option value=''>Parameter</option>
								{parameters.map((param, idx) => (
									<option key={idx} value={param}>
										{param}
									</option>
								))}
							</select>
						</div>
						<div className='col-md-2'>
							<select
								className='form-control'
								value={newParameter.deviation}
								onChange={(e) =>
									setNewParameter({
										...newParameter,
										deviation: e.target.value,
									})
								}
								style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
							>
								<option value=''>Deviation</option>
								{deviations.map((dev, idx) => (
									<option key={idx} value={dev}>
										{dev}
									</option>
								))}
							</select>
						</div>
						<div className='col-md-4'>
							<input
								type='text'
								className='form-control'
								value={newParameter.designIntent}
								onChange={(e) =>
									setNewParameter({
										...newParameter,
										designIntent: e.target.value,
									})
								}
								style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
							/>
						</div>
						<div className='col-md-3'>
							<input
								type='text'
								className='form-control'
								value={newParameter.comments}
								onChange={(e) => setNewParameter({ ...newParameter, comments: e.target.value })}
								style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
							/>
						</div>
						<div className='col-md-1 d-flex align-items-end'>
							<button
								className='btn btn-primary w-100'
								onClick={addParameter}
								style={{ fontSize: '13px', padding: '6px' }}
							>
								<IconPlus size={14} />
							</button>
						</div>
					</div>
				</div>

				{/* Attachments Section */}
				<div className='mb-3'>
					<Text fz='13px' fw={600} c='#6c757d'>
						Node Attachments
					</Text>
					{newNode.attachments.map((file, index) => (
						<div key={index} className='d-flex justify-content-between align-items-center mb-2'>
							<span style={{ fontSize: '13px' }}>{file.name} (0.00 KB)</span>
							<Button
								variant='outline'
								color='red'
								size='xs'
								onClick={() =>
									setNewNode({
										...newNode,
										attachments: newNode.attachments.filter((_, i) => i !== index),
									})
								}
								style={{ fontSize: '13px', padding: '4px 8px' }}
							>
								<IconTrash size={14} />
							</Button>
						</div>
					))}
					<input
						type='file'
						className='form-control'
						onChange={handleFileChange}
						style={{ fontSize: '13px', padding: '8px', borderRadius: '4px' }}
					/>
					<button className='btn btn-primary mt-2' style={{ fontSize: '13px', padding: '6px' }}>
						+ Attach File
					</button>
				</div>

				<Button
					variant='filled'
					onClick={saveNode}
					style={{ fontSize: '13px', padding: '8px 16px' }}
				>
					Save
				</Button>
			</div>
		</Modal>
	);
};

export default CreateNode;
