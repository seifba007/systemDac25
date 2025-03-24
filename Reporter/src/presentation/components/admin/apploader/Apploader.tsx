import { AspectRatio } from '@mantine/core';
import React from 'react';

const Apploader = () => {
	return (
		<div>
			<AspectRatio>
				<iframe
					src='http://localhost:8000'
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
