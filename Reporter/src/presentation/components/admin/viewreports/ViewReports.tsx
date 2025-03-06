import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Stack, Text } from '@mantine/core';
import React, { useState } from 'react'
import SearchInput from '../../input/Searchinput';
import BoxTableAdmin from '../../boxtableglobal/BoxSuperAdmin';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import CreateButton from '../../button/CreateTalentButton';
import { AddCircle } from 'iconsax-react';
import TabsButton from './TabsButtonViewReports';
import CreationApps from '../../modal/CreationApps';

const ViewReports = () => {
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
      severity: '12',
      reportReference: 'R12345',
      reportClassification: 'Incident',
      reportTitle: 'System Outage',
      reportType: 'Critical',
      dateTime: '2025-02-22 14:00',
      actions: 'Restricted',
    },
    {
      severity: '52',
      reportReference: 'R12345',
      reportClassification: 'Incident',
      reportTitle: 'System Outage',
      reportType: 'Critical',
      dateTime: '2025-02-22 14:00',
      actions: 'Restricted',
    },    {
      severity: '120',
      reportReference: 'R12345',
      reportClassification: 'Incident',
      reportTitle: 'System Outage',
      reportType: 'Critical',
      dateTime: '2025-02-22 14:00',
      actions: 'Restricted',
    },    {
      severity: '112',
      reportReference: 'R12345',
      reportClassification: 'Incident',
      reportTitle: 'System Outage',
      reportType: 'Critical',
      dateTime: '2025-02-22 14:00',
      actions: 'Restricted',
    },    {
      severity: '12',
      reportReference: 'R12345',
      reportClassification: 'Incident',
      reportTitle: 'System Outage',
      reportType: 'Critical',
      dateTime: '2025-02-22 14:00',
      actions: 'Restricted',
    },    {
      severity: '120',
      reportReference: 'R12345',
      reportClassification: 'Incident',
      reportTitle: 'System Outage',
      reportType: 'Critical',
      dateTime: '2025-02-22 14:00',
      actions: 'Restricted',
    },    {
      severity: '12',
      reportReference: 'R12345',
      reportClassification: 'Incident',
      reportTitle: 'System Outage',
      reportType: 'Critical',
      dateTime: '2025-02-22 14:00',
      actions: 'Restricted',
    },    {
      severity: '102',
      reportReference: 'R12345',
      reportClassification: 'Incident',
      reportTitle: 'System Outage',
      reportType: 'Critical',
      dateTime: '2025-02-22 14:00',
      actions: 'Restricted',
    },    {
      severity: '12',
      reportReference: 'R12345',
      reportClassification: 'Incident',
      reportTitle: 'System Outage',
      reportType: 'Critical',
      dateTime: '2025-02-22 14:00',
      actions: 'Restricted',
    },    {
      severity: '12',
      reportReference: 'R12345',
      reportClassification: 'Incident',
      reportTitle: 'System Outage',
      reportType: 'Critical',
      dateTime: '2025-02-22 14:00',
      actions: 'Restricted',
    },    {
      severity: '120',
      reportReference: 'R12345',
      reportClassification: 'Incident',
      reportTitle: 'System Outage',
      reportType: 'Critical',
      dateTime: '2025-02-22 14:00',
      actions: 'Restricted',
    },    {
      severity: '12',
      reportReference: 'R12345',
      reportClassification: 'Incident',
      reportTitle: 'System Outage',
      reportType: 'Critical',
      dateTime: '2025-02-22 14:00',
      actions: 'Restricted',
    },
    {
      severity: '25',
      reportReference: 'R12346',
      reportClassification: 'Warning',
      reportTitle: 'Network Latency',
      reportType: 'Warning',
      dateTime: '2025-02-22 15:00',
      actions: 'Restricted',
    },
    {
      severity: '20',
      reportReference: 'R12347',
      reportClassification: 'Informational',
      reportTitle: 'Scheduled Maintenance',
      reportType: 'Informational',
      dateTime: '2025-02-22 16:00',
      actions: 'Restricted',
    },
  ];

const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    !isLoading ? (
      <SkeletonLoader />
    ) :(
    <Stack>
      <Text style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace: "nowrap"}} ff={'"Roboto",sans-serif'} fw={'700'} c={'#6c757d'} fz={'18px'}>
      Incident Reports List
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
	{openModel && (
				<CreationApps
					opened={openModel}
					onClose={()=>{setOpenModel(false)}}

				/>
			)}

    </Stack>)

  )
}



export default ViewReports
