import { Text } from '@mantine/core';
import React from 'react';

type Props = {
	children: React.ReactNode;
	fw?: number;
	c?: string;
	fz?: number;
};

export default function Label({ children, fw = 600, c = '#575B60', fz = 12 }: Props) {
	return (
		<Text fw={fw} c={c} fz={fz}>
			{children}
		</Text>
	);
}
