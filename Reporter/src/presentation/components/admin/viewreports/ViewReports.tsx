import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import SearchInput from '../../input/Searchinput';
import BoxTableAdmin from '../../boxtableglobal/BoxSuperAdmin';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import TabsButton from './TabsButtonViewReports';
import CreationApps from '../../modal/CreationApps';
import { ListOptions } from '@/core/entities/http.entity';
import { useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import { getincident } from '@/core/services/modulesServices/incidentreporting.service';

const ViewReports = () => {
	const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');
	const [openModel, setOpenModel] = useState<boolean>(false);

	const [searchQuery, setSearchQuery] = useState<string>('');

	const user = useAppSelector(selectConnectedUser);
	const [totalCount, setTotalCount] = useState<number>(0);
	const getIncident = () => {
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

		getincident({ options })
			.then((res) => {
				setIncident(res.data.reports);
				setTotalCount(res.data.total_pages);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.error('Error fetching connected user:', error);
			});
	};
	const [incident, setIncident] = useState<any>();
	useEffect(() => {
		getIncident();
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
				Data={incident}
				totalCount={totalCount}
				currentPage={currentPage}
				resultsPerPage={resultsPerPage}
				setCurrentPage={setCurrentPage}
				setResultsPerPage={setResultsPerPage}
				renderTableBody={() => (
					<TabsButton
						getdata={getIncident}
						onTabChange={setTabValue}
						data={incident}
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
					onClose={() => {
						setOpenModel(false);
					}}
				/>
			)}
		</Stack>
	);
};

export default ViewReports;
