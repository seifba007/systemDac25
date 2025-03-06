import React, { useState } from 'react';
import { Box, Flex, Text, Menu, Drawer, Button, Image, Burger } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import useResponsive from '@/presentation/shared/mediaQuery';
import {
  Category,
  Calendar,
  Box as SpareBox,
  DocumentText,
  Setting2,
  AddCircle,
  ArrowDown2,
} from 'iconsax-react';
import smollogo from '../../../../assets/smardac.png';
import { ADMIN } from '@/core/router/dashbord/paths';



// Helper Component for Menu Items
const NavbarItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  dropdownItems?: { label: string; path: string }[];
  path?: string;
  active: boolean;
  onNavigate: (path: string) => void;
  onClick?: () => void;
}> = ({ icon, label, dropdownItems, path, active, onNavigate, onClick }) => {
  const location = useLocation();

  const isDropdownActive = dropdownItems?.some(
    (item) => location.pathname === item.path
  );

  return (
    <Menu trigger="click-hover">
      <Menu.Target>
        <Box
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => {
            if (path) {
              onNavigate(path);
              if (onClick) onClick();
            }
          }}
        >
          {icon}
          <Flex gap="0.5em" align="center">
            <Text
              style={{
                color: active || isDropdownActive ? '#4254ba' : '#49526b',
                fontSize: '12px',
                fontWeight: 600,
                marginLeft: '0.5em',
              }}
            >
              {label}
            </Text>
            {dropdownItems && <ArrowDown2 size="11" />}
          </Flex>
        </Box>
      </Menu.Target>
      {dropdownItems && (
        <Menu.Dropdown>
          {dropdownItems.map((item, index) => {
            const isDisabled = !Object.values(ADMIN).includes(item.path);
            return (
              <Menu.Item
                key={index}
                p="0.3em"
                onClick={() => {
                  if (!isDisabled) {
                    onNavigate(item.path);
                    if (onClick) onClick();
                  }
                }}
                style={{
                  color: isDisabled ? '#d3d3d3' : location.pathname === item.path ? '#4254ba' : '#222',
                  pointerEvents: isDisabled ? 'none' : 'auto',
                }}
              >
                <Text
                  style={{
                    fontSize: '11px',
                    fontWeight: 500,
                  }}
                >
                  {item.label}
                </Text>
              </Menu.Item>
            );
          })}
        </Menu.Dropdown>
      )}
    </Menu>
  );
};

const SuperAdminNavbar: React.FC = () => {
  const [drawerOpened, setDrawerOpened] = useState(false);
  const { isMobile } = useResponsive();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: <Category size={15} color="#49526b" />, label: 'Dashboard Overview', path: '/Dashboard' },
    { icon: <Calendar size={15} color="#49526b" />, label: 'All Actions List', path: '/Actions-List' },
    {
      icon: <AddCircle size={15} color="#49526b" />,
      label: 'Create Reports',
      dropdownItems: [
        { label: 'Incident Reporting', path: '/Addl-Incident-Reporting' },
        { label: 'Investigation Documentation', path: '/Investigation-Documentation' },
        { label: 'Meeting Documentation', path: '/add-meeting-report' },
        { label: 'Risk Assessment', path: '/Risk-Assessment-Matrix' },
        { label: 'HAZOP Express', path: '/Hazop-Analysis' },
      ],
    },
    {
      icon: <SpareBox size={15} color="#49526b" />,
      label: 'Compliance & Policies',
      dropdownItems: [
        { label: 'Policy Management', path: '/Policy-Management' },
        { label: 'Certification Management', path: '/Certification-Management' },
        { label: 'Self-Assessment Creation', path: '/Self-Assessment-Creation' },
        { label: 'Audit Initiation', path: '/Audit-Initiation' },
      ],
    },
    {
      icon: <DocumentText size={15} color="#49526b" />,
      label: 'View Reports',
      dropdownItems: [
        { label: 'QHSE Reports List', path: '/QHSEReports-List' },
        { label: 'Meetings List', path: '/Meetings-List' },
        { label: 'Risk Assessments', path: '/Risk-Assessments' },
        { label: 'HAZOP Assessments', path: '/HAZOP-Assessments' },
        { label: 'Inspections', path: '/Inspections' },
        { label: 'Self-Assessments', path: '/Self-Assessments' },
        { label: 'Audits', path: '/Audits' },
      ],
    },
    {
      icon: <Setting2 size={15} color="#49526b" />,
      label: 'Settings & Support',
      dropdownItems: [
        { label: 'User Management', path: '/User-Management' },
        { label: 'Notification Settings', path: '/Notification-Settings' },
        { label: 'User Guide', path: '/User-Guide' },
        { label: 'Certificates Management', path: '/Certificates-Management' },
        { label: 'Reporter Master Settings', path: '/Reporter-Master-Settings' },
      ],
    },
  ];

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '1em',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
      }}
    >
      <Flex
        align="center"
        style={{
          width: '100%',
          justifyContent: isMobile ? 'space-between' : 'center',
        }}
      >
        {isMobile ? (
          <>
            <Flex pr="2em" align="center" justify="space-between">
              <Button
                variant="subtle"
                onClick={() => setDrawerOpened(true)}
                style={{
                  color: '#333',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Burger aria-label="Toggle navigation" />
              </Button>
              <Image src={smollogo} width="11%" />
            </Flex>

            <Drawer
              opened={drawerOpened}
              onClose={() => setDrawerOpened(false)}
              title={<Text fz="15px" fw="600">Menu</Text>}
              padding="md"
              size="sm"
            >
              <Flex direction="column" gap="2em" pt="1.5em">
                {menuItems.map((item, index) => (
                  <NavbarItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    dropdownItems={item.dropdownItems}
                    path={item.path}
                    active={location.pathname === item.path}
                    onNavigate={navigate}
                    onClick={() => setDrawerOpened(false)}
                  />
                ))}
              </Flex>
            </Drawer>
          </>
        ) : (
          <Flex gap="2em">
            {menuItems.map((item, index) => (
              <NavbarItem
                key={index}
                icon={item.icon}
                label={item.label}
                dropdownItems={item.dropdownItems}
                path={item.path}
                active={location.pathname === item.path}
                onNavigate={navigate}
              />
            ))}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default SuperAdminNavbar;