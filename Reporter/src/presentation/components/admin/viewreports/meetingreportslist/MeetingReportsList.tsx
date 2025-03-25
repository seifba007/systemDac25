import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import TabsButton from './TabsButtonMeetingReportsList.';
import BoxTableAdmin from '@/presentation/components/boxtableglobal/BoxSuperAdmin';
import SearchInput from '@/presentation/components/input/Searchinput';
import { ListOptions } from '@/core/entities/http.entity';
import SkeletonLoader from '@/presentation/components/boxtableglobal/skeletonLoader';
import { getMeetingReport } from '@/core/services/modulesServices/meetingreport.service';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';

const MeetingReportsList = () => {
	const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [totalCount, setTotalCount] = useState<number>(0);
	const user = useAppSelector(selectConnectedUser);

	const getmetting = () => {
		const options: ListOptions['options'] = {
			...(currentPage != null && { page: currentPage }),
			...(resultsPerPage != null && { limit: resultsPerPage }),
			...(sortValue &&
				sortValue !== 'default' && {
					...(sortValue === 'createdAt desc' || sortValue === 'createdAt asc'
						? { sort: sortValue.split(' ')[1], sortKey: sortValue.split(' ')[0] }
						: { sort: sortValue }),
				}),
			...(user?.organization && { organization: user?.organization }),
			...(searchQuery && { search: searchQuery }),
			...(tabValue != null && (tabValue === 'all' ? null : { filter_type: tabValue })),
		};

		getMeetingReport({ options })
			.then((res) => {
				setMetting(res.data.data.meetingReports);
				setTotalCount(res.data.data.pagination.totalReports);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.error('Error fetching connected user:', error);
			});
	};
	const [metting, setMetting] = useState<any>();
	useEffect(() => {
		getmetting();
	}, [currentPage, resultsPerPage, sortValue, tabValue, searchQuery, selectedCategory]);

	const [isLoading, setIsLoading] = useState<boolean>(true);
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
				Data={metting}
				totalCount={totalCount}
				currentPage={currentPage}
				resultsPerPage={resultsPerPage}
				setCurrentPage={setCurrentPage}
				setResultsPerPage={setResultsPerPage}
				renderTableBody={() => (
					<TabsButton
						onTabChange={setTabValue}
						data={metting}
						isResponsive={isMobile ? isMobile : false}
						titrepage={'Apps'}
						onCategoryChange={setSelectedCategory}
						onSortChange={setSortValue}
						search={searchQuery}
						getmettingg={getmetting}
					/>
				)}
			/>
		</Stack>
	);
};

export default MeetingReportsList;
