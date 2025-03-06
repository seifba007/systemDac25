import React, { ReactNode, useState } from 'react';
import { Modal, Radio, Text, Title, Flex, Box } from '@mantine/core';
import '../../../sass/components/SuperAdminGlobal.scss';

interface ModelFilterProps {
  opened: boolean;
  onClose: () => void;
  onCategoryChange: (category: string) => void;
  bnt?: ReactNode;
  title?: string;
  roleData: {
    roles: { key: string; label: string }[]; // Corrected structure to match RoleData
  }[];
}

const Categoriesfilter: React.FC<ModelFilterProps> = ({
  opened,
  onClose,
  onCategoryChange,
  roleData,
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('default');

  // Styles for each radio button
  const radioStyles = (isChecked: boolean) => ({
    backgroundColor: isChecked ? '#ECEEF1' : 'transparent',
    borderRadius: '4px',
    padding: '4px',
    display: 'flex',
    paddingLeft: '15px',
    width: '440px',
    height: '56px',
    alignItems: 'center',
  });

  // Handle selection changes
  const handleChange = (value: string) => {
    setSelectedValue(value);
    onCategoryChange(value);
  };

  return (
    <Modal
    overlayProps={{
      backgroundOpacity: 0.55,
      blur: 3,
    }}
      opened={opened}
      onClose={onClose}
      title={
        <Title
          className="titremodel"
          style={{ marginTop: '9px', textAlign: 'center' }}
          order={6}
        >
          Filter By
        </Title>
      }
      classNames={{
        body: 'modalBody',
        content: 'modalContent',
        overlay: 'modalOverlay',
        title: 'modalTitle',
      }}
      styles={{
        body: { padding: 0 },
        header: { gap: '6em', alignItems: 'self-start' },
      }}
      size={'440px'}
      radius={'12px'}
    >
      <Flex direction="column" justify="center" mb="3%">
        {roleData[0].roles.map((role) => (
          <Box key={role.key} style={radioStyles(selectedValue === role.key)}>
            <Radio
              label={<Text className="labelText">{role.label}</Text>}
              value={role.key}
              checked={selectedValue === role.key}
              onChange={() => handleChange(role.key)}
              style={{ flexShrink: 0 }}
            />
          </Box>
        ))}
      </Flex>
    </Modal>
  );
};

export default Categoriesfilter;