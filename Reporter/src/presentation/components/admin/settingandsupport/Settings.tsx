import { Button, Flex, Paper, Stack, Text, TextInput, TagsInput } from '@mantine/core';
import React, { useState } from 'react';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import useResponsive from '@/presentation/shared/mediaQuery';

// Define types for the state
type SettingsState = {
	businessDepartments: string[];
	reportClassification: string[];
	reportType: string[];
	meetingTypes: string[];
	meetingLocations: string[];
	hazopParameters: string[];
	hazopDeviations: string[];
	incidentReportPrefix: string;
	meetingReportPrefix: string;
	riskAssessmentReportPrefix: string;
	hazopReportPrefix: string;
};

// Common styles
const textStyles = {
	fontFamily: '"Roboto", sans-serif',
	color: '#6c757d',
};

const tagsInputStyles = {
	input: { border: '1px solid #ced4da', borderRadius: 5, fontSize: 12 },
	pill: { backgroundColor: '#4254ba', color: '#fff', borderRadius: 5, fontSize: 10 },
	pills: { display: 'flex', flexWrap: 'wrap' as const, gap: 5 },
};

const textInputStyles = {
	input: { border: '1px solid #ced4da', borderRadius: 5 },
};

// Reusable component for section titles
const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
	<Text style={{ ...textStyles, fontWeight: 600, fontSize: 15, pb: '1em' }}>{title}</Text>
);

// Reusable component for labeled TextInput
const LabeledTextInput: React.FC<{
	label: string;
	placeholder: string;
	value: string;
	onChange: (value: string) => void;
}> = ({ label, placeholder, value, onChange }) => (
	<TextInput
		label={<Text style={{ ...textStyles, fontSize: 12, pb: '0.5em' }}>{label}</Text>}
		placeholder={placeholder}
		value={value}
		onChange={(event) => onChange(event.currentTarget.value)}
		inputWrapperOrder={['label', 'error', 'input', 'description']}
		styles={textInputStyles}
	/>
);

// Reusable component for paired TagsInput
const PairedTagsInput: React.FC<{
	label1: string;
	placeholder1: string;
	data1: string[];
	value1: string[];
	onChange1: (value: string[]) => void;
	label2: string;
	placeholder2: string;
	data2: string[];
	value2: string[];
	onChange2: (value: string[]) => void;
}> = ({
	label1,
	placeholder1,
	data1,
	value1,
	onChange1,
	label2,
	placeholder2,
	data2,
	value2,
	onChange2,
}) => (
	<Flex justify='space-between' gap={20}>
		<TagsInput
			style={{ width: '49%' }}
			label={<Text style={{ ...textStyles, fontSize: 12, pb: '0.5em' }}>{label1}</Text>}
			placeholder={placeholder1}
			data={data1}
			value={value1}
			onChange={onChange1}
			clearable
			styles={tagsInputStyles}
		/>
		<TagsInput
			style={{ width: '49%' }}
			label={<Text style={{ ...textStyles, fontSize: 12, pb: '0.5em' }}>{label2}</Text>}
			placeholder={placeholder2}
			data={data2}
			value={value2}
			onChange={onChange2}
			clearable
			styles={tagsInputStyles}
		/>
	</Flex>
);

const Settings = () => {
	const [isLoading] = useState(true);
	const [settings, setSettings] = useState<SettingsState>({
		businessDepartments: ['Administration', 'Operation', 'Development', 'Management'],
		reportClassification: ['Service Quality', 'HSE', 'Both'],
		reportType: ['Hazardous Situation', 'Accident/Non Compliance', 'Environment'],
		meetingTypes: ['Operation', 'Safety'],
		meetingLocations: ['Online', 'Office', 'Field Location', "Client's Facilities"],
		hazopParameters: ['Pressure', 'Temperature', 'Composition'],
		hazopDeviations: ['High', 'Low', 'None', 'Less'],
		incidentReportPrefix: 'INC',
		meetingReportPrefix: 'MEE',
		riskAssessmentReportPrefix: 'RA',
		hazopReportPrefix: 'HAZOP',
	});

	const updateSettings = (key: keyof SettingsState, value: string | string[]) => {
		setSettings((prev) => ({ ...prev, [key]: value }));
	};

	const handleSave = () => {
		console.log('Settings Data:', settings);
	};

	if (!isLoading) return <SkeletonLoader />;

	return (
		<Stack p={20} bg='#f5f6fa' mih='100vh'>
			<Text
				style={{
					...textStyles,
					fontWeight: 700,
					fontSize: 18,
					textOverflow: 'ellipsis',
					overflow: 'hidden',
					whiteSpace: 'nowrap',
				}}
			>
				Settings
			</Text>

			{/* Common Information Section */}
			<Paper shadow='xs' p='xl' bg='#fff' style={{ borderRadius: 8 }}>
				<Stack>
					<SectionTitle title='Common Information' />
					<TagsInput
						style={{ width: '100%' }}
						label={
							<Text style={{ ...textStyles, fontSize: 12, pb: '0.5em' }}>Business Departments</Text>
						}
						placeholder='Add department'
						data={['Administration', 'Operation', 'Development', 'Management']}
						value={settings.businessDepartments}
						onChange={(value) => updateSettings('businessDepartments', value)}
						clearable
						styles={tagsInputStyles}
					/>
					<SectionTitle title='Incident Report' />
					<LabeledTextInput
						label='Incident Report Prefix'
						placeholder='Incident Report Prefix'
						value={settings.incidentReportPrefix}
						onChange={(value) => updateSettings('incidentReportPrefix', value)}
					/>
					<PairedTagsInput
						label1='Report Classification'
						placeholder1='Add classification'
						data1={['Service Quality', 'HSE', 'Both']}
						value1={settings.reportClassification}
						onChange1={(value) => updateSettings('reportClassification', value)}
						label2='Report Type'
						placeholder2='Add type'
						data2={['Hazardous Situation', 'Accident/Non Compliance', 'Environment']}
						value2={settings.reportType}
						onChange2={(value) => updateSettings('reportType', value)}
					/>
				</Stack>
			</Paper>

			{/* Meeting Section */}
			<Paper shadow='xs' p='xl' bg='#fff' style={{ borderRadius: 8 }}>
				<Stack>
					<SectionTitle title='Meeting' />
					<LabeledTextInput
						label='Meeting Report Prefix'
						placeholder='Meeting Report Prefix'
						value={settings.meetingReportPrefix}
						onChange={(value) => updateSettings('meetingReportPrefix', value)}
					/>
					<PairedTagsInput
						label1='Meeting Types'
						placeholder1='Add type'
						data1={['Operation', 'Safety']}
						value1={settings.meetingTypes}
						onChange1={(value) => updateSettings('meetingTypes', value)}
						label2='Meeting Locations'
						placeholder2='Add location'
						data2={['Online', 'Office', 'Field Location', "Client's Facilities"]}
						value2={settings.meetingLocations}
						onChange2={(value) => updateSettings('meetingLocations', value)}
					/>
				</Stack>
			</Paper>

			{/* Risk Assessment Section */}
			<Paper shadow='xs' p='xl' bg='#fff' style={{ borderRadius: 8 }}>
				<Stack>
					<SectionTitle title='Risk Assessment' />
					<LabeledTextInput
						label='Risk Assessment Report Prefix'
						placeholder='Risk Assessment Report Prefix'
						value={settings.riskAssessmentReportPrefix}
						onChange={(value) => updateSettings('riskAssessmentReportPrefix', value)}
					/>
				</Stack>
			</Paper>

			{/* HAZOP Section */}
			<Paper shadow='xs' p='xl' bg='#fff' style={{ borderRadius: 8 }}>
				<Stack>
					<SectionTitle title='HAZOP' />
					<LabeledTextInput
						label='HAZOP Report Prefix'
						placeholder='HAZOP Report Prefix'
						value={settings.hazopReportPrefix}
						onChange={(value) => updateSettings('hazopReportPrefix', value)}
					/>
					<PairedTagsInput
						label1='HAZOP Parameters'
						placeholder1='Add parameter'
						data1={['Pressure', 'Temperature', 'Composition']}
						value1={settings.hazopParameters}
						onChange1={(value) => updateSettings('hazopParameters', value)}
						label2='HAZOP Deviations'
						placeholder2='Add deviation'
						data2={['High', 'Low', 'None', 'Less']}
						value2={settings.hazopDeviations}
						onChange2={(value) => updateSettings('hazopDeviations', value)}
					/>
				</Stack>
			</Paper>

			{/* Save Button */}
			<Flex justify='end'>
				<Button bg='#4f6bed' c='#fff' radius={5} px={20} py={10} onClick={handleSave}>
					<Text fz={12}>Save</Text>
				</Button>
			</Flex>
		</Stack>
	);
};

export default Settings;
