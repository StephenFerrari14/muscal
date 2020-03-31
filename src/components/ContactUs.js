import React from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useLayoutStyles } from "../components/styles/LayoutStyles";

const ContactUs = () => {
  const classes = useLayoutStyles();
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
