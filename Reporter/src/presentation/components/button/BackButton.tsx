import { Flex, Text, rem } from '@mantine/core';
import { ArrowLeft } from 'iconsax-react';
import React from 'react';

type BackButtonProps = {
	text?: string;
	mb?: number;
	onClick: () => void;
};

const BackButton = ({ text = 'Back', mb = 64, onClick }: BackButtonProps) => {
	return (
		<Flex
			align='center'
			gap='0.75rem'
			mb={{ base: rem(32), md: rem(mb) }}
			onClick={onClick}
			style={{ cursor: 'pointer' }}
		>
			<ArrowLeft size='20' color='#000' />
			<Text>{text}</Text>
		</Flex>
	);
};

export default BackButton;
