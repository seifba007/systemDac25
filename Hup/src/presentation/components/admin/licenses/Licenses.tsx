import useResponsive from '@/presentation/shared/mediaQuery';
import { Autocomplete, Flex, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import SkeletonLoader from '../../boxtableglobal/skeletonLoader';
import { ArrowDown2 } from 'iconsax-react';
import CreationApps from '../../modal/CreationApps';
import BoxLicenses from './BoxLicenses';
import { ListOptions } from '@/core/entities/http.entity';
import { getOrganizations } from '@/core/services/modulesServices/organizations.service';
import { getUsers } from '@/core/services/modulesServices/user.service';

const Licenses = () => {
  const { isMobile } = useResponsive();
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tabValue, setTabValue] = useState<string>('all');
  const [sortValue, setSortValue] = useState<string>('');
  const [openModel, setOpenModel] = useState<boolean>(true);

  const getOrganization = () => {
    const options: ListOptions['options'] = {};
    getOrganizations({ options })
      .then((res) => {
        setOrganization(res.data.organizations);
        if (res.data.organizations && res.data.organizations.length > 0) {
          setTitle(res.data.organizations[0].name);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching organizations:', error);
      });
  };

  const getUsersData = () => {
    const options: ListOptions['options'] = {};
    getUsers({ options })
      .then((res) => {
        setUsers(res.data.users);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('Error fetching users:', error);
      });
  };

  const [organization, setOrganization] = useState<any>();
  const [users, setUsers] = useState<any>();
  const [title, setTitle] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getOrganization();
    getUsersData();
  }, []);

  const organizationOptions =
    organization?.map((org: { id: string; name: string }) => ({
      value: org.name,
      label: org.name,
    })) || [];

  // Find the selected organization based on title
  const selectedOrg = organization?.find((org: { name: string }) => org.name === title);

  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <Stack>
      <Flex justify={'space-between'} style={{ flexWrap: 'wrap' }}>
        <Text
          pb={isMobile ? '1em' : '0em'}
          style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
          ff={'"Roboto",sans-serif'}
          fw={'700'}
          c={'#6c757d'}
          fz={'18px'}
        >
          License Management
        </Text>

        <Autocomplete
          value={title}
          onChange={setTitle}
          rightSectionPointerEvents='none'
          rightSection={<ArrowDown2 size='16' color='#6c757d' />}
          data={organizationOptions.length > 0 ? organizationOptions : ['']}
          placeholder='Select a title'
        />
      </Flex>
      <BoxLicenses
          getUsers={getUsersData}
				  titl={title}
				  totalCount={users?.length || 0}
				  currentPage={currentPage}
				  resultsPerPage={resultsPerPage}
				  setCurrentPage={setCurrentPage}
				  setResultsPerPage={setResultsPerPage}
				  users={users || []} // Pass users data
				  availableApps={selectedOrg?.availableApps || []} // Pass available apps from selected organization
				  isResponsive={false}      />
    </Stack>
  );
};

export default Licenses;