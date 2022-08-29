/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import bg from "../images/bg.jpg";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import svg from "../images/my.svg"



const useStyles = makeStyles((theme) => ({
  root: {
    height: "80hv",
    marginTop: "30px",
  },
  
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
  },
  
}));


export default function SignUpSide() {

const classes=useStyles();


  return (
    <div className="w-2/3 h-96 ml-52">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
         <Grid item xs={12} >
         <Paper elevation={3} className="mt-28" >
           <div className="flex">
           <img src={svg} alt="" className="sm:w-52  pt-4 pb-4 ml-28"></img>
             
             <div className="pl-20 pt-40 pb-40 ">
             <Typography variant={"body1"}   >We will send you a message after admin's aproval ........</Typography>
             </div>
            
           </div> 
           
            
          
         </Paper>
         </Grid>
      </Grid>
    </div>
  );
}
/* eslint-enable no-unused-vars */
