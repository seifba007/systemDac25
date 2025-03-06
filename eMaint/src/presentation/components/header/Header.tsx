import React, { ReactNode } from 'react';
import {
	Box,
	Flex,
	Group,
	Text,
	Title,
	TitleOrder,
	rem,
	Button as MButton,
	Stack,
} from '@mantine/core';
import { Icons } from '@/assets/icons/Icons';
import { Button } from '../button';
import { Add } from 'iconsax-react';
import { useAppSelector } from '@/core/store/hooks';
import { selectDeviceWidth, selectRootLoading } from '@/core/store/modules/rootSlice';
import { TABLET_BREAKPOINT } from '@/utils/deviceBreakPoints';
import { CancelButton } from '../button/Button';
import Lottie from 'lottie-react';
import animationData from '@/../public/Animation.json';

type HeaderProps = {
	title: string;
	subtitle: string;
	order?: TitleOrder;
	mt?: number;
};
type LabelProps = Pick<HeaderProps, 'mt'> & {
	children: ReactNode;
};

type CongradulationsProps = {
	name: string;
	subtitle: string;
	onClick: () => void;
};

type AddBoxProps = {
	title: string;
	subtitle: string;
	children?: ReactNode;
	onClick?: () => void;
};

export const Header: React.FC<HeaderProps> = ({ title, subtitle, order = 1, mt = 1.5 }) => {
	const deviceWidth = useAppSelector(selectDeviceWidth);

	return (
		<>
			{deviceWidth < TABLET_BREAKPOINT ? (
				<Title order={order} size={order === 3 ? '1rem' : '1.35rem'} mt={`${mt}rem`}>
					{title}
				</Title>
			) : (
				<Title order={order} size={order === 3 ? '1.25rem' : '1.75rem'} mt={`${mt}rem`}>
					{title}
				</Title>
			)}

			{subtitle && (
				<Text size='0.9rem' fw={400} color='black.1' mt='0.5rem' lh={'lg'} component='div'>
					{subtitle}
				</Text>
			)}
		</>
	);
};

export const Label: React.FC<LabelProps> = ({ children, mt = 3 }) => {
	const deviceWidth = useAppSelector(selectDeviceWidth);

	return (
		<>
			{deviceWidth < TABLET_BREAKPOINT ? (
				<Title order={3} size={'1rem'} mt={`${mt}rem`}>
					{children}
				</Title>
			) : (
				<Title order={3} size={'1.25rem'} mt={`${mt}rem`}>
					{children}
				</Title>
			)}
		</>
	);
};

export const Congratulations = ({ name, subtitle, onClick }: CongradulationsProps) => {
	return (
		<div className='congratulations'>
			<div className='lottie-congrats-animation'>
				<Lottie animationData={animationData} loop={false} />
			</div>
			<h1>Congratulations!</h1>
			<p>{subtitle}</p>
			<Button name={name} onClick={onClick} maw={500} style={{ margin: '0 auto' }} />
		</div>
	);
};

export const AddBox = ({ title, subtitle, children, onClick }: AddBoxProps) => {
	return (
		<Box w={'100%'}>
			{children}
			<Flex
				direction={'column'}
				align={'center'}
				justify={'center'}
				p={'1.5rem 0 2rem'}
				w={'100%'}
				style={{ border: '1px solid #E6E6E6', borderRadius: '0.75rem' }}
			>
				<Flex
					align={'center'}
					justify={'center'}
					bg={'black.8'}
					w={'2.5rem'}
					h={'2.5rem'}
					onClick={onClick}
					style={{ borderRadius: '50%', cursor: 'pointer' }}
				>
					<Add size='20' color='#0A0C0E' />
				</Flex>
				<Title mt={'1rem'} order={3} fz={'1.25rem'} fw={500}>
					{title}
				</Title>
				<Text
					mt={'0.5rem'}
					fz={'1rem'}
					c={'#53545E'}
					style={{ textAlign: 'center' }}
					component='div'
					px={rem(12)}
				>
					{subtitle}
				</Text>
			</Flex>
		</Box>
	);
};

export const ProfileHeaderSection: React.FC<{
	isData: boolean;
	title: string;
	open: () => void;
	children: React.ReactNode;
}> = ({ isData, title, open, children }) => {
	return (
		<Group align='center' justify='space-between'>
			<Flex gap={'0.75rem'} mb={'2rem'} align={'center'}>
				{children}
				<Title order={3} fz={{ base: '1.25rem', sm: '1.75rem' }} fw={500}>
					{title}
				</Title>
			</Flex>
			{isData && (
				<Flex
					align={'center'}
					justify={'center'}
					bg={'black.8'}
					w={'2.5rem'}
					h={'2.5rem'}
					mb={'2rem'}
					onClick={open}
					style={{ borderRadius: '50%', cursor: 'pointer' }}
				>
					<Add size='20' color='#0A0C0E' />
				</Flex>
			)}
		</Group>
	);
};

interface HeaderModalProps {
	close: () => void;
	isDisabled: boolean;
	setIsUpdate?: React.Dispatch<
		React.SetStateAction<{
			isOnUpdate: boolean;
			itemId: string | null;
		}>
	>;
	setIsUpdateAndDuplicate?: React.Dispatch<
		React.SetStateAction<{
			isOnUpdate: boolean;
			isOnDuplicate: boolean;
			itemId: string | null;
		}>
	>;
	isLoading?: boolean | null;
}

export const HeaderModal = ({
	close,
	isDisabled,
	setIsUpdate,
	setIsUpdateAndDuplicate,
	isLoading = null,
}: HeaderModalProps) => {
	const isRootLoading = useAppSelector(selectRootLoading);

	return (
		<Flex justify={'space-between'} align={'center'} w={'100%'}>
			<Box>
				<Icons.blackLogo width={180} />
			</Box>
			<Flex gap={rem(10)} display={{ base: 'none', sm: 'flex' }}>
				<CancelButton
					onClick={() => {
						close();
						typeof setIsUpdate === 'function' && setIsUpdate({ itemId: null, isOnUpdate: false });
						typeof setIsUpdateAndDuplicate === 'function' &&
							setIsUpdateAndDuplicate({ itemId: null, isOnUpdate: false, isOnDuplicate: false });
					}}
				/>
				<MButton
					type='submit'
					form='my-form'
					disabled={isDisabled}
					loading={isLoading !== null ? isLoading : isRootLoading}
				>
					Save
				</MButton>
			</Flex>
		</Flex>
	);
};

export const RenderHtml = ({ text }: { text: string }) => {
	const renderHtmlWithStyles = () => {
		return { __html: text };
	};

	return <div className='custom-html' dangerouslySetInnerHTML={renderHtmlWithStyles()} />;
};

export const BottomModalForMobile = ({
	setIsUpdate,
	disabled,
}: Pick<HeaderModalProps, 'setIsUpdate'> & { disabled?: boolean }) => {
	const isRootLoading = useAppSelector(selectRootLoading);

	return (
		<Stack gap={rem(10)} display={{ base: 'flex', sm: 'none' }}>
			<CancelButton
				size='md'
				onClick={() => {
					close();
					typeof setIsUpdate === 'function' && setIsUpdate({ itemId: null, isOnUpdate: false });
				}}
			/>
			<MButton size='md' disabled={disabled} type='submit' form='my-form' loading={isRootLoading}>
				Save
			</MButton>
		</Stack>
	);
};
