import React from 'react';
import { Input } from '@mantine/core';
import { SearchNormal1 } from 'iconsax-react';
import useResponsive from '@/presentation/shared/mediaQuery';

interface SearchInputProps {
	onSearch: (query: string) => void;
	setCurrentPage?: (page: number) => void;
	searchQuery: string;
	placeholder: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
	onSearch,
	placeholder,
	setCurrentPage,
	searchQuery,
}) => {
	const { isMobile } = useResponsive();

	return (
		//search input
		
			<Input
				placeholder={placeholder}
				w={isMobile?'auto':'300px'}
				leftSection={<SearchNormal1 size='15' color='#686F7C' />}
				className='input-element'
				onChange={(e: any) => {
					onSearch(e.target.value);
					if (setCurrentPage) {
						setCurrentPage(1);
					}
				}}
				value={searchQuery}
			/>

	);
};

export default SearchInput;
