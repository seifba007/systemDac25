import useResponsive from '@/presentation/shared/mediaQuery';
import { Flex, Group, Input, Modal, Radio, ScrollArea, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ArrowDown2, SearchNormal1, Sort } from 'iconsax-react';
import React, { useState } from 'react';

interface SearchAndSelectProps {
	inputPlaceholder: string;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	categoryOptions: any[] | null;
	setCategoryId: React.Dispatch<React.SetStateAction<string>>;
	categoryId: string;
}

const SearchAndSelect: React.FC<SearchAndSelectProps> = ({
	search,
	inputPlaceholder,
	categoryOptions,
	setCategoryId,
	categoryId,
	setSearch,
}) => {
	const [opened, { open, close }] = useDisclosure(false);
	const [value, setValue] = useState('');
	const { isMobile } = useResponsive();

	return (
		<>
			<Flex align={'center'} gap={16} h='fit-content' mt={'md'}>
				<Input
					flex={3}
					placeholder={inputPlaceholder}
					defaultValue={search}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
						setSearch(event.currentTarget.value)
					}
					rightSection={<SearchNormal1 size='20' color='#FFF' />}
					rightSectionPointerEvents='all'
					styles={{
						input: {
							padding: '1.5rem',
							borderRadius: '8px',
						},
						section: {
							width: '3rem',
							backgroundColor: 'black',
							display: 'flex',
							justifyContent: 'center',
							borderRadius: '8px',
						},
					}}
				/>
				{!isMobile && (
					<Group
						flex={1}
						gap={12}
						px={16}
						py={12}
						onClick={open}
						style={{ border: '1px solid #cdd3da', borderRadius: 8, cursor: 'pointer' }}
					>
						<ArrowDown2 size={16} color='#000' />
						<Text>{value !== '' ? value : 'Categories'}</Text>
					</Group>
				)}
				{isMobile && (
					<Group
						p={15}
						gap={8}
						align='center'
						onClick={open}
						style={{ border: '1px solid black', borderRadius: 8, cursor: 'pointer' }}
					>
						<Sort size='20' color='#000' />{' '}
					</Group>
				)}
			</Flex>
			<Modal
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3,
			  }}
				radius={'md'}
				opened={opened}
				onClose={close}
				title='Categories'
				size={'lg'}
				centered
				styles={{ inner: { minHeight: 900 }, title: { marginLeft: 'auto', fontWeight: 500 } }}
			>
				<Stack>
					<ScrollArea h={'100%'}>
						<Stack gap={34} mah={200} pt={16} pb={32} style={{ borderTop: '1px solid #DFDFDF' }}>
							<Stack>
								{categoryOptions?.map((item, idx) => (
									<Radio
										key={idx}
										label={item.label}
										checked={categoryId === item.value}
										onChange={(e) => {
											if (e.target.checked) {
												setCategoryId(item.value);
												setValue(item.label);
												close();
											}
										}}
									/>
								))}
							</Stack>
						</Stack>
					</ScrollArea>
				</Stack>
			</Modal>
		</>
	);
};

export default SearchAndSelect;
