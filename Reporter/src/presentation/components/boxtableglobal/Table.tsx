import React, { useState } from 'react';
import { Table, ScrollArea, Container } from '@mantine/core';
import cx from 'clsx';
type TableComponentProps = {
	TableTh: any[];
	children: React.ReactNode;
	selectAll?: boolean;
	onSelectAll?: () => void;
	primittion?: boolean;
};
const TableComponent: React.FC<TableComponentProps> = ({ TableTh, children }) => {
	const [scrolled, setScrolled] = useState(false);
	return (
		<Container className={'tableContainer'}>
			<ScrollArea h={460} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
				<Table className={'table'} highlightOnHover miw={900}>
					<Table.Thead className={cx('headertable', { scrolled })}>
						<Table.Tr>
							{TableTh?.map((item, idx) => (
								<Table.Th key={idx}>{item.label}</Table.Th>
							))}
						</Table.Tr>
					</Table.Thead>
					{children}
				</Table>
			</ScrollArea>
		</Container>
	);
};

export default TableComponent;
