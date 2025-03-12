import { AspectRatio } from '@mantine/core';
import React from 'react';
import { useParams } from 'react-router-dom';

const Apploader = () => {
	const { id } = useParams();
	console.log(id);
	return (
		<div>
			<AspectRatio>
				<iframe
					src={'http://' + id}
					title='YouTube video player'
					style={{ border: 0, height: '100vh' }}
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
				/>
			</AspectRatio>
		</div>
	);
};

export default Apploader;
