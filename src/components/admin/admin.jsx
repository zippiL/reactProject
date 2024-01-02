import { Link, Outlet } from "react-router-dom";
import {Tab,  tabClasses,Tabs,TabList } from '@mui/joy';
import { Box, Chip } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

import { UserContext } from "../../App";
import BusinessDetails from "../general/businessDetails";

export default function Admin(){
    const handleLoginClick = () => {
        window.location.pathname='';
      };
    return(<>
    <UserContext.Provider value={{isAdmin: true}}>
    <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 2 }}>
                    <Chip icon={<PersonIcon />} label="logout" onClick={handleLoginClick} />
                    <BusinessDetails />
    </Box>
    <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: 'transparent' }}>
      <TabList
        disableUnderline
        sx={{
          p: 0.5,
          gap: 0.5,
          borderRadius: 'xl',
          bgcolor: 'background.level1',
          [`& .${tabClasses.root}[aria-selected="true"]`]: {
            boxShadow: 'sm',
            bgcolor: 'background.surface',
          },
        }}
      >
        <Tab disableIndicator component={Link} to="service">service</Tab>
        <Tab disableIndicator component={Link} to="meeting">meeting</Tab>
       
      </TabList>
    </Tabs>

<Outlet/>
    
    </UserContext.Provider>
    <footer >Copyright © FITFLEX by Zippi Lando 2024</footer>

    </>)
}