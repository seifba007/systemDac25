import { Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import BoxTableAdmin from '../../boxtableglobal/BoxSuperAdmin';
import TabsButton from './TabsButtonUsers';
import useResponsive from '@/presentation/shared/mediaQuery';
import SearchInput from '../../input/Searchinput';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import { UserEntity } from '@/core/entities/user/user.entity';
import { getUsers } from '@/core/services/modulesServices/user.service';
import { ListOptions } from '@/core/entities/http.entity';

const UserMangment = () => {
	const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [totalCount, setTotalCount] = useState<number>(0);
	const getusers = () => {
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

		getUsers({ options })
			.then((res) => {
				setUsers(res.data.users);
				setTotalCount(res.data.total);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.error('Error fetching connected user:', error);
			});
	};
	const [users, setUsers] = useState<UserEntity>();
	useEffect(() => {
		getusers();
	}, [currentPage, resultsPerPage, sortValue, tabValue, searchQuery, selectedCategory]);

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
				Users Management
			</Text>
			<SearchInput
				setCurrentPage={setCurrentPage}
				onSearch={setSearchQuery}
				placeholder='Search...'
				searchQuery={searchQuery}
			/>
			<BoxTableAdmin
				isResponsive={isMobile ? isMobile : false}
				Data={users}
				totalCount={totalCount}
				currentPage={currentPage}
				resultsPerPage={resultsPerPage}
				setCurrentPage={setCurrentPage}
				setResultsPerPage={setResultsPerPage}
				renderTableBody={() => (
					<TabsButton
						onTabChange={setTabValue}
						data={users}
						isResponsive={isMobile ? isMobile : false}
						titrepage={'Organization'}
						onCategoryChange={setSelectedCategory}
						onSortChange={setSortValue}
						search={searchQuery}
						getUser={getusers}
					/>
				)}
			/>
		</Stack>
	);
};

export default UserMangment;
