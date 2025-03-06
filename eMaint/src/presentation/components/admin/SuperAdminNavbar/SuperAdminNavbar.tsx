import React, { useState } from 'react';
import { Box, Flex, Text, Menu, Drawer, Button, Image, Burger } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';
import useResponsive from '@/presentation/shared/mediaQuery';
import {
  Category,
  Calendar,
  Buildings2,
  Box as SpareBox,
  DocumentText,
  Setting2,
  Menu as HamburgerMenu,
  ArrowDown2,
} from 'iconsax-react';
import smollogo from '../../../../assets/smardac.png';

// Helper Component for Menu Items
const NavbarItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  dropdownItems?: { label: string; path: string }[];
  path?: string; // Path should be optional
  active: boolean;
  onNavigate: (path: string) => void;
  onClick?: () => void;
}> = ({ icon, label, dropdownItems, path, active, onNavigate, onClick }) => {
  const location = useLocation(); // To check the current path

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
              if (onClick) onClick(); // Close the drawer if onClick is provided
            }
          }}
        >
          {icon}
          <Flex gap="0.5em" align="center">
            <Text
              c={active || isDropdownActive ? '#4254ba' : '#49526b'}
              fz="12px"
              fw="600"
              ml="0.5em"
            >
              {label}
            </Text>
            {dropdownItems && <ArrowDown2 size="11" />}
          </Flex>
        </Box>
      </Menu.Target>
      {dropdownItems && (
        <Menu.Dropdown>
          {dropdownItems.map((item, index) => (
            <Menu.Item
              key={index}
              p={'0.4em'}
              onClick={() => {
                onNavigate(item.path);
                if (onClick) onClick(); // Close the drawer after navigation
              }}
            >
              <Text
                c={location.pathname === item.path ? '#4254ba' : '#6c757d'}
                fz="12px"
                fw="500"
              >
                {item.label}
              </Text>
            </Menu.Item>
          ))}
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
    { icon: <Category size={15} color="#49526b" />, label: 'Dashboard', path: '/Dashboard' },
    {
      icon: <Calendar size={15} color="#49526b" />,
      label: 'Work Orders',
      dropdownItems: [
        { label: 'Work Order Planner', path: '/work-orders/create' },
        { label: 'View Work Orders', path: '/work-orders' },
      ],
    },
    {
      icon: <Buildings2 size={15} color="#49526b" />,
      label: 'Assets Management',
      dropdownItems: [
        { label: 'Add New Asset', path: '/assets/add' },
        { label: 'View All Assets', path: '/view-assets' },
      ],
    },
    {
      icon: <SpareBox size={15} color="#49526b" />,
      label: 'Spare Parts & Inventory',
      dropdownItems: [
        { label: 'View Spare Parts', path: '/spareparts' },
        { label: 'Add New Spare Part', path: '/sparepart/add' },
        { label: 'Upload Parts List', path: '/sparepart/BulkAdd' },
        { label: 'Store Management', path: '/spareparts/store-management' },
      ],
    },
    {
      icon: <DocumentText size={15} color="#49526b" />,
      label: 'Documents Management',
      dropdownItems: [
        { label: 'Procedures & Checklists', path: '/procedures' },
        { label: 'Add New Procedure', path: '/procedure/add' },
        { label: 'Manage Documents', path: '/Documents' },
        { label: 'Add New Document', path: '/Documents/create-document' },
      ],
    },
    {
      icon: <Setting2 size={15} color="#49526b" />,
      label: 'Reports & Settings',
      dropdownItems: [
        { label: 'Add New Location', path: '/add-location' },
        { label: 'View Locations', path: '/Locations' },
        { label: 'Add New Supplier', path: '/add-supplier' },
        { label: 'Suppliers Management', path: '/suppliers' },
      ],
    },
  ];

  // Function to close the drawer
  const closeDrawer = () => setDrawerOpened(false);

  return (
    <Box
      className="navbar"
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
          width: '150%',
          justifyContent: isMobile ? 'space-between' : 'center',
        }}
      >
        {isMobile ? (
          <>
            {/* Hamburger Menu for Small Screens */}
            <Flex pr={'2em'} align={'center'} justify={'space-between'}>
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
              <Image src={smollogo} w={'11%'} />
            </Flex>

            <Drawer
              opened={drawerOpened}
              onClose={() => setDrawerOpened(false)}
              title={<Text fz={'15px'} fw={'600'}>Menu</Text>}
              padding="md"
              size="sm"
            >
              <Flex direction={'column'} gap={'2em'} pt={'1.5em'}>
                {menuItems.map((item, index) => (
                  <NavbarItem
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    dropdownItems={item.dropdownItems}
                    path={item.path} // Only pass path if it's defined
                    active={location.pathname === item.path}
                    onNavigate={navigate}
                    onClick={closeDrawer} // Close the drawer after navigation
                  />
                ))}
              </Flex>
            </Drawer>
          </>
        ) : (
          // Horizontal Menu for Large Screens
          <Flex gap="2em">
            {menuItems.map((item, index) => (
              <NavbarItem
                key={index}
                icon={item.icon}
                label={item.label}
                dropdownItems={item.dropdownItems}
                path={item.path} // Only pass path if it's defined
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
