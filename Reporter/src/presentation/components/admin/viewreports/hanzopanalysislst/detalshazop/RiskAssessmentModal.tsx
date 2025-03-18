import React, { useState, useMemo, useCallback } from 'react';
import { Button, Modal, Text, Group, Table } from '@mantine/core';

interface RiskAssessmentModalProps {
  opened: boolean;
  onClose: () => void;
  setSelectedLikelihood: (value: string) => void;
  setSelectedSeverity: (value: string) => void;
  onSetRisk: () => void;
  selectedLikelihood: string;
  selectedSeverity: string;
}

// Risk level types
type RiskType = 'number' | 'Ma' | 'M' | 'H' | 'Ha' | 'VH' | 'VHa' | 'L' | 'La' | 'headerCell' | 'td';

// Define styles as a constant outside the component to avoid re-creation on every render
const riskStyles: Record<RiskType, React.CSSProperties> = {
  number: { backgroundColor: '#f99d09', color: 'white', textAlign: 'center', fontSize: '12px', padding: '2%', height: '50px', fontWeight: 550, cursor: 'pointer' },
  Ma: { backgroundColor: '#f9d909', color: 'white', textAlign: 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer', border: '3px dashed', boxShadow: 'rgba(14, 1, 1, 0.17) -5px 5px 20px 20px, rgba(14, 14, 14, 0.22) -15px -11px 20px 5px' },
  M: { backgroundColor: '#f9d909', color: 'white', textAlign: 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer' },
  H: { backgroundColor: '#f99d09', color: 'white', textAlign: 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer' },
  Ha: { backgroundColor: '#f99d09', color: 'white', textAlign: 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer', border: '3px dashed', boxShadow: 'rgba(14, 1, 1, 0.17) -5px 5px 20px 20px, rgba(14, 14, 14, 0.22) -15px -11px 20px 5px' },
  VH: { backgroundColor: '#f90909', color: 'white', textAlign: 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer' },
  VHa: { backgroundColor: '#f90909', color: 'white', textAlign: 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer', border: '3px dashed', boxShadow: 'rgba(14, 1, 1, 0.17) -5px 5px 20px 20px, rgba(14, 14, 14, 0.22) -15px -11px 20px 5px' },
  L: { backgroundColor: '#4c7c04', color: 'white', textAlign: 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer' },
  La: { backgroundColor: '#4c7c04', color: 'white', textAlign: 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer', border: '3px dashed', boxShadow: 'rgba(14, 1, 1, 0.17) -5px 5px 20px 20px, rgba(14, 14, 14, 0.22) -15px -11px 20px 5px' },
  headerCell: { fontWeight: 700, textAlign: 'center', fontSize: '12px' },
  td: { fontSize: '12px', textAlign: 'center' },
};

// Table data structure
const tableData = [
  { likelihood: '5', description: 'It is or has already happened', risks: ['M', 'H', 'H', 'VH', 'VH'], styles: ['Ma', 'Ha', 'Ha', 'VHa', 'VHa'] },
  { likelihood: '4', description: 'It will probably happen', risks: ['M', 'M', 'H', 'VH', 'VH'], styles: ['Ma', 'Ma', 'Ha', 'VHa', 'VHa'] },
  { likelihood: '3', description: 'It could possibly happen', risks: ['L', 'M', 'M', 'H', 'H'], styles: ['La', 'Ma', 'Ma', 'Ha', 'Ha'] },
  { likelihood: '2', description: 'It is unlikely to happen', risks: ['L', 'L', 'M', 'M', 'H'], styles: ['La', 'La', 'Ma', 'Ma', 'Ha'] },
  { likelihood: '1', description: 'It is very unlikely to happen', risks: ['L', 'L', 'L', 'M', 'M'], styles: ['La', 'La', 'La', 'Ma', 'Ma'] },
];

const outcomeData = [
  { category: 'SAFETY', outcomes: ['Near Miss', 'Minor Injury', 'Lost Time Accident', 'Major Injury', 'Fatality'] },
  { category: 'ENVIRONMENT', outcomes: ['Potential Event', 'Minor Event', 'Important Event', 'Significant Event', 'Major Event'] },
  { category: 'COST', outcomes: ['< 1k $', '< 10k $', '< 100k $', '< 300k $', '> 500k $'] },
];

const severityLevels = [
  { value: '1', bg: '#4c7c04' },
  { value: '2', bg: '#4c7c04' },
  { value: '3', bg: '#f9d909' },
  { value: '4', bg: '#f99d09' },
  { value: '5', bg: '#f90909' },
];

const RiskAssessmentModal: React.FC<RiskAssessmentModalProps> = ({
  opened,
  onClose,
  setSelectedLikelihood,
  setSelectedSeverity,
  onSetRisk,
  selectedLikelihood,
  selectedSeverity,
}) => {
  const [selectedCellIndex, setSelectedCellIndex] = useState<{ row: number | null; col: number | null }>({ row: null, col: null });

  // Memoize the cell click handler to prevent unnecessary re-renders
  const handleCellClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      setSelectedCellIndex({ row: rowIndex, col: colIndex });
      const likelihood = tableData[rowIndex - 1].likelihood; // Row index starts at 1 for cells
      const severity = (colIndex).toString(); // Col index starts at 1 for severity
      setSelectedLikelihood(likelihood);
      setSelectedSeverity(severity);
    },
    [setSelectedLikelihood, setSelectedSeverity]
  );

  // Memoize the renderRiskCell function to avoid re-creating it on every render
  const renderRiskCell = useCallback(
    (riskType: string, rowIndex: number, colIndex: number, styleKey: RiskType) => {
      const isSelected = selectedCellIndex.row === rowIndex && selectedCellIndex.col === colIndex;
      return (
        <Table.Td
          style={isSelected ? riskStyles[styleKey] : riskStyles[riskType as RiskType]}
          onClick={() => handleCellClick(rowIndex, colIndex)}
        >
          {riskType}
        </Table.Td>
      );
    },
    [selectedCellIndex, handleCellClick]
  );

  // Memoize table rows to prevent unnecessary re-rendering
  const likelihoodRows = useMemo(
    () =>
      tableData.map((row, rowIndex) => (
        <Table.Tr key={row.likelihood}>
          {rowIndex === 0 && (
            <Table.Td rowSpan={5} style={riskStyles.headerCell}>
              <Text fz="13px">LIKELIHOOD OF EVENT HAPPENING</Text>
            </Table.Td>
          )}
          <Table.Td style={riskStyles.td} w="4%">
            {row.likelihood}
          </Table.Td>
          <Table.Td style={riskStyles.td} fz="13px">
            {row.description}
          </Table.Td>
          {row.risks.map((risk, colIndex) =>
            renderRiskCell(risk, rowIndex + 1, colIndex + 1, row.styles[colIndex] as RiskType)
          )}
        </Table.Tr>
      )),
    [renderRiskCell]
  );

  const outcomeRows = useMemo(
    () =>
      outcomeData.map((row, rowIndex) => (
        <Table.Tr key={row.category}>
          {rowIndex === 0 && (
            <Table.Td rowSpan={3} style={riskStyles.headerCell}>
              <Text fz="13px">LIKELY OUTCOME OF EVENT</Text>
            </Table.Td>
          )}
          <Table.Td colSpan={2} style={riskStyles.headerCell}>
            <Text fz="13px">{row.category}</Text>
          </Table.Td>
          {row.outcomes.map((outcome, colIndex) => (
            <Table.Td key={colIndex} style={riskStyles.td} fz="13px">
              {outcome}
            </Table.Td>
          ))}
        </Table.Tr>
      )),
    []
  );

  const severityRow = useMemo(
    () => (
      <Table.Tr>
        <Table.Td />
        <Table.Td colSpan={2} style={riskStyles.headerCell}>
          <Text fz="13px">SEVERITY</Text>
        </Table.Td>
        {severityLevels.map((level, index) => (
          <Table.Td key={index} bg={level.bg} style={riskStyles.number}>
            {level.value}
          </Table.Td>
        ))}
      </Table.Tr>
    ),
    []
  );

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fz="17px" fw={600} c="#6c757d">Risk Assessment Matrix</Text>}
      size="lg"
      radius={8}
      className="risk-assessment-modal"
    >
      <div className="modal-body">
        {/* Display selected Likelihood and Severity */}
        <Group mb="md" style={{ justifyContent: "space-between" }}>
          <Text fz="13px" fw={500}>
            Selected Likelihood: {selectedLikelihood || "N/A"}
          </Text>
          <Text fz="13px" fw={500}>
            Selected Severity: {selectedSeverity || "N/A"}
          </Text>
        </Group>

        <div className="mb-3">
          <Table withTableBorder withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th />
                <Table.Th colSpan={2} style={riskStyles.headerCell}>
                  <Text fz="13px">STATUS OF EVENT</Text>
                </Table.Th>
                <Table.Th colSpan={5} style={riskStyles.headerCell}>
                  <Text fz="13px">RISK CLASS</Text>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {likelihoodRows}
              {outcomeRows}
              {severityRow}
            </Table.Tbody>
          </Table>
        </div>
      </div>
      <div className="modal-footer" style={{ display: "flex", justifyContent: "flex-end", gap: "10px", padding: "10px" }}>
        <Button
          variant="filled"
          color="blue"
          onClick={onSetRisk}
          style={{ fontSize: "13px", padding: "6px 12px" }}
        >
          Set Risk
        </Button>
        <Button
          variant="filled"
          color="gray"
          onClick={onClose}
          style={{ fontSize: "13px", padding: "6px 12px" }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default RiskAssessmentModal;