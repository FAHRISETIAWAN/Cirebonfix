
import { AppBar, Toolbar, IconButton, Typography, Grid } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoImage from './sie2.png'; 

const Header = () => {


  return (
    <AppBar position="sticky" style={{ top: 0,background: '#304ffe' }}>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={8}>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <img src={LogoImage} alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
              </Grid>
              <Grid item>
                <Typography variant="h6" component="div">
                Kab.Cirebon
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
       
            <Typography variant="h6" component="div">
                  Admin
                </Typography>
                <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
