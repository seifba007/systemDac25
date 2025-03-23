import { Box, Center, Flex, Modal, Paper, Radio, ScrollArea, Stack, Table, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import useResponsive from '@/presentation/shared/mediaQuery';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import { getCertificatesUserAssignments, updateUserCertificate } from '@/core/services/modulesServices/Certificates.service';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';

// Interfaces based on your API response
interface Question {
  question: string;
  type: string;
  options: string[];
  correctAnswer: string;
}

interface CertificateAssignment {
  certificateId: string;
  isValid: boolean;
  updatedBy: string;
  assignmentDate: string;
  status: string;
  validationDate?: string;
  expirationDate?: string;
  name: string;
  category: string;
  hasQuiz: boolean;
  validityPeriod: number | null;
  questions: Question[];
}

const Certification = () => {
  const { isMobile } = useResponsive();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizResults, setQuizResults] = useState<any>({});
  const [currentCertId, setCurrentCertId] = useState<string>('');
  const [certificates, setCertificates] = useState<CertificateAssignment[]>([]);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);

  useEffect(() => {
    getCertificates();
  }, []);

  const getCertificates = async () => {
    try {
      setIsLoading(true);
      const res = await getCertificatesUserAssignments();
      if (res.data.success && res.data.data && Array.isArray(res.data.data.assignedCertificates)) {
        setCertificates(res.data.data.assignedCertificates);
      } else {
        console.warn('No valid certificate data received:', res);
        setCertificates([]);
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setCertificates([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('Certificates state updated:', certificates);
  }, [certificates]);

  const handleQuizOpen = (certId: string) => {
    const cert = certificates.find(c => c.certificateId === certId);
    if (cert && cert.hasQuiz && cert.questions.length > 0) {
      setCurrentCertId(certId);
      setCurrentQuestions(cert.questions);
      setUserAnswers({}); // Reset answers
      setShowQuizModal(true);
    } else {
      console.warn('No quiz available for this certificate:', certId);
    }
  };

  const handleQuizClose = () => {
    setShowQuizModal(false);
    setUserAnswers({});
    setCurrentQuestions([]);
  };
  const user = useAppSelector(selectConnectedUser);
  const handleAnswerChange = (questionIndex: number, answer: string) => {
    console.log(`Answer changed for question ${questionIndex}: ${answer}`);
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleQuizSubmit = async () => {
    console.log('Submitting quiz with answers:', userAnswers);
    let correctCount = 0;

    currentQuestions.forEach((question, index) => {
      const userAnswer = userAnswers[index].trim();  // Remove spaces from the start and end of the user answer
      const correctAnswer = question.correctAnswer;
      console.log(`Question ${index + 1}: User Answer = "${userAnswer}", Correct Answer = "${correctAnswer}"`);
      
      if (userAnswer === correctAnswer) {
        correctCount++;
        console.log(`Match found for question ${index + 1}`);
      } else {
        console.log(`No match for question ${index + 1}`);
      }
    });
    
    const score = (correctCount / currentQuestions.length) * 100;
    console.log(`Score: ${score}% (${correctCount}/${currentQuestions.length})`);

    setQuizResults({
      score,
      status: score >= 75 ? 'passed' : 'failed',
      correctAnswers: Object.values(userAnswers)
    });

    // Call API if score is 100%
    if (score === 100) {
      if (!user?.id) {
        toast.error('User ID not found');
      } else {
        const updateData = {
          isValid: true,
          validationDate: new Date().toISOString(),
          validityPeriod: certificates.find(c => c.certificateId === currentCertId)?.validityPeriod || 12,
        };

        try {
          await updateUserCertificate(updateData, currentCertId, user?.id);
          toast.success('Certificate updated successfully due to 100% score');
          getCertificates(); // Refresh certificates
        } catch (error) {
          console.error('Error updating certificate:', error);
          toast.error('Failed to update certificate');
        }
      }
    }

    setShowQuizModal(false);
    setShowResultsModal(true);
  };

  const handleResultsClose = () => {
    setShowResultsModal(false);
  };

  const validCertPercentage = certificates.length > 0 
    ? (certificates.filter(cert => cert.isValid).length / certificates.length) * 100 
    : 0;

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
        Certification Records
      </Text>
       <Paper shadow="xs" p="xl">
       <ScrollArea h={350}>
        <Table highlightOnHover withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Certification Name</Table.Th>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Category</Table.Th>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Status</Table.Th>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Validation Date</Table.Th>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Expiry Date</Table.Th>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Updated By</Table.Th>
              <Table.Th style={{ padding: '10px', fontSize: '13px' }}>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {certificates.length === 0 ? (
              <Table.Tr style={{ alignItems: 'center' }}>
                <Table.Td colSpan={7} bg={'rgb(0 0 0 / 4%)'} p={'2%'}>
                  <Center>
                    <Text fz={'14px'}>No certifications assigned</Text>
                  </Center>
                </Table.Td>
              </Table.Tr>
            ) : (
              certificates.map((cert, index) => (
                <Table.Tr key={index}>
                  <Table.Td fz={'12px'}>{cert.name}</Table.Td>
                  <Table.Td fz={'12px'}>{cert.category}</Table.Td>
                  <Table.Td fz={'12px'}>{cert.status}</Table.Td>
                  <Table.Td fz={'12px'}>{cert.validationDate || 'N/A'}</Table.Td>
                  <Table.Td fz={'12px'}>{cert.expirationDate || 'N/A'}</Table.Td>
                  <Table.Td fz={'12px'}>{cert.updatedBy}</Table.Td>
                  <Table.Td>
                    {cert.hasQuiz ? (
                      <button
                        className="btn btn-primary"
                        onClick={() => handleQuizOpen(cert.certificateId)}
                      >
                        <Text fz={'11px'}>Take Test</Text>
                      </button>
                    ) : (
                      <Text fz={'11px'} c={'gray'}>No Quiz</Text>
                    )}
                  </Table.Td>
                </Table.Tr>
              ))
            )}
            <Table.Tr>
              <Table.Td colSpan={6} fw={'600'} fz={'13px'} p={'1%'}>
                Percentage of Valid Certifications:{' '}
              </Table.Td>
              <Table.Td fz={'13px'} p={'1%'}>
                {validCertPercentage.toFixed(1)}%
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>  </ScrollArea>
      </Paper>

      {showQuizModal && (
        <Modal
          opened={showQuizModal}
          onClose={handleQuizClose}
          title={<Text c="#fff">Take Quiz for {certificates.find(c => c.certificateId === currentCertId)?.name || currentCertId}</Text>}
          fullScreen
          radius={0}
          styles={{
            header: { gap: '6em', alignItems: 'flex-start', backgroundColor: '#4254ba' },
          }}
        >
          <Box pt={'1em'}>
            <form id="quizForm" onSubmit={(e) => { e.preventDefault(); handleQuizSubmit(); }}>
              <Stack id="quizQuestionsContainer" pb={'2em'}>
                {currentQuestions.map((question, index) => (
                  <Stack key={index} gap={'0.5em'}>
                    <p>{index + 1}. {question.question}</p>
                    {question.type === 'multiple-choice' ? (
                      question.options.map((option, optIndex) => (
                        <Flex gap={'0.5em'} align={'center'} key={optIndex}>
                          <Radio
                            name={`question_${index}`}
                            value={option}
                            checked={userAnswers[index] === option}
                            onChange={() => handleAnswerChange(index, option)}
                          />
                          <Text>{option}</Text>
                        </Flex>
                      ))
                    ) : (
                      <Flex gap={'0.5em'} align={'center'}>
                        <Radio
                          name={`question_${index}`}
                          value="yes"
                          checked={userAnswers[index] === 'yes'}
                          onChange={() => handleAnswerChange(index, 'yes')}
                        />
                        <Text>Yes</Text>
                        <Radio
                          name={`question_${index}`}
                          value="no"
                          checked={userAnswers[index] === 'no'}
                          onChange={() => handleAnswerChange(index, 'no')}
                        />
                        <Text>No</Text>
                      </Flex>
                    )}
                  </Stack>
                ))}
              </Stack>
              <button type="submit" className="btn btn-success mt-3">
                Submit Quiz
              </button>
            </form>
          </Box>
        </Modal>
      )}

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
            header: {
              gap: '6em',
              alignItems: 'flex-start',
              backgroundColor: quizResults.status === 'failed' ? 'red' : 'green'
            },
          }}
          radius={0}
        >
          <Stack pt={'1em'} id="quizResultsContainer">
            <Text fw={'600'} fz={'18px'}>Your score: {quizResults.score}%</Text>
            {currentQuestions.map((question, index) => (
              <div key={index}>
                <Text fz={'14px'} c={'rgba(108, 117, 125, 0.75)'}>
                  {index + 1}. {question.question}
                </Text>
                <Text fz={'14px'} c={'#f7473a'}>Your answer: {userAnswers[index] || 'Not answered'}</Text>
                <Text fz={'14px'} c={'#17a497'}>Correct answer: {question.correctAnswer}</Text>
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