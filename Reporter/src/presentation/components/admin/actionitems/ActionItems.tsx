import { Stack, Text } from '@mantine/core'
import React, { useState } from 'react'
import BoxTableAdmin from '../../boxtableglobal/BoxSuperAdmin'
import useResponsive from '@/presentation/shared/mediaQuery'
import SkeletonLoader from '../../boxtableglobal/skeletonLoader'
import SearchInput from '../../input/Searchinput'
import TabsButton from './TabsButtonActionItems'

const ActionItems = () => {
  const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');
  const tableData = [
    {
      id: 1,
      status: 'Active',
      description: 'Review quarterly budget',
      createdBy: 'John Doe',
      assignedPerson: 'Jane Smith',
      priority: 'High',
      targetDate: '2025-03-01',
      reportReference: 'Q1-Budget-Report',
      followUpDeadline: '2025-03-05',
      active: 'Approved',
      path: '/reports/Q1-Budget-Report',
    },
    {
      id: 2,
      status: 'Blocked',
      description: 'Update client database',
      createdBy: 'Emily Davis',
      assignedPerson: 'Mike Johnson',
      priority: 'Medium',
      targetDate: '2025-03-15',
      reportReference: 'Client-Update',
      followUpDeadline: '2025-03-20',
      active: 'Completed',
      path: '/tasks/client-database-update',
    },
    {
      id: 3,
      status: 'Active',
      description: 'Prepare presentation',
      createdBy: 'Sarah Brown',
      assignedPerson: 'Chris Green',
      priority: 'Low',
      targetDate: '2025-03-10',
      reportReference: 'Presentation-Slides',
      followUpDeadline: '2025-03-12',
      active: 'In Progress',
      path: '/docs/presentation-slides',
    },
    {
      id: 4,
      status: 'Active',
      description: 'Conduct team meeting',
      createdBy: 'Adam White',
      assignedPerson: 'Sophia Wilson',
      priority: 'High',
      targetDate: '2025-03-05',
      reportReference: 'Team-Meeting-Notes',
      followUpDeadline: '2025-03-06',
      active: 'Pending',
      path: '/meetings/team-meeting-notes',
    },
    {
      id: 5,
      status: 'Blocked',
      description: 'Draft policy update',
      createdBy: 'Lucy Clark',
      assignedPerson: 'Ethan Wright',
      priority: 'Medium',
      targetDate: '2025-03-20',
      reportReference: 'Policy-Update-Draft',
      followUpDeadline: '2025-03-25',
      active: 'Completed',
      path: '/drafts/policy-update',
    },
  ];
  
const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    !isLoading ? (
      <SkeletonLoader />
    ) :(
    <Stack>
      <Text style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace: "nowrap"}} ff={'"Roboto",sans-serif'} fw={'700'} c={'#6c757d'} fz={'18px'}>
      Action Items Summary
      </Text>    
      <SearchInput
					setCurrentPage={setCurrentPage}
					onSearch={setSearchQuery}
					placeholder='Search...'
					searchQuery={searchQuery}
				/>
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
						titrepage={'Organization'}
						onCategoryChange={setSelectedCategory}
						onSortChange={setSortValue}
						search={searchQuery}
					/>
				)}
			/>
    </Stack>)
  )
}








export default ActionItems
