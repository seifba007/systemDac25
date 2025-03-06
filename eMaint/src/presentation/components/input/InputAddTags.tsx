import React, { ChangeEvent, useState } from 'react';
import { Flex, Text, rem } from '@mantine/core';
import { v4 as uuid } from 'uuid';
import { CloseCircle } from 'iconsax-react';

export type Tag = {
	id: string;
	value: string;
};

type Props = {
	tags: Tag[];
	setTags: (value: Tag[]) => void;
	label: string;
	placeholder: string;
};

const InputAddTags = ({ tags, setTags, label, placeholder }: Props) => {
	const [value, setValue] = useState('');

	const handleAddTag = (newTag: string) => {
		if (newTag === '') return;
		setTags([...tags, { id: uuid(), value: newTag }]);
		setValue('');
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};

	const handleDelete = (id: Tag['id']) => {
		const newTags = tags.filter((tag) => tag.id !== id);
		setTags(newTags);
	};

	return (
		<Flex direction={'column'} w={'100%'} gap={rem(10)}>
			<Text tt='uppercase' fz={rem(14)}>
				{label}
			</Text>
			<Flex w={'100%'} h={rem(48)} className='tags-input'>
				<input type='text' placeholder={placeholder} value={value} onChange={handleChange} />
				<button className='btn-hover ' type='button' onClick={() => handleAddTag(value)}>
					Add
				</button>
			</Flex>
			<Flex gap={rem(8)} wrap={'wrap'}>
				{tags.map((tag) => (
					<Flex
						key={tag.id}
						align={'center'}
						p={'0.4rem 1rem'}
						gap={rem(4)}
						style={{ borderRadius: '2rem' }}
						bg={'black.8'}
					>
						<Text fz={'0.75rem'}>{tag.value}</Text>
						<CloseCircle
							size='20'
							color='#53545E'
							variant='Bulk'
							style={{ cursor: 'pointer' }}
							onClick={() => handleDelete(tag.id)}
						/>
					</Flex>
				))}
			</Flex>
		</Flex>
	);
};

export default InputAddTags;
