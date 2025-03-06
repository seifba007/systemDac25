import { Box, Center, Flex, Modal, Radio, Stack, Table, Text } from '@mantine/core';
import React, { useState } from 'react';
import BoxTableAdmin from '../../boxtableglobal/BoxSuperAdmin';
import useResponsive from '@/presentation/shared/mediaQuery';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import TabsButton from './TabsButtonCertification';
import SearchInput from '../../input/Searchinput';

// Dummy data for the quiz (you can replace it with actual data)
interface Question {
  question: string;
  type: string;
  options?: string[];
  correctAnswer: string;
}

const sampleQuestions: Question[] = [
  {
    question: "What is React?",
    type: "multiple-choice",
    options: ["Library", "Framework", "Tool"],
    correctAnswer: "Library"
  },
  {
    question: "Is React used for building user interfaces?",
    type: "yes-no",
    correctAnswer: "yes"
  }
];

const Certification = () => {
  const { isMobile } = useResponsive();
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tabValue, setTabValue] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortValue, setSortValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<any>({});
  const [quizResults, setQuizResults] = useState<any>({});
  const [currentCertId, setCurrentCertId] = useState<string>("");

  const tableData = [
    {
      name: 'Widget A',
      partNumber: 'WA12345',
      type: 'Electronics',
      cost: '$15.00',
      qtyOnHand: 100,
      minimumStock: 20,
      attachments: ['Attachment 1', 'Attachment 2'],
      actions: ['Edit', 'Delete'],
    },
    {
      name: 'Gadget B',
      partNumber: 'GB67890',
      type: 'Mechanical',
      cost: '$45.50',
      qtyOnHand: 50,
      minimumStock: 10,
      attachments: ['Attachment 1'],
      actions: ['Edit', 'Delete'],
    },
    {
      name: 'Tool C',
      partNumber: 'TC54321',
      type: 'Hardware',
      cost: '$9.99',
      qtyOnHand: 200,
      minimumStock: 30,
      attachments: ['Attachment 1', 'Attachment 3'],
      actions: ['Edit', 'Delete'],
    },
    {
      name: 'Accessory D',
      partNumber: 'AD98765',
      type: 'Accessory',
      cost: '$7.25',
      qtyOnHand: 150,
      minimumStock: 25,
      attachments: ['Attachment 2'],
      actions: ['Edit', 'Delete'],
    },
    {
      name: 'Device E',
      partNumber: 'DE11223',
      type: 'Electronics',
      cost: '$199.99',
      qtyOnHand: 30,
      minimumStock: 5,
      attachments: ['Attachment 1', 'Attachment 4'],
      actions: ['Edit', 'Delete'],
    },
  ];

  const handleQuizOpen = (certId: string) => {
    setCurrentCertId(certId);
    setShowQuizModal(true);
  };

  const handleQuizClose = () => {
    setShowQuizModal(false);
    setUserAnswers({});
  };

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setUserAnswers((prev:any) => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleQuizSubmit = () => {
    const correctAnswers: string[] = [];
    let correctCount = 0;

    sampleQuestions.forEach((question, index) => {
      const userAnswer = userAnswers[index];
      if (userAnswer) {
        correctAnswers.push(userAnswer);
        if (userAnswer === question.correctAnswer) {
          correctCount++;
        }
      }
    });

    const score = (correctCount / sampleQuestions.length) * 100;
    setQuizResults({
      score,
      status: score >= 75 ? 'passed' : 'failed',
      correctAnswers
    });

    setShowQuizModal(false);
    setShowResultsModal(true);
  };

  const handleResultsClose = () => {
    setShowResultsModal(false);
  };

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
        Certification Records
      </Text>
      <Center className={'BoxTableF'}>
        <Table highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Certification Name</Table.Th>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Category</Table.Th>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Status</Table.Th>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Certification Date</Table.Th>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Expiry Date</Table.Th>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Updated By</Table.Th>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {tableData.length === 0 ? (
              <Table.Tr style={{ alignItems: 'center' }}>
                <Table.Td colSpan={7} bg={'rgb(0 0 0 / 4%)'} p={'2%'}>
                  <Center>
                    <Text fz={'14px'}>No certifications assigned</Text>
                  </Center>
                </Table.Td>
              </Table.Tr>
            ) : (
              tableData.map((item, index) => (
                <Table.Tr key={index}>
                  <Table.Td fz={'13px'}>{item.name}</Table.Td>
                  <Table.Td fz={'13px'}>{item.type}</Table.Td>
                  <Table.Td fz={'13px'}>{item.qtyOnHand}</Table.Td>
                  <Table.Td fz={'13px'}>{item.minimumStock}</Table.Td>
                  <Table.Td fz={'13px'}> {item.qtyOnHand}</Table.Td>
                  <Table.Td fz={'13px'}> {item.qtyOnHand}</Table.Td>
                  <Table.Td>
                    <button className="btn btn-primary" onClick={() => handleQuizOpen(item.name)}>
                  <Text fz={'11px'}>    Take Test</Text>
                    </button>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
            <Table.Tr>
              <Table.Td colSpan={6} fw={'600'} fz={'13px'} p={'1%'}>
                Percentage of Valid Certifications:{' '}
              </Table.Td>
              <Table.Td fz={'13px'} p={'1%'}>
                0%
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </Center>

      {/* Quiz Modal */}

{showQuizModal && (
  <Modal
    opened={showQuizModal} 
    onClose={handleQuizClose} 
    title={<Text c="#fff">Take Quiz for ${currentCertId}</Text>} 
    fullScreen
    radius={0}
    styles={{
      header: { gap: '6em', alignItems: 'flex-start', backgroundColor: '#4254ba' },
    }}
  >
<Box pt={'1em'}>
<form id="quizForm">
      <Stack id="quizQuestionsContainer" pb={'2em'}>
        {sampleQuestions.map((question, index) => (
          <Stack key={index} gap={'0.5em'}>
            <p>{index + 1}. {question.question}</p>
            {question.type === 'multiple-choice' ? (
              question.options?.map((option, optIndex) => (
                <Flex gap={'0.5em'} align={'center'} key={optIndex}>
                  <Radio
                    name={`question_${index}`}
                    value={option}
                    onChange={() => handleAnswerChange(index, option)}
                  />
                  {option}
                </Flex>
              ))
            ) : (
              <Flex gap={'0.5em'} align={'center'}>
                <Radio
                  name={`question_${index}`}
                  value="yes"
                  onChange={() => handleAnswerChange(index, 'yes')}
                />
                Yes
                <Radio
                  name={`question_${index}`}
                  value="no"
                  onChange={() => handleAnswerChange(index, 'no')}
                />
                No
              </Flex>
            )}
          </Stack>
        ))}
      </Stack>
      <button type="button" className="btn btn-success mt-3" onClick={handleQuizSubmit}>
        Submit Quiz
      </button>
    </form>
</Box>
  </Modal>
)}

      {/* Results Modal */}

{showResultsModal && (
  <Modal
    opened={showResultsModal}
    onClose={handleResultsClose}
    title={<Text c="#fff" fw={'700'}>Quiz Results</Text>}
    overlayProps={{
      backgroundOpacity: 0.55,
      blur: 3,
    }}
    styles={{
      header: { gap: '6em', alignItems: 'flex-start', backgroundColor: quizResults.status === 'failed' ? 'red' : 'green' },
    }}
   radius={0}
  >
    <Stack pt={'1em'} id="quizResultsContainer">
      <Text fw={'600'} fz={'18px'}>Your score: {quizResults.score}%</Text>
      {sampleQuestions.map((question, index) => (
        <div key={index}>
          <Text fz={'14px'} c={'rgba(108, 117, 125, 0.75)'}>{index + 1}. {question.question}</Text>
          <Text fz={'14px'} c={'#f7473a'}>Your answer: {userAnswers[index]}</Text>
          <Text  fz={'14px'}  c={'#17a497'}>Correct answer: {question.correctAnswer}</Text>
        </div>
      ))}
    </Stack>
    <button type="button" className="btn btn-primary mt-3" onClick={handleResultsClose}>
      Close
    </button>
  </Modal>
)}

    </Stack>
  );
};

export default Certification;
