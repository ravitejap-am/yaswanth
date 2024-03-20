
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import './Index.css'
import { Link } from 'react-router-dom';

const AddOrganisationheaders = (props) => {
   const { activeSection, setActiveSection} = props

    return(
        <AppBar position="static"  className="navbar" style={{backgroundColor: '#ffffff'}}>
        <Toolbar className="toolbar">
          <Box sx={{ flexGrow: 1 }}>
            <Button component={Link} to="/organisationInfo" className="button"
            onClick={() => setActiveSection('organisationInfo')}
            >Organisation Info</Button>
            <Button 
                component={Link} 
                to="/organisationAdmin"     
                className="button"
                onClick={() => setActiveSection('organisationAdmin')}
                >Organisation Admin</Button>
            <Button 
                component={Link}    
                to="/organisationDomains" 
                className="button"
                onClick={() => setActiveSection('organisationDomains')}
                >Organisation Domains</Button>
            <Button 
                component={Link} 
                to="/subscriptionPlans" 
                className="button"
                onClick={() => setActiveSection('subscriptionPlans')}
                >Subscription Plans</Button>
          </Box>
        </Toolbar>
      </AppBar>
    )

}

export default AddOrganisationheaders;