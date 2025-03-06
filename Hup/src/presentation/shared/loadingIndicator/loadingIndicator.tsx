import React from 'react';
// import { useAppSelector } from '../../../core/store/hooks';
// import { selectRootLoading } from '../../../core/store/modules/rootSlice';
import './loadingIndicator.scss';
import animationData from '@/../public/lottieanimation.json';
import Lottie from 'lottie-react';

const LoadingIndicator = () => {
	return (
		<div className={'rootLoaderMainContainer'}>
			<Lottie animationData={animationData} loop={true} />
		</div>
	);
};

export default LoadingIndicator;
