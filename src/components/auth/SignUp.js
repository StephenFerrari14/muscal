import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Toll from "@material-ui/icons/TollOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useLinkStyles } from "../styles/LinkStyles";
import { useLayoutStyles } from "../styles/LayoutStyles";


export default function SignUp(props) {
  const classes = useLayoutStyles();
  const linkClasses = useLinkStyles();

  const [email, onChangeEmail] = useState();
  const [password, onChangePassword] = useState();
  const [isSubmitting, changeIsSubmitting] = useState(false);

  const handleChangeEmail = (e) => {
    onChangeEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    onChangePassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    changeIsSubmitting(true);
    props
      .createNewUser(email, password)
      .then(() => {
        window.location.pathname = "/login";
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Toll />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              Sign up for Muscal and start recording your exercises today!
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleChangeEmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleChangePassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Sign Up"}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                to="/login"
                variant="body2"
                className={linkClasses.navbarLink}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
