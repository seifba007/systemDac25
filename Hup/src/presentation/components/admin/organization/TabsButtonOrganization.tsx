import React, { useEffect, useState } from 'react';
import {
	Avatar,
	Tabs,
	Flex,
	Text,
	Image,
	Select,
	Box,
	Table,
	ActionIcon,
	rem,
} from '@mantine/core';
import { ArrowSwapVertical, Category, Edit, Setting4, Trash } from 'iconsax-react';
import BOX from '../../../../assets/boxnodata.png';
import TableComponent from '../../boxtableglobal/Table';
import ModelFilter from '../../modal/ModelFilter';
import Categoriesfilter from '../../modal/Categoriesfilter';
import CreationOrganization from '../../modal/CreationOrganization';
import AssignAappsModel from '../../modal/AssignAappsModel';
import DeleteModal from '../../modal/DeleteModal';
import { useDisclosure } from '@mantine/hooks';
import toast from 'react-hot-toast';
import { DeleteOrganizations } from '@/core/services/modulesServices/organizations.service';

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
	getOrgs: () => void;
}

const TabsButton: React.FC<TabsButtonProps> = ({
	data,
	onTabChange,
	isResponsive,
	search,
	titrepage,
	onCategoryChange,
	onSortChange,
	getOrgs,
}) => {
	const [activeTab, setActiveTab] = useState<string>('all');
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [modalOpen2, setModalOpen2] = useState<boolean>(false);
	const [editmodalOpen, setEditmodalOpen] = useState<boolean>(false);
	const [dataOrganization, setdataOrganization] = useState<any>([]);
	const [assignAppsOpen, setAssignAppsOpen] = useState<boolean>(false);

	const [selectAll, setSelectAll] = useState<boolean>(false);
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
	const closeModal3 = () => setEditmodalOpen(false);
	const openModal2 = () => setModalOpen2(true);
	const closeModal2 = () => setModalOpen2(false);
	const handleSortChange = (sortValue: string) => onSortChange(sortValue);
	const [isVisibilityOpen, { open: openVisibility, close: closeVisibility }] = useDisclosure(false);
	const headerTabs = [{ value: 'all', label: 'All' }];
	const TableTh = [
		{ label: 'Organizations ' },
		{ label: 'Address' },
		{ label: 'Email' },
		{ label: 'Description' },
		{ label: 'Available Apps' },
		{ label: 'action' },
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
									<button className={'bntFilter'} onClick={openModal}>
										<ArrowSwapVertical size='14' color='var(--Grey-2, #686F7C)' />
										{isResponsive ? null : <Text className={'txtFilter'}>Sort by</Text>}
									</button>
								</Box>
							</Flex>

							{data?.length ? (
								<TableComponent TableTh={TableTh} selectAll={selectAll}>
									<Table.Tbody className={'tbody'}>
										{data?.map((item) => (
											<Table.Tr key={item.id}>
												<Table.Td>
													<Flex align={'center'} gap={'0.5em'}>
														<Avatar
															src={item?.logo}
															alt={item.id}
															className={'avatar'}
															radius='sm'
														/>
														<Text className={'txttablename'}>{item?.name ?? '..............'}</Text>
													</Flex>
												</Table.Td>

												<Table.Td>
													<Text className={'txttablename'}>
														{item?.address ?? '..............'}
													</Text>
												</Table.Td>

												<Table.Td>
													<Text className={'txttablename'}>{item?.email ?? '..............'}</Text>
												</Table.Td>

												<Table.Td>
													<Text className={'txttablename'} maw={rem(600)} lineClamp={4}>
														{item?.description ?? '..............'}
													</Text>
												</Table.Td>
												<Table.Td>
													<Table.Td>
														<Avatar.Group>
															{item?.availableApps?.slice(0, 4).map((app: any, index: any) => (
																<Avatar key={index} src={app.logo} alt={app.name} />
															))}

															{item?.availableApps?.length > 4 && (
																<Avatar>+{item?.availableApps?.length - 4}</Avatar>
															)}
														</Avatar.Group>
													</Table.Td>
												</Table.Td>

												<Table.Td>
													<Flex gap={'0.5em'}>
														<ActionIcon
															onClick={() => {
																setdataOrganization(item);
																setAssignAppsOpen(true);
															}}
															variant='filled'
															color='#4254ba'
															w={'40px'}
															h={'20px'}
														>
															<Category color='#fff' size={'15'} />
														</ActionIcon>
														<ActionIcon
															onClick={() => {
																setdataOrganization(item);
																setEditmodalOpen(true);
															}}
															variant='filled'
															color='yellow'
															w={'40px'}
															h={'20px'}
														>
															<Edit color='#fff' size={'15'} />
														</ActionIcon>
														<ActionIcon
															variant='filled'
															color='red'
															w={'40px'}
															h={'20px'}
															onClick={() => {
																setdataOrganization(item);
																openVisibility();
															}}
														>
															<Trash color='#fff' size={'15'} />
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
				<CreationOrganization
					getOrg={getOrgs}
					isUpdate={true}
					opened={editmodalOpen}
					onClose={closeModal3}
					data={dataOrganization}
				/>
			)}
			<DeleteModal
				title='Delete Organization'
				deleteText='Delete permanently'
				subtitle='Are you certain that you want to delete this Organization permanently?'
				opened={isVisibilityOpen}
				close={closeVisibility}
				handleDelete={() => {
					if (dataOrganization?.id) {
						DeleteOrganizations({ id: dataOrganization?.id })
							.then(() => {
								toast.success('Organization deleted');
								closeVisibility();
								getOrgs();
							})
							.catch((err) => {
								console.log(err);
								toast.error('' + err.data.message);
							});
					}
				}}
			/>
			{assignAppsOpen && (
				<AssignAappsModel
					getOrgr={getOrgs}
					opened={assignAppsOpen}
					onClose={() => {
						setAssignAppsOpen(false);
					}}
					data={dataOrganization}
				/>
			)}
		</>
	);
};

export default TabsButton;
