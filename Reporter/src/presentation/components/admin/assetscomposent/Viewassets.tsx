import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Stack, Text } from '@mantine/core';
import React, { useState } from 'react'
import SearchInput from '../../input/Searchinput';
import BoxTableAdmin from '../../boxtableglobal/BoxSuperAdmin';
import TabsButton from './TabsButtonViewassests';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import CreateButton from '../../button/CreateTalentButton';
import { AddCircle } from 'iconsax-react';
import EditUserModel from '../../modal/EditUserModel';
import CreationOrganization from '../../modal/CreationOrganization';

const Viewassets = () => {
  const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');
  const [openModel, setOpenModel] = useState<boolean>(false);

	const [searchQuery, setSearchQuery] = useState<string>('');
  const AssetsData = [
    {
      assetName: "Asset 1", // Example Asset Name
      assetCode: "A1234", // Example Asset Code
      serialNumber: "SN12345678", // Example Serial Number
      manufacturer: "Manufacturer 1", // Example Manufacturer
      actualStatus: "In Use", // Example Status
      actualLocation: "Location 1", // Example Location
      actions: ["Edit", "Delete"] // Example Actions
    },
    {
      assetName: "Asset 2",
      assetCode: "B5678",
      serialNumber: "SN87654321",
      manufacturer: "Manufacturer 2",
      actualStatus: "Available",
      actualLocation: "Location 2",
      actions: ["Edit", "Delete"]
    },
    {
      assetName: "Asset 3",
      assetCode: "C91011",
      serialNumber: "SN11223344",
      manufacturer: "Manufacturer 3",
      actualStatus: "Out of Service",
      actualLocation: "Location 3",
      actions: ["Edit", "Delete"]
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
      Asset Management
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
						lable={'Create Assets'}
						icon={<AddCircle
              size="17"
              color="#FFF"
              variant="Bold"
             />}
					/>
    </Flex>
      <BoxTableAdmin
				isResponsive={isMobile ? isMobile : false}
				Data={AssetsData}
				totalCount={50}
				currentPage={2}
				resultsPerPage={1}
				setCurrentPage={setCurrentPage}
				setResultsPerPage={setResultsPerPage}
				renderTableBody={() => (
					<TabsButton
						onTabChange={setTabValue}
						data={AssetsData}
						isResponsive={isMobile ? isMobile : false}
						titrepage={'Organization'}
						onCategoryChange={setSelectedCategory}
						onSortChange={setSortValue}
						search={searchQuery}
					/>
				)}
			/>
	{openModel && (
				<CreationOrganization
					opened={openModel}
					onClose={()=>{setOpenModel(false)}}

				/>
			)}

    </Stack>)

  )
}


export default Viewassets
