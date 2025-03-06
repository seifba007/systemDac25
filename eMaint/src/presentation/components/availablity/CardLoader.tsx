import { Card, Skeleton, Stack } from '@mantine/core';
import React from 'react';

export default function CardLoader() {
	return (
		<Card
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				gap: '0.25rem',
			}}
			padding='lg'
			radius='md'
			withBorder
		>
			<Card.Section h='10rem'>
				<Skeleton height='100%' width='100%' />
			</Card.Section>
			<Stack flex={1} gap={20} mt={10}>
				<Skeleton height='1rem' width='100%' />
				<Stack gap={5}>
					<Skeleton height='0.75rem' width='100%' />
					<Skeleton height='0.75rem' width='100%' />
					<Skeleton height='0.75rem' width='100%' />
				</Stack>
			</Stack>
			<Stack align={'end'}>
				<Skeleton height='1rem' width='4rem' />
			</Stack>
		</Card>
	);
}
