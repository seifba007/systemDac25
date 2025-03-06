import React, { ReactNode, useState } from 'react';
import { Modal, Radio, Text, Title, Flex, Box, Tabs, Stack, TextInput, Textarea, Table, Image, Button, ActionIcon } from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';
import classes from '../../../sass/components/taps/Tabs.module.scss';
import { DateInput } from '@mantine/dates';
import { TickCircle, Trash } from 'iconsax-react';

interface ModelFilterProps {
  opened: boolean;
  isUpdate?:boolean;
  onClose: () => void;
  bnt?: ReactNode;
  roleData: {
    roles: { key: string; label: string }[]; // Role structure corrected
  }[];
}

const VueActionItems: React.FC<ModelFilterProps> = ({
  opened,
  isUpdate,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<string>('1');


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
   <Stack >
   <Tabs value={activeTab} onChange={(value) => setActiveTab(value || '')} variant="unstyled">
        <Tabs.List className={classes.tabList}>
          <Tabs.Tab value="1" className={classes.tab} h={"35px"}>
          <Flex gap={'0.5em'}align={'center'} > 
          <TickCircle size="20" color="#00de32" variant='Bold'/>
          <Text fw={'500'} fz={'14px'}>
          Main Follow-Up
         </Text>
          </Flex>
          </Tabs.Tab>
          <Tabs.Tab value="2" className={classes.tab}h={"35px"  }>
       <Flex align={'center'} gap={'0.3em'}>
       <i  
									  className="fas fa-exclamation-triangle text-danger"
									  style={{ fontSize: 'small'}}
									></i>
          <Text fw={'500'} fz={'14px'}>

            Control Follow-Up      </Text>
       </Flex>
          </Tabs.Tab>
          <Tabs.Tab value="3" className={classes.tab}h={"35px"  }>

            <Flex align={'center'} gap={'0.3em'}>
       <i  
									  className="fas fa-exclamation-triangle text-danger"
									  style={{ fontSize: 'small'}}
									></i>
             <Text fw={'500'} fz={'14px'}>

Efficiency Follow-Up      </Text>
       </Flex>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="1" pt={'2em'}>
          <Stack>
      
          <DateInput
 disabled
      label={<Text fw={'600'} fz={'14px'} c={'rgb(34 34 34 / 58%)'}>Target Date</Text>}
      placeholder="Target Date"
    />
       <Textarea
        placeholder="Follow-Up Description"
        label={<Text fw={'600'} fz={'14px'} c={'rgb(34 34 34 / 58%)'}>Follow-Up Description</Text>}
        autosize
        minRows={5}
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
    {/* Hardcoded Row 1 */}
    <Table.Tr>
      <Table.Td>
        <Image
          src="path-to-your-image.jpg"
         
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
      </Table.Td>
      <Table.Td fz={'13px'}>example-image.jpg</Table.Td>
      <Table.Td fz={'13px'}>100 KB</Table.Td>
      <Table.Td>
      <ActionIcon variant="filled" color="red" w={'25px'} h={'20px'} >
			 <Trash color='#fff' size={'15'} variant='Bold' />
		   </ActionIcon>
      </Table.Td>
    </Table.Tr>

 
  </Table.Tbody>
</Table>

          </Stack>
        </Tabs.Panel>

   
        <Tabs.Panel value="2" pt={'2em'}>
          <Stack>
      
          <DateInput
    disabled
      label={<Text fw={'600'} fz={'14px'} c={'rgb(34 34 34 / 58%)'}>Target Date</Text>}
      placeholder="Target Date"
    />
       <Textarea
        placeholder="Control Description"
        label={<Text fw={'600'} fz={'14px'} c={'rgb(34 34 34 / 58%)'}>Control Description</Text>}
        autosize
        minRows={5}
      />    <Text fw={'600'} fz={'14px'} c={'rgb(34 34 34 / 58%)'}>Attach Files</Text>

                    <div className="file-input-wrapper">
      <label className="file-input-label">
        <input
          type="file"
          className="file-input"
        />
        Choose File
      </label>
      <span className="file-name">{"fileName"}</span>
    </div>    <Text fw={'600'} fz={'14px'} c={'rgb(34 34 34 / 58%)'}>Attached Files</Text>

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
    {/* Hardcoded Row 1 */}
    <Table.Tr>
      <Table.Td>
        <Image
          src="path-to-your-image.jpg"
         
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
      </Table.Td>
      <Table.Td fz={'13px'}>example-image.jpg</Table.Td>
      <Table.Td fz={'13px'}>100 KB</Table.Td>
      <Table.Td>
      <ActionIcon variant="filled" color="red" w={'25px'} h={'20px'} >
			 <Trash color='#fff' size={'15'} variant='Bold' />
		   </ActionIcon>
      </Table.Td>
    </Table.Tr>

 
  </Table.Tbody>
</Table>

          </Stack>
        </Tabs.Panel>
        
        <Tabs.Panel value="3" pt={'2em'}>
          <Stack>
      
          <DateInput
    disabled
      label={<Text fw={'600'} fz={'14px'} c={'rgb(34 34 34 / 58%)'}>Target Date</Text>}
      placeholder="Target Date"
    />
       <Textarea
        placeholder="Efficiency Description"
        label={<Text fw={'600'} fz={'14px'} c={'rgb(34 34 34 / 58%)'}>Efficiency Description</Text>}
        autosize
        minRows={5}
      />
      <Text fw={'600'} fz={'14px'} c={'rgb(34 34 34 / 58%)'}>Attach Files</Text>
                    <div className="file-input-wrapper">
      <label className="file-input-label">
        <input
          type="file"
          className="file-input"
        />
        Choose File
      </label>
      <span className="file-name">{"fileName"}</span>
    </div>
    <Text fw={'600'} fz={'14px'} c={'rgb(34 34 34 / 58%)'}>Attached Files</Text>
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
    {/* Hardcoded Row 1 */}
    <Table.Tr>
      <Table.Td>
        <Image
          src="path-to-your-image.jpg"
         
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
      </Table.Td>
      <Table.Td fz={'13px'}>example-image.jpg</Table.Td>
      <Table.Td fz={'13px'}>100 KB</Table.Td>
      <Table.Td>
      <ActionIcon variant="filled" color="red" w={'25px'} h={'20px'} >
			 <Trash color='#fff' size={'15'} variant='Bold' />
		   </ActionIcon>
      </Table.Td>
    </Table.Tr>

 
  </Table.Tbody>
</Table>

          </Stack>
        </Tabs.Panel>
      </Tabs>
   <Flex justify={'space-between'} w={'100%'}>
   <Button  color="red" onClick={onClose}>
          Close
        </Button>
       {isUpdate? <Button   onClick={onClose}>
          Submit
        </Button>: null}
   </Flex>
   </Stack>
    </Modal>
  );
};

export default VueActionItems;
