import useResponsive from '@/presentation/shared/mediaQuery';
import { Autocomplete, Box, Flex, Stack, Text } from '@mantine/core';
import React, { useState } from 'react'
import SearchInput from '../../input/Searchinput';
import BoxTableAdmin from '../../boxtableglobal/BoxSuperAdmin';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import CreateButton from '../../button/CreateTalentButton';
import { AddCircle, ArrowDown2 } from 'iconsax-react';
import EditUserModel from '../../modal/EditUserModel';
import CreationOrganization from '../../modal/CreationOrganization';
import CreationApps from '../../modal/CreationApps';
import BoxLicenses from './BoxLicenses';

const Licenses = () => {
  const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');
  const [openModel, setOpenModel] = useState<boolean>(false);

	const [searchQuery, setSearchQuery] = useState<string>('');
  const exampleData: any[] = [
    {
      id: '1',
      name: 'John Doe',
      apps: {
        name: 'App 1',
        logo: 'https://via.placeholder.com/40',
      },
      description: 'This is a description for App 1.',
      path: '/app1',
      active: true,
    },
    {
      id: '2',
      name: 'Jane Smith',
      apps: {
        name: 'App 2',
        logo: 'https://via.placeholder.com/40',
      },
      description: 'This is a description for App 2.',
      path: '/app2',
      active: false,
    },
  ];
  
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    !isLoading ? (
      <SkeletonLoader />
    ) :(
    <Stack>
     
    <Flex  justify={'space-between'} style={{flexWrap:'wrap'}}>
    <Text  pb={isMobile?'1em':'0em'}style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace: "nowrap"}} ff={'"Roboto",sans-serif'} fw={'700'} c={'#6c757d'} fz={'18px'}>
    License Management

      </Text>
   
      <Autocomplete
        value={title} // Bind the input value to the state
        onChange={setTitle} // Update the state when a value is selected
        rightSectionPointerEvents="none"
        rightSection={<ArrowDown2 size="16" color="#6c757d" />}
        data={['SmarDac', 'Organization Users']} // Example data
        placeholder="Select a title"
      />
    </Flex>
      <BoxLicenses
      titl={title}
            isResponsive={isMobile ? isMobile : false}
            totalCount={50}
            currentPage={2}
            resultsPerPage={1}
            setCurrentPage={setCurrentPage}
            setResultsPerPage={setResultsPerPage} Data={exampleData}		
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


export default Licenses
