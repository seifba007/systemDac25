import React, { useEffect, useState } from 'react';
import { Avatar, Tabs, Flex, Text, Image, Select, Box, Table, ActionIcon } from '@mantine/core';
import { ArrowSwapVertical, Edit, Setting4, Trash } from 'iconsax-react';
import BOX from '../../../../assets/boxnodata.png';
import TableComponent from '../../boxtableglobal/Table';
import ModelFilter from '../../modal/ModelFilter';
import Categoriesfilter from '../../modal/Categoriesfilter';
import DeleteModal from '../../modal/DeleteModal';
import { useDisclosure } from '@mantine/hooks';
import CreationApps from '../../modal/CreationApps';


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
const RoleData = [

	{
		roles: [
			{ key: 'default', label: 'Default' },
			{ key: 'nameAsc', label: 'Administrator' },
			{ key: 'nameDesc', label: 'Editor' },
		],
	},
];

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
	const [dataOrganization, setdataOrganization] = useState<any>([]);
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
	const openModal = () => setModalOpen(true);
	const closeModal = () => setModalOpen(false);
	const openModal2 = () => setModalOpen2(true);
	const closeModal2 = () => setModalOpen2(false);

	const handleSortChange = (sortValue: string) => onSortChange(sortValue);
	const [isVisibilityOpen, { open: openVisibility, close: closeVisibility }] = useDisclosure(false);
	const headerTabs = [
		{ value: 'all', label: 'All' },
		{ value: 'Active', label: 'Active' },
		{ value: 'Blocked', label: 'Blocked' },
	];
	const TableTh = [
		{ label: 'Severity' },
		{ label: 'Report Reference' },
		{ label: 'Report Classification' },
		{ label: 'Report Title' },
		{ label: 'Report Type' },
		{ label: 'Date and Time' },
		{ label: 'Actions' },
	  ];
	  
	type ActivityStatus = 'Active' | 'Blocked';
	const statusClassMap: Record<ActivityStatus, string> = {
		Active: 'Active',
		Blocked: 'Blocked',
	};
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
												width: '100px'
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
								<Box
									style={
										isResponsive
											? { display: 'flex', alignItems: 'center', gap: '8px' }
											: { marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }
									}
								>
									<button className={'bntFilter'} onClick={openModal2}>
										<Setting4 size='14' color='var(--Grey-2, #686F7C)' />
										{isResponsive ? null : <Text className={'txtFilter'}>Filter by</Text>}
									</button>
									
								</Box>
							</Flex>

							{data?.length ? (
								<TableComponent
									TableTh={TableTh}

								>
									<Table.Tbody className={'tbody'}>
  {data.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Td>
	  <Text
  className='Pending-Severity'
  style={{
    background: item?.severity >= 20 ? '#e4c814' : 'red', 
	color:'#fff', // Fixing ternary syntax and background color
  }}
>          {item?.severity ?? '..............'}
        </Text>
      </Table.Td>

      <Table.Td>
        <Text className={'txttablename'}>
         
		 {item?.reportReference ?? '..............'}
		
        </Text>
      </Table.Td>

      <Table.Td>
        <Text className={'txttablename'}>
          
            {item.reportType === 'Critical' ? 'Blocked' : 'Active'}
      
        </Text>
      </Table.Td>

      <Table.Td>
        <Text
          className={'txttablename'}
          style={{ maxWidth: '250px' }}
          lineClamp={1}
        >
          {item?.reportTitle ?? '..............'}
        </Text>
      </Table.Td>

      <Table.Td>
        <Text
          className={'txttablename'}
          style={{ maxWidth: '250px' }}
          lineClamp={1}
        >
          {item?.reportType ?? '..............'}
        </Text>
      </Table.Td>

      <Table.Td>
        <Text
          className={'txttablename'}
          style={{ maxWidth: '250px' }}
          lineClamp={1}
        >
          {item?.dateTime ?? '..............'}
        </Text>
      </Table.Td>

      <Table.Td>
        <Flex gap={'0.5em'} className='txttablename'>
		  {item?.actions ?? '..............'}
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
					</Tabs>
				</Flex>
			</Flex>
		
			{modalOpen && (
				<ModelFilter
					opened={modalOpen}
					onClose={closeModal}
					onSortChange={handleSortChange}
					titrepage={titrepage}
					sortLabels={sortLabels}
				/>
			)}
			{editmodalOpen && (
				<CreationApps
					opened={editmodalOpen}
					onClose={() => { setEditmodalOpen(false) }}
					data={dataOrganization}
				/>
			)}
			<DeleteModal
				title='Delete App'
				deleteText='Delete permanently'
				subtitle='Are you certain that you want to delete this App permanently?'
				opened={isVisibilityOpen}
				close={closeVisibility}
				handleDelete={() =>
					console.log('delete')
				}
			/>

		</>
	);
};

export default TabsButton;
