import React, { useEffect, useState } from 'react';
import {  Tabs, Flex, Text, Image, Select, Box, Table, ActionIcon } from '@mantine/core';
import {  Edit, Eye, Setting4, Trash } from 'iconsax-react';
import BOX from '../../../../../assets/boxnodata.png';
import { useDisclosure } from '@mantine/hooks';
import TableComponent from '@/presentation/components/boxtableglobal/Table';
import ModelFilter from '@/presentation/components/modal/ModelFilter';
import ModelAddRisk from '../../incidentreporting/addlRisk/ModelAddRisk';
import DeleteModal from '@/presentation/components/modal/DeleteModal';
import { DeleteMeetingReport } from '@/core/services/modulesServices/meetingreport.service';
import toast from 'react-hot-toast';
import { DeleteRiskAssessment } from '@/core/services/modulesServices/riskassessment.service';



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
	getRiskAssessment: () => void;
}

const TabsButton: React.FC<TabsButtonProps> = ({
	data,
	onTabChange,
	getRiskAssessment,
	isResponsive,
	search,
	titrepage,
	onCategoryChange,
	onSortChange,
}) => {
	const [modalOpen2, setModalOpen2] = useState<boolean>(false);
	const [activeTab, setActiveTab] = useState<string>('all');
	const [vuemodalOpen, setVuemodalOpen] = useState(false);
	useEffect(() => {
		onTabChange(activeTab);
	}, [activeTab, onTabChange]);
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
  const [idaction, setIdaction] = useState('');

	
	const handleSortChange = (sortValue: string) => onSortChange(sortValue);
	const [isVisibilityOpen, { open: openVisibility, close: closeVisibility }] = useDisclosure(false);
	const headerTabs = [
		{ value: 'all', label: 'All' },
		{ value: 'Active', label: 'Active' },
		{ value: 'Blocked', label: 'Blocked' },
	];
	const TableTh = [
		{ label: 'Report Reference' },
		{ label: 'Assessment Title' },
		{ label: 'Project ID' },
		{ label: 'Date' },
		{ label: 'Business Department' },
		{ label: 'Location' },
		{ label: 'Report Status' },
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
									<button className={'bntFilter'} onClick={()=>{setModalOpen2(true)}}>
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
										  {item?.riskAssessmentReference ?? '..............'}
										</Text>
									  </Table.Td>
							  
									  {/* Report Reference Column */}
									  <Table.Td>
										<Text className={'txttablename'}>
										  {item?.assessmentTitle ?? '......'}
										</Text>
									  </Table.Td>
							  
									  {/* Report Type/Status Column */}
									  <Table.Td>
										<Text className={'txttablename'}>
										  {item?.projectID?.length?item.projectID:'......' }
										</Text>
									  </Table.Td>
							  
									  {/* Report Title Column */}
									  <Table.Td>
										<Text
										  className={'txttablename'}
										  style={{ maxWidth: '250px' }}
										  lineClamp={1}
										>
										  {item?.assessmentDate ?? '......'}
										</Text>
									  </Table.Td>
							  
									  {/* Report Type Column */}
									  <Table.Td>
										<Text
										  className={'txttablename'}
										  style={{ maxWidth: '250px' }}
										  lineClamp={1}
										>
										  {item?.businessDepartment ?? '..............'}
										</Text>
									  </Table.Td>
							  
									  {/* Date and Time Column */}
									  <Table.Td>
										<Text
										  className={'txttablename'}
										  style={{ maxWidth: '250px' }}
										  lineClamp={1}
										>
										  {item?.location ?? '..............'}
										</Text>
									  </Table.Td>
									  <Table.Td>
										<Flex gap={'0.5em'} className="txttablename">
										  {item?.assessmentStatus ?? '..............'}
										</Flex>
									  </Table.Td>
									  {/* Actions Column */}
									  <Table.Td>
									<Flex gap={'0.5em'}>
									<ActionIcon variant="filled" color="#4254ba" w="25px" h="20px" onClick={()=>{setVuemodalOpen(true)}} >
																		<Eye color="#fff" size="15" variant="Bold" />
																	  </ActionIcon>
									<ActionIcon variant="filled" color="yellow" w="25px" h="20px" >
																		<Edit color="#fff" size="15" variant="Bold" onClick={()=>{setVuemodalOpen(true)}}/>
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
				vuemodalOpen&&(<ModelAddRisk
					open={vuemodalOpen}
					onClose={() => setVuemodalOpen(false)}
					data={data}
				  />	)
			}
					{modalOpen2 && (
				<ModelFilter
					opened={modalOpen2}
					onClose={()=>{setModalOpen2(false)}}
					onSortChange={handleSortChange}
					titrepage={titrepage}
					sortLabels={sortLabels}
				/>
			)}
<DeleteModal
        title="Confirm Deletion"
        deleteText="Delete permanently"
        subtitle="Are you sure you want to delete the Risk Assessment Report"
        opened={isVisibilityOpen}
        close={closeVisibility}
		handleDelete={() => {
			if (idaction) {
				DeleteRiskAssessment({ id: idaction })
					.then(() => {
						toast.success('Risk Assessment deleted');
						closeVisibility();
						getRiskAssessment()
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
