import React, { useState } from 'react';
import {
  Modal,
  Stack,
  Flex,
  Text,
  TextInput,
  Button,
  ActionIcon,
  Table,
  BackgroundImage,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import DynamicForm from '@/presentation/components/input/DynamicForm';
import RiskAssessmentTable from '../../incidentreporting/addlRisk/RiskAssessmentTable';
import { formFieldsHAZOP, formFieldsRisk } from '@/data/formCreate';
import DetailedHAZOPAnalysis from './DetailedHAZOPAnalysis';

interface TeamMember {
  name: string;
  department: string;
  role: string;
  companyName: string;
}

interface FormData {
  [key: string]: any;
  teamMembers: TeamMember[];
}

interface ModelHAZOPAnalysisProps {
  open: boolean;
  onClose: () => void;
  data?: FormData;
  isUpdte?: boolean;
}

const HAZOPAnalysisModel: React.FC<ModelHAZOPAnalysisProps> = ({ open, onClose, data, isUpdte }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(data?.teamMembers || []);
  const [files, setFiles] = useState<File[]>([]);

  const handleFormSubmit = (formData: Record<string, string | number | File[]>) => {
    console.log('Form Submitted Data:', formData);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; // Get the files
    if (files) {
      setFiles((prev) => [...prev, ...Array.from(files)]); // Ensure files is non-null
    }
  };
  

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };



  return (
    <Modal
    opened={open}
    onClose={onClose}
    title={
      <Text
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
        ff='"Roboto", sans-serif'
        fw="700"
        c="#6c757d"
        fz="18px"
      >
        HAZOP Analysis
      </Text>
    }
    fullScreen
    radius={0}
    styles={{
      body: {
        paddingTop:'1em',
        backgroundColor: '#f2f2f7', // Set the desired background color
      },
    }}
    transitionProps={{ transition: 'fade', duration: 200 }}
  >
      <Stack>
        {/* Header */}
        <Flex justify="space-between" align="center" wrap="wrap">
          <Text
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            ff='"Roboto", sans-serif'
            fw="600"
            c="#6c757d"
            fz="12px"
          >
            Risk Assessment Reference: [Reference Number]
          </Text>
        </Flex>

        {/* Form Section */}
        <Stack className="BoxTableForms" p="1em">
          <DynamicForm
            buttonanme={isUpdte ?'Update Information':''}
            fields={formFieldsHAZOP}
            onSubmit={handleFormSubmit}
          >
            <Stack>
              {/* Team Members Section */}
              <Text ff='"Roboto", sans-serif' fw="600" c="#6c757d" fz="13px">
                Team Members
              </Text>

              {teamMembers.map((member, index) => (
                <Flex align="center" justify="space-between" w="100%" key={index}>
                  <TextInput
                    variant="filled"
                    placeholder="Team Member Name"
                    w="25%"
                    value={member.name}
                    onChange={(e) =>
                      setTeamMembers((prev) =>
                        prev.map((m, i) =>
                          i === index ? { ...m, name: e.target.value } : m
                        )
                      )
                    }
                  />
                  <TextInput
                    variant="filled"
                    placeholder="Department"
                    w="25%"
                    value={member.department}
                    onChange={(e) =>
                      setTeamMembers((prev) =>
                        prev.map((m, i) =>
                          i === index ? { ...m, department: e.target.value } : m
                        )
                      )
                    }
                  />
                  <TextInput
                    variant="filled"
                    placeholder="Role"
                    w="10%"
                    value={member.role}
                    onChange={(e) =>
                      setTeamMembers((prev) =>
                        prev.map((m, i) =>
                          i === index ? { ...m, role: e.target.value } : m
                        )
                      )
                    }
                  />
                  <TextInput
                    variant="filled"
                    placeholder="Company Name"
                    w="25%"
                    value={member.companyName}
                    onChange={(e) =>
                      setTeamMembers((prev) =>
                        prev.map((m, i) =>
                          i === index ? { ...m, companyName: e.target.value } : m
                        )
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
                    <IconTrash size={15} />
                  </ActionIcon>
                </Flex>
              ))}

              {isUpdte && (
                <Button w="8.5%" bg="#6c757d" onClick={addTeamMember}>
                  <Text fz="11px">Add Member</Text>
                </Button>
              )}
            </Stack>

            {/* File Input and Table */}
            <Flex mt={'2em'} gap={'3em'} w="100%" direction={'column'}>
              <div className="file-input-wrapper" style={{ width: '70%' }}>
                <label className="file-input-label">
                  <input
                    type="file"
                    className="file-input"
                    multiple
                    onChange={handleFileChange}
                  />
                  Choose File
                </label>
                <span className="file-name">{"fileName"}</span>
              </div>

              <Table highlightOnHover withTableBorder withColumnBorders>
              <Table.Thead>
                  <Table.Tr>
                    <Table.Th fz={'13px'}>Image</Table.Th>
                    <Table.Th fz={'13px'}>File Name</Table.Th>
                    <Table.Th fz={'13px'}>Size</Table.Th>
                    <Table.Th fz={'13px'}>Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {files.map((file, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        {file.type.startsWith('image/') && (
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        )}
                      </Table.Td>
                      <Table.Td fz={'13px'}>{file.name}</Table.Td>
                      <Table.Td  fz={'13px'}>{(file.size / 1024).toFixed(2)} KB</Table.Td>
                      <Table.Td>
                        <Button
                          variant="subtle"
                          color="red"
                          onClick={() => removeFile(index)}
                        >
                          Remove
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Flex>
          </DynamicForm>
        </Stack>
        <Flex justify="space-between" align="center" wrap="wrap">
          <Text
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            ff='"Roboto", sans-serif'
            fw="600"
            c="#6c757d"
            fz="12px"
          >
Detailed HAZOP Analysis
          </Text>
        </Flex>
    


        <DetailedHAZOPAnalysis/>






      </Stack>
    </Modal>
  );
};

export default HAZOPAnalysisModel;
