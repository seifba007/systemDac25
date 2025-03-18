import React, { ReactNode, useState } from 'react';
import { Modal, Text, Flex, Box, Stack, Button, Select, Textarea } from '@mantine/core'; // Changed Autocomplete to Select
import '../../../sass/components/SuperAdminGlobal.scss';
import { ArrowDown2 } from 'iconsax-react';
import toast from 'react-hot-toast';
import { RejectDelegateAction, updateDelegateAction } from '@/core/services/modulesServices/actionitems.service';

interface ModelFilterProps {
  opened: boolean;
  idaction:any
  isReject?: boolean;
  onClose: () => void;
  bnt?: ReactNode;
  roleData: {
    roles: { key: string; label: string }[];
  }[];
  datauser: {
    status: string;
    email: string;
    id: string;
    fullName: string;
    [key: string]: any; // For other properties
  }[];
}

const ApproveItem: React.FC<ModelFilterProps> = ({
  opened,
  onClose,
  isReject,
  datauser,
  idaction
}) => {
  // Extract fullName values from datauser
  const userNames = datauser?.map((user: any) => user.fullName) || [];

  // State for Select and Textarea
  const [selectedApprover, setSelectedApprover] = useState<string | null>(null);
  const [comments, setComments] = useState<string>('');

  // Handler for Save Changes button
  const handleSaveChanges = () => {
    const formData = {
      assignedPerson: isReject ? null : selectedApprover, // Only include if not rejecting
      comments,
    };
    if(isReject){
      updateDelegateAction(formData, idaction)
			.then(() => {
				toast.success('User updated successfully!');
				onClose();
			})
			.catch((error) => {
				console.error('Error updating user:', error);
				toast.error('Failed to update user');
			});
    }else{
      RejectDelegateAction(formData, idaction)
			.then(() => {
				toast.success('User updated successfully!');
				onClose();
			})
			.catch((error) => {
				console.error('Error updating user:', error);
				toast.error('Failed to update user');
			});
    }
 
  };

  return (
    <Modal
      size="35em"
      opened={opened}
      onClose={onClose}
      title={<Text c={'#fff'}>{isReject ? 'Reject Item' : 'Delegate Action'}</Text>}
      styles={{
        header: {
          gap: '6em',
          alignItems: 'flex-start',
          background: isReject ? '#f7473a' : '#159488',
        },
      }}
      radius="5px"
    >
      <Stack mt={'1em'}>
        <Text fw={'700'} fz={'13px'} c={'#868e96'}>
          {isReject
            ? 'Confirm your rejection for this item.'
            : 'Confirm your approval for the initial stage. Please select the final approver:'}
          {isReject ? null : (
            <Select
            withCheckIcon={false}
              rightSection={<ArrowDown2 size="16" color="#6c757d" />}
              rightSectionPointerEvents="none"
              label={<Text pb={'0.5em'} c={'#868e96'}>Final Approver</Text>}
              data={userNames} // Use mapped fullName values here
              placeholder="Select a user"
              value={selectedApprover} // Controlled value
              onChange={setSelectedApprover} // Update state on change
            />
          )}
        </Text>

        <Textarea
          label={<Text pb={'0.3em'} c={'#868e96'}>Comments</Text>}
          value={comments} // Controlled value
          onChange={(event) => setComments(event.currentTarget.value)} // Update state on change
        />
        <Box
          style={{
            height: '0.7px',
            background: '#DFDFDF',
          }}
        ></Box>

        <Flex gap={20} justify="end">
          <Button
            variant="outline"
            size="md"
            color={isReject ? '#f7473a' : '#159488'}
            onClick={onClose}
            radius={10}
          >
            Cancel
          </Button>
          <Button
            variant="filled"
            size="md"
            color={isReject ? '#f7473a' : '#159488'}
            loading={false}
            onClick={handleSaveChanges} // Call handler on click
            radius={10}
          >
            Save Changes
          </Button>
        </Flex>
      </Stack>
    </Modal>
  );
};

export default ApproveItem;