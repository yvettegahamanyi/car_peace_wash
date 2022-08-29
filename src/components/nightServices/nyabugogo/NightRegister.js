/* eslint-disable no-unused-vars */
import { makeStyles, TextField, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React, { useContext, useState } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { MyContext } from "../../../MyContext";
import Dashboard from "../../../layout/Dashboard";
import axios from 'axios'
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: "10em",
    marginRight: "10em",
  },
  drop: {
    height: "10px",
    minwidth: 400,
  },
  blueBut: {
    backgroundColor: "#1665D8",
    color: "white",
  },

  width: {
    width: "70%",
  },
  greenBut: {
    backgroundColor: "#4AAF05",
    color: "white",
  },
  margin: {
    marginTop: "10px",
  },
  low: {
    textTransform: "capitalize",
  },
}));

function DayServices() {
  
  const classes = useStyles();
  var history=useHistory();

  const [plate,setPlate]=useState("");
  const {groups,setGroups}=useContext(MyContext);
  
  const [type,setType]=useState("");
  const [driverName,setDriverName]=useState("");
  const [driverPhone,setDriverPhone]=useState("");
  const [agency,setAgency]=useState("");
  const[carProb,setCarProb]=useState("");
  const [entry,setEntry]=useState("");
  const[error,setError]=useState();
  const[grouper,setGrouper]=useState();
  const {token,setToken}=useContext(MyContext);

  

  const submit=async()=>{
    if(plate===""||type===""||driverName===""||driverPhone===""||agency===""||carProb===""||entry===""){
      setError(true);

     }
     else{
      setError(false);
      const json = JSON.stringify({

        plate_number: plate,
        car_type: type,
        entry_date: entry,
        driver_name: driverName,
        phone_number: driverPhone,
        wash_group:grouper ,
        washed: false,
        car_problem: carProb,
        agency: agency

    
      })
      await axios.post('/night.ng',json,
      {
       headers: {
         'Authorization': token,
         'Content-Type': 'application/json'
       }
       
     }).then((response)=>{
      
         history.push("/app/nyabugogoNight");
        
   
     })
     .catch(error=>{
      console.log(error);
    })
  }
  }

  
  return (
    <Dashboard>
    <div>
      <Grid
      
      
       container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6">Register New Vehicle</Typography>
        </Grid>
        <Grid item xs={12} className={classes.container}>
          <p className="text-lg font-bold">At Service in Peace Car Wash</p>
          <p className="text-gray-500">
            Register new vehicle attending Peace Car Wash Services
          </p>
          {error?<p className="text-red-500 mt-2">Some Fields shouldn't be left empty</p>:null}
          <Grid  container spacing={3} className={classes.margin}>
            <Grid item xs={6}>
              <p className="text-lg text-gray-500">Car Details</p>
              <TextField
                margin="dense"
                label="Plate Number"
                variant="outlined"
                name="plate"
                size="small"
                className={classes.width}
                value={plate}
                onChange={(e)=>setPlate(e.target.value)}
              />
               <FormControl
                variant="outlined"
                size="small"
                className={` ${classes.width}`}
                margin="dense"
               
              >
                <InputLabel>Car Type</InputLabel>
                <Select label="Car Type"
                value={type}
                name="type"
                onChange={(e)=>{
                  setType (e.target.value);          
               }}
                
                >
              
        
          <MenuItem value="Bus" >Bus</MenuItem>
          <MenuItem value="Coaster" >Coaster</MenuItem>
      
             
       
          
                 
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <p className="text-lg text-gray-500">Driver Details</p>
              <TextField
                margin="dense"
                label="Driver's Name"
                variant="outlined"
                size="small"
                className={classes.width}
                value={driverName}
                name="driver_name"
                onChange={(e)=>setDriverName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Phone Number"
                variant="outlined"
                size="small"
                className={classes.width}
                value={driverPhone}
                name="driver_phone"
                onChange={(e)=>setDriverPhone(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid 
          container spacing={3} className={classes.margin}>
            <Grid item xs={6}>
              
              <TextField
                margin="dense"
                label="Agency"
                variant="outlined"
                size="small"
                className={classes.width}
                value={agency}
                name="agency"
                onChange={(e)=>setAgency(e.target.value)}
              />
          
                 
              
                <TextField
                margin="dense"
                label="Car Problem"
                variant="outlined"
                value={carProb}
                name="prob"
                size="small"
                className={classes.width}
                // InputLabelProps={{
                //   shrink: true,
                // }}
                onChange={(e)=>setCarProb(e.target.value)}
              />
              <br></br>
           

            
            </Grid>
            <Grid item xs={6}>
             
            <FormControl
                variant="outlined"
                size="small"
                className={` ${classes.width}`}
                margin="dense"
               
              >
                <InputLabel>Wash Group</InputLabel>
                <Select label="Wash Group"
                value={grouper}
                name="group"
                onChange={(e)=>{
                  setGrouper (e.target.value);          
               }}
                
                >
              
              {groups?groups.map((s)=>{
        return(
          <MenuItem value={s._id} key={s._id}>{s.name}</MenuItem>
        )
              }):null}
             
       
          
                 
                </Select>
              </FormControl>
              <br/>
              <TextField
                margin="dense"
                id="date"
                label="Entry Date"
                variant="outlined"
                value={entry}
                type="date"
            
                size="small"
                name="entry_date"
                className={classes.width}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>setEntry(e.target.value)}
              />
              
            </Grid>

          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                className={`${classes.blueBut} ${classes.width} ${classes.low}`}
                onClick={()=>submit()}
              >
                Save
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                className={`${classes.greenBut} ${classes.width} ${classes.low}`}
                onClick={()=>{
                
                }}
              >
                Continue Payment
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      
    </div>
    </Dashboard>
  );
}


export default DayServices;
