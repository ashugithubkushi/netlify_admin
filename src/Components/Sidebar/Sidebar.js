import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useLocation, useNavigate } from 'react-router-dom';

import DashboardIconOutlined from '@mui/icons-material/DashboardOutlined';
import AssignmentIconOutlined from '@mui/icons-material/AssignmentOutlined';

import './Sidebar.css'


import { DirectionsCarOutlined, Person2Outlined} from '@mui/icons-material'; // Importing icons


const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
 

  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  

  if (location.pathname === "/") {
    return null;
  }


return (
<Box
  sx={{
    display: 'flex',
    backgroundColor: '#f0f0f0', // Background color
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    // Add any other CSS properties you need
  }}
>
  <CssBaseline />
  <Drawer variant="permanent" open={open}>
    {/* DrawerHeader component is assumed */}
    <DrawerHeader>
      {/* Toggle button */}
      <IconButton onClick={() => setOpen(!open)}>
        {open ? <MenuIcon /> : <MenuIcon />}
      </IconButton>
    </DrawerHeader>
    <Divider/>
    <List>
      {/* Dashboard */}
      <ListItem
        disablePadding
        sx={{
          display: 'block',
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
        }}
        onClick={() => {
          navigate("/dashboard");
        }}
        selected={location.pathname === "/dashboard"}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&.Mui-selected': {
              color: '#926c9a',
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              margin: 0,
              padding: 0,
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              color: location.pathname === "/dashboard" ? '#926c9a' : '#000',
            }}
          >
            <DashboardIconOutlined />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1" fontWeight="bold" fontSize={"1.0rem"}>Dashboard</Typography>}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>

      {/* Adminbookings */}
      <ListItem
        disablePadding
        sx={{
          display: 'block',
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
        }}
        onClick={() => {
          navigate("/Adminbookings");
        }}
        selected={location.pathname === "/Adminbookings"}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&.Mui-selected': {
              color: '#926c9a',
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              margin: 0,
              padding: 0,
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              color: location.pathname === "/Adminbookings" ? '#926c9a' : '#000',
            }}
          >
            <AssignmentIconOutlined />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1" fontWeight="bold" fontSize={"1.0rem"}>Booked Slots</Typography>}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>

      {/* VehiclesList */}
      <ListItem
        disablePadding
        sx={{
          display: 'block',
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
        }}
        onClick={() => {
          navigate("/VehiclesList");
        }}
        selected={location.pathname === "/VehiclesList"}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&.Mui-selected': {
              color: '#926c9a',
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              margin: 0,
              padding: 0,
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              color: location.pathname === "/VehiclesList" ? '#926c9a' : '#000',
            }}
          >
            <DirectionsCarOutlined />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1" fontWeight="bold" fontSize={"1.0rem"}>Add vehicles</Typography>}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>

      {/* Users */}
      <ListItem
        disablePadding
        sx={{
          display: 'block',
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
        }}
        onClick={() => {
          navigate("/Users");
        }}
        selected={location.pathname === "/Users"}
      >
        <ListItemButton
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            '&:hover': {
              backgroundColor: 'transparent',
            },
            '&.Mui-selected': {
              color: '#926c9a',
              backgroundColor: 'rgba(0, 0, 0, 0.08)',
              margin: 0,
              padding: 0,
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
              color: location.pathname === "/Users" ? '#926c9a' : '#000',
            }}
          >
            <Person2Outlined />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body1" fontWeight="bold" fontSize={"1.0rem"}>Add Users</Typography>}
            sx={{ opacity: open ? 1 : 0 }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  </Drawer>
</Box>

);
}


