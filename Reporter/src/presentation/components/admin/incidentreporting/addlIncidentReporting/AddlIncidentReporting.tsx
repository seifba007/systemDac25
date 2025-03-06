import React, { useState } from 'react';
import DynamicForm from '@/presentation/components/input/DynamicForm';
import { MultiSelect, Stack, Switch, Text, Table, Button, FileInput } from '@mantine/core';
import { formFieldsReport } from '@/data/formCreate';
import { IconCheck, IconX } from '@tabler/icons-react';
import { Folder2 } from 'iconsax-react';
import TableRisk from './TableRisk';

const AddlIncidentReporting = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]); // To track file names displayed below input

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
        Incident Reporting
      </Text>

      <Stack className="BoxTableForms" p={'1em'}>
        <DynamicForm
          buttonanme="Submit Report"
          fields={formFieldsReport}
          onSubmit={handleFormSubmit}
        >
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

<TableRisk/>

          </Stack>
        </DynamicForm>
      </Stack>
    </Stack>
  );
};

export default AddlIncidentReporting;
