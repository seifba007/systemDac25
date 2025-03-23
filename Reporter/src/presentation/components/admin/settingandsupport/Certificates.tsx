import React, { useEffect, useState } from 'react';
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
import ViewCertificates from './ViewCertificates';
import AssignCertificate from './AssignCertificate';
import ApproveItem from './ApproveItem';
import { ListOptions } from '@/core/entities/http.entity';
import { createCertificates, DeleteCertificates, getCertificates, getUserAssignmentsbyCertificates } from '@/core/services/modulesServices/Certificates.service';
import { getUsers } from '@/core/services/modulesServices/user.service';
import toast from 'react-hot-toast';
import DeleteModal from '../../modal/DeleteModal';
import { useDisclosure } from '@mantine/hooks';

interface Certificate {
  name: string;
  category: string;
  hasQuiz: string;
  validityPeriod: number;
  _id?:any;
  questions?: StoredQuestion[]; // Adjusted to use StoredQuestion
}

interface Question {
  certificateName: string; // Used for parsing from Excel
  question: string;
  type: string;
  options: string;
  correctAnswer: string;
}

interface StoredQuestion {
  question: string;
  type: string;
  options: string;
  correctAnswer: string;
}

const Certificates = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [file, setFile] = useState<File | null>(null);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [modalOpenVu, setModalOpenVu] = useState<boolean>(false);
  const [modalOpenIteam, setModalOpenIteam] = useState<boolean>(false);
  const [modalOpenAssign, setModalOpenAssign] = useState<boolean>(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<StoredQuestion[]>([]);
  const [userdata, setUserdata] = useState<any>([]);
  const [userAssdata, setUserAssdata] = useState<any>([]);
  const [certificatedataone, setCertificatedataone] = useState<any>([]);
  const [isVisibilityOpen, { open: openVisibility, close: closeVisibility }] = useDisclosure(false);
  const [idcertificate , setCertificate ] = useState('');
  const parseAndUploadCertificates = async () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }
    try {
      setIsLoading(true);
      // Parse Excel file
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      // Parse certificates
      const certificateSheet = workbook.Sheets[workbook.SheetNames[0]];
      const parsedCertificates = XLSX.utils.sheet_to_json<any>(certificateSheet);
      const mappedCertificates: Certificate[] = parsedCertificates.map((row: any) => ({
        name: row['Certificate Name'] || '',
        category: row['Category'] || '',
        hasQuiz: row['Has Quiz (True/False)']?"Yes":"no",
        validityPeriod: row['Validity Period (Months)'] || 0,
        questions: []
      }));

      // Parse questions
      const questionSheet = workbook.Sheets['Questions'];
      let mappedQuestions: Question[] = [];
      if (questionSheet) {
        const parsedQuestions = XLSX.utils.sheet_to_json<any>(questionSheet);
        mappedQuestions = parsedQuestions.map((row: any) => ({
          certificateName: row['Certificate Name'] || '',
          question: row['Question'] || '',
          type: row['Type (multiple-choice/yes-no)'] || '',
          options: row['Options (comma-separated)'] || '',
          correctAnswer: row['Correct Answer'] || '',
        }));

        // Associate questions with certificates
        mappedQuestions.forEach((question) => {
          const cert = mappedCertificates.find((c) => c.name === question.certificateName);
          if (cert) {
            cert.questions!.push({
              question: question.question,
              type: question.type,
              options: question.options,
              correctAnswer: question.correctAnswer
            });
          } else {
            console.warn(`No certificate found for question: ${question.question}`);
          }
        });
        setQuestions(mappedQuestions);
      }

      // Send the array directly to the backend
      const response = await createCertificates({'certificates':mappedCertificates});

      // Assuming response.data contains the array of created certificates
      setCertificates(response.data || []);
      toast.success('Certificates created successfully!');
      getcertificate(); // Refresh the certificate list

    } catch (error) {
      console.error('Error processing and uploading certificates:', error);
      toast.error('Failed to create certificates');
    } finally {
      setIsLoading(false);
      setFile(null); // Clear file input
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
    const relatedQuestions = certificate.questions || questions
      .filter((q) => q.certificateName === certificate.name)
      .map((q) => ({
        question: q.question,
        type: q.type,
        options: q.options,
        correctAnswer: q.correctAnswer
      }));
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
          updatedby: '2',
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
          updatedby: '1',
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

  const certificateId = '12345';
  const updateUserCertificate = (userId: string, certificateId: string, certificateValidity: boolean) => {
    console.log(`Updating user ${userId} with certificate ${certificateId} and validity ${certificateValidity}`);
  };

  useEffect(() => {
    getcertificate();
    getuser();
  }, []);
  const getUserAssignments= async (id:any) => {
    try {
      const res = await getUserAssignmentsbyCertificates(id);
      setUserAssdata(res.data.data)
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching users:', error);
    }
  };

  const getuser = async () => {
    const options: ListOptions['options'] = { limit: '50' };
    try {
      const res = await getUsers({ options });
      setUserdata(res.data.users || []);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching users:', error);
    }
  };

  const getcertificate = async () => {
    try {
      const res = await getCertificates();
      setCertificates(res.data.certificates);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching certificates:', error);
    }
  };
  return isLoading ? (
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
              <Table.Th fz={'13px'} pl={'1em'} c={'#6c757d'}>Certificate Name</Table.Th>
              <Table.Th fz={'13px'} pl={'1em'} c={'#6c757d'}>Category</Table.Th>
              <Table.Th fz={'13px'} pl={'1em'} c={'#6c757d'}>Has Quiz</Table.Th>
              <Table.Th fz={'13px'} pl={'1em'} c={'#6c757d'}>Validity Period (Months)</Table.Th>
              <Table.Th fz={'13px'} c={'#6c757d'} pl={'1em'}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {certificates.length > 0 ? (
              certificates.map((certificate, index) => (
                <Table.Tr key={index}>
                  <Table.Td pl={'1em'} fz={'13px'} c={'#6c757d'}>{certificate.name}</Table.Td>
                  <Table.Td pl={'1em'} fz={'13px'} c={'#6c757d'}>{certificate.category}</Table.Td>
                  <Table.Td pl={'1em'} fz={'13px'} c={'#6c757d'}>{certificate.hasQuiz?'Yes':'No'}</Table.Td>
                  <Table.Td pl={'1em'} fz={'13px'} c={'#6c757d'}>{certificate.validityPeriod}</Table.Td>
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
                      <ActionIcon
                        variant="filled"
                        color="#6c757d"
                        w="25px"
                        h="20px"
                        onClick={() =>{setCertificatedataone(certificate) ;setModalOpenAssign(true)}}
                      >
                        <ProfileAdd color="#fff" size="15" variant="Bold" />
                      </ActionIcon>
                      <ActionIcon
                        variant="filled"
                        color="#dcce0c"
                        w="25px"
                        h="20px"
                        onClick={() => {getUserAssignments(certificate._id);setModalOpenIteam(true)}}
                      >
                        <TickCircle color="#fff" size="15" variant="Bold" />
                      </ActionIcon>
                      <ActionIcon variant="filled" color="red" w="25px" h="20px"onClick={()=>{openVisibility();setCertificate(certificate?._id)}}>
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
            value={file}
            onChange={setFile}
          />
          <Button
            w={'20%'}
            bg={'#4254ba'}
            onClick={parseAndUploadCertificates}
            loading={isLoading}
          >
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
        certificateone={certificatedataone}
        usersList={userdata}
        opened={modalOpenAssign}
        onClose={() => setModalOpenAssign(false)}
      />
      <ApproveItem
        opened={modalOpenIteam}
        onClose={() => setModalOpenIteam(false)}
        certificateId={certificateId}
        usersList={userAssdata}
        updateUserCertificate={updateUserCertificate}
      />
      <DeleteModal
        title="Confirm Deletion"
        deleteText="Delete permanently"
        subtitle="Are you sure you want to delete the Certificate Report"
        opened={isVisibilityOpen}
        close={closeVisibility}
		    handleDelete={() => {
			  if (idcertificate) {
				DeleteCertificates({ id: idcertificate })
					.then(() => {
						toast.success('Certificate deleted');
            getcertificate()
						closeVisibility();
					})
					.catch((err) => {
						console.log(err);
						toast.error('' + err.data.message);
					});
			}
		}}
      />
    </Stack>
  );
};

export default Certificates;