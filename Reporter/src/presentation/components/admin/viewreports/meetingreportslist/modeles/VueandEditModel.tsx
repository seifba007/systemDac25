import { Modal, Text, TextInput, Group, Button, Checkbox, Table, Box, Divider, Flex, ActionIcon, Stack, Textarea, FileInput, MultiSelect } from '@mantine/core';
import React, { useCallback, useState } from 'react';
import { IconPlus, IconPrinter, IconTrash } from '@tabler/icons-react';
import { Folder2, Trash } from 'iconsax-react';

// Define interfaces for the agenda item, user, and component props
interface AgendaItem {
  agendaItem: string;
  presenter: string;
  timeAllocated: string;
}

interface User {
  _id: string;
  name: string;
}

interface FormData {
  meetingType: string;
  meetingTitle: string;
  dateAndTime: string;
  businessDepartment: string;
  meetingLocation: string;
  meetingObjective: string;
  agendaItems: AgendaItem[];
  visibleTo: string[];
  notes: string;
  attachedFiles: File[];
}

interface VueandEditModelProps {
  open: boolean;
  onClose: () => void;
  isEdit: boolean; // New prop to control edit mode
}

const VueandEditModel: React.FC<VueandEditModelProps> = ({ open, onClose, isEdit }) => {
  // State for form fields
  const [meetingType, setMeetingType] = useState<string>('Safety Meeting');
  const [meetingTitle, setMeetingTitle] = useState<string>('fdfdf');
  const [dateAndTime, setDateAndTime] = useState<string>('12/22/12 08:12 PM');
  const [businessDepartment, setBusinessDepartment] = useState<string>('Administration');
  const [meetingLocation, setMeetingLocation] = useState<string>('Online');
  const [meetingObjective, setMeetingObjective] = useState<string>('dfgdfgdf');
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([]);
  const [visibleTo, setVisibleTo] = useState<string[]>(['Mehdi Ben Abdallah']);
  const [notes, setNotes] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);

  // State for MultiSelect
  const [checked, setChecked] = useState<boolean>(true); // Controls whether MultiSelect is enabled
  const [selectedValues, setSelectedValues] = useState<string[]>(['Mehdi Ben Abdallah']); // For MultiSelect values

  const meetingTypes: string[] = ['Safety Meeting', 'Team Meeting', 'Board Meeting'];
  const businessDepartments: string[] = ['Administration', 'HR', 'Engineering'];
  const meetingLocations: string[] = ['Online', 'Office', 'Conference Room'];

  // Mock users list for MultiSelect
  const usersList: User[] = [
    { _id: '1', name: 'Mehdi Ben Abdallah' },
    { _id: '2', name: 'Sabra Gargouri' },
    { _id: '3', name: 'Said Ben Abdallah' },
    { _id: '4', name: 'Skander Farhat' },
    { _id: '5', name: 'jonebdallah@gmail.com' },
    { _id: '6', name: 'Self' },
    { _id: '7', name: 'Adem Sghaier' },
  ];

  const addAgendaItem = useCallback(() => {
    setAgendaItems((prev) => [...prev, { agendaItem: '', presenter: '', timeAllocated: '' }]);
  }, []);

  const removeAgendaItem = useCallback((index: number) => {
    setAgendaItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleFileChange = useCallback((newFiles: File[] | null) => {
    if (newFiles?.length) {
      setFiles((prev) => [...prev, ...newFiles]);
      setFileNames((prev) => [...prev, ...newFiles.map((file) => file.name)]);
    } else {
      setFiles([]);
      setFileNames([]);
    }
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setFileNames((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Function to collect all form data
  const getFormData = (): FormData => {
    return {
      meetingType,
      meetingTitle,
      dateAndTime,
      businessDepartment,
      meetingLocation,
      meetingObjective,
      agendaItems,
      visibleTo: isEdit ? selectedValues : visibleTo,
      notes,
      attachedFiles: files,
    };
  };

  // Log form data (for demonstration; you can use this data as needed)
  const handleSubmit = () => {
    const formData = getFormData();
    console.log('Form Data:', formData);
  };

  const inputStyles = { label: { marginBottom: '5px' }, input: { borderColor: '#ced4da', borderRadius: '4px', height: '38px' } };

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
          fw={700}
          c="#6c757d"
          fz="18px"
        >
          Meeting Report
        </Text>
      }
      fullScreen
      radius={0}
      transitionProps={{ transition: 'fade', duration: 200 }}
    >
      <Box p="md" pb={'8em'}bg={'#f2f2f7'}>
        {/* Form Fields */}
        <Box style={{ textAlign: 'left' }} pb={'3em'} >
          <Text fz="18px" c="#6c757d" fw={'600'}>
            Report Reference: MEE-1742380342452
          </Text>
        </Box>
        <Group grow mb="md">
          <Box>
            <Text fz="14px" c="#6c757d" mb={5}>
              Meeting Type <Text component="span" c="red">*</Text>
            </Text>
            <select
              value={meetingType}
              onChange={(e) => setMeetingType(e.target.value)}
              disabled={!isEdit}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '14px',
                color: '#6c757d',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                backgroundColor: isEdit ? '#fff' : '#f8f9fa',
              }}
            >
              {meetingTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Box>
          <TextInput
            label={
              <Text fz="14px" c="#6c757d">
                Meeting Title <Text component="span" c="red">*</Text>
              </Text>
            }
            placeholder="fdfdf"
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            disabled={!isEdit}
            styles={{
              label: { marginBottom: 5 },
              input: { fontSize: '14px', color: '#6c757d', backgroundColor: isEdit ? '#fff' : '#f8f9fa' },
            }}
          />
          <TextInput
            label={
              <Text fz="14px" c="#6c757d">
                Date and Time <Text component="span" c="red">*</Text>
              </Text>
            }
            placeholder="12/22/12 08:12 PM"
            value={dateAndTime}
            onChange={(e) => setDateAndTime(e.target.value)}
            disabled={!isEdit}
            styles={{
              label: { marginBottom: 5 },
              input: { fontSize: '14px', color: '#6c757d', backgroundColor: isEdit ? '#fff' : '#f8f9fa' },
            }}
          />
        </Group>

        <Group grow mb="md">
          <Box>
            <Text fz="14px" c="#6c757d" mb={5}>
              Business Department <Text component="span" c="red">*</Text>
            </Text>
            <select
              value={businessDepartment}
              onChange={(e) => setBusinessDepartment(e.target.value)}
              disabled={!isEdit}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '14px',
                color: 'gray',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                backgroundColor: isEdit ? '#fff' : '#f8f9fa',
              }}
            >
              {businessDepartments.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Box>
          <Box>
            <Text fz="14px" c="#6c757d" mb={5}>
              Meeting Location <Text component="span" c="red">*</Text>
            </Text>
            <select
              value={meetingLocation}
              onChange={(e) => setMeetingLocation(e.target.value)}
              disabled={!isEdit}
              style={{
                width: '100%',
                padding: '8px',
                fontSize: '14px',
                color: 'gray',
                border: '1px solid #ced4da',
                borderRadius: '4px',
                backgroundColor: isEdit ? '#fff' : '#f8f9fa',
              }}
            >
              {meetingLocations.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Box>
          <TextInput
            label={
              <Text fz="14px" c="#6c757d">
                Meeting Location <Text component="span" c="red">*</Text>
              </Text>
            }
            placeholder="12/22/12 08:12 PM"
            value={meetingLocation}
            onChange={(e) => setMeetingLocation(e.target.value)}
            disabled={!isEdit}
            styles={{
              label: { marginBottom: 5 },
              input: { fontSize: '14px', color: '#6c757d', backgroundColor: isEdit ? '#fff' : '#f8f9fa' },
            }}
          />
        </Group>

        <Textarea
          label={
            <Text fz="14px" c="#6c757d">
              Meeting Objective <Text component="span" c="red">*</Text>
            </Text>
          }
          placeholder="dfgdfgdf"
          value={meetingObjective}
          onChange={(e) => setMeetingObjective(e.target.value)}
          disabled={!isEdit}
          mb="md"
          styles={{
            label: { marginBottom: 5 },
            input: { fontSize: '14px', color: '#6c757d', backgroundColor: isEdit ? '#fff' : '#f8f9fa' },
          }}
        />

        {/* Agenda Section */}
        <Text ff="'Roboto', sans-serif" fw={600} c="#6c757d" fz="13px" mt="md">
          Agenda
        </Text>
        <Stack mb={'1em'}>
          {agendaItems.map((agenda, index) => (
            <Flex align="center" justify="space-between" w="100%" key={index} gap="sm">
              <TextInput
                placeholder="Agenda Item"
                w="32%"
                value={agenda.agendaItem}
                onChange={(e) =>
                  setAgendaItems((prev) =>
                    prev.map((a, i) => (i === index ? { ...a, agendaItem: e.target.value } : a))
                  )
                }
                disabled={!isEdit}
                styles={{ input: { borderColor: '#ced4da', borderRadius: '4px', height: '38px', backgroundColor: isEdit ? '#fff' : '#f8f9fa' } }}
              />
              <TextInput
                placeholder="Presenter"
                w="32%"
                value={agenda.presenter}
                onChange={(e) =>
                  setAgendaItems((prev) =>
                    prev.map((a, i) => (i === index ? { ...a, presenter: e.target.value } : a))
                  )
                }
                disabled={!isEdit}
                styles={{ input: { borderColor: '#ced4da', borderRadius: '4px', height: '38px', backgroundColor: isEdit ? '#fff' : '#f8f9fa' } }}
              />
              <TextInput
                placeholder="Time Allocated"
                w="32%"
                value={agenda.timeAllocated}
                onChange={(e) =>
                  setAgendaItems((prev) =>
                    prev.map((a, i) => (i === index ? { ...a, timeAllocated: e.target.value } : a))
                  )
                }
                disabled={!isEdit}
                styles={{ input: { borderColor: '#ced4da', borderRadius: '4px', height: '38px', backgroundColor: isEdit ? '#fff' : '#f8f9fa' } }}
              />
              <ActionIcon
                variant="filled"
                color="red"
                w="25px"
                h="25px"
                onClick={() => removeAgendaItem(index)}
                disabled={!isEdit}
              >
                <Trash color="#fff" size="15" />
              </ActionIcon>
            </Flex>
          ))}
        </Stack>
        <Button w="150px" bg="#6c757d" onClick={addAgendaItem} disabled={!isEdit}>
          <Text fz="12px">Add Agenda Item</Text>
        </Button>

        {/* Visible To Section */}
        <Divider label={<Text fz="16px" fw={500} c="#6c757d">Visible To</Text>} labelPosition="left" my="md" />
        {isEdit ? (
          <MultiSelect
            label={<Text ff="'Roboto', sans-serif" fw={600} c="#6c757d" fz="12px">Visible To</Text>}
            placeholder="Pick value"
            data={usersList.map((user) => ({ value: user._id, label: user.name }))}
            value={selectedValues}
            onChange={setSelectedValues}
            clearable
            w="50%"
            disabled={!checked}
            withCheckIcon={false}
          />
        ) : (
          <Checkbox.Group value={visibleTo} onChange={setVisibleTo}>
            <Box>
              {[
                'Mehdi Ben Abdallah',
                'Sabra Gargouri',
                'Said Ben Abdallah',
                'Skander Farhat',
                'jonebdallah@gmail.com',
                'Self',
                'Adem Sghaier',
              ].map((name) => (
                <Box
                  key={name}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#f8f9fa',
                    borderBottom: '1px solid #e9ecef',
                  }}
                >
                  <Checkbox
                    value={name}
                    label={<Text fz="14px" c="#6c757d">{name}</Text>}
                    disabled={!isEdit}
                    styles={{
                      input: {
                        borderColor: visibleTo.includes(name) ? '#007bff' : '#ced4da',
                        backgroundColor: visibleTo.includes(name) ? '#007bff' : '#fff',
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                      },
                      icon: {
                        color: '#fff',
                        fontSize: '10px',
                      },
                      label: { paddingLeft: 10 },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Checkbox.Group>
        )}

        {/* Notes Section */}
        <Divider label={<Text fz="16px" fw={500} c="#6c757d">Notes</Text>} labelPosition="left" my="md" />
        <Textarea
          label={<Text ff="'Roboto', sans-serif" fw={600} c="#6c757d" fz="12px">Note</Text>}
          placeholder="Enter note"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={!isEdit}
          w="50%"
          styles={{ input: { backgroundColor: isEdit ? '#fff' : '#f8f9fa' } }}
        />

        {/* Attached Files Section */}
        <Divider label={<Text fz="16px" fw={500} c="#6c757d">Attached Files</Text>} labelPosition="left" my="md" />
        <Text ff="'Roboto', sans-serif" fw={600} c="#6c757d" fz="12px">Attach Files</Text>
        <FileInput
          placeholder={fileNames.length > 0 ? fileNames.join(', ') : "No file chosen"}
          multiple
          value={files}
          onChange={handleFileChange}
          disabled={!isEdit}
          rightSection={<Folder2 size="25" color="#868e96" variant="Bold" />}
          w="50%"
          styles={inputStyles}
        />
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th fz="13px" c="#6c757d">Image</Table.Th>
              <Table.Th fz="13px" c="#6c757d">File Name</Table.Th>
              <Table.Th fz="13px" c="#6c757d">Size</Table.Th>
              <Table.Th fz="13px" c="#6c757d">Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {files.map((file, index) => (
              <Table.Tr key={file.name}>
                <Table.Td>
                  {file.type.startsWith('image/') && (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  )}
                </Table.Td>
                <Table.Td fz="13px" c="#6c757d">{file.name}</Table.Td>
                <Table.Td fz="13px" c="#6c757d">{(file.size / 1024).toFixed(2)} KB</Table.Td>
                <Table.Td>
                  <ActionIcon
                    variant="filled"
                    color="red"
                    w="25px"
                    h="25px"
                    onClick={() => removeFile(index)}
                    disabled={!isEdit}
                  >
                    <Trash color="#fff" size="15" />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        {/* Print Button */}
        <Box style={{ textAlign: 'right', marginTop: '20px' }}>
          <Button
            leftSection={<IconPrinter size={16} />}
            color="teal"
            styles={{ root: { fontSize: '14px' } }}
            onClick={handleSubmit} // Log form data on click
          >
            Print Report
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default VueandEditModel;