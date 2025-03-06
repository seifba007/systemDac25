import React, { useState } from 'react';
import { Modal, Radio, Text, Title, Flex, Box } from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss'

interface ModelFilterProps {
	opened: boolean;
	onClose: () => void;
	titrepage: string;
	onSortChange: (sortValue: string) => void;
	sortLabels: Record<string, string>; // Accept sortLabels as a prop
}

const ModelFilter: React.FC<ModelFilterProps> = ({ opened, onClose, onSortChange, sortLabels }) => {
	const [selectedValue, setSelectedValue] = useState<any>('default');
	// Styles for each radio button
	const radioStyles = (isChecked: boolean) => ({
		backgroundColor: isChecked ? '#ECEEF1' : 'transparent',
		borderRadius: '4px',
		padding: '4px',
		display: 'flex',
		paddingLeft: '15px',
		width: '440px',
		height: '56px',
		alignItems: 'center',
	});

	// Handle selection changes
	const handleChange = (value: string) => {
		setSelectedValue(value);
		onSortChange(value);
	};

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={
				<Title className={'titremodel'} style={{ marginTop: '9px', textAlign: 'center' }} order={6}>
					Sorter
				</Title>
			}
			classNames={{
				body: 'modalBody',
				content: 'modalContent',
				overlay: 'modalOverlay',
				title: 'modalTitle',
			}}
			styles={{
				body: { padding: 0 },
				header: { gap: '6em', alignItems: 'self-start' },
			}}
			size={'440px'}
			radius={'12px'}
		>
			<Flex direction='column' justify='center' mb={'3%'}>
				{Object.entries(sortLabels).map(([key, label]) => (
					<Box key={key} style={radioStyles(selectedValue === key)}>
						<Radio
							label={<Text className={'labelText'}>{label}</Text>}
							value={key}
							checked={selectedValue === key}
							onChange={() => handleChange(key as string)}
							style={{ flexShrink: 0 }}
						/>
					</Box>
				))}
			</Flex>
		</Modal>
	);
};

export default ModelFilter;
