import useResponsive from '@/presentation/shared/mediaQuery';
import { Box, Button, Divider, Flex, Radio, ScrollArea, Text } from '@mantine/core';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';
import React, { useState } from 'react';
interface IProps {
	data: string[];
	label: string;
	valueToDisplay: string;
	setValueToDisplay: React.Dispatch<React.SetStateAction<string>>;
	forwardedRef: React.RefObject<HTMLDivElement>;
	opened: boolean;
	toggle: () => void;
	close: () => void;
	sectionSelected: string | null;
	setSectionSelected: React.Dispatch<React.SetStateAction<string | null>>;
	height?: number;
	scrollAreaHeight?: number;
}
const PrimaryFilter = ({
	data,
	label,
	valueToDisplay,
	setValueToDisplay,
	forwardedRef,
	opened,
	close,
	toggle,
	sectionSelected,
	setSectionSelected,
	height = 285,
	scrollAreaHeight = 150,
}: IProps) => {
	const [valueToSubmit, setValueToSubmit] = useState('All');
	const { isMobile, isTablet } = useResponsive();
	return (
		<Box style={{ position: 'relative' }} w={isMobile ? '100%' : isTablet ? '100%' : 'unset'}>
			<Button
				size='compact-md'
				bg={'#FFF'}
				component='div'
				aria-hidden='false'
				onClick={() => {
					setSectionSelected(label);
					toggle();
				}}
				w={'100%'}
			>
				<Text fz={12} fw={600} c={'#0A0C0E'}>
					{label}:
				</Text>
				<Text fz={12} fw={600} c={'#0A0C0E'} ml={5}>
					{valueToDisplay}
				</Text>
				{opened && sectionSelected && sectionSelected == label ? (
					<ArrowUp2 style={{ marginLeft: '.5rem' }} size='10' color='#333' />
				) : (
					<ArrowDown2 style={{ marginLeft: '.5rem' }} size='10' color='#333' />
				)}
			</Button>
			{opened && sectionSelected && sectionSelected == label && (
				<Box
					ref={forwardedRef}
					style={{
						position: 'absolute',
						zIndex: '5000',
						backgroundColor: '#FFF',
						top: '36px',
						right: '0px',
						width: '20rem',
						boxShadow: '2px 6px 20px 0px #0A0C0E33',
					}}
					h={height}
				>
					<Text fz={14} fw={600} c={'#0A0C0E'} style={{ padding: '1rem 1rem 0 1rem' }}>
						Filter by {label.toLocaleLowerCase()}:
					</Text>
					<Box p={15}>
						<ScrollArea h={scrollAreaHeight}>
							{data.map((x, index) => (
								<Radio
									mt={25}
									value={x}
									label={x}
									key={index}
									styles={{ label: { fontSize: '14px' } }}
									checked={x == valueToSubmit}
									onChange={() => {
										setValueToSubmit(x);
									}}
								/>
							))}
						</ScrollArea>
					</Box>
					<Divider />
					<Flex
						w={'100%'}
						justify={'center'}
						align={'center'}
						style={{ padding: ' 01rem' }}
						onClick={close}
					>
						<Button
							bg={'#0A0C0E'}
							radius={8}
							w={'100%'}
							onClick={() => setValueToDisplay(valueToSubmit)}
						>
							<Text fz={14}>Apply</Text>
						</Button>
					</Flex>
				</Box>
			)}
		</Box>
	);
};

export default PrimaryFilter;
