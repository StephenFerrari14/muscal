import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useLinkStyles } from "./styles/LinkStyles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Header = props => {
  const classes = useStyles();
  const linkClasses = useLinkStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    props.handleSignOut();
  };
  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              onClick={handleClick}
              className={classes.menuButton}
            >
              <MenuIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  color="inherit"
                  to="/calendar"
                  className={linkClasses.navbarLink}
                >
                  Calendar
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  color="inherit"
                  to="/contact"
                  className={linkClasses.navbarLink}
                >
                  Contact Us
                </Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
            <Typography variant="h6" className={classes.title}>
              <Link
                color="inherit"
                to="/calendar"
                className={linkClasses.navlink}
              >
                Muscal
              </Link>
            </Typography>
            {props.hasSignedIn ? (
              <Button color="inherit" onClick={props.handleSignOut}>
                Logout
              </Button>
            ) : (
              <Button color="inherit">
                <Link
                  color="inherit"
                  to="/login"
                  className={linkClasses.navlink}
                >
                  Sign In
                </Link>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </Fragment>
  );
};

Header.propTypes = {
  handleSignOut: PropTypes.func,
  hasSignedIn: PropTypes.bool
};

export default withRouter(Header);
