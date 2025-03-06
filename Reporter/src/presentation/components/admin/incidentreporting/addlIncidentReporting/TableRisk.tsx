import React, { useState } from 'react';
import { Table, Text } from '@mantine/core';

// Updated styles directly inside the component
const TableRisk: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [selectedCellIndex, setSelectedCellIndex] = useState<{ row: number | null, col: number | null }>({ row: 1, col: 1 });

  // Styles for the different risk levels
  const riskStyles = {
    number: { backgroundColor: '#f99d09', color: 'white', textAlign: 'center' as 'center', fontSize: '12px', padding: '2%', height: '50px', fontWeight: 550, cursor: 'pointer' },
    Ma: { backgroundColor: '#f9d909', color: 'white', textAlign: 'center' as 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer', border: '3px dashed', boxShadow: 'rgba(14, 1, 1, 0.17) -5px 5px 20px 20px, rgba(14, 14, 14, 0.22) -15px -11px 20px 5px' },
    M: { backgroundColor: '#f9d909', color: 'white', textAlign: 'center' as 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer' },
    H: { backgroundColor: '#f99d09', color: 'white', textAlign: 'center' as 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer' },
    Ha: { backgroundColor: '#f99d09', color: 'white', textAlign: 'center' as 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer', border: '3px dashed', boxShadow: 'rgba(14, 1, 1, 0.17) -5px 5px 20px 20px, rgba(14, 14, 14, 0.22) -15px -11px 20px 5px' },
    VH: { backgroundColor: '#f90909', color: 'white', textAlign: 'center' as 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer' },
    VHa: { backgroundColor: '#f90909', color: 'white', textAlign: 'center' as 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer', border: '3px dashed', boxShadow: 'rgba(14, 1, 1, 0.17) -5px 5px 20px 20px, rgba(14, 14, 14, 0.22) -15px -11px 20px 5px' },
    L: { backgroundColor: '#4c7c04', color: 'white', textAlign: 'center' as 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer' },
    La: { backgroundColor: '#4c7c04', color: 'white', textAlign: 'center' as 'center', fontSize: '12px', padding: '2%', height: '60px', fontWeight: 550, cursor: 'pointer', border: '3px dashed', boxShadow: 'rgba(14, 1, 1, 0.17) -5px 5px 20px 20px, rgba(14, 14, 14, 0.22) -15px -11px 20px 5px' },
    headerCell: { fontWeight: 700, textAlign: 'center' as 'center', fontSize: '12px' },
    td: { fontSize: '12px', textAlign: 'center' as 'center' },
  };

  // Handle cell click to change the style and capture index
  const handleCellClick = (riskType: string, rowIndex: number, colIndex: number) => {
    setSelectedCell(riskType);
    setSelectedCellIndex({ row: rowIndex, col: colIndex }); // Store both row and column indices
  };

  // Function to render a risk level cell
  // Function to render a risk level cell
  const renderRiskCell = (riskType: string, rowIndex: number, colIndex: number, style: any) => (
    <Table.Td
      style={
        selectedCellIndex.row === rowIndex && selectedCellIndex.col === colIndex
          ? style
          : riskStyles[riskType as keyof typeof riskStyles]
      }
      onClick={() => handleCellClick(riskType, rowIndex, colIndex)}
    >
      {riskType}
    </Table.Td>
  );


  return (
    <Table withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th></Table.Th>
          <Table.Th colSpan={2} style={riskStyles.headerCell}>
            <Text fz={'13px'}>STATUS OF EVENT</Text>
          </Table.Th>
          <Table.Th colSpan={5} style={riskStyles.headerCell}>
            <Text fz={'13px'}>RISK CLASS</Text>
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td rowSpan={5} style={riskStyles.td}>
            <Text fz={'13px'}>LIKELIHOOD OF EVENT HAPPENING</Text>
          </Table.Td>
          <Table.Td style={riskStyles.td} w={'4%'} >5</Table.Td>
          <Table.Td style={riskStyles.td} fz={'13px'}>It is or has already happened</Table.Td>
          {renderRiskCell('M', 1, 1, riskStyles.Ma)}
          {renderRiskCell('H', 1, 2, riskStyles.Ha)}
          {renderRiskCell('H', 1, 3, riskStyles.Ha)}
          {renderRiskCell('VH', 1, 4, riskStyles.VHa)}
          {renderRiskCell('VH', 1, 5, riskStyles.VHa)}
        </Table.Tr>
        <Table.Tr>
          <Table.Td style={riskStyles.td}>4</Table.Td>
          <Table.Td style={riskStyles.td}>It will probably happen</Table.Td>
          {renderRiskCell('M', 2, 1, riskStyles.Ma)}
          {renderRiskCell('M', 2, 2, riskStyles.Ma)}
          {renderRiskCell('H', 2, 3, riskStyles.Ha)}
          {renderRiskCell('VH', 2, 4, riskStyles.VHa)}
          {renderRiskCell('VH', 2, 5, riskStyles.VHa)}
        </Table.Tr>
        <Table.Tr>
          <Table.Td style={riskStyles.td}>3</Table.Td>
          <Table.Td style={riskStyles.td} fz={'13px'}>It could possibly happen</Table.Td>
          {renderRiskCell('L', 3, 1, riskStyles.La)}
          {renderRiskCell('M', 3, 2, riskStyles.Ma)}
          {renderRiskCell('M', 3, 3, riskStyles.Ma)}
          {renderRiskCell('H', 3, 4, riskStyles.Ha)}
          {renderRiskCell('H', 3, 5, riskStyles.Ha)}
        </Table.Tr>
        <Table.Tr>
          <Table.Td style={riskStyles.td}>2</Table.Td>
          <Table.Td style={riskStyles.td} fz={'13px'}>It is unlikely to happen</Table.Td>
          {renderRiskCell('L', 4, 1, riskStyles.La)}
          {renderRiskCell('L', 4, 2, riskStyles.La)}
          {renderRiskCell('M', 4, 3, riskStyles.Ma)}
          {renderRiskCell('M', 4, 4, riskStyles.Ma)}
          {renderRiskCell('H', 4, 5, riskStyles.Ha)}
        </Table.Tr>
        <Table.Tr>
          <Table.Td style={riskStyles.td}>1</Table.Td>
          <Table.Td style={riskStyles.td} fz={'13px'}>It is very unlikely to happen</Table.Td>
          {renderRiskCell('L', 5, 1, riskStyles.La)}
          {renderRiskCell('L', 5, 2, riskStyles.La)}
          {renderRiskCell('L', 5, 3, riskStyles.La)}
          {renderRiskCell('M', 5, 4, riskStyles.Ma)}
          {renderRiskCell('M', 5, 5, riskStyles.Ma)}
        </Table.Tr>

        {/* Outcome Rows */}
        <Table.Tr>
          <Table.Td rowSpan={3} style={riskStyles.headerCell}>
            <Text fz={'13px'}>LIKELY OUTCOME OF EVENT</Text>
          </Table.Td>
          <Table.Td colSpan={2} style={riskStyles.headerCell}>
            <Text fz={'13px'}>SAFETY</Text>
          </Table.Td>
          <Table.Td style={riskStyles.td}fz={'13px'}>Near Miss</Table.Td>
          <Table.Td style={riskStyles.td}fz={'13px'}>Minor Injury</Table.Td>
          <Table.Td style={riskStyles.td}fz={'13px'}>Lost Time Accident</Table.Td>
          <Table.Td style={riskStyles.td}fz={'13px'}>Major Injury</Table.Td>
          <Table.Td style={riskStyles.td}fz={'13px'}>Fatality</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td colSpan={2} style={riskStyles.headerCell}>
            <Text fz={'13px'}>ENVIRONMENT</Text>
          </Table.Td>
          <Table.Td style={riskStyles.td}fz={'13px'}>Potential Event</Table.Td>
          <Table.Td style={riskStyles.td}fz={'13px'}>Minor Event</Table.Td>
          <Table.Td style={riskStyles.td}fz={'13px'}>Important Event</Table.Td>
          <Table.Td style={riskStyles.td}fz={'13px'}>Significant Event</Table.Td>
          <Table.Td style={riskStyles.td}fz={'13px'}>Major Event</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td colSpan={2} style={riskStyles.headerCell}>
            <Text>COST</Text>
          </Table.Td>
          <Table.Td style={riskStyles.td}>{'< 1k $'}</Table.Td>
          <Table.Td style={riskStyles.td}>{'< 10k $'}</Table.Td>
          <Table.Td style={riskStyles.td}>{'< 100k $'}</Table.Td>
          <Table.Td style={riskStyles.td}>{'< 300k $'}</Table.Td>
          <Table.Td style={riskStyles.td}>{'> 500k $'}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td></Table.Td>
          <Table.Td colSpan={2} style={riskStyles.headerCell}>
            <Text fz={'13px'}>SEVERITY</Text>
          </Table.Td>
          <Table.Td bg={'#4c7c04 '} style={riskStyles.number}>1</Table.Td>
          <Table.Td bg={'#4c7c04 '} style={riskStyles.number}>2</Table.Td>
          <Table.Td bg={'#f9d909'} style={riskStyles.number}>3</Table.Td>
          <Table.Td bg={'#f99d09'} style={riskStyles.number}>4</Table.Td>
          <Table.Td bg={'#f90909'} style={riskStyles.number}>5</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
};

export default TableRisk;
