import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { useAppSelector } from '../../app/hooks';
import { selectCurrentUser } from '../users/usersSlice';

const Header: React.FC = () => {

    const currentUser = useAppSelector(selectCurrentUser);

    return ( 
      <Box sx={{ marginBottom: '20px' }}>
        <AppBar sx={{ backgroundColor: '#2c3640' }} position="static">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              {currentUser.name}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
}

export default Header;
