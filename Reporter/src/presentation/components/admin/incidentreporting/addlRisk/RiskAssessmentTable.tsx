import React, { useState, useEffect } from 'react';
import { Table, Button, TextInput, Select, Text, Flex, ActionIcon, Center, ScrollArea } from '@mantine/core';
import { Trash } from 'iconsax-react';

// Define the shape of each row, matching backend expectations
interface RiskAssessmentRow {
  activitySteps: string;
  hazardDescription: string;
  lossCategory: string;
  likelihood: string; // Initial Likelihood
  severity: string;   // Initial Severity
  preventionMeasures: string;
  mitigationMeasures: string;
  residualLikelihood: string;
  residualSeverity: string;
}

interface RiskAssessmentTableProps {
  onRowsChange?: (rows: RiskAssessmentRow[]) => void; // Callback to pass rows to parent
  initialRows?: RiskAssessmentRow[]; // New prop to set initial rows from parent
}

const RiskAssessmentTable: React.FC<RiskAssessmentTableProps> = ({ onRowsChange, initialRows }) => {
  // Initialize rows with an empty row or use initialRows if provided
  const [rows, setRows] = useState<RiskAssessmentRow[]>([
    {
      activitySteps: '',
      hazardDescription: '',
      lossCategory: '',
      likelihood: '',
      severity: '',
      preventionMeasures: '',
      mitigationMeasures: '',
      residualLikelihood: '',
      residualSeverity: '',
    },
  ]);

  // Sync rows with initialRows when it changes (e.g., after file upload)
  useEffect(() => {
    if (initialRows && initialRows.length > 0) {
      setRows(initialRows);
    }
  }, [initialRows]);

  const likelihoodOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

  const severityOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
  ];

  // Handle input change for any field
  const handleInputChange = (
    index: number,
    field: keyof RiskAssessmentRow,
    value: string
  ) => {
    const updatedRows = [...rows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setRows(updatedRows);
    if (onRowsChange) {
      onRowsChange(updatedRows);
    }
  };

  // Add a new row
  const addNewRow = () => {
    const newRow: RiskAssessmentRow = {
      activitySteps: '',
      hazardDescription: '',
      lossCategory: '',
      likelihood: '',
      severity: '',
      preventionMeasures: '',
      mitigationMeasures: '',
      residualLikelihood: '',
      residualSeverity: '',
    };
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    if (onRowsChange) {
      onRowsChange(updatedRows);
    }
  };

  // Delete a row
  const deleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    if (onRowsChange) {
      onRowsChange(updatedRows);
    }
  };

  // Calculate Risk Label and Background Color
  const getRiskDetails = (likelihood: string, severity: string) => {
    const likelihoodValue = parseInt(likelihood, 10) || 1;
    const severityValue = parseInt(severity, 10) || 1;
    const totalRisk = likelihoodValue * severityValue;

    let riskLabel = '';
    let backgroundColor = '#4c7c04'; // Green for Low (L)

    if (totalRisk <= 4) {
      riskLabel = `L (${totalRisk})`;
    } else if (totalRisk <= 9) {
      riskLabel = `M (${totalRisk})`;
      backgroundColor = '#f9d909'; // Yellow for Medium (M)
    } else if (totalRisk <= 14) {
      riskLabel = `H (${totalRisk})`;
      backgroundColor = '#f99d09'; // Orange for High (H)
    } else {
      riskLabel = `VH (${totalRisk})`;
      backgroundColor = '#f90909'; // Red for Very High (VH)
    }

    return { riskLabel, backgroundColor };
  };

  // Custom styles for the Select component
  const selectStyles = {
    input: {
      backgroundColor: '#f8f9fa',
      border: '1px solid #ced4da',
      borderRadius: '4px',
      color: '#6c757d',
      fontSize: '14px',
      fontFamily: "'Roboto', sans-serif",
      padding: '6px 10px',
      height: '36px',
      transition: 'border-color 0.3s, box-shadow 0.3s',
      '&:hover': {
        borderColor: '#6c757d',
      },
      '&:focus': {
        borderColor: '#6c757d',
        boxShadow: '0 0 0 2px rgba(108, 117, 125, 0.2)',
        outline: 'none',
      },
    },
    dropdown: {
      border: '1px solid #ced4da',
      borderRadius: '4px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    item: {
      padding: '8px 12px',
      fontSize: '14px',
      color: '#6c757d',
      fontFamily: "'Roboto', sans-serif",
      '&:hover': {
        backgroundColor: '#f1f3f5',
      },
      '&[data-selected]': {
        backgroundColor: '#6c757d',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#5a6268',
        },
      },
    },
    rightSection: {
      color: '#6c757d',
    },
  };

  return (
    <div>
      <Text c={'#6c757d'} fz={'17px'} fw={'600'} pb={'1em'}>
        Risk Assessment
      </Text>    <ScrollArea h={200} >
      <Table withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th rowSpan={2} c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Activity Steps
            </Table.Th>
            <Table.Th colSpan={2} c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Hazard
            </Table.Th>
            <Table.Th colSpan={3} c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Initial Risk
            </Table.Th>
            <Table.Th colSpan={2} c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Control Measures
            </Table.Th>
            <Table.Th colSpan={3} c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Residual Risk
            </Table.Th>
            <Table.Th rowSpan={2} c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Actions
            </Table.Th>
          </Table.Tr>
          <Table.Tr>
            <Table.Th c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Description & Worst Case
            </Table.Th>
            <Table.Th c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Loss Category
            </Table.Th>
            <Table.Th c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Likelihood
            </Table.Th>
            <Table.Th c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Severity
            </Table.Th>
            <Table.Th c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Risk Level
            </Table.Th>
            <Table.Th c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Prevention Measures
            </Table.Th>
            <Table.Th c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Mitigation Measures
            </Table.Th>
            <Table.Th c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Likelihood
            </Table.Th>
            <Table.Th c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Severity
            </Table.Th>
            <Table.Th c={'#6c757d'} fz={'12px'} style={{ textAlign: 'center' }}>
              Risk Level
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.map((row, index) => {
            const { riskLabel: initialRiskLabel, backgroundColor: initialBackgroundColor } = getRiskDetails(
              row.likelihood,
              row.severity
            );
            const { riskLabel: residualRiskLabel, backgroundColor: residualBackgroundColor } = getRiskDetails(
              row.residualLikelihood,
              row.residualSeverity
            );

            return (
              <Table.Tr key={index}>
                <Table.Td>
                  <TextInput
                    placeholder="Activity Steps"
                    value={row.activitySteps}
                    onChange={(e) => handleInputChange(index, 'activitySteps', e.target.value)}
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    placeholder="Hazard Description & Worst Case"
                    value={row.hazardDescription}
                    onChange={(e) => handleInputChange(index, 'hazardDescription', e.target.value)}
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    placeholder="Loss Category"
                    value={row.lossCategory}
                    onChange={(e) => handleInputChange(index, 'lossCategory', e.target.value)}
                  />
                </Table.Td>
                <Table.Td w={'5%'}>
                  <Select
                    withCheckIcon={false}
                    data={likelihoodOptions}
                    value={row.likelihood}
                    onChange={(value) => handleInputChange(index, 'likelihood', value || '')}
                    styles={selectStyles}
                  />
                </Table.Td>
                <Table.Td w={'5%'}>
                  <Select
                    withCheckIcon={false}
                    data={severityOptions}
                    value={row.severity}
                    onChange={(value) => handleInputChange(index, 'severity', value || '')}
                    styles={selectStyles}
                  />
                </Table.Td>
                <Table.Td p={'0'}>
                  {initialRiskLabel && (
                    <Flex
                      justify={'center'}
                      align={'center'}
                      style={{
                        backgroundColor: initialBackgroundColor,
                        color: 'white',
                        padding: '4px 8px',
                        textAlign: 'center',
                        height: '10vh',
                      }}
                    >
                      <Text fz={'14px'} fw={'600'}>
                        {initialRiskLabel}
                      </Text>
                    </Flex>
                  )}
                </Table.Td>
                <Table.Td>
                  <TextInput
                    placeholder="Prevention Measures"
                    value={row.preventionMeasures}
                    onChange={(e) => handleInputChange(index, 'preventionMeasures', e.target.value)}
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput
                    placeholder="Mitigation Measures"
                    value={row.mitigationMeasures}
                    onChange={(e) => handleInputChange(index, 'mitigationMeasures', e.target.value)}
                  />
                </Table.Td>
                <Table.Td w={'5%'}>
                  <Select
                    withCheckIcon={false}
                    data={likelihoodOptions}
                    value={row.residualLikelihood}
                    onChange={(value) => handleInputChange(index, 'residualLikelihood', value || '')}
                    styles={selectStyles}
                  />
                </Table.Td>
                <Table.Td w={'5%'}>
                  <Select
                    withCheckIcon={false}
                    data={severityOptions}
                    value={row.residualSeverity}
                    onChange={(value) => handleInputChange(index, 'residualSeverity', value || '')}
                    styles={selectStyles}
                  />
                </Table.Td>
                <Table.Td p={'0'}>
                  {residualRiskLabel && (
                    <Flex
                      justify={'center'}
                      align={'center'}
                      style={{
                        backgroundColor: residualBackgroundColor,
                        color: 'white',
                        padding: '4px 8px',
                        textAlign: 'center',
                        height: '10vh',
                      }}
                    >
                      <Text fz={'14px'} fw={'600'}>
                        {residualRiskLabel}
                      </Text>
                    </Flex>
                  )}
                </Table.Td>
                <Table.Td>
                  <Center>
                    <ActionIcon
                      variant="filled"
                      color="red"
                      w="25px"
                      h="20px"
                      onClick={() => deleteRow(index)}
                    >
                      <Trash color="#fff" size="15" />
                    </ActionIcon>
                  </Center>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>    </ScrollArea>
      <Button onClick={addNewRow} style={{ marginTop: '16px' }}>
        <Text fz={'11px'}>Add Risk</Text>
      </Button>
    </div>
  );
};

export default RiskAssessmentTable;