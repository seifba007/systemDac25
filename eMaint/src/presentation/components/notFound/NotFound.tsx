import { Icons } from '@/assets/icons/Icons';
import { Center, Flex, rem, Text } from '@mantine/core';
import React, { FC } from 'react';

interface NotFoundProps {
	height?: string;
	emptyBox?: boolean;
	message: string;
	linkText?: string;
	onLinkClick?: () => void;
	noSpacing?: boolean;
}

const NotFound: FC<NotFoundProps> = ({
	height = '80vh',
	message,
	linkText,
	onLinkClick,
	emptyBox,
	noSpacing = false,
}) => {
	return (
		<Center h={height}>
			<Flex direction={'column'} align={'center'}>
				{emptyBox && <Icons.emptyBox width={200} />}
				{!emptyBox && <Icons.notFound width={200} />}
				<Text
					mt={noSpacing ? rem(0) : rem(60)}
					w={{ base: rem(300), sm: '100%' }}
					style={{ textAlign: 'center' }}
					fz={{ base: 13, sm: 14 }}
				>
					{message}
					<u onClick={onLinkClick} style={{ color: 'blue', fontWeight: '500', cursor: 'pointer' }}>
						{linkText}
					</u>
					.
				</Text>
			</Flex>
		</Center>
	);
};

export default NotFound;
