import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Stack, Text } from '@mantine/core';
import React, { useState } from 'react'

import { AddCircle } from 'iconsax-react';
import TabsButton from './TabsButtonRiskAssessmentsList.';
import BoxTableAdmin from '@/presentation/components/boxtableglobal/BoxSuperAdmin';
import SearchInput from '@/presentation/components/input/Searchinput';
import { SkeletonLoader } from '@/presentation/components/availablity';

const RiskAssessmentsList = () => {
  const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');
  const [openModel, setOpenModel] = useState<boolean>(false);

	const [searchQuery, setSearchQuery] = useState<string>('');
 
  const tableData = [
    {
      reportReference: 'RR123456',
      assessmentTitle: 'Quarterly Risk Assessment',
      projectId: 'PID001',
      date: '2025-02-22',
      businessDepartment: 'Finance',
      location: 'New York Office',
      reportStatus: 'Completed',
      actions: 'View/Edit/Delete',
    },
    {
      reportReference: 'RR123457',
      assessmentTitle: 'Environmental Compliance Audit',
      projectId: 'PID002',
      date: '2025-02-15',
      businessDepartment: 'Operations',
      location: 'Los Angeles Office',
      reportStatus: 'Pending Review',
      actions: 'View/Edit/Delete',
    },
    {
      reportReference: 'RR123458',
      assessmentTitle: 'IT Security Vulnerability Report',
      projectId: 'PID003',
      date: '2025-01-30',
      businessDepartment: 'IT',
      location: 'San Francisco Office',
      reportStatus: 'In Progress',
      actions: 'View/Edit/Delete',
    },
    {
      reportReference: 'RR123459',
      assessmentTitle: 'Annual Health and Safety Review',
      projectId: 'PID004',
      date: '2025-02-10',
      businessDepartment: 'HR',
      location: 'Chicago Office',
      reportStatus: 'Completed',
      actions: 'View/Edit/Delete',
    },
    {
      reportReference: 'RR123460',
      assessmentTitle: 'Market Analysis Report',
      projectId: 'PID005',
      date: '2025-02-18',
      businessDepartment: 'Marketing',
      location: 'Boston Office',
      reportStatus: 'Not Started',
      actions: 'View/Edit/Delete',
    },
  ];
  
const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    !isLoading ? (
      <SkeletonLoader />
    ) :(
    <Stack>
      <Text style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace: "nowrap"}} ff={'"Roboto",sans-serif'} fw={'700'} c={'#6c757d'} fz={'18px'}>
      Risk Assessments List
      </Text>
    <Flex justify={'space-between'}>
    <SearchInput
					setCurrentPage={setCurrentPage}
					onSearch={setSearchQuery}
					placeholder='Search Assessments ...'
					searchQuery={searchQuery}
				/>

    </Flex>
      <BoxTableAdmin
				isResponsive={isMobile ? isMobile : false}
				Data={tableData}
				totalCount={50}
				currentPage={2}
				resultsPerPage={1}
				setCurrentPage={setCurrentPage}
				setResultsPerPage={setResultsPerPage}
				renderTableBody={() => (
					<TabsButton
						onTabChange={setTabValue}
						data={tableData}
						isResponsive={isMobile ? isMobile : false}
						titrepage={'Apps'}
						onCategoryChange={setSelectedCategory}
						onSortChange={setSortValue}
						search={searchQuery}
					/>
				)}
			/>


    </Stack>)

  )
}



export default RiskAssessmentsList
