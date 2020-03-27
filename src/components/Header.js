import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Link from "@material-ui/core/Link";

const classes = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: '10px',
  },
  title: {
    flexGrow: 1,
  },
};

const Header = (props) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Link color="inherit" href="/calendar">Muscal</Link>
        </Typography>
        {props.hasSignedIn ? <Button color="inherit" onClick={props.handleSignOut}>Sign Out</Button> : <Button color="inherit" ><Link color="inherit" href="/signin">Sign In</Link></Button>}
        <Button color="inherit" ><Link color="inherit" href="/contact">Contact Us</Link></Button>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  handleSignOut: PropTypes.func,
  hasSignedIn: PropTypes.bool
}

export default Header;

