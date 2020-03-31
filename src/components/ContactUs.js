import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  top: {
    paddingTop: "20px",
  },
}));

const ContactUs = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.paper}>Contact us at contact@headdesk.us</div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
