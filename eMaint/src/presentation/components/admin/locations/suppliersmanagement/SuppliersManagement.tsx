import { Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import BoxTableAdmin from '../../../boxtableglobal/BoxSuperAdmin';
import useResponsive from '@/presentation/shared/mediaQuery';
import SkeletonLoader from '../../../boxtableglobal/skeletonLoader';
import TabsButton from './TabsButtonSuppliersM';
import SearchInput from '../../../input/Searchinput';

const SuppliersManagement = () => {
	const { isMobile } = useResponsive();
	const [resultsPerPage, setResultsPerPage] = useState<number>(10);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [tabValue, setTabValue] = useState<string>('all');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const [sortValue, setSortValue] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const tableData = [
		{
			name: 'Widget A',
			partNumber: 'WA12345',
			type: 'Electronics',
			cost: '$15.00',
			qtyOnHand: 100,
			minimumStock: 20,
			attachments: ['Attachment 1', 'Attachment 2'],
			actions: ['Edit', 'Delete'],
		},
		{
			name: 'Gadget B',
			partNumber: 'GB67890',
			type: 'Mechanical',
			cost: '$45.50',
			qtyOnHand: 50,
			minimumStock: 10,
			attachments: ['Attachment 1'],
			actions: ['Edit', 'Delete'],
		},
		{
			name: 'Tool C',
			partNumber: 'TC54321',
			type: 'Hardware',
			cost: '$9.99',
			qtyOnHand: 200,
			minimumStock: 30,
			attachments: ['Attachment 1', 'Attachment 3'],
			actions: ['Edit', 'Delete'],
		},
		{
			name: 'Accessory D',
			partNumber: 'AD98765',
			type: 'Accessory',
			cost: '$7.25',
			qtyOnHand: 150,
			minimumStock: 25,
			attachments: ['Attachment 2'],
			actions: ['Edit', 'Delete'],
		},
		{
			name: 'Device E',
			partNumber: 'DE11223',
			type: 'Electronics',
			cost: '$199.99',
			qtyOnHand: 30,
			minimumStock: 5,
			attachments: ['Attachment 1', 'Attachment 4'],
			actions: ['Edit', 'Delete'],
		},
	];

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
				Suppliers Management
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
		</Stack>
	);
};

export default SuppliersManagement;
