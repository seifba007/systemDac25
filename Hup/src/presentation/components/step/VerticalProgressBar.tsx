import React from 'react';

interface VerticalProgressBarProps {
	progress: number;
}

const VerticalProgressBar = ({ progress }: VerticalProgressBarProps) => {
	return (
		<div className='vertical-progress-bar'>
			<div className='progress' style={{ height: `${progress}%` }}></div>
		</div>
	);
};

export default VerticalProgressBar;
