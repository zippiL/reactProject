import React, { useState } from "react";
import {  CardMedia, CardContent, Typography, Box, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import businessStore from "../../store/businessStore";
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import { UserContext } from "../../App";
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EditBusinessDetails from "../admin/editBusinessDetails";

const BusinessDetails = observer(() => {
    const admin = useContext(UserContext).isAdmin;

    const businessDetails = businessStore.data;
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClickClose = () => {
        setOpen(false);
    }
    return (

        <Box sx={{
            display: 'flex',
            flexDirection: 'row', 
           
            margin: 'auto', 
            marginBottom: '20px', 
        }}>
            <CardMedia
                component="img"
                sx={{ width: 161 }}
                image={businessDetails.logo}
                alt="Business Logo"
            />


            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardContent >
                    <Typography component="div" variant="h5" sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: '2rem' }}>
                        {businessDetails.name}
                    </Typography>
                    <Typography component="div" variant="h5" sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: '1rem' }}>
                    {businessDetails.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'colum' }}>
                    <Typography level="body-xs" fontWeight="lg" >
                            <PersonIcon />
                        </Typography>
                        <Typography  fontWeight="lg">{businessDetails.owner} </Typography>
                        <Typography level="body-xs" fontWeight="lg">
                            <LocationOnIcon />
                        </Typography>
                        <Typography  fontWeight="lg">{businessDetails.address}</Typography>
                        <Typography level="body-xs" fontWeight="lg">
                            <PhoneIcon />
                        </Typography>
                        <Typography fontWeight="lg">{businessDetails.phone}</Typography>
                        </Box>
                </CardContent>
            </Box>
            {admin && <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={handleClickOpen}
                sx={{
                    alignSelf: 'flex-end', 
                    mt: 1, 
                }}
            >
                Edit
            </Button>}

            {open && <EditBusinessDetails handleClose={handleClickClose} open={open} />}
        </Box >

    );
});

export default BusinessDetails;
