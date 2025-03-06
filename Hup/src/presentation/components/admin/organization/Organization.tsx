import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import SearchInput from '../../input/Searchinput';
import BoxTableAdmin from '../../boxtableglobal/BoxSuperAdmin';
import TabsButton from './TabsButtonOrganization';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import CreateButton from '../../button/CreateTalentButton';
import { AddCircle } from 'iconsax-react';
import CreationOrganization from '../../modal/CreationOrganization';

const Organization = () => {
	const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');
	const [openModel, setOpenModel] = useState<boolean>(false);

	const [searchQuery, setSearchQuery] = useState<string>('');
	const organizationData = [
		{
			logo: 'https://example.com/path_to_logo_image_1.png', // Example online logo
			name: 'Organization 1',
			address: '1234 Main St, City, Country',
			email: 'contact@organization1.com',
			description: 'A non-profit organization focused on education.',
			availableApps: [
				{ name: 'App 1', imageUrl: 'https://example.com/app1_image.png' }, // Example online app image
				{ name: 'App 2', imageUrl: 'https://example.com/app2_image.png' },
				{ name: 'App 3', imageUrl: 'https://example.com/app3_image.png' },
			],
			actions: ['Edit', 'Delete'],
		},
		{
			logo: 'https://example.com/path_to_logo_image_2.png', // Example online logo
			name: 'Organization 2',
			address: '5678 Elm St, City, Country',
			email: 'contact@organization2.com',
			description: 'A tech company specializing in AI solutions.',
			availableApps: [
				{ name: 'AI App', imageUrl: 'https://example.com/ai_app_image.png' }, // Example online app image
				{ name: 'Cloud App', imageUrl: 'https://example.com/cloud_app_image.png' },
				{ name: 'AI App', imageUrl: 'https://example.com/ai_app_image.png' },
				{ name: 'AI App', imageUrl: 'https://example.com/ai_app_image.png' },
				{ name: 'AI App', imageUrl: 'https://example.com/ai_app_image.png' },
				{ name: 'Cloud App', imageUrl: 'https://example.com/cloud_app_image.png' },
			],
			actions: ['Edit', 'Delete'],
		},
	];
	const changebutton = () => {
		setOpenModel(true);
	};
	const [isLoading, setIsLoading] = useState<boolean>(true);
	return !isLoading ? (
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
				Data={organizationData}
				totalCount={50}
				currentPage={2}
				resultsPerPage={1}
				setCurrentPage={setCurrentPage}
				setResultsPerPage={setResultsPerPage}
				renderTableBody={() => (
					<TabsButton
						onTabChange={setTabValue}
						data={organizationData}
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
					onClose={() => {
						setOpenModel(false);
					}}
				/>
			)}
		</Stack>
	);
};

export default Organization;
