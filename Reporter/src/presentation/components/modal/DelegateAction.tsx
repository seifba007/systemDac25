import React, { ReactNode, useState } from 'react';
import { Modal , Text, Flex, Box,  Stack, Button, Autocomplete } from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
interface ModelFilterProps {
  opened: boolean;
  onClose: () => void;
  bnt?: ReactNode;
  roleData: {
    roles: { key: string; label: string }[]; // Role structure corrected
  }[];
}
const DelegateAction: React.FC<ModelFilterProps> = ({
  opened,
  onClose,
}) => {
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
          label={<Text   pb={'0.5em'} c={'#868e96'}>Select a new assigned person:</Text>}
          data={['React', 'Angular', 'Vue', 'Svelte']}
        />  <Box style={{
                height: '0.7px',
                background: '#DFDFDF'
        
              }}></Box>      <Flex  gap={20} justify='end'>
                                <Button
                                  variant='outline'
                                  size='md'
                                  color='black'
                                  onClick={onClose}
                             
                                  radius={10}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant='filled'
                                  size='md'
                                  color='black'
                                  loading={false}
                                  type='submit'
                       
                                  radius={10}
                                >
                                 Save Changes
                                </Button>
                              </Flex>
   </Stack>
    </Modal>
  );
};

export default DelegateAction;
