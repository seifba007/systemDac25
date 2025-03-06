import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import { Box, Modal, Slider, Button } from '@mantine/core';
import { AddCircle } from 'iconsax-react';

const boxStyle: React.CSSProperties = {
	width: '300px',
	height: '300px',
	display: 'flex',
	flexFlow: 'column',
	justifyContent: 'center',
	alignItems: 'center',
};

const modalStyle: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

interface CropperModalProps {
	src: string | null;
	modalOpen: boolean;
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setPreview: React.Dispatch<React.SetStateAction<string | null>>;
}

const CropperModal: React.FC<CropperModalProps> = ({
	src,
	modalOpen,
	setModalOpen,
	setPreview,
}) => {
	const [slideValue, setSlideValue] = useState(10);
	const cropRef = useRef<AvatarEditor>(null);

	//handle save
	const handleSave = async () => {
		if (cropRef.current) {
			const dataUrl = cropRef.current.getImage().toDataURL();
			const result = await fetch(dataUrl);
			const blob = await result.blob();
			setPreview(URL.createObjectURL(blob));
			setModalOpen(false);
		}
	};

	return (
		<Modal
			style={modalStyle}
			opened={modalOpen}
			onClose={() => setModalOpen(false)}
			overlayProps={{
				backgroundOpacity: 0.55,
				blur: 3,
			}}
		>
			<Box style={boxStyle}>
				<AvatarEditor
					ref={cropRef}
					image={src || ''}
					style={{ width: '100%', height: '100%' }}
					border={50}
					borderRadius={150}
					color={[0, 0, 0, 0.72]}
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
				<Box
					style={{
						display: 'flex',
						padding: '10px',
						border: '3px solid white',
						background: 'black',
					}}
				>
					<Button
						size='sm'
						style={{ marginRight: '10px', color: 'white', borderColor: 'white' }}
						variant='outline'
						onClick={() => setModalOpen(false)}
					>
						cancel
					</Button>
					<Button style={{ background: '#5596e6' }} size='sm' variant='filled' onClick={handleSave}>
						Save
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

const Cropper: React.FC = () => {
	const [src, setSrc] = useState<string | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handleInputClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		e.preventDefault();
		inputRef.current?.click();
	};

	const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setSrc(URL.createObjectURL(e.target.files[0]));
			setModalOpen(true);
		}
	};

	return (
		<>
			<header>
				<h1>React Avatar Cropper</h1>
				<hr />
			</header>
			<main className='container'>
				<CropperModal
					modalOpen={modalOpen}
					src={src}
					setPreview={setPreview}
					setModalOpen={setModalOpen}
				/>
				<a href='/' onClick={handleInputClick}>
					<AddCircle size='32' color='#FF8A65' />{' '}
				</a>
				<small>Click to select image</small>
				<input type='file' accept='image/*' ref={inputRef} onChange={handleImgChange} />
				<div className='img-container'>
					<img
						src={preview || ' https://www.signivis.com/img/custom/avatars/member-avatar-01.png'}
						alt=''
						width='200'
						height='200'
					/>
				</div>
			</main>
		</>
	);
};

export default Cropper;
