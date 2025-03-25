import React, { useEffect, useState } from 'react';
import { Tabs, Flex, Text, Image, Select, Box, Table, ActionIcon } from '@mantine/core';
import { Edit, Eye, Setting4, Trash } from 'iconsax-react';
import BOX from '../../../../assets/boxnodata.png';
import TableComponent from '../../boxtableglobal/Table';
import ModelFilter from '../../modal/ModelFilter';
import DeleteModal from '../../modal/DeleteModal';
import { useDisclosure } from '@mantine/hooks';
import toast from 'react-hot-toast';
import { DeleteIncidentReporting } from '@/core/services/modulesServices/incidentreporting.service';
import EditModel from './riskAssessmentsList/model/EditModel';

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
	getdata: () => void;
}

const TabsButton: React.FC<TabsButtonProps> = ({
	data,
	onTabChange,
	isResponsive,
	search,
	titrepage,
	onCategoryChange,
	onSortChange,
	getdata,
}) => {
	const [activeTab, setActiveTab] = useState<string>('all');
	const [modalOpen2, setModalOpen2] = useState<boolean>(false);
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [dataIncident, setDataIncident] = useState<any>([]);

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
	const openModal2 = () => setModalOpen2(true);
	const [, setVuemodalOpen] = useState(false);
	const [idaction, setIdaction] = useState('');

	const handleSortChange = (sortValue: string) => onSortChange(sortValue);
	const [isVisibilityOpen, { open: openVisibility, close: closeVisibility }] = useDisclosure(false);
	const headerTabs = [{ value: 'all', label: 'All' }];
	const TableTh = [
		{ label: 'Severity' },
		{ label: 'Report Reference' },
		{ label: 'Report Classification' },
		{ label: 'Report Title' },
		{ label: 'Report Type' },
		{ label: 'Date and Time' },
		{ label: 'Actions' },
	];

	const [isEditt, setIsEditt] = useState(false);

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
								</Box>
							</Flex>

							{data?.length ? (
								<TableComponent TableTh={TableTh}>
									<Table.Tbody className={'tbody'}>
										{data?.map((item, index) => {
											type Likelihood = 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Very High';

											// Define the mapping for likelihood to multiplier
											const likelihoodMultiplier: Record<Likelihood, number> = {
												'Very Low': 1,
												Low: 2,
												Moderate: 3,
												High: 4,
												'Very High': 5,
											};

											// Assuming item is available with severity and likelihood values

											// Ensure likelihood is typed correctly
											const likelihood: Likelihood = item.likelihood as Likelihood;
											const severity: number = Number(item.severity);

											// Calculate severityValue safely
											const severityValue = severity * (likelihoodMultiplier[likelihood] || 0);

											// Determine the background color based on the calculated severity
											const background =
												severityValue < 4
													? '#4c7c04' // Green
													: severityValue >= 4 && severityValue <= 10
													? '#f9d909' // Yellow
													: severityValue > 10 && severityValue <= 19
													? '#f99d09' // Orange
													: severityValue >= 20
													? 'rgb(249 9 9)' // Red
													: '#'; // Default value

											return (
												<Table.Tr key={index}>
													<Table.Td>
														<Text
															className='Pending-Severity'
															style={{
																background: background,
																color: '#fff', // Fixing text color as white
															}}
														>
															{severityValue} {/* Display the severity value */}
														</Text>
													</Table.Td>

													<Table.Td>
														<Text className={'txttablename'}>
															{item?.reportReference ?? '..............'}
														</Text>
													</Table.Td>

													<Table.Td>
														<Text className={'txttablename'}>
															{item?.reportClassification ?? '........'}
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
															{item?.dateTime?.$date ?? '..............'}
														</Text>
													</Table.Td>

													<Table.Td>
														<Flex gap={'0.5em'} className='txttablename'>
															<Flex gap={'0.5em'}>
																<ActionIcon
																	variant='filled'
																	color='#4254ba'
																	w='25px'
																	h='20px'
																	onClick={() => {
																		setDataIncident(item);
																		setIsEditt(true);
																		setIsVisible(true);
																	}}
																>
																	<Eye color='#fff' size='15' variant='Bold' />
																</ActionIcon>
																<ActionIcon
																	variant='filled'
																	color='yellow'
																	w='25px'
																	h='20px'
																	onClick={() => {
																		setDataIncident(item);
																		setIsVisible(false);
																		setVuemodalOpen(true);
																		setIsEditt(true);
																	}}
																>
																	<Edit color='#fff' size='15' variant='Bold' />
																</ActionIcon>
																<ActionIcon
																	variant='filled'
																	color='red'
																	w='25px'
																	h='20px'
																	onClick={() => {
																		setIdaction(item._id);
																		openVisibility();
																	}}
																>
																	<Trash color='#fff' size='15' />
																</ActionIcon>
															</Flex>
														</Flex>
													</Table.Td>
												</Table.Tr>
											);
										})}
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
				<ModelFilter
					opened={modalOpen2}
					onClose={() => {
						setModalOpen2(false);
					}}
					onSortChange={handleSortChange}
					titrepage={titrepage}
					sortLabels={sortLabels}
				/>
			)}

			{dataIncident && (
				<EditModel
					opened={isEditt}
					visble={isVisible}
					data={dataIncident}
					getdatainc={getdata}
					onClose={() => {
						setIsEditt(false);
					}}
				/>
			)}

			<DeleteModal
				title='Delete Incident Reports '
				deleteText='Delete permanently'
				subtitle='Are you certain that you want to delete this Incident Reports permanently?'
				opened={isVisibilityOpen}
				close={closeVisibility}
				handleDelete={() => {
					if (idaction) {
						DeleteIncidentReporting({ id: idaction })
							.then(() => {
								getdata();
								toast.success('Incident Report deleted');
								closeVisibility();
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
