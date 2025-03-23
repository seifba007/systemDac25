import React, { ReactNode, useState } from 'react';
import { Modal, Text, Stack, ScrollArea, Table, Select, Input } from '@mantine/core';

interface User {
  fullName: string;
  email: string;
}

interface Certificate {
  certificateId: string;
  isValid: boolean;
  validationDate: string;
  updatedBy: string;
  status: string;
  expirationDate: string;
  assignmentDate: string;
}

interface CertificateAssignment {
  userId: string;
  user: User;
  certificate: Certificate;
}

interface ModelFilterProps {
  opened: boolean;
  isReject?: boolean;
  onClose: () => void;
  bnt?: ReactNode;
  certificateId: string;
  usersList: CertificateAssignment[];
  updateUserCertificate: (userId: string, certificateId: string, certificateValidity: boolean) => void;
}

const ApproveItem: React.FC<ModelFilterProps> = ({
  opened,
  onClose,
  certificateId,
  usersList,
  updateUserCertificate,
}) => {
  // State to track editable fields for each user
  const [assignments, setAssignments] = useState<CertificateAssignment[]>(usersList);

  // Sync assignments when usersList changes
  React.useEffect(() => {
    setAssignments(usersList);
  }, [usersList]);

  // Handle changes to isValid
  const handleValidityChange = (index: number, value: string) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index].certificate.isValid = value === 'true';
    setAssignments(updatedAssignments);
  };

  // Handle changes to validationDate
  const handleValidationDateChange = (index: number, value: string) => {
    const updatedAssignments = [...assignments];
    updatedAssignments[index].certificate.validationDate = value;
    setAssignments(updatedAssignments);
  };

  // Handle update button click
  const handleUpdate = (userId: string, certId: string, isValid: boolean) => {
    updateUserCertificate(userId, certId, isValid);
  };

  return (
    <Modal
      size="55em"
      opened={opened}
      onClose={onClose}
      title={<Text c={'#fff'}>Certificate Validation for: Safety Certification</Text>}
      styles={{
        header: {
          gap: '6em',
          alignItems: 'flex-start',
          background: '#4254ba',
        },
      }}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      radius="5px"
    >
      <Stack mt={'1em'}>
        <ScrollArea h={200}>
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th fz="13px">Name</Table.Th>
                <Table.Th fz="13px">Validity</Table.Th>
                <Table.Th fz="13px">Validation Date</Table.Th>
                <Table.Th fz="13px">Updated By</Table.Th>
                <Table.Th fz="13px">Status</Table.Th>
                <Table.Th fz="13px">Expiration Date</Table.Th>
                <Table.Th fz="13px">Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {assignments.map((assignment, index) => (
                <Table.Tr key={index}>
                  {/* Name */}
                  <Table.Td fz={'12px'}>{assignment.user.fullName || 'Unknown'}</Table.Td>

                  {/* Validity (Editable) */}
                  <Table.Td>
                    <Select
                      size="xs"
                      data={[
                        { value: 'true', label: 'Valid' },
                        { value: 'false', label: 'Invalid' },
                      ]}
                      value={assignment.certificate.isValid ? 'true' : 'false'}
                      onChange={(value) => handleValidityChange(index, value as string)}
                    />
                  </Table.Td>

                  {/* Validation Date (Editable) */}
                  <Table.Td>
                    <Input
                      size="xs"
                      type="date"
                      value={
                        assignment.certificate.validationDate
                          ? new Date(assignment.certificate.validationDate).toISOString().split('T')[0]
                          : ''
                      }
                      onChange={(e) => handleValidationDateChange(index, e.currentTarget.value)}
                    />
                  </Table.Td>

                  {/* Updated By (Display Only) */}
                  <Table.Td fz={'12px'}>{assignment.certificate.updatedBy || 'N/A'}</Table.Td>

                  {/* Status (Display Only) */}
                  <Table.Td fz={'12px'}>{assignment.certificate.status}</Table.Td>

                  {/* Expiration Date (Display Only) */}
                  <Table.Td fz={'12px'}>
                    {assignment.certificate.expirationDate
                      ? new Date(assignment.certificate.expirationDate).toLocaleDateString()
                      : 'N/A'}
                  </Table.Td>

                  {/* Update Button */}
                  <Table.Td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleUpdate(
                          assignment.userId,
                          assignment.certificate.certificateId,
                          assignment.certificate.isValid
                        )
                      }
                    >
                      <Text fz={'10px'}>Update</Text>
                    </button>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </Modal>
  );
};

export default ApproveItem;