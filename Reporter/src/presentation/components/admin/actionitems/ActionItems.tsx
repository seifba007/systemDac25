import { Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import BoxTableAdmin from '../../boxtableglobal/BoxSuperAdmin';
import useResponsive from '@/presentation/shared/mediaQuery';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import SearchInput from '../../input/Searchinput';
import TabsButton from './TabsButtonActionItems';
import { ListOptions } from '@/core/entities/http.entity';
import { getActionItems } from '@/core/services/modulesServices/actionitems.service';

const ActionItems = () => {
	const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [user, setUser] = useState();

	const [totalCount, setTotalCount] = useState<number>(0);
	const getaction = () => {
		const options: ListOptions['options'] = {
			...(currentPage != null && { page: currentPage }),
			...(resultsPerPage != null && { limit: resultsPerPage }),
			...(sortValue &&
				sortValue !== 'default' && {
					...(sortValue === 'createdAt desc' || sortValue === 'createdAt asc'
						? { sort: sortValue.split(' ')[1], sortKey: sortValue.split(' ')[0] }
						: { sort: sortValue }),
				}),

			...{ organization: 'Smardac' },
			...(searchQuery && { search: searchQuery }),
			...(tabValue != null &&
				(tabValue === 'createdbyme'
					? { filter_type: 'createdbyme' }
					: tabValue === 'assignedtome'
					? { filter_type: 'assignedtome' }
					: tabValue === 'all'
					? null
					: { filter_type: tabValue })),
			...(selectedCategory && selectedCategory !== '0' && { categoryId: selectedCategory }),
		};

		getActionItems({ options })
			.then((res) => {
				setActiondata(res.data.actionItems);
				setUser(res.data.usersList);
				setTotalCount(res.data.total);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.error('Error fetching connected user:', error);
			});
	};
	const [actiondata, setActiondata] = useState<any>();
	useEffect(() => {
		getaction();
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
				Data={actiondata}
				totalCount={totalCount}
				currentPage={currentPage}
				resultsPerPage={resultsPerPage}
				setCurrentPage={setCurrentPage}
				setResultsPerPage={setResultsPerPage}
				renderTableBody={() => (
					<TabsButton
						userdata={user}
						getactions={getaction}
						onTabChange={setTabValue}
						data={actiondata}
						isResponsive={isMobile ? isMobile : false}
						titrepage={'Organization'}
						onCategoryChange={setSelectedCategory}
						onSortChange={setSortValue}
						search={searchQuery}
					/>
				)}
			/>
		</Stack>
	);
};

export default ActionItems;
