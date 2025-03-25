import React, { useEffect, useState } from 'react';
import { Avatar, Tabs, Flex, Text, Image, Select, Box, Table, ActionIcon } from '@mantine/core';
import { ArrowSwapVertical, Edit, Setting4 } from 'iconsax-react';
import BOX from '../../../../../assets/boxnodata.png';
import { useAppDispatch } from '@/core/store/hooks';
import TableComponent from '../../../boxtableglobal/Table';

const tabStyles = (isActive: boolean) => ({
	height: '32px',
	padding: '0 16px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: '4px',
	fontWeight: 500,
	border: '0px',
	cursor: 'pointer',
	color: isActive ? 'var(--Black, #0A0C0E)' : ' var(--Grey-2, #686F7C)',
	backgroundColor: isActive ? '#E3E3E3' : 'transparent',
});
export const sortLabels = {
	default: 'Default',
	desc: 'Name Z-A',
	asc: 'Name A-Z',
	'createdAt desc': 'Added date (Oldest to Newest)',
	'createdAt asc': 'Added date (Newest to Oldest)',
};

interface TabsButtonProps {
	data: any[];
	onTabChange: (tabValue: string) => void;
	onCategoryChange: (category: string) => void;
	isResponsive: boolean;
	titrepage: string;
	onSortChange: (sortValue: string) => void;
	search: string;
}

const TabsButton: React.FC<TabsButtonProps> = ({
	data,
	onTabChange,
	isResponsive,
	search,
	titrepage,
	onCategoryChange,
	onSortChange,
}) => {
	const [activeTab, setActiveTab] = useState<string>('all');
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [modalOpen2, setModalOpen2] = useState<boolean>(false);
	const [editmodalOpen, setEditmodalOpen] = useState<boolean>(false);
	const [datauser, setdatauser] = useState<any>([]);
	const [selectAll, setSelectAll] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	const [selectedCategory, setSelectedCategory] = useState<string>('');
	useEffect(() => {
		onTabChange(activeTab);
		onCategoryChange(selectedCategory);
	}, [activeTab, selectedCategory, onTabChange]);
	const handleTabChange = (value: string | null) => {
		if (value) {
			setActiveTab(value);
		}
	};
	const handleSelectChange = (value: string | null) => {
		if (value) {
			setActiveTab(value);
		}
	};

	const headerTabs = [
		{ value: 'all', label: 'All' },
		{ value: 'Active', label: 'Active' },
		{ value: 'Blocked', label: 'Blocked' },
	];
	const TableTh = [
		{ label: 'Filename' },
		{ label: 'Document Title' },
		{ label: 'Document Type' },
		{ label: 'Related Asset' },
		{ label: 'Description' },
		{ label: 'Actions' },
	];

	return (
		<>
			<Flex direction='column'>
				<Flex
					justify='space-between'
					style={isResponsive ? { flexFlow: 'column', padding: '12px' } : {}}
				>
					<Tabs value={activeTab} onChange={handleTabChange} style={{ width: '100%' }} unstyled>
						<Flex direction='column'>
							<Flex
								justify='space-between'
								style={!isResponsive ? { padding: '20px' } : { paddingBottom: '5%' }}
							>
								{isResponsive ? (
									<Select
										value={activeTab}
										onChange={handleSelectChange}
										data={headerTabs?.map((tab) => ({
											value: tab.value,
											label: typeof tab.label === 'string' ? tab.label : tab.value,
										}))}
										className='textab2'
										styles={() => ({
											root: {
												width: '10em',
												height: '32px',
												flexShrink: 0,
											},
											input: {
												borderRadius: '4px',
												background: '#E3E3E3',
												width: '100px',
											},
										})}
									/>
								) : (
									<Tabs.List style={{ display: 'flex', gap: '16px' }}>
										{headerTabs.map((tab) => (
											<Tabs.Tab
												key={tab.value}
												value={tab.value}
												style={tabStyles(activeTab === tab.value)}
											>
												<Box className={'textab'}>{tab.label}</Box>
											</Tabs.Tab>
										))}
									</Tabs.List>
								)}
							</Flex>

							{!data?.length ? (
								<TableComponent TableTh={TableTh} selectAll={selectAll}>
									<Table.Tbody className={'tbody'}>
										{data.map((item) => (
											<Table.Tr key={item.id}>
												<Table.Td>
													<Text className={'txttablename'}>{item?.name ?? '..............'}</Text>
												</Table.Td>
												<Table.Td>
													<Text className={'txttablename'}>
														{item?.partNumber ?? '..............'}
													</Text>
												</Table.Td>
												<Table.Td>
													<Text className={'txttablename'}>{item?.type ?? '..............'}</Text>
												</Table.Td>
												<Table.Td>
													<Text className={'txttablename'}>{item?.cost ?? '..............'}</Text>
												</Table.Td>
												<Table.Td>
													<Text className={'txttablename'}>
														{item?.qtyOnHand ?? '..............'}
													</Text>
												</Table.Td>

												<Table.Td>
													<ActionIcon
														onClick={() => {}}
														variant='filled'
														color='yellow'
														w={'40px'}
														h={'20px'}
													>
														<Edit color='#fff' size={'15'} />
													</ActionIcon>
												</Table.Td>
											</Table.Tr>
										))}
									</Table.Tbody>
								</TableComponent>
							) : (
								<Flex
									direction='column'
									justify='center'
									align='center'
									gap='1.5em'
									style={{ height: '350px' }}
								>
									<Image src={BOX} style={{ width: '250px', height: '250px' }} />
									<Text className={'txtnodata'}>
										{search
											? 'No result is found ! Search of something else'
											: 'No User is created yet!'}
									</Text>
								</Flex>
							)}
						</Flex>
					</Tabs>
				</Flex>
			</Flex>
		</>
	);
};

export default TabsButton;
