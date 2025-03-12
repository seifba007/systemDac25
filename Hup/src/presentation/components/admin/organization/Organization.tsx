import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import SearchInput from '../../input/Searchinput';
import BoxTableAdmin from '../../boxtableglobal/BoxSuperAdmin';
import TabsButton from './TabsButtonOrganization';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import CreateButton from '../../button/CreateTalentButton';
import { AddCircle } from 'iconsax-react';
import CreationOrganization from '../../modal/CreationOrganization';
import { ListOptions } from '@/core/entities/http.entity';
import { getOrganizations } from '@/core/services/modulesServices/organizations.service';

const Organization = () => {
	const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');
	const [openModel, setOpenModel] = useState<boolean>(false);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [searchQuery, setSearchQuery] = useState<string>('');

	const getOrganization = () => {
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

		getOrganizations({ options })
			.then((res) => {
				setOrganization(res.data.organizations);
				setTotalCount(res.data.total);
				setIsLoading(false);
			})
			.catch((error) => {
				setIsLoading(false);
				console.error('Error fetching connected user:', error);
			});
	};
	const [organization, setOrganization] = useState<any>();

	useEffect(() => {
		getOrganization();
	}, [currentPage, resultsPerPage, sortValue, tabValue, searchQuery, selectedCategory]);
	const changebutton = () => {
		setOpenModel(true);
	};

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
				Organizations Management
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
					lable={'Create Organization'}
					icon={<AddCircle size='17' color='#FFF' variant='Bold' />}
				/>
			</Flex>
			<BoxTableAdmin
				isResponsive={isMobile ? isMobile : false}
				Data={organization}
				totalCount={totalCount}
				currentPage={currentPage}
				resultsPerPage={resultsPerPage}
				setCurrentPage={setCurrentPage}
				setResultsPerPage={setResultsPerPage}
				renderTableBody={() => (
					<TabsButton
						getOrgs={getOrganization}
						onTabChange={setTabValue}
						data={organization}
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
					getOrg={getOrganization}
					onClose={() => {
						setOpenModel(false);
					}}
					isUpdate={false}
				/>
			)}
		</Stack>
	);
};

export default Organization;
