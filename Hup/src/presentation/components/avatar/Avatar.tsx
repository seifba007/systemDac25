import React, { useEffect, useState } from 'react';
import { Button, Flex, Text } from '@mantine/core';

type AvatarProps = {
	fileUploaded: File | null | string | undefined;
	setFileUploaded: (fileUploaded: File | null) => void;
	width: string;
	height: string;
	showJPG?: boolean;
	children?: React.ReactNode;
	isEdit?: boolean;
};

const Avatar = ({
	fileUploaded,
	setFileUploaded,
	width,
	height,
	showJPG = true,
	children,
	isEdit = false,
}: AvatarProps) => {
	const [imageUp, setImageUp] = useState(false);
	const fileInputRef = React.useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (fileUploaded) setImageUp(true);
	}, [fileUploaded]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
		setFileUploaded(file);
	};

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<Flex mt='1rem' gap='1.25rem' wrap={'wrap'}>
			<Flex
				align='center'
				justify='center'
				w={width}
				h={height}
				bg='#EDF1FD'
				pos='relative'
				style={{ border: '1px dashed #2C74FF', borderRadius: '0.5rem' }}
			>
				{children}
				{imageUp && fileUploaded && (
					<div className='fileUp'>
						{fileUploaded instanceof File ? (
							<img src={URL.createObjectURL(fileUploaded)} alt='image_uploaded' />
						) : (
							<img
								src={isEdit ? `${fileUploaded}` : `data:image/jpeg;base64,${fileUploaded}`}
								alt='Image'
							/>
						)}
					</div>
				)}
			</Flex>
			<Flex align='center' justify='center'>
				<Flex direction='column' gap='0.25rem'>
					{showJPG ? (
						<Text size='0.8rem' fw={400} c='#53545E' mt='0.5rem'>
							JPG/PNG file{' '}
						</Text>
					) : null}
					<Text size='0.8rem' fw={400} c='#53545E' mt='0.5rem'>
						Minimum resolution: 300*300px
					</Text>
					<Text size='0.8rem' fw={400} c='#53545E' mt='0.5rem'>
						Maximum file size: 5 MB
					</Text>
					<Button onClick={handleButtonClick} bg={'blue.0'} mt='0.9rem' w={'6rem'}>
						<Text fz={14} fw={500}>
							Upload
						</Text>
					</Button>
					<input
						type='file'
						ref={fileInputRef}
						onChange={handleFileChange}
						accept='image/png,image/jpeg'
						style={{ display: 'none' }}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default Avatar;
