import React, { useState } from 'react';
import {
	Box,
	TextInput,
	Select,
	Button,
	Text,
	FileInput,
	Textarea,
	Flex,
	SimpleGrid,
	Table,
	Image,
} from '@mantine/core';
import { Folder2 } from 'iconsax-react';

export type FormField = {
	label: string;
	value: string | number | File[];
	type: 'text' | 'number' | 'select' | 'date' | 'file' | 'textarea';
	options?: { label: string; value: string | number }[];
	name: string;
	required?: boolean;
	withbutton?: boolean;
	multifile?: boolean;
	table?: { label: string; value: string }[];
};

type FormState = Record<string, string | number | File[]>;

type DynamicFormProps = {
	fields: FormField[];
	buttonanme: string;
	onSubmit: (formData: FormState) => void;
	children?: React.ReactNode;
};

const DynamicForm: React.FC<DynamicFormProps> = ({ fields, onSubmit, buttonanme, children }) => {
	const [formState, setFormState] = useState<FormState>(
		fields.reduce(
			(acc, field) => ({
				...acc,
				[field.name]: field.value,
			}),
			{} as FormState,
		),
	);

	const [errors, setErrors] = useState<Record<string, string>>({});
	console.log(buttonanme);
	const handleChange = (name: string, value: string | number | File[]) => {
		setFormState((prevState) => ({ ...prevState, [name]: value }));
		setErrors((prevErrors) => {
			const newErrors = { ...prevErrors };
			if (value) {
				delete newErrors[name];
			}
			return newErrors;
		});
	};

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};
		fields.forEach((field) => {
			if (field.required && !formState[field.name]) {
				newErrors[field.name] = `${field.label} is required`;
			}
		});
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (validateForm()) {
			onSubmit(formState);
		}
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit}
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '1em',
				padding: '1em',
			}}
		>
			<SimpleGrid cols={2} spacing='lg'>
				{fields.map((field, index) => (
					<Box key={index}>
						<Text
							style={{
								display: 'flex',
								fontSize: '13px',
								fontWeight: '600',
								color: 'rgb(34 34 34 / 58%)',
								paddingBottom: '0.3em',
							}}
						>
							{field.label}
							{field.required && (
								<span style={{ color: 'red', fontSize: '16px', marginLeft: '0.3em' }}> *</span>
							)}
						</Text>
						{field.type === 'text' || field.type === 'number' ? (
							<TextInput
								value={String(formState[field.name] || '')}
								onChange={(e) => handleChange(field.name, e.currentTarget.value)}
								type={field.type}
								error={errors[field.name]}
							/>
						) : field.type === 'select' && field.options ? (
							<Select
								value={String(formState[field.name] || '')}
								onChange={(value) => handleChange(field.name, value || '')}
								data={field.options.map((option) => ({
									label: option.label,
									value: String(option.value),
								}))}
								error={errors[field.name]}
							/>
						) : field.type === 'date' ? (
							<TextInput
								value={String(formState[field.name] || '')}
								onChange={(e) => handleChange(field.name, e.currentTarget.value)}
								type='date'
								error={errors[field.name]}
							/>
						) : field.type === 'file' ? (
							<Flex direction='column' gap='1em'>
								<FileInput
									placeholder='No file chosen'
									multiple={field.multifile}
									value={formState[field.name] as File[]}
									onChange={(files) => {
										const updatedFiles = Array.isArray(files) ? files : files ? [files] : [];
										handleChange(field.name, updatedFiles);
									}}
									error={errors[field.name]}
									rightSection={<Folder2 size='25' color='#868e96' variant='Bold' />}
								/>
							</Flex>
						) : field.type === 'textarea' ? (
							<Textarea
								value={String(formState[field.name] || '')}
								onChange={(e) => handleChange(field.name, e.currentTarget.value)}
								error={errors[field.name]}
							/>
						) : null}
					</Box>
				))}
			</SimpleGrid>

			{fields
				.filter((field) => field.type === 'file' && field.table)
				.map((field, index) => (
					<Box key={`table-${index}`} mt='lg'>
						<Table>
							<Table.Thead>
								<Table.Tr>
									{field.table?.map((col) => (
										<Table.Th key={col.value} fz={'13px'} c={'rgb(34 34 34 / 58%)'}>
											{col.label}
										</Table.Th>
									))}
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{Array.isArray(formState[field.name])
									? (formState[field.name] as File[]).map((file, fileIndex) => (
											<Table.Tr key={fileIndex}>
												<Table.Td>
													{file.type.startsWith('image/') && (
														<Image
															src={URL.createObjectURL(file)}
															alt={file.name}
															style={{ width: '50px', height: '50px', objectFit: 'cover' }}
														/>
													)}
												</Table.Td>
												<Table.Td fz={'13px'}>{file.name}</Table.Td>
												<Table.Td fz={'13px'}>{(file.size / 1024).toFixed(2)} KB</Table.Td>
												<Table.Td>
													<Button
														variant='outline'
														color='red'
														onClick={() => {
															const updatedFiles = (formState[field.name] as File[]).filter(
																(_, i) => i !== fileIndex,
															);
															handleChange(field.name, updatedFiles);
														}}
													>
														Delete
													</Button>
												</Table.Td>
											</Table.Tr>
										))
									: null}
							</Table.Tbody>
						</Table>
					</Box>
				))}

			{children}

			<Flex justify='end'>
				<Button type='submit' bg='#212ba4'>
					<Text fz='13px' c='#fff'>
						{buttonanme}
					</Text>
				</Button>
			</Flex>
		</Box>
	);
};

export default DynamicForm;
