import React, { useState } from 'react';
import DynamicForm from '@/presentation/components/input/DynamicForm';
import { MultiSelect, Stack, Switch, Text, Table, Button, FileInput, Flex, TextInput, ActionIcon, Textarea } from '@mantine/core';
import { formFieldsMeetingReport } from '@/data/formCreate';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Folder2, Trash } from 'iconsax-react';
import TableSection from '@/presentation/tablesection/TableSection';

const AddlMeetingReport = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]); // To track file names displayed below input
  const [teamMembers, setTeamMembers] = useState<{ name: string; department: string; role: string; companyName: string }[]>([]);
  const [agendaItems, setAgendaItems] = useState<{ agendaItem: string; presenter: string; timeAllocated: string }[]>([]);

  const handleFormSubmit = (formData: Record<string, string | number | File[]>) => {
    console.log('Form Submitted Data:', formData);
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    setChecked(isChecked);
    if (!isChecked) {
      setSelectedValues([]); // Clear selected values when disabling MultiSelect
    }
  };
  const data = ['Status', 'Description', 'Assigned To	', 'Priority', 'Due Date', '	Control Date', 'Efficiency Check'];

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

  // Add Team Member
  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      { name: '', department: '', role: '', companyName: '' },
    ]);
  };

  // Remove Team Member
  const removeTeamMember = (index: number) => {
    const updatedMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(updatedMembers);
  };

  // Add Agenda Item
  const addAgendaItem = () => {
    setAgendaItems([
      ...agendaItems,
      { agendaItem: '', presenter: '', timeAllocated: '' },
    ]);
  };

  // Remove Agenda Item
  const removeAgendaItem = (index: number) => {
    const updatedAgenda = agendaItems.filter((_, i) => i !== index);
    setAgendaItems(updatedAgenda);
  };
  const handleSubmit = (data: any) => {
    console.log(data);
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
        Meeting Report
      </Text>

      <Stack className="BoxTableForms" p={'1em'}>
        <DynamicForm
          buttonanme="Submit Meeting"
          fields={formFieldsMeetingReport}
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

            <Button w={'9%'} bg={"#6c757d"} onClick={addTeamMember}>
              <Text fz={'12px'}>Add Member</Text>
            </Button>

            {/* Agenda Section */}
            <Text ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'13px'}>
              Agenda
            </Text>

            {agendaItems.map((agenda, index) => (
              <Flex align={'center'} justify={'space-between'} w={'100%'} key={index}>
                <TextInput
                  placeholder="Agenda Item"
                  w={'30%'}
                  value={agenda.agendaItem}
                  onChange={(e) =>
                    setAgendaItems((prev) =>
                      prev.map((a, i) =>
                        i === index ? { ...a, agendaItem: e.target.value } : a
                      )
                    )
                  }
                />
                <TextInput
                  placeholder="Presenter"
                  w={'30%'}
                  value={agenda.presenter}
                  onChange={(e) =>
                    setAgendaItems((prev) =>
                      prev.map((a, i) =>
                        i === index ? { ...a, presenter: e.target.value } : a
                      )
                    )
                  }
                />
                <TextInput
                  placeholder="Time Allocated"
                  w={'30%'}
                  value={agenda.timeAllocated}
                  onChange={(e) =>
                    setAgendaItems((prev) =>
                      prev.map((a, i) =>
                        i === index ? { ...a, timeAllocated: e.target.value } : a
                      )
                    )
                  }
                />
                <ActionIcon
                  variant="filled"
                  color="red"
                  w="25px"
                  h="20px"
                  onClick={() => removeAgendaItem(index)}
                >
                  <Trash color="#fff" size="15" />
                </ActionIcon>
              </Flex>
            ))}

            <Button w={'11%'} bg={"#6c757d"} onClick={addAgendaItem}>
              <Text fz={'12px'}>Add Agenda Item</Text>
            </Button>
                    <Stack>
                        <Text
                          ff={'"Roboto",sans-serif'}
                          fw={'600'}
                          c={'rgb(108 117 125 / 76%)'}
                          fz={'12px'}
                        >
                          Visibility
                        </Text>
                        <Switch
                          w={'28%'}
                          checked={checked}
                          onChange={handleSwitchChange}
                          color="green"
                          size="sm"
                          label={
                            <Text
                              ff={'"Roboto",sans-serif'}
                              fw={'600'}
                              c={'rgb(108 117 125 / 76%)'}
                              fz={'12px'}
                            >
                              Customize Visibility
                            </Text>
                          }
                          thumbIcon={
                            checked ? (
                              <IconCheck size={12} color="var(--mantine-color-teal-5)" stroke={3} />
                            ) : (
                              <IconX size={12} color="var(--mantine-color-red-6)" stroke={3} />
                            )
                          }
                        />
            
                        <MultiSelect
                          label={
                            <Text
                              ff={'"Roboto",sans-serif'}
                              fw={'600'}
                              c={'rgb(108 117 125 / 76%)'}
                              fz={'12px'}
                            >
                              Visible To
                            </Text>
                          }
                          placeholder="Pick value"
                          data={['React', 'Angular', 'Vue', 'Svelte']}
                          value={selectedValues}
                          onChange={setSelectedValues}
                          clearable
                          w={'50%'}
                          disabled={!checked} // Disable when Switch is false
                          withCheckIcon={false}
                        />
              <Textarea    label={
                            <Text
                              ff={'"Roboto",sans-serif'}
                              fw={'600'}
                              c={'rgb(108 117 125 / 76%)'}
                              fz={'12px'}
                            >
                              Note
                            </Text>
                          }
                            w={'50%'}
                          />
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
                                  <Button
                                    variant="subtle"
                                    color="red"
                                    onClick={() => removeFile(index)} // Pass the index to remove the correct file
                                    fz={'13px'}
                                  >
                                    Remove
                                  </Button>
                                </Table.Td>
                              </Table.Tr>
                            ))}
                          </Table.Tbody>
                        </Table>
            
            
                        <TableSection isAddItems={false} onSubmit={handleSubmit} data={data} />
                      </Stack>
          </Stack>
        </DynamicForm>

      </Stack>
    </Stack>
  );
};

export default AddlMeetingReport;
