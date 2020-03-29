import React, { useState } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { withRouter, Link, Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useLinkStyles } from "../styles/LinkStyles";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignIn = function(props) {
  const classes = useStyles();
  const linkClasses = useLinkStyles();
  const localUsername = window.localStorage.getItem("mUser");
  const [username, changeUsername] = useState(
    localUsername ? localUsername : ""
  );
  const [password, changePassword] = useState("");
  const [isSubmitting, changeIsSubmitting] = useState(false);
  const [rememberMe, changeRememberMe] = useState(!!localUsername);
  const [redirectToReferrer, changeRedirect] = useState(false);

  const { from } = props.location.state || { from: { pathname: "/" } };

  if (redirectToReferrer) {
    return <Redirect to={from} />;
  }

  const handleSubmit = (username, password) => {
    changeIsSubmitting(true);
    props.authenticateUser(username, password).then(() => {
      if (rememberMe) {
        window.localStorage.setItem("mUser", username);
      } else {
        window.localStorage.removeItem("mUser");
      }
      changeRedirect(true);
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => {
            e.preventDefault();
            handleSubmit(username, password);
          }}
        >
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
            onChange={e => changeUsername(e.target.value)}
            value={username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => changePassword(e.target.value)}
            value={password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            checked={rememberMe}
            onChange={e => {
              changeRememberMe(e.target.checked);
              props.handlePersistChange(e.target.checked);
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Sign In"}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                to="/forgot"
                variant="body2"
                className={linkClasses.navbarLink}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/signup"
                variant="body2"
                className={linkClasses.navbarLink}
              >
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

SignIn.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  handlePersistChange: PropTypes.func.isRequired
};

export default withRouter(SignIn);
