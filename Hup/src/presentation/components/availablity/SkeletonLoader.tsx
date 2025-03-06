import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, rem, Skeleton } from '@mantine/core';
import React from 'react';

const SkeletonLoader = () => {
	const { isMobile } = useResponsive();
	return (
		<>
			{isMobile ? (
				<Flex
					style={{ border: '2px solid #E6E6E6', borderRadius: '12px', textAlign: 'center' }}
					align={'center'}
					justify={'center'}
					w={'100%'}
					py={rem(15)}
					px={rem(20)}
					gap={10}
					h={{ base: '18rem', sm: '20rem' }}
				>
					<Skeleton height={60} circle />
					<Flex direction={'column'} w={'100%'} align={'start'}>
						<Skeleton height={8} w={rem(100)} mt={rem(10)} radius='xl' />
						<Skeleton height={8} mt={rem(10)} radius='xl' />
						<Skeleton height={8} mt={rem(10)} mb={rem(18)} radius='xl' />
					</Flex>
				</Flex>
			) : (
				<Flex
					style={{ border: '2px solid #E6E6E6', borderRadius: '12px', textAlign: 'center' }}
					direction={'column'}
					align={'center'}
					w='100%'
					py={rem(24)}
					px={rem(20)}
					h={{ base: '18rem', sm: '20rem' }}
				>
					<Skeleton height={120} circle mb='xl' />
					<Skeleton height={8} mt={rem(24)} radius='xl' />
					<Skeleton height={8} mt={rem(24)} mb={rem(18)} radius='xl' />
					<Skeleton height={20} w={120} radius='xl' />
				</Flex>
			)}
		</>
	);
};

export default SkeletonLoader;

interface SkeletonItemProps {
	width: string;
	height: string;
	count: number;
	center?: boolean;
}
export const SkeletonItem = ({ width, height, count, center = true }: SkeletonItemProps) => {
	return (
		<Flex direction={'column'} align={`${center ? 'center' : 'start'}`} gap={5} mt={10} w={'100%'}>
			{Array(count)
				.fill(null)
				.map((_, index) => (
					<Skeleton key={index} height={height} width={width} radius='xl' />
				))}
		</Flex>
	);
};
