import React, { useEffect, useState } from 'react';
import {  Tabs, Flex, Text, Image, Select, Box, Table, ActionIcon, Button } from '@mantine/core';
import {  Edit, Eye, Send2, TruckFast } from 'iconsax-react';
import BOX from '../../../../../assets/boxnodata.png';
import { useAppDispatch } from '@/core/store/hooks';
import TableComponent from '../../../boxtableglobal/Table';



const tabStyles = (isActive: boolean) => ({
	height: '38px',
	padding: '0 16px',
	width:'14%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	marginLeft:'2em',
	borderRadius: '4px',
	fontWeight: 700,
	border: '0px',
	cursor: 'pointer',
	color: isActive ? 'var(--Black, #0A0C0E)' : ' var(--Grey-2, #686F7C)',
	backgroundColor: isActive ? '#E3E3E3' : 'transparent',
});

  
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
	
	onCategoryChange,
}) => {
	const [activeTab, setActiveTab] = useState<string>('InventoryOverview');
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
		{ value: 'InventoryOverview', label: 'Inventory Overview' },
		{ value: 'OrderManagement', label: 'Order Management' },
	];
	const TableTh2 = [
		{ label: 'Order ID' },
		{ label: 'Estimated Cost' },
		{ label: 'Supplier' },
		{ label: 'Status' },
		{ label: 'Created By' },
		{ label: 'Actions' },
	  ];
	  const TableTh = [
		{ label: 'Part Name	' },
		{ label: 'Part Number' },
		{ label: 'Part Type' },
		{ label: 'Total Quantity Across All Stores' },
		{ label: 'Minimum Stock' },
		{ label: 'Actions' },
	  ];
	  
	return (
		<Box>
		
					<Tabs  value={activeTab} w={'100%'} onChange={handleTabChange}  >
						<Flex direction='column'>
							<Flex
								justify='space-between'
								style={!isResponsive ? { paddingTop: '20px' } : { paddingBottom: '5%' }}
							>
								{isResponsive ? (
									<Select
									p={'0.5em'}
										value={activeTab}
										onChange={handleSelectChange}
										data={headerTabs?.map((tab) => ({
											value: tab.value,
											label: typeof tab.label === 'string' ? tab.label : tab.value,
										}))}
										className='textab2'
										styles={() => ({
											root: {
												height: '32px',
												flexShrink: 0,
											},
											input: {
												borderRadius: '4px',
												background: '#E3E3E3',
											},
										})}
									/>
								) : (
									<Tabs.List style={{ width:'100%', display: 'flex', gap: '16px' }}>
										{headerTabs.map((tab) => (
											<Tabs.Tab
												key={tab.value}
												value={tab.value}
												style={tabStyles(activeTab === tab.value)}
											>
												<Box className={'textab3'}>{tab.label}</Box>
											</Tabs.Tab>
										))}
									</Tabs.List>
								)}
							
							</Flex>
							<Tabs.Panel value="InventoryOverview">
							{data?.length ? (
							  <TableComponent TableTh={TableTh} >
							  <Table.Tbody className={'tbody'}>
								{data.map((item) => (
								  <Table.Tr key={item.id}>
									<Table.Td>
										<Text className={'txttablename'}>{item?.name ?? '..............'}</Text>
									</Table.Td>
									<Table.Td>
									  <Text className={'txttablename'}>{item?.partNumber ?? '..............'}</Text>
									</Table.Td>
									<Table.Td>
									  <Text className={'txttablename'}>{item?.type ?? '..............'}</Text>
									</Table.Td>
									<Table.Td>
									  <Text className={'txttablename'}>{item?.cost ?? '..............'}</Text>
									</Table.Td>
									<Table.Td>
									  <Text className={'txttablename'}>{item?.qtyOnHand ?? '..............'}</Text>
									</Table.Td>
								
									<Table.Td >
									<Flex gap={'0.5em'}>
									   <ActionIcon
												 variant="filled"
												 color="#4254ba"
												 w={'20px'}
												 h={'10px'}
											   >
												 <Eye color='#fff' size={'15'}variant='Bold' />
											   </ActionIcon>
											   <ActionIcon
												 variant="filled"
												 color="yellow"
												 w={'20px'}
												 h={'10px'}
											   >
												 <Edit color='#fff' size={'15'} variant='Bold' />
											   </ActionIcon>
											   <ActionIcon
												 variant="filled"
												 color="#1893ffcc"
												 w={'20px'}
												 h={'10px'}
											   >
												 <TruckFast color='#fff' size={'15'} variant='Bold' />
											   </ActionIcon>
									   </Flex>
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
							</Tabs.Panel>





							<Tabs.Panel value="OrderManagement">
								<Flex gap={'0.3em'} direction={'column'}>
							<Flex justify={'end'} pt={'0.5em'} pr={'0.2em'}>
							<Button bg={'#17a497'} leftSection={<Send2  color='#fff' size={'15'}variant='Bold'/>}>
                    <Text fz={'13px'} fw={'500'}>    Request Spare</Text>
                    </Button>
							</Flex>
							{data?.length ? (
							  <TableComponent TableTh={TableTh2} >
							  <Table.Tbody className={'tbody'}>
								{data.map((item) => (
								  <Table.Tr key={item.id}>
									<Table.Td>
										<Text className={'txttablename'}>{item?.name ?? '..............'}</Text>
									</Table.Td>
									<Table.Td>
									  <Text className={'txttablename'}>{item?.partNumber ?? '..............'}</Text>
									</Table.Td>
									<Table.Td>
									  <Text className={'txttablename'}>{item?.type ?? '..............'}</Text>
									</Table.Td>
									<Table.Td>
									  <Text className={'txttablename'}>{item?.cost ?? '..............'}</Text>
									</Table.Td>
									<Table.Td>
									  <Text className={'txttablename'}>{item?.qtyOnHand ?? '..............'}</Text>
									</Table.Td>
								
									<Table.Td >
									   <Flex gap={'0.5em'}>
									   <ActionIcon
												 variant="filled"
												 color="#4254ba"
												 w={'20px'}
												 h={'10px'}
											   >
												 <Eye color='#fff' size={'15'}variant='Bold' />
											   </ActionIcon>
											   <ActionIcon
												 variant="filled"
												 color="yellow"
												 w={'20px'}
												 h={'10px'}
											   >
												 <Edit color='#fff' size={'15'} variant='Bold' />
											   </ActionIcon>
									   </Flex>
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
							</Tabs.Panel>
						
						</Flex>
					</Tabs>
		
	
			
		</Box>
	);
};

export default TabsButton;
