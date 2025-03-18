import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import TabsButton from './TabsButtonHanzopAnalysisLst.';
import BoxTableAdmin from '@/presentation/components/boxtableglobal/BoxSuperAdmin';
import SearchInput from '@/presentation/components/input/Searchinput';
import { getHazopeAnalysis } from '@/core/services/modulesServices/hazop.service';
import { ListOptions } from '@/core/entities/http.entity';
import SkeletonLoader from '@/presentation/components/boxtableglobal/skeletonLoader';

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
  
  const [totalCount, setTotalCount] = useState<number>(0);

	const gethazopeAnalysis = () => {
		const options: ListOptions['options'] = {
			...(currentPage != null && { page: currentPage }),
			...(resultsPerPage != null && { limit: resultsPerPage }),
			...(sortValue &&
				sortValue !== 'default' && {
					...(sortValue === 'createdAt desc' || sortValue === 'createdAt asc'
						? { sort: sortValue.split(' ')[1], sortKey: sortValue.split(' ')[0] }
						: { sort: sortValue }),
				}),
			...(searchQuery && { search: searchQuery }),
			...(tabValue != null &&
				(tabValue === 'banned'
					? { ban: true }
					: tabValue === 'to-validate'
					? { verified: false }
					: tabValue === 'all'
					? null
					: { status: tabValue })),
			...(selectedCategory && selectedCategory !== '0' && { categoryId: selectedCategory }),
		};

		getHazopeAnalysis({ options })
			.then((res) => {
				setHazopeAnalysis(res.data.data.hazops);

				setTotalCount(res.data.data.total_pages);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.error('Error fetching connected user:', error);
			});
	};
	const [hazopeAnalysis, setHazopeAnalysis] = useState<any>();
	useEffect(() => {
		gethazopeAnalysis();
	}, [currentPage, resultsPerPage, sortValue, tabValue, searchQuery, selectedCategory]);
  console.log(hazopeAnalysis)
const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    isLoading ? (
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
					Data={hazopeAnalysis}
          totalCount={totalCount}
          currentPage={currentPage}
          resultsPerPage={resultsPerPage}
				setCurrentPage={setCurrentPage}
				setResultsPerPage={setResultsPerPage}
				renderTableBody={() => (
					<TabsButton
						onTabChange={setTabValue}
						data={hazopeAnalysis}
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
