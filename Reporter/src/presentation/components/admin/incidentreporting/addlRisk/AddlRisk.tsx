import React, { useState } from 'react';
import DynamicForm from '@/presentation/components/input/DynamicForm';
import { MultiSelect, Stack, Switch, Text, Table, Button, FileInput, Flex, TextInput, ActionIcon } from '@mantine/core';
import { formFieldsReport, formFieldsRisk } from '@/data/formCreate';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Folder2, Trash } from 'iconsax-react';
import RiskAssessmentTable from './RiskAssessmentTable';

const AddlRisk = () => {
  const [teamMembers, setTeamMembers] = useState<{ name: string; department: string; role: string; companyName: string }[]>([]);

  const handleFormSubmit = (formData: Record<string, string | number | File[]>) => {
    console.log('Form Submitted Data:', formData);
  };

  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      { name: '', department: '', role: '', companyName: '' },
    ]);
  };

  const removeTeamMember = (index: number) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  const handleRowsChange = (updatedRows: any[]) => {
    console.log(updatedRows); // Access the updated rows data here
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
                     {/* Team Members Section */}
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
                               prev.map((m, i) =>
                                 i === index ? { ...m, name: e.target.value } : m
                               )
                             )
                           }
                         />
                         <TextInput
                           placeholder="Department"
                           w={'25%'}
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
                           placeholder="Role"
                           w={'10%'}
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
                           placeholder="Company Name"
                           w={'25%'}
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
                           <Trash color="#fff" size="15" />
                         </ActionIcon>
                       </Flex>
                     ))}
                     
                                 <Button w={'8.5%'} bg={"#6c757d"} onClick={addTeamMember}>
                                   <Text fz={'11px'}>Add Member</Text>
                                 </Button>
                     
                 </Stack>
                 <RiskAssessmentTable onRowsChange={handleRowsChange}/>
              <Flex align={'center'} justify={'space-between'} w={'100%'}>
              <div className="file-input-wrapper" style={{width:'75%'}}>
      <label className="file-input-label">
        <input
          type="file"
          className="file-input"
        />
        Choose File
      </label>
      <span className="file-name">{"fileName"}</span>
    </div> 
    <Button leftSection={<i className="fas fa-file-excel"></i>}>  <Text fz={"13px"}>Download Risk Assessment blank Template</Text>
    </Button>
              </Flex>
        </DynamicForm>
      </Stack>
    </Stack>
  );
};

export default AddlRisk;
