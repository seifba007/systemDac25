import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import SearchInput from '../../input/Searchinput';
import BoxTableAdmin from '../../boxtableglobal/BoxSuperAdmin';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import CreateButton from '../../button/CreateTalentButton';
import { AddCircle } from 'iconsax-react';
import TabsButton from './TabsButtonApps';
import CreationApps from '../../modal/CreationApps';
import { ListOptions } from '@/core/entities/http.entity';
import { getUsers } from '@/core/services/modulesServices/user.service';
import { getApps } from '@/core/services/modulesServices/apps.service';

const Apps_Management = () => {
	const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');
	const [openModel, setOpenModel] = useState<boolean>(false);
	const [apps, setApps] = useState<any>();

	const [searchQuery, setSearchQuery] = useState<string>('');

	const [totalCount, setTotalCount] = useState<number>(0);
	const getapps = () => {
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

		getApps({ options })
			.then((res) => {
				setApps(res.data.apps);
				setTotalCount(res.data.total);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.error('Error fetching connected user:', error);
			});
	};
	useEffect(() => {
		getapps();
	}, [currentPage, resultsPerPage, sortValue, tabValue, searchQuery, selectedCategory]);

	const changebutton = () => {
		setOpenModel(true);
	};

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
				Apps Management
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
					lable={'Create App'}
					icon={<AddCircle size='17' color='#FFF' variant='Bold' />}
				/>
			</Flex>
			<BoxTableAdmin
				isResponsive={isMobile ? isMobile : false}
				Data={apps}
				totalCount={totalCount}
				currentPage={currentPage}
				resultsPerPage={resultsPerPage}
				setCurrentPage={setCurrentPage}
				setResultsPerPage={setResultsPerPage}
				renderTableBody={() => (
					<TabsButton
						getappss={getapps}
						onTabChange={setTabValue}
						data={apps}
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
					getApp={getapps}
					isUpdate={false}
				/>
			)}
		</Stack>
	);
};

export default Apps_Management;
