/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext,useEffect ,useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Dashboard from "../../layout/Dashboard";

import { useHistory } from 'react-router-dom';
import { Button } from "@material-ui/core";


const useStyles = makeStyles({
  root: {
    width: "30%",
    marginLeft:"30%",
    marginTop:"15%",
    height:"8em"
  }
});




export default function StickyHeadTable() {
  const classes=useStyles();
  const history=useHistory();
  const [choice,setChoice]=useState("");


  return (
    <Dashboard>
    <Paper className={classes.root}>

        
      <div className="ml-8 ">
        <p className="pt-2  center">Choose branch</p>
     <div className=" flex pt-4" >
      <Button variant="contained"  onClick={()=>{history.push("/app/night/remera")}} color="primary">Remera</Button>
      <div className="ml-6">
    <Button variant="contained"  color="secondary" className="ml-2"  onClick={()=>{history.push("/app/nyabugogoNight")}}>Nyabugogo</Button>
    </div>
    </div>
      </div>
   
    </Paper>
    </Dashboard>
  );
}

/* eslint-disable no-unused-vars */