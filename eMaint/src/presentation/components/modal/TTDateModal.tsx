import React, { useEffect, useState } from 'react';
import {
  Modal,
  Tabs,
  TextInput,
  Textarea,
  Select,
  Button,
  Group,
  Text,
  Stack,
  Flex,
  MultiSelect,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import classes from '../../../sass/components/taps/Tabs.module.scss';
import { AddCircle, ArrowCircleRight2, } from 'iconsax-react';

type WorkOrderModalProps = {
  opened: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  eventData: any;
  isEditing: boolean;
};

const WorkOrderModal: React.FC<WorkOrderModalProps> = ({
  opened,
  onClose,
  onSubmit,
  isEditing,
  eventData,
}) => {
  const [activeTab, setActiveTab] = useState<string>('1');

  const [formValues, setFormValues] = useState({
    workOrderId: eventData?.workOrderId || '',
    title: eventData?.title || '',
    startDate: eventData?.startDate || '',
    endDate: eventData?.endDate || '',
    description: eventData?.description || '',
    typeOfWorkOrder: eventData?.typeOfWorkOrder || '',
    PriorityLevel: eventData?.PriorityLevel || '',
    assetId: eventData?.assetId || '',
  });
  useEffect(() => {
    console.log(activeTab)
    setActiveTab('1')
    if (eventData && isEditing) {
      setFormValues({
        workOrderId: eventData?.workOrderId || '',
        title: eventData?.title || '',
        startDate: eventData?.start || '',  // Make sure start and end are from eventData
        endDate: eventData?.end || '',  // Make sure start and end are from eventData
        description: eventData?.description || '',
        typeOfWorkOrder: eventData?.typeOfWorkOrder || '',
        PriorityLevel: eventData?.PriorityLevel || '',
        assetId: eventData?.assetId || '',
      });
    }else{
      setFormValues({
        workOrderId:  '',
        title:  '',
        startDate:  '',  // Make sure start and end are from eventData
        endDate: '',  // Make sure start and end are from eventData
        description: '',
        typeOfWorkOrder:  '',
        PriorityLevel:  '',
        assetId: '',
      });
    }
  }, [eventData,opened]);

  const handleInputChange = (field: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formValues);  // Submit form data
    onClose();  // Close modal
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="55em"
      title={isEditing ? "Update Workorder" : "Create New Workorder"}
      centered
      radius="1.5%"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Tabs value={activeTab} onChange={(value) => setActiveTab(value || '')} variant="none">
        <Tabs.List grow>
          <Tabs.Tab value="1" className={classes.tab}>
            Basic Info
          </Tabs.Tab>
          <Tabs.Tab value="2" className={classes.tab}>
            Tasks & Spares
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={"1"} pt="md">
          <Stack>
            <TextInput
              label="Work Order ID"
              placeholder="Enter Work Order ID"
              value={formValues.workOrderId}
              onChange={(e) => handleInputChange('workOrderId', e.target.value)}
            />
            <Group grow>
              <TextInput
                label="Title"
                placeholder="Enter title"
                value={formValues.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
              />
              <DatePickerInput
                label="Scheduled Start Date"
                placeholder="Pick Start date"
                value={formValues.startDate ? new Date(formValues.startDate) : null}  // Ensure value is a Date object
                onChange={(value) => handleInputChange('startDate', value)}
                style={{ flex: 1 }}
              />
              <DatePickerInput
                label="Scheduled End Date"
                placeholder="Pick End date"
                value={formValues.endDate ? new Date(formValues.endDate) : null}  // Ensure value is a Date object
                onChange={(value) => handleInputChange('endDate', value)}
                style={{ flex: 1 }}
              />
            </Group>
            <Textarea
              label="Description"
              placeholder="Enter description"
              value={formValues.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
            />
            <Select
              label="Type of Work Order"
              value={formValues.typeOfWorkOrder}
              onChange={(value) => handleInputChange('typeOfWorkOrder', value || '')}
              data={['Preventive', 'Corrective', 'Inspection', 'Certification']}
            />
            <Select
              label="Priority Level"
              value={formValues.PriorityLevel}
              onChange={(value) => handleInputChange('PriorityLevel', value || '')}
              data={['Low', 'Medium', 'High', 'Emergency']}
            />
            <TextInput
              label="Asset ID / Name"
              placeholder="Enter Asset ID or Name"
              value={formValues.assetId}
              onChange={(e) => handleInputChange('assetId', e.target.value)}
            />
            <Group p="right" mt="md" justify="end">
              <Button variant="default" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={()=>{setActiveTab('2')}} rightSection={<ArrowCircleRight2 size="19" variant="Bold" />}>
                {"Next"}
              </Button>
            </Group>
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="2" pt="md">
        <Stack>
        <Textarea
              label="Detailed Tasks Description"
              placeholder="Enter Tasks description"
              value={formValues.description}
              onChange={(e) => handleInputChange('Detaileddescription', e.target.value)}
            />
              <TextInput
                label="Checklist "
                placeholder="Enter Checklist "
                value={formValues.title}
                onChange={(e) => handleInputChange('Checklist', e.target.value)}
              />
              <Textarea
              label="Safety Instructions"
              placeholder="Safety Instructions"
              value={formValues.description}
              onChange={(e) => handleInputChange('Safety Instructions', e.target.value)}
            />
            <Group align='baseline' >
            <Select
              label="Select Store"
              value={formValues.typeOfWorkOrder}
              onChange={(value) => handleInputChange('typeOfWorkOrder', value || '')}
              data={['Preventive', 'Corrective', 'Inspection', 'Certification']}
            />      <MultiSelect
            label="With native scroll"
            placeholder="Pick value"
            data={['Preventive', 'Corrective', 'Inspection', 'Certification']}
             w={'68%'}
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
            mt="md"
          />
                      </Group>


            <TextInput
              label="Assigned Workforce "
              placeholder="Assigned Workforce "
              value={formValues.assetId}
              onChange={(e) => handleInputChange('AssignedWorkforce', e.target.value)}
            />
            <Group p="right" mt="md" justify="end">
              <Button variant="default" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} rightSection={<AddCircle size="19" variant="Bold" />}>
                              {isEditing ? "Update" : "Create"}
              
              </Button>
            </Group>
          </Stack>        
          </Tabs.Panel>
      </Tabs>
    </Modal>
  );
};

export default WorkOrderModal;
