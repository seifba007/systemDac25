import { Icons } from '@/assets/icons/Icons';
import { Box, Flex } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

type EmptyPageProps = PropsWithChildren<{
	icon?: React.ReactElement;
}>;

const EmptyPage = ({ children, icon }: EmptyPageProps) => {
	return (
		<Flex justify='center' align='center' h='100%' mt={30}>
			<Flex direction='column' gap={15}>
				<Box w={{ base: 200, sm: 300, md: 400 }}>
					{icon ? icon : <Icons.educationCaps width={'100%'} />}
				</Box>
				{children}
			</Flex>
		</Flex>
	);
};

export default EmptyPage;
