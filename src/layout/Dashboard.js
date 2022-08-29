/* eslint-disable no-unused-vars */
import Side from "../navigation/Side";
import Header from "../navigation/Header";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  }, 
 
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  
 
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header/>
      <Side/>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
   {props.children}
        </Container>
      </main>
    </div>
  );
}
/* eslint-disable no-unused-vars */