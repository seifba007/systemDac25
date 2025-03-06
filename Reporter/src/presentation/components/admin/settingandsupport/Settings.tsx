import { ActionIcon, Button, Divider, FileInput, Flex, MultiSelect, Paper, Stack, Table, Text, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import useResponsive from '@/presentation/shared/mediaQuery';
import { DocumentDownload, Eye, ProfileAdd, TickCircle, Trash } from 'iconsax-react';

const Settings = () => {
  const { isMobile } = useResponsive();
const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    !isLoading ? (
      <SkeletonLoader />
    ) :(
    <Stack>
      <Text style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace: "nowrap"}} ff={'"Roboto",sans-serif'} fw={'700'} c={'#6c757d'} fz={'18px'}>
      Settings
      </Text>
      <Paper shadow="xs" p="xl">
   <Stack>
   <Text pb={'1em'} ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'15px'}>
      Common Information
      </Text>
         <MultiSelect  checkIconPosition="right"
      w={'30%'}
      label={  <Text pb={'0.5em'} ff={'"Roboto",sans-serif'}  c={'#6c757d'} fz={'12px'}>
      Business Departements
      </Text>}
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      defaultValue={['React']}
      clearable
    />

<TextInput
      label={  <Text pb={'0.5em'} ff={'"Roboto",sans-serif'}  c={'#6c757d'} fz={'12px'}>
     Incident Report Prefix
      </Text>}
        placeholder="Incident Report Prefix"
        inputWrapperOrder={['label', 'error', 'input', 'description']}
      />

      <Flex justify={'space-between'}>
         <MultiSelect  checkIconPosition="right"
      w={'49%'}
      label={  <Text pb={'0.5em'} ff={'"Roboto",sans-serif'}  c={'#6c757d'} fz={'12px'}>
      Report Classification
      </Text>}
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      defaultValue={['React']}
      clearable
    />
       <MultiSelect  checkIconPosition="right"
      w={'49%'}
      label={  <Text pb={'0.5em'} ff={'"Roboto",sans-serif'}  c={'#6c757d'} fz={'12px'}>
       Service QualityHSEBoth
       Report Type
      </Text>}
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      defaultValue={['React']}
      clearable
    />

      </Flex>
   </Stack>
    </Paper>


    <Paper shadow="xs" p="xl">
   <Stack>
   <Text pb={'1em'} ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'15px'}>
   Meeting
      </Text>
         <MultiSelect  checkIconPosition="right"
      w={'30%'}
      label={  <Text pb={'0.5em'} ff={'"Roboto",sans-serif'}  c={'#6c757d'} fz={'12px'}>
      Meeting Report Prefix
      </Text>}
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      defaultValue={['React']}
      clearable
    />

<TextInput
      label={  <Text pb={'0.5em'} ff={'"Roboto",sans-serif'}  c={'#6c757d'} fz={'12px'}>
    Meeting Locations
      </Text>}
        placeholder="Meeting Report Prefix"
      />

      <Flex justify={'space-between'}>
         <MultiSelect  checkIconPosition="right"
      w={'49%'}
      label={  <Text pb={'0.5em'} ff={'"Roboto",sans-serif'}  c={'#6c757d'} fz={'12px'}>
    Meeting Types
      </Text>}
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      defaultValue={['React']}
      clearable
    />
       <MultiSelect
    checkIconPosition="right"
      w={'49%'}
      label={  <Text pb={'0.5em'} ff={'"Roboto",sans-serif'}  c={'#6c757d'} fz={'12px'}>
    Meeting Locations
      </Text>}
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      defaultValue={['React']}
      clearable
    />

      </Flex>
   </Stack>
    </Paper>
    <Paper shadow="xs" p="xl">
   <Stack>
   <Text pb={'1em'} ff={'"Roboto",sans-serif'} fw={'600'} c={'#6c757d'} fz={'15px'}>
   HAZOP

      </Text>
 

<TextInput
      label={  <Text pb={'0.5em'} ff={'"Roboto",sans-serif'}  c={'#6c757d'} fz={'12px'}>
   HAZOP Report Prefix
      </Text>}
        placeholder="Meeting Report Prefix"
      />

      <Flex justify={'space-between'}>
         <MultiSelect  checkIconPosition="right"
      w={'49%'}
      label={  <Text pb={'0.5em'} ff={'"Roboto",sans-serif'}  c={'#6c757d'} fz={'12px'}>
    HAZOP Parameters
      </Text>}
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      defaultValue={['React']}
      clearable
    />
       <MultiSelect  checkIconPosition="right"
      w={'49%'}
      label={  <Text pb={'0.5em'} ff={'"Roboto",sans-serif'}  c={'#6c757d'} fz={'12px'}>
    HAZOP Deviations
      </Text>}
      placeholder="Pick value"
      data={['React', 'Angular', 'Vue', 'Svelte']}
      defaultValue={['React']}
      clearable
    />

      </Flex>
   </Stack>
    </Paper>
 <Flex  justify={'end'}>
 <Button><Text fz={'12px'}>
    Save Settings
      </Text></Button>
 </Flex>
    </Stack>)
  )
}

export default Settings
