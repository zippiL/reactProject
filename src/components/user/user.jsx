import { useState,forwardRef } from "react";

import { Button, Chip, Box, Snackbar} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonIcon from '@mui/icons-material/Person';

import MuiAlert from '@mui/material/Alert';
import BusinessDetails from "../general/businessDetails";
import MadeMetting from "./madeMettihng";
import AllService from "../general/allServices";
import { AlertContext, UserContext } from '../../App';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function User() {
    const [open, setOpen] = useState(false);
    const [bool, setBool] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickClose = () => {
        setOpen(false);
    };
    const handleLoginClick = () => {
        window.location.pathname = 'Login';
    };
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setBool(false);

    };
    return (<>
        <UserContext.Provider value={{ isAdmin: false }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 2 }}>
                <Chip icon={<PersonIcon />} label="login" onClick={handleLoginClick} />
                <BusinessDetails />
            </Box>
            <Button onClick={handleClickOpen} startIcon={<AddCircleOutlineIcon />} variant="outlined">Make an appointment</Button>
            {open && <AlertContext.Provider value={{ bool, setBool }}> <MadeMetting open={open} handleClose={handleClickClose} /></AlertContext.Provider>}
            <AllService />
        </UserContext.Provider>
        <Snackbar open={bool} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
                The meeting was recorded in the system
            </Alert>
        </Snackbar>
        <footer >Copyright © FITFLEX by Zippi Lando 2024</footer>
    </>)
}