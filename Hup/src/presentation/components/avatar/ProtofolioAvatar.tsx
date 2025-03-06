import { addUserAvatar } from '@/core/services/modulesServices/user.service';
import errorHandler from '@/core/services/requestServices/errorHandle';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { selectConnectedUser } from '@/core/store/modules/authSlice';
import { selectRootLoading } from '@/core/store/modules/rootSlice';
import { fetchAndSetConnectedUser } from '@/presentation/shared/fetchAndSetConnectedUser';
import { Avatar, Box, Button, Modal, Slider, Stack, Text, Title, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Edit2, Refresh } from 'iconsax-react';
import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import toast from 'react-hot-toast';

type ProtofolioAvatarProps = {
	width: string;
	isEdit?: boolean;
	isPointer?: boolean;
};

const PortfolioAvatar = ({ width, isEdit = false, isPointer }: ProtofolioAvatarProps) => {
	const currentUser = useAppSelector(selectConnectedUser);
	const [opened, { open, close }] = useDisclosure(false);
	const url = currentUser?.avatar ? currentUser?.avatar : null;
	const isRootLoading = useAppSelector(selectRootLoading);
	const dispatch = useAppDispatch();

	const [slideValue, setSlideValue] = useState(10);
	const [src, setSrc] = useState<string | null>(url);
	const [preview, setPreview] = useState<string | null>(url);

	const cropRef = useRef<AvatarEditor>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleInputClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();
		inputRef.current?.click();
	};

	const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setSrc(URL.createObjectURL(e.target.files[0]));
		}
	};

	const handleSave = async () => {
		if (cropRef.current) {
			// Check if the source is a local file (using object URLs created by `URL.createObjectURL`)
			if (src?.startsWith('blob:') || src?.startsWith('data:')) {
				const dataUrl = cropRef.current.getImage().toDataURL();
				const result = await fetch(dataUrl);
				const blob = await result.blob();

				setPreview(URL.createObjectURL(blob));
				const formData = new FormData();
				formData.append('avatar', blob);

				addUserAvatar(formData)
					.then(() => {
						toast.success('photo profile successfully updated');
						fetchAndSetConnectedUser(dispatch);
						close();
					})
					.catch(errorHandler);
			} else {
				toast.error('Please upload a new image to crop.');
			}
		}
	};

	return (
		<div className='avatar' style={{ cursor: isPointer ? 'pointer' : 'default' }}>
			<Avatar src={preview} alt="it's me" size={width} style={{ cursor: 'pointer' }} />
			{isEdit && (
				<div className='edit' onClick={open}>
					<Edit2 size='20' color='#fff' />
				</div>
			)}
			<Modal
				size={'30rem'}
				opened={opened}
				onClose={close}
				radius={'lg'}
				withCloseButton={false}
				centered
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 3,
				}}
			>
				<Title order={3} fz={'1.25rem'} fw={600}>
					Change your photo
				</Title>
				<Text fz={'0.75rem'} fw={400} c={'black.1'} mt={'0.5rem'}>
					We recommend to use a PNG, JPG, or JPEG image at least 300*300.
				</Text>

				<Stack justify='center' align='center' mt={rem(10)}>
					<Box w={rem(300)}>
						<AvatarEditor
							ref={cropRef}
							image={src || ''}
							crossOrigin='anonymous'
							style={{ width: '100%', height: '100%' }}
							border={50}
							borderRadius={150}
							color={[0, 0, 0, 0.8]}
							scale={slideValue / 10}
							rotate={0}
						/>
						<Slider
							min={10}
							max={50}
							style={{ margin: '0 auto', width: '80%', color: 'cyan' }}
							size='md'
							defaultValue={slideValue}
							value={slideValue}
							onChange={(value) => setSlideValue(value as number)}
						/>
					</Box>
				</Stack>
				<input
					type='file'
					accept='image/*'
					ref={inputRef}
					onChange={handleImgChange}
					style={{ display: 'none' }}
				/>
				<Button
					bg={'none'}
					c={'black.0'}
					mt={'2rem'}
					h={'3rem'}
					size='md'
					component='a'
					onClick={handleInputClick}
					style={{ border: '1px solid #BDC0C6' }}
					leftSection={<Refresh size='20' color='#000' />}
					fullWidth
				>
					Change photo
				</Button>
				<Button
					h={'3rem'}
					bg={'blue.0'}
					mt={'1rem'}
					onClick={handleSave}
					loading={isRootLoading}
					fullWidth
				>
					Save changes
				</Button>
			</Modal>
		</div>
	);
};

export default PortfolioAvatar;
