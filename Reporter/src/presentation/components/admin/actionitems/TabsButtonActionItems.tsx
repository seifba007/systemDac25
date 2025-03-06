import React, { useEffect, useState } from 'react';
import {  Tabs, Flex, Text, Image, Select, Box, Table, ActionIcon } from '@mantine/core';
import { ArrowSwapVertical, Clock, CloseCircle, Edit, Eye, ProfileAdd,TickCircle, Trash } from 'iconsax-react';
import BOX from '../../../../assets/boxnodata.png';
import TableComponent from '../../boxtableglobal/Table';
import ModelFilter from '../../modal/ModelFilter';
import Categoriesfilter from '../../modal/Categoriesfilter';
import DeleteModal from '../../modal/DeleteModal';
import { useDisclosure } from '@mantine/hooks';
import CreationApps from '../../modal/CreationApps';
import VueActionItems from '../../modal/VueActionItems';
import DelegateAction from '../../modal/DelegateAction';
import ApproveItem from '../../modal/ApproveItem';


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
	const [modalOpenVue, setModalOpenVue] = useState<boolean>(false);
	const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
	const [modalOpenDelegate, setModalOpenDelegate] = useState<boolean>(false);
	const [modalOpenApproveiteam, setModalOpenApproveiteam] = useState<boolean>(false);

	const [edit, setEdit] = useState<boolean>(false);
	const [reject, setReject] = useState<boolean>(false);

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
		{ value: 'AssignedtoMe', label: 'Assigned to Me' },
		{ value: 'CreatedbyMe', label: 'Created by Me' },
	];
	const TableTh = [
		{ label: 'Status' },
		{ label: 'Action Description' },
		{ label: 'Created by' },
		{ label: 'Assigned Person' },
		{ label: 'Priority' },
		{ label: 'Target Date' },
		{ label: 'Report Reference' },
		{ label: 'Follow-Up Deadline' },
		{ label: 'Action' },

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
									<button className={'bntFilter'} onClick={openModal}>
										<ArrowSwapVertical size='14' color='var(--Grey-2, #686F7C)' />
										{isResponsive ? null : <Text className={'txtFilter'}>Sort by</Text>}
									</button>
								</Box>
							</Flex>

							{data?.length ? (
					    <TableComponent TableTh={TableTh}>
						<Table.Tbody>
						  {data.map((item) => (
							<Table.Tr key={item.id}>
							  <Table.Td>
								<Box
								  className={
									item.active === 'Pending'
									  ? 'Pending'
									  : item.active === 'Completed' ||item.active ==='Approved'
									  ? 'Validated'
									  : 'Tovalidate'
								  }
								>
								  {item.active}
								</Box>
							  </Table.Td>
							  <Table.Td>
								<Text className="txttablename">{item.description ?? '..............'}</Text>
							  </Table.Td>
							  <Table.Td>
								<Text className="txttablename">{item.createdBy}</Text>
							  </Table.Td>
							  <Table.Td>
								<Text className="txttablename">{item.assignedPerson}</Text>
							  </Table.Td>
							  <Table.Td>
								<Flex gap="0.2em" align="center">
								  {item.priority === 'Low' && (
									<i className="fas fa-circle text-success" style={{ fontSize: 'small' }}></i>
								  )}
								  {item.priority === 'Medium' && (
									<i
									  className="fas fa-exclamation-circle text-warning"
									  style={{ fontSize: 'small' }}
									></i>
								  )}
								  {item.priority === 'High' && (
									<i
									  className="fas fa-exclamation-triangle text-danger"
									  style={{ fontSize: 'small' }}
									></i>
								  )}
								  <Text className="txttablename">{item.priority}</Text>
								</Flex>
							  </Table.Td>
							  <Table.Td>
								<Text className="txttablename">{item.targetDate}</Text>
							  </Table.Td>
							  <Table.Td>
								<Text className="txttablename">{item.reportReference}</Text>
							  </Table.Td>
							  <Table.Td>
								<Flex gap="0.2em">
								  <Clock color="var(--Grey-2, #686F7C)" size="15" variant="Bold" />
								  <Text className="txttablename">{item.followUpDeadline}</Text>
								</Flex>
							  </Table.Td>
							  <Table.Td>
								<Flex gap="0.5em">
								  <ActionIcon variant="filled" color="green" w="25px" h="20px"onClick={()=>{setModalOpenApproveiteam(true),setReject(false)}}>
									<TickCircle color="#fff" size="15" variant="Bold" />
								  </ActionIcon>
								  <ActionIcon variant="filled" color="red" w="25px" h="20px"onClick={()=>{setModalOpenApproveiteam(true),setReject(true)}}>
									<CloseCircle color="#fff" size="15" variant="Bold" />
								  </ActionIcon>
								  <ActionIcon variant="filled" color="#6c757d" w="25px" h="20px">
									<ProfileAdd color="#fff" size="15" variant="Bold"onClick={()=>{setModalOpenDelegate(true)}} />
								  </ActionIcon>
								  <ActionIcon variant="filled" color="yellow" w="25px" h="20px" onClick={()=>{setModalOpenVue(true),setEdit(true)}}>
									<Edit color="#fff" size="15" variant="Bold" />
								  </ActionIcon>
								  <ActionIcon variant="filled" color="#4254ba" w="25px" h="20px" onClick={()=>{setModalOpenVue(true),setEdit(false)}}>
									<Eye color="#fff" size="15" variant="Bold" />
								  </ActionIcon>
								  <ActionIcon variant="filled" color="red" w="25px" h="20px" onClick={openVisibility}>
									<Trash color="#fff" size="15" />
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
					</Tabs>
				</Flex>
			</Flex>
			<ApproveItem
			isReject={reject}
					opened={modalOpenApproveiteam}
					onClose={()=>{setModalOpenApproveiteam(false)}}
					roleData={RoleData}
				/>
			<DelegateAction
					opened={modalOpenDelegate}
					onClose={()=>{setModalOpenDelegate(false)}}
					roleData={RoleData}
				/>
			<VueActionItems
					opened={modalOpenVue}
					onClose={()=>{setModalOpenVue(false)}}
					roleData={RoleData}
					isUpdate={edit}
				/>
			{modalOpen2 && (
				<Categoriesfilter
					title='Categories filter'
					opened={modalOpen2}
					onClose={closeModal2}
					onCategoryChange={(category) => setSelectedCategory(category)}
					roleData={RoleData}
				/>
			)}
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
				title='Confirm Deletion'
				deleteText='Delete permanently'
				subtitle='Are you sure you want to delete the action item: report the meeting'
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
