import React, { useState } from 'react';
import {
  Modal,
  Stack,
  Flex,
  Text,
  TextInput,
  Button,
  ActionIcon,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import DynamicForm from '@/presentation/components/input/DynamicForm';
import RiskAssessmentTable from './RiskAssessmentTable';
import { formFieldsRisk } from '@/data/formCreate';

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

interface ModelAddRiskProps {
  open: boolean;
  onClose: () => void;
  data: any;
}

const ModelAddRisk: React.FC<ModelAddRiskProps> = ({ open, onClose, data }) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(data.teamMembers || []);

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

  const handleRowsChange = (updatedRows: any[]) => {
    console.log('Updated Rows:', updatedRows);
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
          ff='"Roboto",sans-serif'
          fw="700"
          c="#6c757d"
          fz="18px"
        >
          Risk Assessment Matrix
        </Text>
      }
      fullScreen
      radius={0}
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
            ff='"Roboto",sans-serif'
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
            buttonanme="Submit Risk Assessment"
            fields={formFieldsRisk}
            onSubmit={handleFormSubmit}
          >
            <Stack>
              {/* Team Members Section */}
              <Text ff='"Roboto",sans-serif' fw="600" c="#6c757d" fz="13px">
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

              <Button w="8.5%" bg="#6c757d" onClick={addTeamMember}>
                <Text fz="11px">Add Member</Text>
              </Button>
            </Stack>

            {/* Risk Assessment Table */}
            <RiskAssessmentTable onRowsChange={handleRowsChange} />

            {/* File Input Section */}
            <Flex align="center" justify="space-between" w="100%">
              <div className="file-input-wrapper" style={{ width: '70%' }}>
                <label className="file-input-label">
                  <input type="file" className="file-input" />
                  Choose File
                </label>
                <span className="file-name">{"fileName"}</span>
              </div>
              <Button>
                <Text fz="13px">Download Risk Assessment Blank Template</Text>
              </Button>
            </Flex>
          </DynamicForm>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default ModelAddRisk;
