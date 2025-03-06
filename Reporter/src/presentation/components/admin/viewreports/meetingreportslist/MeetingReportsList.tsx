import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Stack, Text } from '@mantine/core';
import React, { useState } from 'react'

import { AddCircle } from 'iconsax-react';
import TabsButton from './TabsButtonMeetingReportsList.';
import BoxTableAdmin from '@/presentation/components/boxtableglobal/BoxSuperAdmin';
import SearchInput from '@/presentation/components/input/Searchinput';
import { SkeletonLoader } from '@/presentation/components/availablity';

const MeetingReportsList = () => {
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
      meetingType: 'Online',
      reportReference: 'M12345',
      meetingTitle: 'Team Sync',
      dateTime: '2025-02-22 09:00',
      businessDepartment: 'Marketing',
      meetingLocation: 'Zoom',
      createdBy: 'John Doe',
      actions: 'View Details',
    },
    {
      meetingType: 'In-person',
      reportReference: 'M12346',
      meetingTitle: 'Quarterly Review',
      dateTime: '2025-02-23 11:00',
      businessDepartment: 'Finance',
      meetingLocation: 'Conference Room A',
      createdBy: 'Jane Smith',
      actions: 'View Details',
    },
    {
      meetingType: 'Hybrid',
      reportReference: 'M12347',
      meetingTitle: 'Strategy Meeting',
      dateTime: '2025-02-24 14:00',
      businessDepartment: 'HR',
      meetingLocation: 'Teams + Office',
      createdBy: 'Mike Johnson',
      actions: 'View Details',
    },
    {
      meetingType: 'Online',
      reportReference: 'M12345',
      meetingTitle: 'Team Sync',
      dateTime: '2025-02-22 09:00',
      businessDepartment: 'Marketing',
      meetingLocation: 'Zoom',
      createdBy: 'John Doe',
      actions: 'View Details',
    },   {
      meetingType: 'Online',
      reportReference: 'M12345',
      meetingTitle: 'Team Sync',
      dateTime: '2025-02-22 09:00',
      businessDepartment: 'Marketing',
      meetingLocation: 'Zoom',
      createdBy: 'John Doe',
      actions: 'View Details',
    },   {
      meetingType: 'Online',
      reportReference: 'M12345',
      meetingTitle: 'Team Sync',
      dateTime: '2025-02-22 09:00',
      businessDepartment: 'Marketing',
      meetingLocation: 'Zoom',
      createdBy: 'John Doe',
      actions: 'View Details',
    },   {
      meetingType: 'Online',
      reportReference: 'M12345',
      meetingTitle: 'Team Sync',
      dateTime: '2025-02-22 09:00',
      businessDepartment: 'Marketing',
      meetingLocation: 'Zoom',
      createdBy: 'John Doe',
      actions: 'View Details',
    },   {
      meetingType: 'Online',
      reportReference: 'M12345',
      meetingTitle: 'Team Sync',
      dateTime: '2025-02-22 09:00',
      businessDepartment: 'Marketing',
      meetingLocation: 'Zoom',
      createdBy: 'John Doe',
      actions: 'View Details',
    },   {
      meetingType: 'Online',
      reportReference: 'M12345',
      meetingTitle: 'Team Sync',
      dateTime: '2025-02-22 09:00',
      businessDepartment: 'Marketing',
      meetingLocation: 'Zoom',
      createdBy: 'John Doe',
      actions: 'View Details',
    },   {
      meetingType: 'Online',
      reportReference: 'M12345',
      meetingTitle: 'Team Sync',
      dateTime: '2025-02-22 09:00',
      businessDepartment: 'Marketing',
      meetingLocation: 'Zoom',
      createdBy: 'John Doe',
      actions: 'View Details',
    },   {
      meetingType: 'Online',
      reportReference: 'M12345',
      meetingTitle: 'Team Sync',
      dateTime: '2025-02-22 09:00',
      businessDepartment: 'Marketing',
      meetingLocation: 'Zoom',
      createdBy: 'John Doe',
      actions: 'View Details',
    },
  ];
  
const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    !isLoading ? (
      <SkeletonLoader />
    ) :(
    <Stack>
      <Text style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace: "nowrap"}} ff={'"Roboto",sans-serif'} fw={'700'} c={'#6c757d'} fz={'18px'}>
      Meeting Reports List
      </Text>
    <Flex justify={'space-between'}>
    <SearchInput
					setCurrentPage={setCurrentPage}
					onSearch={setSearchQuery}
					placeholder='Search Reports ...'
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



export default MeetingReportsList
