import React, { useCallback, useMemo } from 'react';
import { Table, Text } from '@mantine/core';

// Risk level types
type RiskType =
	| 'number'
	| 'Ma'
	| 'M'
	| 'H'
	| 'Ha'
	| 'VH'
	| 'VHa'
	| 'L'
	| 'La'
	| 'headerCell'
	| 'td';

// Define styles as a constant outside the component to avoid re-creation on every render
const riskStyles: Record<RiskType, React.CSSProperties> = {
	number: {
		backgroundColor: '#f99d09',
		color: 'white',
		textAlign: 'center',
		fontSize: '12px',
		padding: '2%',
		height: '50px',
		fontWeight: 550,
		cursor: 'pointer',
	},
	Ma: {
		backgroundColor: '#f9d909',
		color: 'white',
		textAlign: 'center',
		fontSize: '12px',
		padding: '2%',
		height: '60px',
		fontWeight: 550,
		cursor: 'pointer',
		border: '3px dashed',
		boxShadow:
			'rgba(14, 1, 1, 0.17) -5px 5px 20px 20px, rgba(14, 14, 14, 0.22) -15px -11px 20px 5px',
	},
	M: {
		backgroundColor: '#f9d909',
		color: 'white',
		textAlign: 'center',
		fontSize: '12px',
		padding: '2%',
		height: '60px',
		fontWeight: 550,
		cursor: 'pointer',
	},
	H: {
		backgroundColor: '#f99d09',
		color: 'white',
		textAlign: 'center',
		fontSize: '12px',
		padding: '2%',
		height: '60px',
		fontWeight: 550,
		cursor: 'pointer',
	},
	Ha: {
		backgroundColor: '#f99d09',
		color: 'white',
		textAlign: 'center',
		fontSize: '12px',
		padding: '2%',
		height: '60px',
		fontWeight: 550,
		cursor: 'pointer',
		border: '3px dashed',
		boxShadow:
			'rgba(14, 1, 1, 0.17) -5px 5px 20px 20px, rgba(14, 14, 14, 0.22) -15px -11px 20px 5px',
	},
	VH: {
		backgroundColor: '#f90909',
		color: 'white',
		textAlign: 'center',
		fontSize: '12px',
		padding: '2%',
		height: '60px',
		fontWeight: 550,
		cursor: 'pointer',
	},
	VHa: {
		backgroundColor: '#f90909',
		color: 'white',
		textAlign: 'center',
		fontSize: '12px',
		padding: '2%',
		height: '60px',
		fontWeight: 550,
		cursor: 'pointer',
		border: '3px dashed',
		boxShadow:
			'rgba(14, 1, 1, 0.17) -5px 5px 20px 20px, rgba(14, 14, 14, 0.22) -15px -11px 20px 5px',
	},
	L: {
		backgroundColor: '#4c7c04',
		color: 'white',
		textAlign: 'center',
		fontSize: '12px',
		padding: '2%',
		height: '60px',
		fontWeight: 550,
		cursor: 'pointer',
	},
	La: {
		backgroundColor: '#4c7c04',
		color: 'white',
		textAlign: 'center',
		fontSize: '12px',
		padding: '2%',
		height: '60px',
		fontWeight: 550,
		cursor: 'pointer',
		border: '3px dashed',
		boxShadow:
			'rgba(14, 1, 1, 0.17) -5px 5px 20px 20px, rgba(14, 14, 14, 0.22) -15px -11px 20px 5px',
	},
	headerCell: { fontWeight: 700, textAlign: 'center', fontSize: '12px' },
	td: { fontSize: '12px', textAlign: 'center' },
};

// Table data structure
const tableData = [
	{
		likelihood: 'Very High (5)',
		description: 'It is or has already happened',
		risks: ['M', 'H', 'H', 'VH', 'VH'],
		styles: ['Ma', 'Ha', 'Ha', 'VHa', 'VHa'],
	},
	{
		likelihood: 'High (4)',
		description: 'It will probably happen',
		risks: ['M', 'M', 'H', 'VH', 'VH'],
		styles: ['Ma', 'Ma', 'Ha', 'VHa', 'VHa'],
	},
	{
		likelihood: 'Moderate (3)',
		description: 'It could possibly happen',
		risks: ['L', 'M', 'M', 'H', 'H'],
		styles: ['La', 'Ma', 'Ma', 'Ha', 'Ha'],
	},
	{
		likelihood: 'Low (2)',
		description: 'It is unlikely to happen',
		risks: ['L', 'L', 'M', 'M', 'H'],
		styles: ['La', 'La', 'Ma', 'Ma', 'Ha'],
	},
	{
		likelihood: 'Very Low (1)',
		description: 'It is very unlikely to happen',
		risks: ['L', 'L', 'L', 'M', 'M'],
		styles: ['La', 'La', 'La', 'Ma', 'Ma'],
	},
];

const outcomeData = [
	{
		category: 'SAFETY',
		outcomes: ['Near Miss', 'Minor Injury', 'Lost Time Accident', 'Major Injury', 'Fatality'],
	},
	{
		category: 'ENVIRONMENT',
		outcomes: [
			'Potential Event',
			'Minor Event',
			'Important Event',
			'Significant Event',
			'Major Event',
		],
	},
	{ category: 'COST', outcomes: ['< 1k $', '< 10k $', '< 100k $', '< 300k $', '> 500k $'] },
];

const severityLevels = [
	{ value: 'Minor (1)', bg: '#4c7c04' },
	{ value: 'Moderate (2)', bg: '#4c7c04' },
	{ value: 'Serious (3)', bg: '#f9d909' },
	{ value: 'Major (4)', bg: '#f99d09' },
	{ value: 'Catastrophic (5)', bg: '#f90909' },
];

// Props interface for TableRisk
interface TableRiskProps {
	likelihood: string;
	severity: string;
	onCellClick: (likelihood: string, severity: string) => void;
}

const TableRisk: React.FC<TableRiskProps> = ({ likelihood, severity, onCellClick }) => {
	// Memoize the cell click handler to prevent unnecessary re-renders
	const handleCellClick = useCallback(
		(rowLikelihood: string, colSeverity: string) => {
			onCellClick(rowLikelihood, colSeverity);
		},
		[onCellClick],
	);

	// Memoize the renderRiskCell function to avoid re-creating it on every render
	const renderRiskCell = useCallback(
		(
			riskType: string,
			rowLikelihood: string,
			colSeverity: string,
			styleKey: RiskType,
			rowIndex: number,
			colIndex: number,
		) => {
			const isSelected = likelihood === rowLikelihood && severity === colSeverity;
			return (
				<Table.Td
					style={isSelected ? riskStyles[styleKey] : riskStyles[riskType as RiskType]}
					onClick={() => handleCellClick(rowLikelihood, colSeverity)}
				>
					{riskType}
				</Table.Td>
			);
		},
		[likelihood, severity, handleCellClick],
	);

	// Memoize table rows to prevent unnecessary re-rendering
	const likelihoodRows = useMemo(
		() =>
			tableData.map((row, rowIndex) => (
				<Table.Tr key={row.likelihood}>
					{rowIndex === 0 && (
						<Table.Td rowSpan={5} style={riskStyles.td}>
							<Text fz='13px'>LIKELIHOOD OF EVENT HAPPENING</Text>
						</Table.Td>
					)}
					<Table.Td style={riskStyles.td} w='4%'>
						{row.likelihood.split(' ')[2]?.replace('(', '')?.replace(')', '')}{' '}
						{/* Extract number, e.g., "5" */}
					</Table.Td>
					<Table.Td style={riskStyles.td} fz='13px'>
						{row.description}
					</Table.Td>
					{row.risks.map((risk, colIndex) =>
						renderRiskCell(
							risk,
							row.likelihood,
							severityLevels[colIndex].value,
							row.styles[colIndex] as RiskType,
							rowIndex + 1,
							colIndex + 1,
						),
					)}
				</Table.Tr>
			)),
		[renderRiskCell],
	);

	const outcomeRows = useMemo(
		() =>
			outcomeData.map((row, rowIndex) => (
				<Table.Tr key={row.category}>
					{rowIndex === 0 && (
						<Table.Td rowSpan={3} style={riskStyles.headerCell}>
							<Text fz='13px'>LIKELY OUTCOME OF EVENT</Text>
						</Table.Td>
					)}
					<Table.Td colSpan={2} style={riskStyles.headerCell}>
						<Text fz='13px'>{row.category}</Text>
					</Table.Td>
					{row.outcomes.map((outcome, colIndex) => (
						<Table.Td key={colIndex} style={riskStyles.td} fz='13px'>
							{outcome}
						</Table.Td>
					))}
				</Table.Tr>
			)),
		[],
	);

	const severityRow = useMemo(
		() => (
			<Table.Tr>
				<Table.Td />
				<Table.Td colSpan={2} style={riskStyles.headerCell}>
					<Text fz='13px'>SEVERITY</Text>
				</Table.Td>
				{severityLevels.map((level, index) => (
					<Table.Td key={index} bg={level.bg} style={riskStyles.number}>
						{level.value.split(' ')[1].replace('(', '').replace(')', '')}{' '}
						{/* Extract number, e.g., "1" */}
					</Table.Td>
				))}
			</Table.Tr>
		),
		[],
	);

	return (
		<Table withTableBorder withColumnBorders>
			<Table.Thead>
				<Table.Tr>
					<Table.Th />
					<Table.Th colSpan={2} style={riskStyles.headerCell}>
						<Text fz='13px'>STATUS OF EVENT</Text>
					</Table.Th>
					<Table.Th colSpan={5} style={riskStyles.headerCell}>
						<Text fz='13px'>RISK CLASS</Text>
					</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				{likelihoodRows}
				{outcomeRows}
				{severityRow}
			</Table.Tbody>
		</Table>
	);
};

export default TableRisk;
