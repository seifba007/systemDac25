import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import SearchInput from '../../input/Searchinput';
import BoxTableAdmin from '../../boxtableglobal/BoxSuperAdmin';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import CreateButton from '../../button/CreateTalentButton';
import { AddCircle } from 'iconsax-react';
import TabsButton from './TabsButtonApps';
import CreationApps from '../../modal/CreationApps';

const Apps_Management = () => {
	const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');
	const [openModel, setOpenModel] = useState<boolean>(false);

	const [searchQuery, setSearchQuery] = useState<string>('');
	const appsData = [
		{
			apps: {
				name: 'App 1',
				imageUrl: 'https://example.com/app1_image.png',
			},
			description: 'A useful app for managing educational content.',
			active: true,
			path: '/app1',
			actions: ['Edit', 'Delete'],
		},
		{
			apps: {
				name: 'App 2',
				imageUrl: 'https://example.com/app2_image.png',
			},
			description: 'An app designed for collaboration in learning environments.',
			active: false,
			path: '/app2',
			actions: ['Edit', 'Delete'],
		},
		{
			apps: {
				name: 'App 3',
				imageUrl: 'https://example.com/app3_image.png',
			},
			description: 'A resource management app for educational institutions.',
			active: true,
			path: '/app3',
			actions: ['Edit', 'Delete'],
		},
		{
			apps: {
				name: 'AI App',
				imageUrl: 'https://example.com/ai_app_image.png',
			},
			description: 'An AI-powered application for data analysis.',
			active: true,
			path: '/ai-app',
			actions: ['Edit', 'Delete'],
		},
		{
			apps: {
				name: 'Cloud App',
				imageUrl: 'https://example.com/cloud_app_image.png',
			},
			description: 'A cloud management tool for scalable solutions.',
			active: true,
			path: '/cloud-app',
			actions: ['Edit', 'Delete'],
		},
		{
			apps: {
				name: 'AI App',
				imageUrl: 'https://example.com/ai_app_image.png',
			},
			description: 'An AI-powered application for automation.',
			active: false,
			path: '/ai-app-automation',
			actions: ['Edit', 'Delete'],
		},
		{
			apps: {
				name: 'Cloud App',
				imageUrl: 'https://example.com/cloud_app_image.png',
			},
			description: 'A secure and scalable cloud storage app.',
			active: true,
			path: '/cloud-app-storage',
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
				Data={appsData}
				totalCount={50}
				currentPage={2}
				resultsPerPage={1}
				setCurrentPage={setCurrentPage}
				setResultsPerPage={setResultsPerPage}
				renderTableBody={() => (
					<TabsButton
						onTabChange={setTabValue}
						data={appsData}
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

export default Apps_Management;
