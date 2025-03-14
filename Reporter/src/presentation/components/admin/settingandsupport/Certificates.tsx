import React, { useState } from 'react';
import {
  ActionIcon,
  Button,
  Divider,
  FileInput,
  Flex,
  Paper,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import { DocumentDownload, Eye, ProfileAdd, TickCircle, Trash } from 'iconsax-react';
import * as XLSX from 'xlsx';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import useResponsive from '@/presentation/shared/mediaQuery';
import ViewCertificates from './ViewCertificates';
import AssignCertificate from './AssignCertificate';
import ApproveItem from './ApproveItem';

interface Certificate {
  name: string;
  category: string;
  hasQuiz: string;
  validityPeriod: number;
}

interface Question {
  question: string;
  type: string;
  options: string;
  correctAnswer: string;
}

const Certificates = () => {
  const { isMobile } = useResponsive();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [modalOpenVu, setModalOpenVu] = useState<boolean>(false);
  const [modalOpenIteam, setModalOpenIteam] = useState<boolean>(false);
  const [modalOpenAssign, setModalOpenAssign] = useState<boolean>(false);

  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);


  const parseFile = async () => {
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });

      const certificateSheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedCertificates = XLSX.utils.sheet_to_json<any>(certificateSheet);

      const mappedCertificates = parsedCertificates.map((row: any) => ({
        name: row['Certificate Name'] || '',
        category: row['Category'] || '',
        hasQuiz: row['Has Quiz'] || 'No',
        validityPeriod: row['Validity Period (Months)'] || 0,
      }));

      setCertificates(mappedCertificates);

      const questionSheet = workbook.Sheets['Questions'];
      if (questionSheet) {
        const parsedQuestions = XLSX.utils.sheet_to_json<any>(questionSheet);

        const mappedQuestions = parsedQuestions.map((row: any) => ({
          question: row['Question'] || '',
          type: row['Type (multiple-choice/yes-no)'] || '',
          options: row['Options (comma-separated)'] || '',
          correctAnswer: row['Correct Answer'] || '',
        }));

        setQuestions(mappedQuestions);
      } else {
        console.warn('Questions sheet not found in the uploaded file.');
      }
    } catch (error) {
      console.error('Error reading the file:', error);
    }
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '/certificate_template.xlsx';
    link.download = 'certificate_template.xlsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewCertificate = (certificate: Certificate) => {
    // Filter questions related to the selected certificate
    const relatedQuestions = questions.filter(
      (q) => q.question.startsWith(certificate.name) // Adjust condition as needed
    );

    setSelectedCertificate(certificate);
    setSelectedQuestions(relatedQuestions);
    setModalOpenVu(true);
  };
  const certificateAssignment = [
    {
      userId: '1',
      assignedCertificates: [
        {
          certificateId: { _id: '12345' },
          isValid: true,
          validationDate: '2025-03-03',
          updatedby: '2', // User ID of the one who updated
          status: 'Active',
          expirationDate: '2025-12-31',
        },
      ],
    },
    {
      userId: '2',
      assignedCertificates: [
        {
          certificateId: { _id: '12345' },
          isValid: false,
          validationDate: '2024-11-15',
          updatedby: '1', // User ID of the one who updated
          status: 'Inactive',
          expirationDate: '2024-11-15',
        },
      ],
    },
    {
      userId: '3',
      assignedCertificates: [
        {
          certificateId: { _id: '12345' },
          isValid: true,
          validationDate: '2025-01-10',
          updatedby: '3',
          status: 'Active',
          expirationDate: '2025-07-20',
        },
      ],
    },
  ];
  const certificateId = '12345'; // Simulated certificate ID
  const updateUserCertificate = (userId: string, certificateId: string, certificateValidity: boolean) => {
    console.log(`Updating user ${userId} with certificate ${certificateId} and validity ${certificateValidity}`);
  };

  const usersList = [
    {
      _id: '1',
      username: 'John Doe',
    },
    {
      _id: '2',
      username: 'Jane Smith',
    },
    {
      _id: '3',
      username: 'Chris Johnson',
    },
  ];

  return !isLoading ? (
    <SkeletonLoader />
  ) : (
    <Stack>
      <Text
        style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
        ff={'"Roboto",sans-serif'}
        fw={'700'}
        c={'#6c757d'}
        fz={'18px'}
      >
        Create and View Certificates
      </Text>
      <Paper shadow="xs" p="xl">
        <Text pb={'1em'} ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'15px'}>
          Existing Certifications
        </Text>
        <Table highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th fz={'13px'} pl={'1em'} c={'#6c757d'}>
                Certificate Name
              </Table.Th>
              <Table.Th fz={'13px'} pl={'1em'} c={'#6c757d'}>
                Category
              </Table.Th>
              <Table.Th fz={'13px'} pl={'1em'} c={'#6c757d'}>
                Has Quiz
              </Table.Th>
              <Table.Th fz={'13px'} pl={'1em'} c={'#6c757d'}>
                Validity Period (Months)
              </Table.Th>
              <Table.Th fz={'13px'} c={'#6c757d'} pl={'1em'}>
                Actions
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {certificates.length > 0 ? (
              certificates.map((certificate, index) => (
                <Table.Tr key={index}>
                  <Table.Td pl={'1em'} fz={'13px'} c={'#6c757d'}>
                    {certificate.name}
                  </Table.Td>
                  <Table.Td pl={'1em'} fz={'13px'} c={'#6c757d'}>
                    {certificate.category}
                  </Table.Td>
                  <Table.Td pl={'1em'} fz={'13px'} c={'#6c757d'}>
                    {certificate.hasQuiz}
                  </Table.Td>
                  <Table.Td pl={'1em'} fz={'13px'} c={'#6c757d'}>
                    {certificate.validityPeriod}
                  </Table.Td>
                  <Table.Td pl={'1em'}>
                    <Flex gap="0.5em">
                      <ActionIcon
                        variant="filled"
                        color="#4254ba"
                        w="25px"
                        h="20px"
                        onClick={() => handleViewCertificate(certificate)}
                      >
                        <Eye color="#fff" size="15" variant="Bold" />
                      </ActionIcon>
                      <ActionIcon variant="filled" color="#6c757d" w="25px" h="20px" onClick={()=>{setModalOpenAssign(true)}}>
                        <ProfileAdd color="#fff" size="15" variant="Bold" />
                      </ActionIcon>
                      <ActionIcon variant="filled" color="#dcce0c" w="25px" h="20px" onClick={()=>{setModalOpenIteam(true)}}>
                        <TickCircle color="#fff" size="15" variant="Bold" />
                      </ActionIcon>
                      <ActionIcon variant="filled" color="red" w="25px" h="20px">
                        <Trash color="#fff" size="15" />
                      </ActionIcon>
                    </Flex>
                  </Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5} c={'#6c757d'} align="center">
                  No certificates uploaded yet.
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Paper>
      <Paper shadow="xs" p="xl">
        <Stack>
          <Text pb={'1em'} ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'15px'}>
            Upload Certificate Excel File
          </Text>
          <FileInput
            leftSectionPointerEvents="none"
            size="md"
            leftSection={<DocumentDownload size="20" variant="Bold" />}
            label={
              <Text pb={'0.5em'} ff={'"Roboto", sans-serif'} fw={'600'} c={'#6c757d'} fz={'12px'}>
                Select Excel File
              </Text>
            }
            placeholder="No file chosen"
            onChange={setFile}
          />
          <Button w={'20%'} bg={'#4254ba'} onClick={parseFile}>
            <Text fz={'12px'}>Upload and Create Certificates</Text>
          </Button>
          <Divider my="xs" />
          <Button w={'18%'} bg={'#6c757d'} onClick={handleDownloadTemplate}>
            <Text fz={'12px'}>Download Blank Template</Text>
          </Button>
        </Stack>
      </Paper>
      <ViewCertificates
        certificat={selectedCertificate}
        opened={modalOpenVu}
        onClose={() => setModalOpenVu(false)}
        questions={selectedQuestions}
      />
         <AssignCertificate
        opened={modalOpenAssign}
        onClose={() => setModalOpenAssign(false)}
      />
          <ApproveItem
          opened={modalOpenIteam} // Set the modal opened state to true for demonstration
          onClose={() => setModalOpenIteam(false)}
          certificateId={certificateId}
          certificateAssignment={certificateAssignment}
          usersList={usersList}
          updateUserCertificate={updateUserCertificate}    />
    </Stack>
  );
};

export default Certificates;
