import React, { ReactNode, useEffect, useState } from 'react';
import { Modal, Text, Flex, Box, Stack, Button, Autocomplete, Textarea, ScrollArea, Table } from '@mantine/core';
import { ArrowDown2 } from 'iconsax-react';

interface User {
  _id: string;
  username: string;
}

interface AssignedCertificate {
  certificateId: { _id: string };
  isValid: boolean;
  validationDate: string;
  updatedby: string;
  status: string;
  expirationDate: string;
}

interface CertificateAssignment {
  userId: string;
  assignedCertificates: AssignedCertificate[];
}

interface ModelFilterProps {
  opened: boolean;
  isReject?: boolean;
  onClose: () => void;
  bnt?: ReactNode;

  certificateId: string;
  certificateAssignment: CertificateAssignment[];
  usersList: User[];
  updateUserCertificate: (userId: string, certificateId: string, certificateValidity: boolean) => void;
}

const ApproveItem: React.FC<ModelFilterProps> = ({
  opened,
  onClose,
  certificateId,
  certificateAssignment,
  usersList,
  updateUserCertificate,
}) => {
  const [assignedUsers, setAssignedUsers] = useState<AssignedCertificate[]>([]);

  useEffect(() => {
    // Filter the certificate assignments to find those matching the certificateId
    const filteredAssignments = certificateAssignment
      .map((assignment) =>
        assignment.assignedCertificates.filter(
          (assignedCertificate) => assignedCertificate.certificateId._id.toString() === certificateId.toString()
        )
      )
      .flat();
    setAssignedUsers(filteredAssignments);
  }, [certificateId, certificateAssignment]);

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
              {assignedUsers.map((assignedCertificate, index) => {
                const user = usersList.find((u) => u._id.toString() === assignedCertificate.certificateId._id.toString());
                const updatedByUser = usersList.find((u) => u._id.toString() === assignedCertificate.updatedby?.toString());

                return (
                  <Table.Tr key={index}>
                    {/* Name */}
                    <Table.Td fz={'12px'}>{user ? user.username : 'Unknown'}</Table.Td>

                    {/* Validity (Editable) */}
                    <Table.Td >
                      <select style={{fontSize:'12px'}} className="form-select" defaultValue={assignedCertificate.isValid ? 'true' : 'false'}>
                        <option style={{fontSize:'12px'}} value="true">Valid</option>
                        <option style={{fontSize:'12px'}} value="false">Invalid</option>
                      </select>
                    </Table.Td>

                    {/* Validation Date (Editable) */}
                    <Table.Td>
                      <input style={{fontSize:'12px'}}
                        type="date"
                        className="form-control"
                        defaultValue={
                          assignedCertificate.validationDate
                            ? new Date(assignedCertificate.validationDate).toISOString().split('T')[0]
                            : ''
                        }
                      />
                    </Table.Td>

                    {/* Updated By (Display Only) */}
                    <Table.Td fz={'12px'}>{updatedByUser ? updatedByUser.username : 'N/A'}</Table.Td>

                    {/* Status (Display Only) */}
                    <Table.Td fz={'12px'}>  {assignedCertificate.status}</Table.Td>

                    {/* Expiration Date (Display Only) */}
                    <Table.Td fz={'12px'}>{assignedCertificate.expirationDate ? new Date(assignedCertificate.expirationDate).toLocaleDateString() : 'N/A'}</Table.Td>

                    {/* Update Button */}
                    <Table.Td >
                      <button
                        className="btn btn-primary"
                        onClick={() => updateUserCertificate(assignedCertificate.certificateId._id, certificateId, assignedCertificate.isValid)}
                      >
						<Text fz={'10px'}>  Update</Text>
                      
                      </button>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </Modal>
  );
};

export default ApproveItem;
