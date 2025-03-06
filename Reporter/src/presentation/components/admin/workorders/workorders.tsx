import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Stack, Text } from '@mantine/core';
import React, { useState } from 'react'
import SearchInput from '../../input/Searchinput';
import BoxTableAdmin from '../../boxtableglobal/BoxSuperAdmin';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import CreateButton from '../../button/CreateTalentButton';
import { AddCircle } from 'iconsax-react';
import TabsButton from './TabsButtonWork';
import CreationApps from '../../modal/CreationApps';

const workorders = () => {
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
      "id": "App 1",
      "Title": "A useful app for managing educational content.",
      "Priority": "High", // Added a fake priority for this example
      "Created": "2025-02-10", // Added a fake Created
      "coste": "$200", // Added a fake cost
      "action": ["Edit", "Delete"]
    },
    {
      "id": "App 2",
      "Title": "An app designed for collaboration in learning environments.",
      "Priority": "Medium",
      "Created": "2025-02-11",
      "coste": "$150",
      "action": ["Edit", "Delete"]
    },
    {
      "id": "App 3",
      "Title": "A resource management app for educational institutions.",
      "Priority": "Low",
      "Created": "2025-02-09",
      "coste": "$120",
      "action": ["Edit", "Delete"]
    },
    {
      "id": "AI App",
      "Title": "An AI-powered application for data analysis.",
      "Priority": "High",
      "Created": "2025-02-08",
      "coste": "$300",
      "action": ["Edit", "Delete"]
    },
    {
      "id": "Cloud App",
      "Title": "A cloud management tool for scalable solutions.",
      "Priority": "Medium",
      "Created": "2025-02-07",
      "coste": "$250",
      "action": ["Edit", "Delete"]
    },
    {
      "id": "AI App",
      "Title": "An AI-powered application for automation.",
      "Priority": "Low",
      "Created": "2025-02-06",
      "coste": "$180",
      "action": ["Edit", "Delete"]
    },
    {
      "id": "Cloud App",
      "Title": "A secure and scalable cloud storage app.",
      "Priority": "High",
      "Created": "2025-02-05",
      "coste": "$220",
      "action": ["Edit", "Delete"]
    }
  ];
  

  const changebutton=()=>{
    setOpenModel(true)
  }
const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    !isLoading ? (
      <SkeletonLoader />
    ) :(
    <Stack>
      <Text style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace: "nowrap"}} ff={'"Roboto",sans-serif'} fw={'700'} c={'#6c757d'} fz={'18px'}>
      Work Orders List
      </Text>
    <Flex justify={'space-between'}>
    <SearchInput
					setCurrentPage={setCurrentPage}
					onSearch={setSearchQuery}
					placeholder='Search...'
					searchQuery={searchQuery}
				/>

<CreateButton
						isResponsive={isMobile ? isMobile : false}
						changebutton={changebutton}
						lable={'Create Works'}
						icon={<AddCircle
              size="17"
              color="#FFF"
              variant="Bold"
             />}
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
	{openModel && (
				<CreationApps
					opened={openModel}
					onClose={()=>{setOpenModel(false)}}

				/>
			)}

    </Stack>)

  )
}



export default workorders
