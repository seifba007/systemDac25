import React, { useEffect, useState } from 'react';
import {  Tabs, Flex, Text, Image, Select, Box, Table, ActionIcon } from '@mantine/core';
import {  Edit, Eye, Scanner, Setting4, Trash } from 'iconsax-react';
import BOX from '../../../../../assets/boxnodata.png';
import { useDisclosure } from '@mantine/hooks';
import TableComponent from '@/presentation/components/boxtableglobal/Table';
import ModelFilter from '@/presentation/components/modal/ModelFilter';
import HAZOPAnalysisModel from './HAZOPAnalysisModel';
import DeleteModal from '@/presentation/components/modal/DeleteModal';
import toast from 'react-hot-toast';
import { DeleteHazopeAnalysis } from '@/core/services/modulesServices/hazop.service';



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
	gethazop: () => void;
}

const TabsButton: React.FC<TabsButtonProps> = ({
	data,
	onTabChange,
	isResponsive,
	search,
	titrepage,
	gethazop,
	onCategoryChange,
	onSortChange,
}) => {
	const [activeTab, setActiveTab] = useState<string>('all');
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [modalOpen2, setModalOpen2] = useState<boolean>(false);
	const [isUpdt, setIsUpdt] = useState<boolean>(false);
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
	const riskData = {
		assessmentTitle: 'Safety Assessment - Alpha Project',
		projectId: 'PRJ-12345',
		client: 'Acme Corporation',
		date: '02/23/2025',
		location: 'New York Office',
		businessDepartment: 'Operations',
		assessmentOverview: 'This assessment reviews safety risks and mitigations for the Alpha Project rollout.',
		teamMembers: [
		  { name: 'John Doe', department: 'Engineering', role: 'Developer', companyName: 'TechCorp' },
		  { name: 'Jane Smith', department: 'Marketing', role: 'Manager', companyName: 'MarketInc' },
		],
		tableRows: [
		  {
			activitySteps: 'Server installation',
			hazard: 'Electrical shock',
			initialRisk: {
			  description: 'Exposed wires might cause shock',
			  lossCategory: 'Health',
			  likelihood: 'High',
			  severity: 'Severe',
			  riskLevel: 'High',
			},
			controlMeasures: {
			  preventionMeasures: 'Ensure all wires are insulated',
			  mitigationMeasures: 'Provide insulated gloves',
			},
			residualRisk: {
			  likelihood: 'Low',
			  severity: 'Moderate',
			  riskLevel: 'Medium',
			},
			actions: 'Supervise installations closely',
		  },
		],
	  };	const closeModal = () => setModalOpen(false);
	const openModal2 = () => setModalOpen2(true);

	const [idaction, setIdaction] = useState('');
	
	const handleSortChange = (sortValue: string) => onSortChange(sortValue);
	const [isVisibilityOpen, { open: openVisibility, close: closeVisibility }] = useDisclosure(false);
	const headerTabs = [
		{ value: 'all', label: 'All' },
	
	];
	const TableTh = [
		{ label: 'HAZOP ID' },
		{ label: 'System/Process Name' },
		{ label: 'Objectives' },
		{ label: 'Start Date' },
		{ label: 'End Date' },
		{ label: 'Review Frequency' },
		{ label: 'Actions' },
	  ];
	  
	  	const [vuemodalOpen, setVuemodalOpen] = useState(false);
	  

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
								<TableComponent TableTh={TableTh}>
								<Table.Tbody className={'tbody'}>
								  {data.map((item, index) => (
									<Table.Tr key={index}>
									  {/* Severity Column */}
									  <Table.Td>
										<Text
										  className="txttablename"
										
										>
										  {item?.hazopId ?? '..............'}
										</Text>
									  </Table.Td>
							  
									  {/* Report Reference Column */}
									  <Table.Td>
										<Text className={'txttablename'}>
										  {item?.systemName?.length!=0?item?.systemName: '..............'}
										</Text>
									  </Table.Td>
							  
									  {/* Report Type/Status Column */}
									  <Table.Td>
										<Text className={'txttablename'}>
										  {item.objectives }
										</Text>
									  </Table.Td>
							  
									  {/* Report Title Column */}
									  <Table.Td>
										<Text
										  className={'txttablename'}
										  style={{ maxWidth: '250px' }}
										  lineClamp={1}
										>
										  {item?.startDate ?? '..............'}
										</Text>
									  </Table.Td>
							  
									  {/* Report Type Column */}
									  <Table.Td>
										<Text
										  className={'txttablename'}
										  style={{ maxWidth: '250px' }}
										  lineClamp={1}
										>
										  {item?.endDate ?? '..............'}
										</Text>
									  </Table.Td>
							  
									  {/* Date and Time Column */}
									  <Table.Td>
										<Text
										  className={'txttablename'}
										  style={{ maxWidth: '250px' }}
										  lineClamp={1}
										>
										  {item?.reviewFrequency.length?item?.reviewFrequency: '..............'}
										</Text>
									  </Table.Td>
								
									  {/* Actions Column */}
									  <Table.Td>
									<Flex gap={'0.5em'}>
										
									<ActionIcon variant="filled" color="#4254ba" w="25px" h="20px" onClick={()=>{setVuemodalOpen(true),setIsUpdt(false)}}>
																		<Eye color="#fff" size="15" variant="Bold" />
																	  </ActionIcon>
									<ActionIcon variant="filled" color="yellow" w="25px" h="20px" >
																		<Edit color="#fff" size="15" variant="Bold" onClick={()=>{setVuemodalOpen(true),setIsUpdt(true)}} />
																	  </ActionIcon>
																	  <ActionIcon variant="filled" color="#17a497" w="25px" h="20px" >
																		<Scanner color="#fff" size="15" variant="Bold" />
																	  </ActionIcon>
																	  <ActionIcon variant="filled" color="red" w="25px" h="20px" onClick={()=>{setIdaction(item.id),openVisibility()}}>
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
			{
			isUpdt&& (	<HAZOPAnalysisModel
				isUpdte={isUpdt}
				data={riskData}
					open={vuemodalOpen}
					onClose={() => setVuemodalOpen(false)}
				/>	)

			}
		
			{modalOpen2 && (
				<ModelFilter
					opened={modalOpen2}
					onClose={closeModal}
					onSortChange={handleSortChange}
					titrepage={titrepage}
					sortLabels={sortLabels}
				/>
			)}
<DeleteModal
        title="Confirm Deletion"
        deleteText="Delete permanently"
        subtitle="Are you sure you want to delete the HAZOP Analysis Report"
        opened={isVisibilityOpen}
        close={closeVisibility}
		handleDelete={() => {
			if (idaction) {
				DeleteHazopeAnalysis({ id: idaction })
					.then(() => {
						toast.success('HAZOP Analysis deleted');
						closeVisibility();
						gethazop()
					})
					.catch((err) => {
						console.log(err);
						toast.error('' + err.data.message);
					});
			}
		}}
      />
		</>
	);
};

export default TabsButton;
