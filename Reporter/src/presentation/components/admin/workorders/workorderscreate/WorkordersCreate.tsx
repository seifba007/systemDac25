import { Stack, Text } from '@mantine/core'
import React from 'react'

const WorkordersCreate = () => {
  return (
       <Stack>
          <Text style={{textOverflow:'ellipsis',overflow:'hidden',whiteSpace: "nowrap"}} ff={'"Roboto",sans-serif'} fw={'700'} c={'#6c757d'} fz={'18px'}>
          Workorders Management
          </Text>
          </Stack>
  )
}

export default WorkordersCreate
