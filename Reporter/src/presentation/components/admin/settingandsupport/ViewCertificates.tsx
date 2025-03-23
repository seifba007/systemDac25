import React, { useState, useEffect } from 'react';
import {
  Modal,
  Text,
  Table,
  TextInput,
  NumberInput,
  Select,
  Button,
  Stack,
  Group,
  ScrollArea,
  Divider,
} from '@mantine/core';

interface Question {
  question: string;
  type: string;
  options: string;
  correctAnswer: string;
}

interface ViewCertificatesProps {
  opened: boolean;
  onClose: () => void;
  questions?:any;
  certificat?:any
}

const ViewCertificates: React.FC<ViewCertificatesProps> = ({
  opened,
  onClose,
  certificat = {},
  questions: initialQuestions = [],
}) => {
  const [certificateName, setCertificateName] = useState<string>('');
  const [certificateCategory, setCertificateCategory] = useState<string>('');
  const [validityPeriod, setValidityPeriod] = useState<number>(0);
  const [hasQuiz, setHasQuiz] = useState<string>('false');
  const [questions, setQuestions] = useState<Question[]>([]);

  // Sync state with props
  useEffect(() => {
    if (opened) {
      setCertificateName(certificat.name || '');
      setCertificateCategory(certificat.category || '');
      setValidityPeriod(certificat.validityPeriod || 0);
      setHasQuiz(certificat.hasQuiz || 'false');
      setQuestions(initialQuestions);
    }
  }, [opened, certificat, initialQuestions]);

  const handleSaveChanges = () => {
    const updatedCertificate = {
      name: certificateName.trim(),
      category: certificateCategory.trim(),
      validityPeriod,
      hasQuiz: hasQuiz === 'true',
      questions: questions.filter(
        (q) =>
          q.question.trim() !== '' &&
          q.type.trim() !== '' &&
          q.correctAnswer.trim() !== ''
      ),
    };

    if (!updatedCertificate.name || !updatedCertificate.category) {
      alert('Certificate Name and Category are required.');
      return;
    }

    // Perform API call or parent state update here
    onClose();
  };


  const handleQuestionChange = (index: number, field: keyof Question, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q, i) =>
        i === index
          ? {
              ...q,
              [field]: value,
            }
          : q
      )
    );
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
  };

  return (
    <Modal
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
      size="45em"
      opened={opened}
      onClose={onClose}
      title={<Text c="#fff">Certificate Details</Text>}
      styles={{
        header: { gap: '6em', alignItems: 'flex-start', backgroundColor: '#4254ba' },
      }}
      radius="0px"
    >
  <ScrollArea h={500} >
      <Stack p={'2%'} >      
      
        {/* Certificate Details Table */}
        <Table withColumnBorders withTableBorder>
          <Table.Tbody>
            <Table.Tr>
              <Table.Th fz="13px">Name</Table.Th>
              <Table.Td>
                <TextInput disabled
                  value={certificateName}
                  onChange={(e) => setCertificateName(e.currentTarget.value)}
                  placeholder="Certificate Name"
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th fz="13px">Category</Table.Th>
              <Table.Td>
                <TextInput disabled
                  value={certificateCategory}
                  onChange={(e) => setCertificateCategory(e.currentTarget.value)}
                  placeholder="Certificate Category"
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th fz="13px">Validity Period (Months)</Table.Th>
              <Table.Td>
                <NumberInput disabled
                  value={validityPeriod}
                  onChange={(value) => setValidityPeriod(Number(value) || 0)}
                  placeholder="Validity Period"
                  min={0}
                />
              </Table.Td>
            </Table.Tr>
            <Table.Tr>
              <Table.Th fz="13px">Has Quiz</Table.Th>
              <Table.Td>
                <Select disabled
                  value={hasQuiz}
                  onChange={(value) => setHasQuiz(value || 'false')}
                  data={[
                    { value: 'true', label: 'Yes' },
                    { value: 'false', label: 'No' },
                  ]}
                />
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>

        {/* Questions Section */}
        <Stack >
          <Text fz="15px" fw="bold" pt={'1em'}>
            Questions
          </Text>
          <Table withColumnBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th fz="13px">Question</Table.Th>
                <Table.Th fz="13px">Type</Table.Th>
                <Table.Th fz="13px">Options (comma-separated)</Table.Th>
                <Table.Th fz="13px">Correct Answer</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {questions.map((question, index) => (
                <Table.Tr key={index}>
                  <Table.Td>
                    <TextInput disabled
                      value={question.question}
                      onChange={(e) =>
                        handleQuestionChange(index, 'question', e.currentTarget.value)
                      }
                      placeholder="Question"
                    />
                  </Table.Td>
                  <Table.Td>
                    <TextInput disabled
                      value={question.type}
                      onChange={(e) => handleQuestionChange(index, 'type', e.currentTarget.value)}
                      placeholder="Type"
                    />
                  </Table.Td>
                  <Table.Td>
                    <TextInput disabled
                      value={question.options}
                      onChange={(e) =>
                        handleQuestionChange(index, 'options', e.currentTarget.value)
                      }
                      placeholder="Options"
                    />
                  </Table.Td>
                  <Table.Td>
                    <TextInput disabled
                      value={question.correctAnswer}
                      onChange={(e) =>
                        handleQuestionChange(index, 'correctAnswer', e.currentTarget.value)
                      }
                      placeholder="Correct Answer"
                    />
                  </Table.Td>
          
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
 
        </Stack>      
        

      </Stack>

<Divider my="md" />

      </ScrollArea>
    </Modal>
  );
};

export default ViewCertificates;
