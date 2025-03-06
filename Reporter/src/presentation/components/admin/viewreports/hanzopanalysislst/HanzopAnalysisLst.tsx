import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Stack, Text } from '@mantine/core';
import React, { useState } from 'react'
import TabsButton from './TabsButtonHanzopAnalysisLst.';
import BoxTableAdmin from '@/presentation/components/boxtableglobal/BoxSuperAdmin';
import SearchInput from '@/presentation/components/input/Searchinput';
import { SkeletonLoader } from '@/presentation/components/availablity';

const HanzopAnalysisLst = () => {
  const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');

	const [searchQuery, setSearchQuery] = useState<string>('');
 
  const tableData = [
    {
      hazopId: 'HZ12345',
      systemProcessName: 'Cooling Tower System',
      objectives: 'Identify potential hazards and operational inefficiencies.',
      startDate: '2025-01-01',
      endDate: '2025-01-15',
      reviewFrequency: 'Annually',
      actions: 'View/Edit/Delete',
    },
    {
      hazopId: 'HZ12346',
      systemProcessName: 'Steam Generation System',
      objectives: 'Assess risks related to pressure buildup and temperature.',
      startDate: '2025-02-10',
      endDate: '2025-02-25',
      reviewFrequency: 'Semi-Annually',
      actions: 'View/Edit/Delete',
    },
    {
      hazopId: 'HZ12347',
      systemProcessName: 'Chemical Storage Facility',
      objectives: 'Ensure safe handling and storage of hazardous materials.',
      startDate: '2025-03-01',
      endDate: '2025-03-10',
      reviewFrequency: 'Quarterly',
      actions: 'View/Edit/Delete',
    },
    {
      hazopId: 'HZ12348',
      systemProcessName: 'Wastewater Treatment Plant',
      objectives: 'Identify risks of contamination and process disruptions.',
      startDate: '2025-04-05',
      endDate: '2025-04-20',
      reviewFrequency: 'Monthly',
      actions: 'View/Edit/Delete',
    },
    {
      hazopId: 'HZ12349',
      systemProcessName: 'HVAC System',
      objectives: 'Evaluate efficiency and safety under peak loads.',
      startDate: '2025-05-01',
      endDate: '2025-05-15',
      reviewFrequency: 'Annually',
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
      HAZOP Analysis List
      </Text>
    <Flex justify={'space-between'}>
    <SearchInput
					setCurrentPage={setCurrentPage}
					onSearch={setSearchQuery}
					placeholder='Search ...'
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



export default HanzopAnalysisLst
