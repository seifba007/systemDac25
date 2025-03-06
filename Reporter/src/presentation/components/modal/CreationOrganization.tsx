import React, { useState, useEffect } from 'react';
import { Modal, TextInput, Button, Flex, Box, Title, FileInput, Text, Textarea, Avatar } from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
import { Folder } from 'iconsax-react';

// Define the type for the organization state
interface OrganizationState {
  OrganizationName: string;
  UploadLogo: File | null | string;
  Address: string;
  PhoneNumber: string;
  Email: string;
  Description: string;
}

interface EditUserModelProps {
  opened: boolean;
  onClose: () => void;
  data?: {
    logo: string;
    name: string;
    address: string;
    email: string;
    description: string;
  };
}

const CreationOrganization: React.FC<EditUserModelProps> = ({ opened, onClose, data }) => {
  const [Organization, setOrganization] = useState<OrganizationState>({
    OrganizationName: '',
    UploadLogo: null,
    Address: '',
    PhoneNumber: '',
    Email: '',
    Description: '',
  });

  // Update the state when `data` changes
  useEffect(() => {
    if (data) {
      setOrganization({
        OrganizationName: data.name || '',
        UploadLogo: data.logo || null,
        Address: data.address || '',
        PhoneNumber: '', // Add a field in data if needed
        Email: data.email || '',
        Description: data.description || '',
      });
    }
  }, [data]);

  // Handle input changes for all fields
  const handleInputChange = (key: keyof OrganizationState, value: string) => {
    setOrganization((prev) => ({ ...prev, [key]: value }));
  };

  // Handle file input change (for Upload Logo)
  const handleFileChange = (file: File | null) => {
    setOrganization((prev) => ({ ...prev, UploadLogo: file }));
  };

  // Handle Save action
  const handleSave = () => {
    // Here, you can pass the updated organization data to your parent component or API.
    console.log(Organization); // Just log the updated organization data
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Title className="titremodel" style={{ marginTop: '9px', textAlign: 'center' }} order={6}>
          {data ? 'Edit Organization' : 'Create Organization'}
        </Title>
      }
      styles={{
        body: { paddingTop: '5px' },
        header: { gap: '6em', alignItems: 'self-start' },
      }}
      size={'440px'}
      radius={'5px'}
    >
      <Flex direction="column" gap="0.6em">
      {data&&(
          <Avatar
          src={data?.logo}
          className={'avatar'}
          radius='sm'
          w={"7.5rem"}
          h={"7.5rem"}
        />
      )}
        <FileInput
          leftSection={<Folder size="20" color="#868e96" variant="Bold" />}
          label={<Text pb={'0.3em'} c={'#868e96'}>Upload Logo</Text>}
          placeholder="Choose Logo"
          value={Organization.UploadLogo as File | null} // Prefill with logo if available
          onChange={handleFileChange}
          leftSectionPointerEvents="none"
        />
        <TextInput
          value={Organization.OrganizationName}
          label={<Text pb={'0.3em'} c={'#868e96'}>Organization Name</Text>}
          onChange={(e) => handleInputChange('OrganizationName', e.target.value)}
        />
        <TextInput
          value={Organization.Address}
          label={<Text pb={'0.3em'} c={'#868e96'}>Address</Text>}
          onChange={(e) => handleInputChange('Address', e.target.value)}
        />
        <TextInput
          value={Organization.PhoneNumber}
          label={<Text pb={'0.3em'} c={'#868e96'}>Phone Number</Text>}
          onChange={(e) => handleInputChange('PhoneNumber', e.target.value)}
        />
        <TextInput
          value={Organization.Email}
          label={<Text pb={'0.3em'} c={'#868e96'}>Email</Text>}
          onChange={(e) => handleInputChange('Email', e.target.value)}
        />
        <Textarea
          value={Organization.Description}
          label={<Text pb={'0.3em'} c={'#868e96'}>Description</Text>}
          onChange={(e) => handleInputChange('Description', e.target.value)}
        />
      
        <Flex pt={'1em'} gap={20} justify="end">
          <Button variant="outline" size="md" color="black" onClick={onClose} radius={10}>
            Cancel
          </Button>
          <Button
            variant="filled"
            size="md"
            color="black"
            loading={false}
            onClick={handleSave} // Make sure save button triggers the save logic
            radius={10}
          >
            Confirm
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
};

export default CreationOrganization;
