import React from 'react';
import { Flex, Menu, Stack, Text, rem } from '@mantine/core';
import { Copy, Edit, Eye, EyeSlash, More, Trash } from 'iconsax-react';

type OptionsDropdownProps = {
	handleUpdate: () => void;
	handleDelete: () => void;
	handleView?: () => void;
	handleVisiblity?: () => void;
	handleDuplicate?: () => void;
	isVisible?: boolean;
	iconsBgColor?: string;
	iconColor?: string;
};
const OptionsDropdown = ({
	handleUpdate,
	handleDelete,
	handleView,
	handleVisiblity,
	handleDuplicate,
	isVisible,
	iconsBgColor,
	iconColor,
}: OptionsDropdownProps) => {
	const isView = typeof handleView === 'function';
	const visiblity = typeof handleVisiblity === 'function';
	const isDuplicate = typeof handleDuplicate === 'function';

	return (
		<Menu shadow='md' styles={{ dropdown: { minWidth: 170 } }} position='bottom-end' offset={12}>
			<Menu.Target>
				<Flex
					align={'center'}
					justify={'center'}
					bg={iconsBgColor ? iconsBgColor : 'black.8'}
					w={'2.5rem'}
					h={'2.5rem'}
					style={{ borderRadius: '50%', cursor: 'pointer' }}
				>
					<More size='20' color={iconColor ? iconColor : '#0A0C0E'} />
				</Flex>
			</Menu.Target>
			<Menu.Dropdown>
				<Stack gap={rem(5)}>
					{isView && (
						<Menu.Item onClick={handleView} leftSection={<Eye size={16} color='#54515e' />}>
							<Text c={'#53545E'}>View</Text>
						</Menu.Item>
					)}
					{visiblity &&
						(isVisible ? (
							<Menu.Item onClick={handleVisiblity} leftSection={<Eye size={16} color='#54515e' />}>
								<Text c={'#53545E'}>Change visibility</Text>
							</Menu.Item>
						) : (
							<Menu.Item
								onClick={handleVisiblity}
								leftSection={<EyeSlash size={16} color='#54515e' />}
							>
								<Text c={'#53545E'}>Change visibility</Text>
							</Menu.Item>
						))}
					<Menu.Item onClick={handleUpdate} leftSection={<Edit size={16} color='#54515e' />}>
						<Text c={'#53545E'}>Modify</Text>
					</Menu.Item>
					{isDuplicate && (
						<Menu.Item onClick={handleDuplicate} leftSection={<Copy size={16} color='#54515e' />}>
							<Text c={'#53545E'}>Duplicate</Text>
						</Menu.Item>
					)}
					<Menu.Item onClick={handleDelete} leftSection={<Trash size={16} color='#54515e' />}>
						<Text c={'#53545E'}>Delete</Text>
					</Menu.Item>
				</Stack>
			</Menu.Dropdown>
		</Menu>
	);
};

export default OptionsDropdown;
