import React from 'react';
import {
	Autocomplete,
	Avatar,
	Center,
	Checkbox,
	Flex,
	Image,
	Pagination,
	ScrollArea,
	Table,
	Text,
} from '@mantine/core';
import BOX from '../../../../assets/boxnodata.png';
import { ArrowDown2 } from 'iconsax-react';

interface User {
	name: string;
	apps: {
		name: string;
		logo: string;
	};
	description: string;
	path: string;
	active: boolean;
	id: string;
}

interface BoxTableAdminProps {
	totalCount: number;
	currentPage: number;
	resultsPerPage: number;
	setCurrentPage: (page: number) => void;
	setResultsPerPage: (perPage: number) => void;
	isResponsive: boolean;
	Data: User[];
	titl: string;
}

const BoxLicenses: React.FC<BoxTableAdminProps> = ({
	totalCount,
	titl,
	currentPage,
	resultsPerPage,
	setCurrentPage,
	setResultsPerPage,
	isResponsive,
	Data,
}) => {
	const totalPages = Math.ceil(totalCount / resultsPerPage);

	return (
		<Flex direction={'column'} justify={'space-between'} className={'BoxTablelicence'}>
			<Text pb={'1em'} fw={'600'} c={'#6c757d'} fz={'15px'}>
				Organization Users
			</Text>
			{Data?.length ? (
				<ScrollArea>
					<Table withTableBorder withColumnBorders className='customTable'>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>
									<Center>
										<Text fw={'600'} c={'#6c757d'}>
											User
										</Text>
									</Center>
								</Table.Th>
								{Data.map((item) => (
									<Table.Th key={item.id}>
										<Flex align={'center'} justify={'center'} gap={'0.5em'}>
											<Avatar
												src={item.apps.logo}
												alt={item.apps.name}
												className={'avatar'}
												radius='sm'
											/>
											<Text className={'txttablename'} c={'#6c757d'}>
												{item.apps.name}
											</Text>
										</Flex>
									</Table.Th>
								))}
							</Table.Tr>
						</Table.Thead>

						<Table.Tbody>
							{Data.map((item) => (
								<Table.Tr key={item.id}>
									<Table.Td>
										<Text className={'txttablename'}>{item.name}</Text>
									</Table.Td>
									{Data.map((appItem) => (
										<Table.Td key={appItem.id} pl={'4em'} pr={'4em'}>
											<Flex align={'center'} gap={'2em'}>
												<Checkbox
													color='#4254ba'
													styles={{ label: { fontWeight: 600, fontSize: 14 } }}
												/>

												<Text className={'txttablename'}>Assigned</Text>
												<Autocomplete
													rightSectionPointerEvents='none'
													rightSection={<ArrowDown2 size='16' color='#6c757d' />}
													data={['SmarDac', 'Organization Users']} // Example data
													placeholder='Select a title'
												/>
											</Flex>
										</Table.Td>
									))}
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				</ScrollArea>
			) : (
				<Flex
					direction='column'
					justify='center'
					align='center'
					gap='1.5em'
					style={{ height: '350px' }}
				>
					<Image src={BOX} style={{ width: '250px', height: '250px' }} />
					<Text className={'txtnodata'}>No User is created yet!</Text>
				</Flex>
			)}

			<Flex pt={'2em'} p={'0%'} className={'paginationContainer'} justify='space-between'>
				{!isResponsive ? (
					<Flex align='center' gap='0.5em'>
						<Text className={'txtselect'}>Nbr of results per page:</Text>
						<select
							className={'customSelect'}
							value={resultsPerPage}
							onChange={(e) => setResultsPerPage(Number(e.target.value))}
						>
							<option value={10}>10</option>
							<option value={20}>20</option>
							<option value={50}>50</option>
						</select>
					</Flex>
				) : null}
				<Pagination
					className='pagination'
					total={totalPages}
					value={currentPage}
					onChange={(page) => setCurrentPage(page)}
					color='#2c74ff'
					siblings={0}
					size='sm'
				/>
			</Flex>
		</Flex>
	);
};

export default BoxLicenses;

// Example Data
