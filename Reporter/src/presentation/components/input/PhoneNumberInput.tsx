import countries from '@/data/countries';
import {
	Button,
	Combobox,
	Flex,
	Grid,
	Image,
	Input,
	ScrollArea,
	Text,
	useCombobox,
} from '@mantine/core';
import { ArrowDown2, SearchNormal1 } from 'iconsax-react';
import React, { useState } from 'react';
import { IMaskInput } from 'react-imask';

type CountryProps = {
	index: number;
	flag: string;
	code: string;
	mask: string;
	img: string;
};

type PhoneNumberInputProps = {
	selectedCountry: CountryProps;
	setSelectedCountry: (country: CountryProps) => void;
	setPhoneNumber: (phoneNumber: {
		code: string;
		number: string;
		mask: string;
		index: number;
		img: string;
	}) => void;
	phoneNumber: { code: string; number: string; index: number };
};

const PhoneNumberInput = ({
	selectedCountry,
	setSelectedCountry,
	setPhoneNumber,
	phoneNumber,
}: PhoneNumberInputProps) => {
	const [filteredCountries, setFilteredCountries] = useState(countries);

	console.log(phoneNumber);

	const handleCountrySelect = (country: CountryProps) => {
		setSelectedCountry(country);
		setPhoneNumber({
			code: country.code,
			number: '',
			mask: country.mask,
			index: country.index,
			img: country.img,
		});
	};

	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
	});

	const search = (search: string) => {
		const filteredCountries = countries.filter((item) => {
			const name = item.name.toLowerCase();
			const code = item.code.toLowerCase();
			const searchLowerCase = search.toLowerCase();
			return name.includes(searchLowerCase) || code.includes(searchLowerCase);
		});
		setFilteredCountries(filteredCountries);
	};

	const options = filteredCountries.map((item) => (
		<Combobox.Option value={item.code} key={item.name}>
			<Grid>
				<Grid.Col style={{ alignContent: 'center' }} span={2}>
					<Image
						src={`https://flagcdn.com/w20/${item.img}.png`}
						width={20}
						height={15}
						alt={item.img}
					/>
				</Grid.Col>
				<Grid.Col span={10}>
					<Flex gap={5} align='center'>
						<Text fz={14}>{item.name}</Text>
						<Text h='fit-content' style={{ textWrap: 'nowrap' }} fz={12}>
							({item.code})
						</Text>
					</Flex>
				</Grid.Col>
			</Grid>
		</Combobox.Option>
	));

	return (
		<div className='phone'>
			<Combobox
				store={combobox}
				onOptionSubmit={(val) => {
					const countryIndex = countries.findIndex((item) => item.code === val);
					if (countryIndex === -1) return;
					const country = countries[countryIndex];
					handleCountrySelect({ ...country, index: countryIndex });
					combobox.closeDropdown();
				}}
				width={250}
				variant='unstyled'
			>
				<Combobox.Target>
					<Button
						m='auto'
						px={10}
						h='100%'
						variant='white'
						onClick={() => combobox.toggleDropdown()}
					>
						{(() => {
							const country = countries.find((item) => item.code === selectedCountry.code);
							if (!country) return null;
							return (
								<Flex w='100%' gap={4} flex={1} align='center' justify='center'>
									<Image
										src={`https://flagcdn.com/w20/${country.img}.png`}
										width={20}
										height={15}
										alt={country.img}
									/>
									<ArrowDown2 size={14} color={'#919191'} />
								</Flex>
							);
						})()}
					</Button>
				</Combobox.Target>

				<Combobox.Dropdown>
					<Combobox.Search
						onChange={(event) => search(event.currentTarget.value)}
						placeholder='Search country'
						p={5}
						radius='sm'
						leftSection={
							<Flex m='auto'>
								<SearchNormal1 size={16} style={{ marginBottom: 1 }} />
							</Flex>
						}
						styles={{
							input: {
								margin: 'auto',
								width: '100%',
								borderRadius: 10,
								backgroundColor: '#fafafa',
								boxShadow: 'none',
								border: 'none',
							},
						}}
					/>
					<ScrollArea>
						<Combobox.Options mah={200}>{options}</Combobox.Options>
					</ScrollArea>
				</Combobox.Dropdown>
			</Combobox>
			<Input
				component={IMaskInput}
				mask={selectedCountry.mask}
				placeholder={selectedCountry.mask}
				w={'100%'}
				value={phoneNumber.number}
				onChange={(e) => {
					setPhoneNumber({
						code: selectedCountry.code,
						number: e.currentTarget.value,
						index: selectedCountry.index,
						mask: selectedCountry.mask,
						img: selectedCountry.img,
					});
				}}
				pl={10}
				leftSection={
					<Flex align='center' justify='center' h='100%'>
						<Text fz={12}>{selectedCountry.code}</Text>
					</Flex>
				}
			/>
		</div>
	);
};

export default PhoneNumberInput;
