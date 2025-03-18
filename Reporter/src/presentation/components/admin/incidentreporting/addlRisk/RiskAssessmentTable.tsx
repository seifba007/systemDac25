import React, { useState } from 'react';
import { Table, Button, TextInput, Select, Text, Box, Flex, ActionIcon, Center } from '@mantine/core';
import { Trash } from 'iconsax-react';

// Define the shape of each row
interface RiskAssessmentRow {
  activitySteps: string;
  hazardDescription: string;
  lossCategory: string;
  initialLikelihood: string;
  initialSeverity: string;
  preventionMeasures: string;
  mitigationMeasures: string;
  residualLikelihood: string;
  residualSeverity: string;
}
interface RiskAssessmentTableProps {
  onRowsChange?: (rows: RiskAssessmentRow[]) => void; // Callback function to pass rows to parent
}

const RiskAssessmentTable = ({ onRowsChange }: RiskAssessmentTableProps) => {
  // Initialize the rows state with a default empty row
  const [rows, setRows] = useState<RiskAssessmentRow[]>([
    {
      activitySteps: '',
      hazardDescription: '',
      lossCategory: '',
      initialLikelihood: '',
      initialSeverity: '',
      preventionMeasures: '',
      mitigationMeasures: '',
      residualLikelihood: '',
      residualSeverity: '',
    },
  ]);

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

  // Handle input change in each field
  const handleInputChange = (
    index: number,
    field: keyof RiskAssessmentRow,
    value: string
  ) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    if (onRowsChange) {
      onRowsChange(updatedRows);
    }
  };

  // Add a new row to the table
  const addNewRow = () => {
    const newRow: RiskAssessmentRow = {
      activitySteps: '',
      hazardDescription: '',
      lossCategory: '',
      initialLikelihood: '',
      initialSeverity: '',
      preventionMeasures: '',
      mitigationMeasures: '',
      residualLikelihood: '',
      residualSeverity: '',
    };

    setRows([...rows, newRow]);

    // Pass updated rows to parent component if onRowsChange function is provided
    if (onRowsChange) {
      onRowsChange([...rows, newRow]);
    }
  };
  // Delete a specific row
  const deleteRow = (index: number) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);

    // Pass updated rows to parent component if onRowsChange function is provided
    if (onRowsChange) {
      onRowsChange(updatedRows);
    }
  };

  // Function to calculate Risk Label and Background Color based on Likelihood and Severity
  const getRiskDetails = (likelihood: string, severity: string) => {
    const likelihoodValue = parseInt(likelihood, 10);
    const severityValue = parseInt(severity, 10);
  
    let totalRisk = likelihoodValue * severityValue;
    if (isNaN(totalRisk)) {
      totalRisk = 1;
    }
    let riskLabel = '';
    let backgroundColor = 'green'; // default color for L
    if (severityValue === 1) {
      riskLabel = `L (${totalRisk})`;
    } else if (severityValue === 2) {
      riskLabel = `L (${totalRisk})`;
    } else if (severityValue === 3) {
      riskLabel = `L (${totalRisk})`;
    } else if (severityValue === 4) {
      riskLabel = `L (${totalRisk})`;
    } else if (severityValue === 5) {
      riskLabel = `M (${totalRisk})`;
      backgroundColor = '#f9d909';
    }
    // Determine risk level and background color
    if (likelihoodValue === 1) {
      riskLabel = `L (${totalRisk})`;
    } else if (likelihoodValue === 2) {
      riskLabel = `L (${totalRisk})`;
    } else if (likelihoodValue === 3) {
      riskLabel = `L (${totalRisk})`;
    } else if (likelihoodValue === 4) {
      riskLabel = `L (${totalRisk})`;
    } else if (likelihoodValue === 5) {
      riskLabel = `M (${totalRisk})`;
      backgroundColor = '#f9d909';
    }

    // Check combined likelihood and severity for higher risk levels
    if (totalRisk >= 5 && totalRisk < 10) {
      riskLabel = `M (${totalRisk})`;
      backgroundColor = '#f9d909'; // M color
    } else if (totalRisk >= 10 && totalRisk < 15) {
      riskLabel = `H (${totalRisk})`;
      backgroundColor = '#f99d09'; // H color
    } else if (totalRisk >= 15) {
      riskLabel = `VH (${totalRisk})`;
      backgroundColor = '#f90909'; // VH color
    }

    return { riskLabel, backgroundColor };
  };

  return (
    <div>
      <Text c={'#6c757d'} fz={'17px'} fw={'600'} pb={'1em'}>
        Risk Assessment
      </Text>
      <Table  withTableBorder withColumnBorders>
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
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.map((row, index) => {
            const { riskLabel: initialRiskLabel, backgroundColor: initialBackgroundColor } = getRiskDetails(
              row.initialLikelihood,
              row.initialSeverity
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
                    value={row.initialLikelihood}
                    onChange={(value) => handleInputChange(index, 'initialLikelihood', value || '')}
                  />
                </Table.Td>
                <Table.Td w={'5%'}>
                  <Select
                    withCheckIcon={false}
                    data={severityOptions}
                    value={row.initialSeverity}
                    onChange={(value) => handleInputChange(index, 'initialSeverity', value || '')}
                  />
                </Table.Td>
                <Table.Td p={'0%'}>
                  {initialRiskLabel ? (
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
                      <Text fz={'14px'} fw={'600'}>{initialRiskLabel}</Text>
                    </Flex>
                  ) : null}
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
                  />
                </Table.Td>
                <Table.Td w={'5%'}>
                  <Select
                    withCheckIcon={false}
                    data={severityOptions}
                    value={row.residualSeverity}
                    onChange={(value) => handleInputChange(index, 'residualSeverity', value || '')}
                  />
                </Table.Td>
                <Table.Td p={'0%'}>
                  {residualRiskLabel ? (
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
                     <Text fz={'14px'} fw={'600'}>{residualRiskLabel}</Text>

                    </Flex>
                  ) : null}
                </Table.Td>
                <Table.Td>
                  <Center>
                    <ActionIcon variant="filled" color="red" w="25px" h="20px" onClick={() => deleteRow(index)}>
                      <Trash color="#fff" size="15" />
                    </ActionIcon>
                  </Center>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
      <Button onClick={addNewRow} style={{ marginTop: '16px' }}>
         <Text fz={'11px'}> Add Risk</Text>
      </Button>
    </div>
  );
};

export default RiskAssessmentTable;
