import React from 'react';
import { Modal, Table, Button, Select, Text, ScrollArea, TagsInput, Stack, Divider, Group } from '@mantine/core';
import { DateInput } from '@mantine/dates';

interface AssignCertificateProps {
  opened: boolean;
  onClose: () => void;
}

const AssignCertificate: React.FC<AssignCertificateProps> = ({ opened, onClose }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      radius={0}
          title={<Text c="#fff">Assign Certificate: Safety Certification</Text>}
    size={'60em'}
      styles={{
        header: { gap: '6em', alignItems: 'flex-start', backgroundColor: '#4254ba' },
      }}
    >   

    <Stack pt={'2%'}>
    <TagsInput
    label={<Text fz={'15px'} fw={'600'} pb={'1em'}>Select users to assign the certificate:</Text>}
    placeholder="Enter text, then blur the field"
    data={['React', 'Angular', 'Svelte']}
    
  />
   <Divider my="md" />

   <Group justify='end'>
    <Button >close</Button>
    <Button>Assign</Button>

   </Group>
    </Stack>
    </Modal>
  );
};

export default AssignCertificate;
