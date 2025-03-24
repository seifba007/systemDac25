import React from 'react';
import { Flex, Pagination, Text } from '@mantine/core';
interface BoxTableAdminProps {
	Data: any[];
	totalCount: number;
	currentPage: number;
	resultsPerPage: number;
	setCurrentPage: (page: number) => void;
	setResultsPerPage: (perPage: number) => void;
	renderTableBody: (data: any[]) => JSX.Element;
	isResponsive: boolean;
}

const BoxTableAdmin: React.FC<BoxTableAdminProps> = ({
	Data,
	totalCount,
	currentPage,
	resultsPerPage,
	setCurrentPage,
	setResultsPerPage,
	isResponsive,
	renderTableBody,
}) => {
	const totalPages = Math.ceil(totalCount / resultsPerPage);
	return (
		<Flex direction={'column'} justify={'space-between'} className={'BoxTable'}>
			{renderTableBody(Data)}
			<Flex className={'paginationContainer'} justify='space-between'>
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

export default BoxTableAdmin;
