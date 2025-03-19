import React, { useState } from 'react';
import DynamicForm from '@/presentation/components/input/DynamicForm';
import { Stack, Text, Button, Flex, TextInput, ActionIcon } from '@mantine/core';
import { formFieldsRisk } from '@/data/formCreate';
import { Trash } from 'iconsax-react';
import RiskAssessmentTable from './RiskAssessmentTable';
import { useAppSelector } from '@/core/store/hooks';
import { createRiskAssessment } from '@/core/services/modulesServices/riskassessment.service';
import * as XLSX from 'xlsx'; // Import xlsx library
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import toast from 'react-hot-toast';

// Define interfaces
interface TeamMember {
  name: string;
  department: string;
  role: string;
  companyName: string;
}

interface RiskAssessmentRow {
  activitySteps: string;
  hazardDescription: string;
  lossCategory: string;
  likelihood: string;
  severity: string;
  preventionMeasures: string;
  mitigationMeasures: string;
  residualLikelihood: string;
  residualSeverity: string;
}

interface FormData {
  assessmentTitle?: string;
  projectID?: string;
  client?: string;
  assessmentDate?: string;
  location?: string;
  businessDepartment?: string;
  assessmentOverview?: string;
  assessmentStatus?: string;
  [key: string]: string | number | File[] | undefined;
}

interface RiskAssessmentPayload {
  assessmentTitle: string;
  projectID: string;
  client: string;
  assessmentDate: string;
  location: string;
  businessDepartment: string;
  assessmentOverview: string;
  assessmentStatus: string;
  assessmentTeam: { name: string; memberID: string | null; department: string; role: string; company: string }[];
  riskAssessment: RiskAssessmentRow[];
}

interface User {
  token?: string;
  organization?: string;
  [key: string]: any;
}

const AddlRisk: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [riskAssessmentRows, setRiskAssessmentRows] = useState<RiskAssessmentRow[]>([]);
  const [fileName, setFileName] = useState<string>('No file chosen'); // State to display selected file name
  const user = useAppSelector(selectConnectedUser);

  const handleFormSubmit = async (formData: FormData) => {
    const payload: RiskAssessmentPayload = {
      assessmentTitle: formData.assessmentTitle || '',
      projectID: formData.projectID || '',
      client: formData.client || '',
      assessmentDate: formData.assessmentDate || new Date().toISOString(),
      location: formData.location || '',
      businessDepartment: formData.businessDepartment || '',
      assessmentOverview: formData.assessmentOverview || '',
      assessmentStatus: formData.assessmentStatus || 'Draft',
      assessmentTeam: teamMembers.map((member) => ({
        name: member.name,
        memberID: null,
        department: member.department,
        role: member.role,
        company: member.companyName,
      })),
      riskAssessment: riskAssessmentRows,
    };

    toast.success('Form Submitted Data:');

    try {
      if (!user?.organization) throw new Error('User organization is not available');
      const response = await createRiskAssessment(payload, user.organization);
      toast.success('Risk Assessment created successfully:');
    } catch (error) {
      console.error('Failed to create risk assessment:', error);
    }
  };

  const addTeamMember = () => {
    setTeamMembers((prev) => [
      ...prev,
      { name: '', department: '', role: '', companyName: '' },
    ]);
  };

  const removeTeamMember = (index: number) => {
    setTeamMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRowsChange = (updatedRows: RiskAssessmentRow[]) => {
    setRiskAssessmentRows(updatedRows);
   
  };

  // Handle file upload and process Excel data
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert('No file selected.');
      return;
    }

    // Update file name for display
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) throw new Error('Failed to read file data.');

        // Read the Excel file
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        if (!sheetName) throw new Error('No sheets found in the Excel file.');

        // Convert sheet to JSON with headers
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

        // Extract headers and data rows
        const headers = worksheet[0] as string[];
        const rows = worksheet.slice(1) as any[][];

        // Define expected columns based on the table
        const expectedHeaders = [
          'Loss Category',
          'Initial Likelihood',
          'Initial Severity',
          'Prevention Measures',
          'Mitigation Measures',
          'Residual Likelihood',
          'Residual Severity',
        ];

        // Validate headers
        const missingHeaders = expectedHeaders.filter(header => !headers.includes(header));
        if (missingHeaders.length > 0) {
          alert(`Missing required columns: ${missingHeaders.join(', ')}`);
          return;
        }

        // Map Excel rows to RiskAssessmentRow
        const formattedRows: RiskAssessmentRow[] = rows
          .filter(row => row.some(cell => cell !== undefined && cell !== '')) // Filter out completely empty rows
          .map(row => {
            const rowData: { [key: string]: string } = {};
            headers.forEach((header, index) => {
              rowData[header] = row[index] !== undefined ? row[index].toString() : '';
            });
            return {
              activitySteps: rowData['Activity Steps'] || '', // Include if present in Excel
              hazardDescription: rowData['Description & Worst Case'] || '', // Include if present in Excel
              lossCategory: rowData['Loss Category'] || '',
              likelihood: rowData['Initial Likelihood'] || '1',
              severity: rowData['Initial Severity'] || '1',
              preventionMeasures: rowData['Prevention Measures'] || '',
              mitigationMeasures: rowData['Mitigation Measures'] || '',
              residualLikelihood: rowData['Residual Likelihood'] || '1',
              residualSeverity: rowData['Residual Severity'] || '1',
            };
          })
          .filter(row => row.lossCategory); // Ensure lossCategory is not empty

        if (formattedRows.length === 0) {
          toast.error('No valid data found in the Excel file.');
          return;
        }
        setRiskAssessmentRows(formattedRows);
        toast.success('File uploaded and data processed successfully!');
      } catch (error) {
        console.error('Error processing Excel file:', error);
      }
    };
    reader.onerror = () => {
      toast.error('Error reading file.');
    };
    reader.readAsBinaryString(file);
  };

  // Handle download of template from public folder
  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '/SmarDac_Reporter_Risk_Assessment_Template.xlsx';
    link.download = 'SmarDac_Reporter_Risk_Assessment_Template.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Stack>
      <Flex justify={'space-between'} align={'center'} wrap={'wrap'}>
        <Text
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          ff={'"Roboto",sans-serif'}
          fw={'700'}
          c={'#6c757d'}
          fz={'18px'}
        >
          Risk Assessment Matrix
        </Text>
        <Text
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
          ff={'"Roboto",sans-serif'}
          fw={'600'}
          c={'#6c757d'}
          fz={'12px'}
        >
          Risk Assessment Reference: [Reference Number]
        </Text>
      </Flex>

      <Stack className="BoxTableForms" p={'1em'}>
        <DynamicForm
          buttonanme="Submit Risk Assessment"
          fields={formFieldsRisk}
          onSubmit={handleFormSubmit}
        >
          <Stack>
            <Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'13px'}>
              Team Members
            </Text>
            {teamMembers.map((member, index) => (
              <Flex align={'center'} justify={'space-between'} w={'100%'} key={index}>
                <TextInput
                  placeholder="Team Member Name"
                  w={'25%'}
                  value={member.name}
                  onChange={(e) =>
                    setTeamMembers((prev) =>
                      prev.map((m, i) => (i === index ? { ...m, name: e.target.value } : m))
                    )
                  }
                />
                <TextInput
                  placeholder="Department"
                  w={'25%'}
                  value={member.department}
                  onChange={(e) =>
                    setTeamMembers((prev) =>
                      prev.map((m, i) => (i === index ? { ...m, department: e.target.value } : m))
                    )
                  }
                />
                <TextInput
                  placeholder="Role"
                  w={'10%'}
                  value={member.role}
                  onChange={(e) =>
                    setTeamMembers((prev) =>
                      prev.map((m, i) => (i === index ? { ...m, role: e.target.value } : m))
                    )
                  }
                />
                <TextInput
                  placeholder="Company Name"
                  w={'25%'}
                  value={member.companyName}
                  onChange={(e) =>
                    setTeamMembers((prev) =>
                      prev.map((m, i) => (i === index ? { ...m, companyName: e.target.value } : m))
                    )
                  }
                />
                <ActionIcon
                  variant="filled"
                  color="red"
                  w="25px"
                  h="20px"
                  onClick={() => removeTeamMember(index)}
                >
                  <Trash color="#fff" size="15" />
                </ActionIcon>
              </Flex>
            ))}
            <Button w={'10%'} bg={'#6c757d'} onClick={addTeamMember}>
              <Text fz={'11px'}>Add Member</Text>
            </Button>
          </Stack>

          <RiskAssessmentTable onRowsChange={handleRowsChange} initialRows={riskAssessmentRows} />

          <Flex align={'center'} gap="1em" w={'100%'}>
            <div className="file-input-wrapper" style={{ width: '75%' }}>
              <label className="file-input-label">
                <input
                  type="file"
                  className="file-input"
                  accept=".xls,.xlsx"
                  onChange={handleFileUpload}
                />
                <span className="file-input-button">Choose File</span>
              </label>
              <span className="file-name">{fileName}</span>
            </div>
            <Button leftSection={<i className="fas fa-file-excel"></i>} onClick={handleDownloadTemplate}>
              <Text fz={'13px'}>Download Risk Assessment blank Template</Text>
            </Button>
          </Flex>
        </DynamicForm>
      </Stack>

      {/* Inline styles for the file input */}
      <style >{`
        .file-input-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .file-input-label {
          position: relative;
          display: inline-block;
        }

        .file-input {
          opacity: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .file-input-button {
          display: inline-block;
          padding: 8px 16px;
          background-color: #6c757d;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 13px;
          font-family: 'Roboto', sans-serif;
          transition: background-color 0.3s;
        }

        .file-input-button:hover {
          background-color: #5a6268;
        }

        .file-name {
          font-size: 13px;
          color: #6c757d;
          font-family: 'Roboto', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 200px;
        }
      `}</style>
    </Stack>
  );
};

export default AddlRisk;