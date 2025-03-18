import React, { ReactNode, useState, useEffect } from 'react';
import { Modal, Text, Flex, Box, Tabs, Stack, TextInput, Textarea, Table, Image, Button, ActionIcon, ScrollArea } from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
import classes from '../../../sass/components/taps/Tabs.module.scss';
import { DateInput } from '@mantine/dates';
import { TickCircle, Trash } from 'iconsax-react';

interface ModelFilterProps {
  opened: boolean;
  data: any;
  isEdit: boolean;
  isUpdate?: boolean;
  onClose: () => void;
  bnt?: ReactNode;
  roleData: {
    roles: { key: string; label: string }[];
  }[];
}

const VueActionItems: React.FC<ModelFilterProps> = ({
  opened,
  isUpdate,
  data,
  onClose,
  isEdit
}) => {
  const [activeTab, setActiveTab] = useState<string>('1');
  const [formData, setFormData] = useState<any>({});

  // Update formData when data prop changes and initialize missing follow-ups
  useEffect(() => {
    const initializeFormData = () => {
      const initialData = data || {};
      const followUps = initialData.followUps || [];

      // Ensure main, control, and efficiency follow-ups exist
      const mainFollowUp = followUps.find((f: any) => f.followUpType === 'main') || {
        followUpType: 'main',
        followUpDescription: '',
        followUpTargetDate: null,
        attachedFiles: []
      };
      const controlFollowUp = followUps.find((f: any) => f.followUpType === 'control') || {
        followUpType: 'control',
        followUpDescription: '',
        followUpTargetDate: null,
        attachedFiles: []
      };
      const efficiencyFollowUp = followUps.find((f: any) => f.followUpType === 'efficiency') || {
        followUpType: 'efficiency',
        followUpDescription: '',
        followUpTargetDate: null,
        attachedFiles: []
      };

      // Create updated followUps array
      const updatedFollowUps = [
        mainFollowUp,
        controlFollowUp,
        efficiencyFollowUp
      ].filter(f => f);

      setFormData({
        ...initialData,
        followUps: updatedFollowUps
      });
    };

    initializeFormData();
  }, [data]);

  console.log('Form Data:', formData);

  const mainFollowUp = formData?.followUps?.find((f: any) => f.followUpType === 'main') || {};
  const controlFollowUp = formData?.followUps?.find((f: any) => f.followUpType === 'control') || {};
  const efficiencyFollowUp = formData?.followUps?.find((f: any) => f.followUpType === 'efficiency') || {};

  const handleInputChange = (field: string, value: any, followUpType: string) => {
    if (!isEdit) return;

    setFormData((prevData: any) => {
      const followUps = prevData.followUps || [];
      const existingFollowUpIndex = followUps.findIndex((f: any) => f.followUpType === followUpType);

      let updatedFollowUps;
      if (existingFollowUpIndex !== -1) {
        // Update existing follow-up
        updatedFollowUps = followUps.map((f: any, index: number) =>
          index === existingFollowUpIndex ? { ...f, [field]: value } : f
        );
      } else {
        // Create new follow-up if it doesn't exist
        const newFollowUp = {
          followUpType,
          followUpDescription: field === 'followUpDescription' ? value : '',
          followUpTargetDate: field === 'followUpTargetDate' ? value : null,
          attachedFiles: []
        };
        updatedFollowUps = [...followUps, newFollowUp];
      }

      const updatedData = { ...prevData, followUps: updatedFollowUps };
      console.log(`Updated ${followUpType} ${field}:`, value);
      console.log('Updated Form Data:', updatedData);
      return updatedData;
    });
  };

  // Handle file input changes for multiple files
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, followUpType: string) => {
    if (!isEdit || !event.target.files) return;

    const files = Array.from(event.target.files);
    setFormData((prevData: any) => {
      const followUps = prevData.followUps || [];
      const existingFollowUpIndex = followUps.findIndex((f: any) => f.followUpType === followUpType);

      let updatedFollowUps;
      if (existingFollowUpIndex !== -1) {
        // Append new files to existing attachedFiles
        const existingFollowUp = followUps[existingFollowUpIndex];
        const newAttachedFiles = [
          ...existingFollowUp.attachedFiles,
          ...files.map(file => ({
            fileName: file.name,
            fileSize: file.size,
            fileUrl: URL.createObjectURL(file) // Temporary URL for preview
          }))
        ];
        updatedFollowUps = followUps.map((f: any, index: number) =>
          index === existingFollowUpIndex ? { ...f, attachedFiles: newAttachedFiles } : f
        );
      } else {
        // Create new follow-up with uploaded files
        const newAttachedFiles = files.map(file => ({
          fileName: file.name,
          fileSize: file.size,
          fileUrl: URL.createObjectURL(file)
        }));
        const newFollowUp = {
          followUpType,
          followUpDescription: '',
          followUpTargetDate: null,
          attachedFiles: newAttachedFiles
        };
        updatedFollowUps = [...followUps, newFollowUp];
      }

      const updatedData = { ...prevData, followUps: updatedFollowUps };
      console.log(`Updated ${followUpType} attachedFiles:`, files);
      console.log('Updated Form Data:', updatedData);
      return updatedData;
    });
  };

  // Helper function to parse date safely from $date object
  const parseDate = (dateValue: any): Date | null => {
    if (!dateValue) return null;
    const dateStr = typeof dateValue === 'object' && dateValue.$date ? dateValue.$date : dateValue;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  };

  const handleSubmit = () => {
    console.log('Submitting Form Data:', formData);
    onClose(); // Close the modal after logging the data
  };

  return (
    <Modal
      size="45em"
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      radius="5px"
    >
      <Stack>
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value || '')} variant="unstyled">
          <Tabs.List className={classes.tabList}>
            <Tabs.Tab value="1" className={classes.tab} h="35px">
              <Flex gap="0.5em" align="center">
                <TickCircle size="20" color="#00de32" variant="Bold" />
                <Text fw="500" fz="14px">Main Follow-Up</Text>
              </Flex>
            </Tabs.Tab>
            <Tabs.Tab value="2" className={classes.tab} h="35px" disabled={!isEdit}>
              <Flex align="center" gap="0.3em">
                <i className="fas fa-exclamation-triangle text-danger" style={{ fontSize: 'small' }}></i>
                <Text fw="500" fz="14px">Control Follow-Up</Text>
              </Flex>
            </Tabs.Tab>
            <Tabs.Tab value="3" className={classes.tab} h="35px" disabled={!isEdit}>
              <Flex align="center" gap="0.3em">
                <i className="fas fa-exclamation-triangle text-danger" style={{ fontSize: 'small' }}></i>
                <Text fw="500" fz="14px">Efficiency Follow-Up</Text>
              </Flex>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="1" pt="2em">
            <Stack>
              <DateInput
                disabled={!isEdit}
                value={parseDate(mainFollowUp?.followUpTargetDate || formData?.targetDate)}
                onChange={(date) => handleInputChange('followUpTargetDate', date, 'main')}
                label={<Text fw="600" fz="14px" c="rgb(34 34 34 / 58%)">Target Date</Text>}
                placeholder="Target Date"
              />
              <Textarea
                disabled={!isEdit}
                value={mainFollowUp?.followUpDescription || ''}
                onChange={(e) => handleInputChange('followUpDescription', e.target.value, 'main')}
                placeholder="Follow-Up Description"
                label={<Text fw="600" fz="14px" c="rgb(34 34 34 / 58%)">Follow-Up Description</Text>}
                autosize
                minRows={5}
              />
              {isEdit && (
                <>
                  <Text fw="600" fz="14px" c="rgb(34 34 34 / 58%)">Attach Files</Text>
                  <div className="file-input-wrapper">
                    <label className="file-input-label">
                      <input
                        type="file"
                        className="file-input"
                        multiple
                        onChange={(e) => handleFileChange(e, 'main')}
                      />
                      Choose Files
                    </label>
                    <span className="file-name">
                      {mainFollowUp?.attachedFiles?.length > 0
                        ? mainFollowUp.attachedFiles.map((f: any) => f.fileName).join(', ')
                        : 'No files chosen'}
                    </span>
                  </div>
                </>
              )}
              <Text fw="600" fz="14px" c="rgb(34 34 34 / 58%)">Attached Files</Text><ScrollArea h={150}>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th fz="13px" c="rgb(34 34 34 / 58%)">Image</Table.Th>
                    <Table.Th fz="13px" c="rgb(34 34 34 / 58%)">File Name</Table.Th>
                    <Table.Th fz="13px" c="rgb(34 34 34 / 58%)">Size</Table.Th>
                    <Table.Th fz="13px" c="rgb(34 34 34 / 58%)">Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                
                <Table.Tbody> 
               
                  {mainFollowUp?.attachedFiles?.map((file: any, index: number) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Image
                          src={file?.fileUrl || '/default-image.jpg'}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      </Table.Td>
                      <Table.Td fz="13px">{file?.fileName || 'No file'}</Table.Td>
                      <Table.Td fz="13px">{file?.fileSize ? (file.fileSize / 1024).toFixed(2) : '0'} KB</Table.Td>
                      <Table.Td>
                        {isEdit && (
                          <ActionIcon variant="filled" color="red" w="25px" h="20px">
                            <Trash color="#fff" size="15" variant="Bold" />
                          </ActionIcon>
                        )}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                   
                </Table.Tbody>
              </Table>
              </ScrollArea>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="2" pt="2em">
            <Stack>
              <DateInput
                disabled={!isEdit}
                value={parseDate(controlFollowUp?.followUpTargetDate)}
                onChange={(date) => handleInputChange('followUpTargetDate', date, 'control')}
                label={<Text fw="600" fz="14px" c="rgb(34 34 34 / 58%)">Target Date</Text>}
                placeholder="Target Date"
              />
              <Textarea
                disabled={!isEdit}
                value={controlFollowUp?.followUpDescription || ''}
                onChange={(e) => handleInputChange('followUpDescription', e.target.value, 'control')}
                placeholder="Control Description"
                label={<Text fw="600" fz="14px" c="rgb(34 34 34 / 58%)">Control Description</Text>}
                autosize
                minRows={5}
              />
              {isEdit && (
                <>
                  <Text fw="600" fz="14px" c="rgb(34 34 34 / 58%)">Attach Files</Text>
                  <div className="file-input-wrapper">
                    <label className="file-input-label">
                      <input
                        type="file"
                        className="file-input"
                        multiple
                        onChange={(e) => handleFileChange(e, 'control')}
                      />
                      Choose Files
                    </label>
                    <span className="file-name">
                      {controlFollowUp?.attachedFiles?.length > 0
                        ? controlFollowUp.attachedFiles.map((f: any) => f.fileName).join(', ')
                        : 'No files chosen'}
                    </span>
                  </div>
                </>
              )}
              <Text fw="600" fz="14px" c="rgb(34 34 34 / 58%)">Attached Files</Text><ScrollArea h={150}>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th fz="13px" c="rgb(34 34 34 / 58%)">Image</Table.Th>
                    <Table.Th fz="13px" c="rgb(34 34 34 / 58%)">File Name</Table.Th>
                    <Table.Th fz="13px" c="rgb(34 34 34 / 58%)">Size</Table.Th>
                    <Table.Th fz="13px" c="rgb(34 34 34 / 58%)">Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {controlFollowUp?.attachedFiles?.map((file: any, index: number) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Image
                          src={file?.fileUrl || '/default-image.jpg'}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      </Table.Td>
                      <Table.Td fz="13px">{file?.fileName || 'No file'}</Table.Td>
                      <Table.Td fz="13px">{file?.fileSize ? (file.fileSize / 1024).toFixed(2) : '0'} KB</Table.Td>
                      <Table.Td>
                        {isEdit && (
                          <ActionIcon variant="filled" color="red" w="25px" h="20px">
                            <Trash color="#fff" size="15" variant="Bold" />
                          </ActionIcon>
                        )}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table></ScrollArea>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="3" pt="2em">
            <Stack>
              <DateInput
                disabled={!isEdit}
                value={parseDate(efficiencyFollowUp?.followUpTargetDate)}
                onChange={(date) => handleInputChange('followUpTargetDate', date, 'efficiency')}
                label={<Text fw="600" fz="14px" c="rgb(34 34 34 / 58%)">Target Date</Text>}
                placeholder="Target Date"
              />
              <Textarea
                disabled={!isEdit}
                value={efficiencyFollowUp?.followUpDescription || ''}
                onChange={(e) => handleInputChange('followUpDescription', e.target.value, 'efficiency')}
                placeholder="Efficiency Description"
                label={<Text fw="600" fz="14px" c="rgb(34 34 34 / 58%)">Efficiency Description</Text>}
                autosize
                minRows={5}
              />
              {isEdit && (
                <>
                  <Text fw="600" fz="14px" c="rgb(34 34 34 / 58%)">Attach Files</Text>
                  <div className="file-input-wrapper">
                    <label className="file-input-label">
                      <input
                        type="file"
                        className="file-input"
                        multiple
                        onChange={(e) => handleFileChange(e, 'efficiency')}
                      />
                      Choose Files
                    </label>
                    <span className="file-name">
                      {efficiencyFollowUp?.attachedFiles?.length > 0
                        ? efficiencyFollowUp.attachedFiles.map((f: any) => f.fileName).join(', ')
                        : 'No files chosen'}
                    </span>
                  </div>
                </>
              )}
              <Text fw="600" fz="14px" c="rgb(34 34 34 / 58%)">Attached Files</Text><ScrollArea h={150}>
              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th fz="13px" c="rgb(34 34 34 / 58%)">Image</Table.Th>
                    <Table.Th fz="13px" c="rgb(34 34 34 / 58%)">File Name</Table.Th>
                    <Table.Th fz="13px" c="rgb(34 34 34 / 58%)">Size</Table.Th>
                    <Table.Th fz="13px" c="rgb(34 34 34 / 58%)">Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {efficiencyFollowUp?.attachedFiles?.map((file: any, index: number) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Image
                          src={file?.fileUrl || '/default-image.jpg'}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      </Table.Td>
                      <Table.Td fz="13px">{file?.fileName || 'No file'}</Table.Td>
                      <Table.Td fz="13px">{file?.fileSize ? (file.fileSize / 1024).toFixed(2) : '0'} KB</Table.Td>
                      <Table.Td>
                        {isEdit && (
                          <ActionIcon variant="filled" color="red" w="25px" h="20px">
                            <Trash color="#fff" size="15" variant="Bold" />
                          </ActionIcon>
                        )}
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table></ScrollArea>
            </Stack>
          </Tabs.Panel>
        </Tabs>
        <Flex justify="space-between" w="100%">
          <Button color="red" onClick={onClose}>
            Close
          </Button>
          {isUpdate && (
            <Button onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Flex>
      </Stack>
    </Modal>
  );
};

export default VueActionItems;