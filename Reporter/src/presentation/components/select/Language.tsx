import React from 'react';
import { Add, ArrowDown2, Trash } from 'iconsax-react';
import { Flex, Select, Text } from '@mantine/core';
import languageData from '@/data/languageData';
export type LanguageProficiency = {
	language: string | null;
	proficiency: string | null;
};

type LanguageProps = {
	languages: LanguageProficiency[];
	setLanguages: (languages: LanguageProficiency[]) => void;
};

const LangaugeData = languageData;
const Language = ({ languages, setLanguages }: LanguageProps) => {
	const addLanguage = () => {
		if (languages.length >= LangaugeData.length) return;
		setLanguages([...languages, { language: null, proficiency: null }]);
	};
	const handleLanguageChange = (index: number, value: LanguageProficiency['language']) => {
		const updatedLanguages = [...languages];
		updatedLanguages[index].language = value;
		setLanguages(updatedLanguages);
	};

	const handleProficiencyChange = (index: number, value: LanguageProficiency['proficiency']) => {
		const updatedLanguages = [...languages];
		updatedLanguages[index].proficiency = value;
		setLanguages(updatedLanguages);
	};

	const removeLanguage = (index: number) => {
		const updatedLanguages = [...languages];
		updatedLanguages.splice(index, 1);
		setLanguages(updatedLanguages);
	};
	return (
		<>
			{languages.map((language, index) => (
				<Flex key={index} justify='space-between' align='center' m='1rem 0 0'>
					<Select
						label='Language'
						placeholder='-Select-'
						data={LangaugeData}
						value={language.language}
						onChange={(value) => handleLanguageChange(index, value)}
						size='lg'
						w={{ base: '10rem', sm: '16.25rem' }}
						radius='0.5rem'
						rightSectionPointerEvents='none'
						rightSection={<ArrowDown2 size='20' color='#53545E' />}
						styles={{
							root: {
								position: 'relative',
								border: '1px solid #DFDFE4',
								borderRadius: '0.5rem',
							},
							input: {
								border: 'none',
							},
							label: {
								color: '#53545E',
								paddingLeft: '1rem',
								fontSize: '0.8rem',
								marginTop: '0.8rem',
							},
						}}
					/>
					<Select
						label='Proficiency'
						placeholder='-Select-'
						data={['Basic', 'Proficient', 'Fluent', 'Native']}
						value={language.proficiency}
						onChange={(value) => handleProficiencyChange(index, value)}
						size='lg'
						w={{ base: '10rem', sm: '16.25rem' }}
						radius='0.5rem'
						rightSectionPointerEvents='none'
						rightSection={<ArrowDown2 size='20' color='#53545E' />}
						styles={{
							root: {
								position: 'relative',
								border: '1px solid #DFDFE4',
								borderRadius: '0.5rem',
							},
							input: {
								border: 'none',
							},
							label: {
								color: '#53545E',
								paddingLeft: '1rem',
								fontSize: '0.8rem',
								marginTop: '0.8rem',
							},
						}}
					/>
					<Trash
						onClick={() => removeLanguage(index)}
						size='22'
						color='#828C98'
						cursor={'pointer'}
					/>
				</Flex>
			))}
			<Flex
				align='center'
				gap='0.75rem'
				mt='lg'
				mb='3.25rem'
				style={{ cursor: 'pointer' }}
				onClick={addLanguage}
			>
				<Add size='32' color='#2C74FF' />
				<Text size='1rem' fw={400} c='#2C74FF'>
					Add Language
				</Text>
			</Flex>
		</>
	);
};

export default Language;
