import React, { ReactNode, useState } from 'react';
import { Modal, Text, Flex, Box, Stack, Button, Autocomplete } from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
import { DelegateActionApi, updateDelegateAction } from '@/core/services/modulesServices/actionitems.service';
import toast from 'react-hot-toast';

interface ModelFilterProps {
  opened: boolean;
  onClose: () => void;
  getaction: () => void;
  idAction:any;
  userdat: any[]; // Array of user objects
  bnt?: ReactNode;
  roleData?: { roles: { key: string; label: string }[] }[]; // Optional prop
}

const DelegateAction: React.FC<ModelFilterProps> = ({ opened,getaction, onClose,idAction, userdat }) => {
  // State to store the selected user's ID
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
 console.log(userdat)
  // Map userdat to Autocomplete data format: { value: fullName, id: userId }
  const autocompleteData = userdat?.map((user) => ({
    value: user.fullName, // Display fullName in Autocomplete
    id: user.id, // Store id for reference
  }));

  // Handle selection change in Autocomplete
  const handleSelect = (value: string) => {
    const selectedUser = autocompleteData.find((item) => item.value === value);
    setSelectedUserId(selectedUser ? selectedUser.id : null);
    console.log('Selected User ID:', selectedUser?.id); // Log the selected ID
  };
const submit=()=>{

  if(selectedUserId)
  {
    const formData = {
      assignedPerson: selectedUserId, // Only include if not rejecting
    };
    DelegateActionApi(formData,idAction)
    .then(() => {
      toast.success('Delegate Action successfully!');
      getaction()
      onClose();
    })
    .catch((error) => {
      console.error('Error updating Delegate Action:', error);
      toast.error('Failed to Delegate Action');
    });
  }

}
  return (
    <Modal
      size="35em"
      opened={opened}
      onClose={onClose}
      title={<Text>Delegate Action</Text>}
      styles={{
        header: { gap: '6em', alignItems: 'flex-start' },
      }}
      radius="5px"
    >
      <Stack>
        <Autocomplete
          label={<Text pb={'0.5em'} c={'#868e96'}>Select a new assigned person:</Text>}
          data={autocompleteData?.map((item) => item.value)} // Pass only the values (fullName)
          onChange={handleSelect} // Triggered when a selection is made
          placeholder="Search for a user"
          limit={10} // Optional: limit the number of suggestions
        />
        <Box
          style={{
            height: '0.7px',
            background: '#DFDFDF',
          }}
        />
        <Flex gap={20} justify="end">
          <Button
            variant="outline"
            size="md"
            color="black"
            onClick={onClose}
            radius={10}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            size="md"
            color="black"
            loading={false}
            type="submit"
            radius={10}
            onClick={() => {
              submit()
            }}
          >
            Save Changes
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};

export default DelegateAction;