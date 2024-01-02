import React, { useContext, useState } from 'react';
import { observer, useObserver } from 'mobx-react-lite';
import serviceStore from '../../store/serviceStore';
import ServiceItem from './serviceItem';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { toJS } from 'mobx';
import EditService from '../admin/editService';
import { AlertContext, UserContext } from '../../App';
import Snackbar from '@mui/material/Snackbar';
import { forwardRef } from "react";
import MuiAlert from '@mui/material/Alert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const Alert =forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const AllService = observer(() => {
  const admin = useContext(UserContext).isAdmin;

  const data = serviceStore.data;
  const [value, setValue] = useState(0);
  let arr = [];
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [bool, setBool]=useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleclickClose = () => {
    
    setOpen(false);
  };
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setBool(false);
    
};
  return (
    <>
    <Box
      sx={{
        maxWidth: '1150px',
        margin: '5px auto',
        [theme.breakpoints.between('sm', 'md')]: {
          maxWidth: '700px',
        },
        [theme.breakpoints.between('md', 'lg')]: {
          maxWidth: '900px',
        },
        [theme.breakpoints.between('lg', 'xl')]: {
          maxWidth: '1100px',
        },
        [theme.breakpoints.down('sm')]: {
          maxWidth: '400px',
        },
      }}
    >

      {admin && <Button onClick={handleClickOpen} variant="outlined" startIcon={<AddCircleOutlineIcon />}>add service</Button>}

      <Tabs
        value={value}
        onChange={(newValue) => setValue(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {data.map((service, index) => (
          <Tab key={index} label={<ServiceItem {...service} disabled />} />
        ))}
        {data.map((x) => arr.push(toJS(x.name)))}
        {console.log(arr)}
      </Tabs>

      {open &&<AlertContext.Provider value={{bool, setBool}}> <EditService handleClose={handleclickClose} open={open} /></AlertContext.Provider>}
      
    </Box>
    <Snackbar open={bool} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                The service was successfully added!
                </Alert>
            </Snackbar>

    </>

  );
});

export default AllService;
