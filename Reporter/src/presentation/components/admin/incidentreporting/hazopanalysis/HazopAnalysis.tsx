import React, { useState } from 'react';
import DynamicForm from '@/presentation/components/input/DynamicForm';
import {  Stack,  Text, Table, Button, FileInput, ActionIcon, Flex, TextInput } from '@mantine/core';
import { formFieldsHAZOP } from '@/data/formCreate';
import { Folder2, Trash } from 'iconsax-react';

const HazopAnalysis = () => {

  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]); // To track file names displayed below input
  const [teamMembers, setTeamMembers] = useState<{ name: string; department: string; role: string; companyName: string }[]>([]);

  const handleFormSubmit = (formData: Record<string, string | number | File[]>) => {
    console.log('Form Submitted Data:', formData);
  };



  const handleFileChange = (newFiles: File[] | null) => {
    if (newFiles && newFiles.length > 0) {
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      setFileNames((prevNames) => [
        ...prevNames,
        ...newFiles.map((file) => file.name),
      ]);
    } else {
      // Clear files and fileNames when no files are selected
      setFiles([]);
      setFileNames([]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index)); // Remove file at the specified index
    setFileNames(fileNames.filter((_, i) => i !== index)); // Remove name at the specified index
  };
  const removeTeamMember = (index: number) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };
  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      { name: '', department: '', role: '', companyName: '' },
    ]);
  };
  return (
    <Stack>
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
        HAZOP Analysis
      </Text>

      <Stack className="BoxTableForms" p={'1em'}>
        <DynamicForm
          buttonanme="Create New HAZOP"
          fields={formFieldsHAZOP}
          onSubmit={handleFormSubmit}
        >
          <Stack>
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
                    
                                <Button w={'9%'} bg={"#6c757d"} onClick={addTeamMember}>
                                  <Text fz={'12px'}>Add Member</Text>
                                </Button>
                    
                    </Stack>
            <Text
              ff={'"Roboto",sans-serif'}
              fw={'600'}
              c={'rgb(108 117 125 / 76%)'}
              fz={'12px'}
            >
              Attach Files
            </Text>

            {/* File Input */}
            <FileInput
              placeholder={fileNames.length > 0 ? fileNames.join(', ') : "No file chosen"}
              multiple
              value={files} // The actual files array is passed to the value
              onChange={handleFileChange}
              rightSection={<Folder2 size="25" color="#868e96" variant="Bold" />}
              w={'50%'}
            />

            <Table>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th fz={'13px'} c={'rgb(34 34 34 / 58%)'}>Image</Table.Th>
                  <Table.Th fz={'13px'} c={'rgb(34 34 34 / 58%)'}>File Name</Table.Th>
                  <Table.Th fz={'13px'} c={'rgb(34 34 34 / 58%)'}>Size</Table.Th>
                  <Table.Th fz={'13px'} c={'rgb(34 34 34 / 58%)'}>Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {files.map((file, index) => (
                  <Table.Tr key={file.name}>
                    <Table.Td>
                      {/* Show image preview for image files */}
                      {file.type.startsWith('image/') && (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      )}
                    </Table.Td>
                    <Table.Td fz={'13px'} c={'rgb(34 34 34 / 58%)'}>{file.name}</Table.Td>
                    <Table.Td fz={'13px'} c={'rgb(34 34 34 / 58%)'}>{(file.size / 1024).toFixed(2)} KB</Table.Td>
                    <Table.Td>
                    <ActionIcon
                          variant="filled"
                          color="red"
                          w="25px"
                          h="20px"
                          onClick={() => removeFile(index)}
                        >
                          <Trash color="#fff" size="15" />
                        </ActionIcon>
                 
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>


          </Stack>
        </DynamicForm>
      </Stack>
    </Stack>
  );
};

export default HazopAnalysis;
