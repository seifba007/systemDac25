import React, { useState } from 'react';
import { Modal, Button, Text, Stack, Divider, Group, TagsInput } from '@mantine/core';
import { AssignCertificates } from '@/core/services/modulesServices/Certificates.service'; // Adjust import path
import toast from 'react-hot-toast';

interface User {
  id: string; // Unique ID
  fullName: string;
}

interface AssignCertificateProps {
  opened: boolean;
  onClose: () => void;
  usersList: string[] | User[]; // Handles both cases
  certificateone: any;
}

const AssignCertificate: React.FC<AssignCertificateProps> = ({ opened, onClose, usersList, certificateone }) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [selectedUserNames, setSelectedUserNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Map usersList to userOptions
  const userOptions = Array.isArray(usersList)
    ? usersList.map(user => {
        if (typeof user === 'string') {
          console.error('usersList contains usernames as strings. IDs are missing.');
          return { value: user, label: user }; // Temporary use username
        } else {
          return { value: user.id, label: user.fullName };
        }
      })
    : [];

  // Handle user selection
  const handleUserSelect = (selectedNames: string[]) => {
    const ids = selectedNames
      .map(name => {
        const user = userOptions.find(option => option.label === name);
        return user?.value; // Get corresponding ID
      })
      .filter(Boolean) as string[]; // Filter out undefined values

    setSelectedUserNames(selectedNames);
    setSelectedUserIds(ids);

    console.log('Selected User Names:', selectedNames);
    console.log('Selected User IDs:', ids);
  };

  const handleAssign = async () => {
    if (!selectedUserIds.length) {
      toast.error('Please select at least one user');
      return;
    }

    if (!certificateone?._id) {
      toast.error('Certificate ID is missing');
      return;
    }

    setIsLoading(true);

    try {
      const assignmentData = {
        userIds: selectedUserIds,
        isValid: true,
        certId : certificateone._id,
        validationDate: "2025-04-22T06:01:21.708Z",
        validityPeriod: certificateone.validityPeriod || 12,
      };

      console.log('Sending assignment data:', assignmentData);

      await AssignCertificates(assignmentData);

      toast.success('Certificates assigned successfully');
      onClose();
    } catch (error) {
      console.error('Error assigning certificates:', error);
      toast.error('Failed to assign certificates');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      radius={0}
      title={<Text c="#fff">Assign Certificate: {certificateone?.name || 'Safety Certification'}</Text>}
      size={'60em'}
      styles={{
        header: { gap: '6em', alignItems: 'flex-start', backgroundColor: '#4254ba' },
      }}
    >
      <Stack pt={'2%'}>
        <TagsInput
          label={<Text fz={'15px'} fw={'600'} pb={'1em'}>Select users to assign the certificate:</Text>}
          placeholder="Select users"
          data={userOptions}
          value={selectedUserNames}
          onChange={handleUserSelect}
          clearable
        />
        <Divider my="md" />

        <Group justify="end">
          <Button onClick={onClose} disabled={isLoading}>
            Close
          </Button>
          <Button onClick={handleAssign} loading={isLoading}>
            Assign
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default AssignCertificate;
