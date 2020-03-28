import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FindInPage from '@material-ui/icons/FindInPage';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter, Link } from 'react-router-dom';
// import Link from '@material-ui/core/Link'
import CircularProgress from '@material-ui/core/CircularProgress';
import Copyright from '../Copyright'

const linkStyles = makeStyles(() => ({
  navlink: {
    textDecoration: 'none',
    color: 'white'
  },
  navbarLink: {
    textDecoration: 'none',
    color: 'black'
  }
}
));

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ForgotPassword = (props) => {
  const classes = useStyles();
  const linkClasses = linkStyles();
  const [username, changeUsername] = useState('');
  const [isSubmitting, changeIsSubmiting] = useState(false);
  const [requestSubmitted, changeRequestSubmitted] = useState(false);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FindInPage />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        {requestSubmitted ?
          (<div>Check your email for a password reset email!</div>) : (
            <form className={classes.form} noValidate onSubmit={(e) => {
              e.preventDefault()
              changeIsSubmiting(true)
              props.handlePasswordReset(username).then(() => {
                changeRequestSubmitted(true)
              }).catch(err => {
                changeIsSubmiting(false)
              })
            }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => changeUsername(e.target.value)}
                value={username}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/login" variant="body2" className={linkClasses.navbarLink}>
                    Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

ForgotPassword.propTypes = {
  handlePasswordReset: PropTypes.func
}

export default withRouter(ForgotPassword);