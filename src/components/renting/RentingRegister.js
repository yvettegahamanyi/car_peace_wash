/* eslint-disable no-unused-vars */
import { makeStyles, TextField, Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import React, { useContext } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { MyContext } from "../../MyContext";
import Dashboard from "../../layout/Dashboard";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
    marginTop: "20px",
  },
  otherMarg: {
    marginTop: "30px",
  },
  color: {
    color: "black",
  },
}));

function DayServices() {
  const classes = useStyles();
  const {payRent,setPayRent}=useContext(MyContext);
  const {newRenter,setNewRenter}=useContext(MyContext);
  const {token,setToken}=useContext(MyContext);
  const history=useHistory();

  const fromDatetoDate =(parameter)=>{
    // var date=new Date(parameter);
    var month=parameter.getMonth();
    function check(){
      if(month<10){
        var h=month
        month=`0${h}`
      }
     
    }
     check();
     
   
    var final=`${parameter.getFullYear()}-${month}-${parameter.getDate()}`
    return final;
  }
  var date = new Date();
  var paymentDate = new Date(date.setMonth(date.getMonth()+1));


  const [first_name, setfirst_name]= useState("");
  const [last_name, setlast_name]= useState("");
  const [phone_number, setphone_number]= useState("");
  const [occupation, setoccupation]= useState("");
  const [amount_to_pay, setamount_to_pay]= useState(0);
  const [amount_payed, setamount_payed]= useState(0);
  const [amount_remaining, setamount_remaining]= useState(0);
  const [payment_date, setpayment_date]= useState(fromDatetoDate(paymentDate));
  const [payment_status, setpayment_status]= useState("pending");
  const [registration_date, setregistration_date]= useState(fromDatetoDate(new Date()));
  
  const[error,setError]=useState('');

  const  handleBlur=(e)=>{


    if(e.target.name==="first_name"){
      if (e.target.value==="") {
       
      }
      else{
        setfirst_name(e.target.value);
      }
    }
  
     if(e.target.name==="last_name"){
      if (e.target.value==="") {
      
      }
      else{
        setlast_name(e.target.value);
      }
    }
  
    if(e.target.name==="phone_number"){
      if (e.target.value==="") {
        
      }
      else{

        setphone_number(e.target.value);
      }
    }
  
    if(e.target.name==="occupation"){
      if (e.target.value==="") {
       
      }
      else{
        setoccupation(e.target.value);
      }
    }
  
     if(e.target.name==="amount_to_pay"){
      if (e.target.value==="") {
      
      }
      else{
        setamount_to_pay(e.target.value);
      }
    }
  
  }
  
const submit=async()=>{

  if(first_name===""||last_name===""||phone_number===""||occupation===""||amount_to_pay===""){
   setError(`Some Fields shouldn't be left empty`);
  }else if(phone_number.length !== 10){
    setError('Phone number must be 10 numbers');
  }else{
    setError('');
    const json = JSON.stringify({
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number,
      occupation: occupation,
      amount_to_pay: amount_to_pay,
    })
   await axios.post(`${process.env.REACT_APP_baseApi}/rent`,json,
   {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
    
  }).then((response)=>{
    setlast_name("");
    setfirst_name("");
    setoccupation("");
    setphone_number("");setamount_to_pay(0);
    setpayment_date("");setamount_payed(0);
    setpayment_status("");setamount_remaining(0);
    setregistration_date("");
  if(response.data.message === "Success Created!"){
    history.push("/app/rent")
  }

  }).catch(error=>{
    console.log(error);
  })

  }
}


  return (
    <Dashboard>
    <div>
      <Grid item xs={12} container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6">Add Renter</Typography>
        </Grid>
        <Grid item xs={12} className={classes.container}>
          <p className="text-lg font-bold">Rent In Peace Car Wash</p>
          <p className="text-gray-500">
            Register new individual or group to rent place where they can
            establish their workings
          </p>
          {error?<p className="text-red-500 mt-2">{error}</p>:null}
          <Grid item xs={12} container spacing={3} className={classes.margin}>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="First Name"
                variant="outlined"
                size="small"
                className={`${classes.width} ${classes.color}`}
                name="first_name"
                onChange={(e)=>{
                  handleBlur(e);
                }}
              />
              <TextField
                type="tel"
                margin="dense"
                label="Phone Number"
                variant="outlined"
                size="small"
                name="phone_number"
                className={`${classes.width} ${classes.otherMarg}`}
                onChange={(e)=>{
                  handleBlur(e);
                }}
              />
              <TextField
                margin="dense"
                id="date"
                label="Entry Date"
                variant="outlined"
                type="date"
                size="small"
                name="registration_date"
                className={`${classes.width} ${classes.otherMarg}`}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>{
                  handleBlur(e);
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                label="Last Name"
                variant="outlined"
                size="small"
                name="last_name"
                className={classes.width}
                onChange={(e)=>{
                  handleBlur(e);
                }}
              />
              <TextField
                margin="dense"
                label="What he do"
                variant="outlined"
                size="small"
                name="occupation"
                className={`${classes.width} ${classes.otherMarg}`}
                onChange={(e)=>{
                  handleBlur(e);
                }}
              />
              <TextField
              type="number"
                margin="dense"
                label="Amount to pay"
                variant="outlined"
                size="small"
                name="amount_to_pay"
                className={`${classes.width} ${classes.otherMarg}`}
                onChange={(e)=>{
                  handleBlur(e);
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} container spacing={3}>
            <Grid item xs={6}>
              <Button
              onClick={()=>{
                // setPayRent(true);
                // setNewRenter(false)
                history.push("/app/rent/payment")
              }}
                variant="contained"
                className={`${classes.greenBut} ${classes.width}  ${classes.otherMarg}`}
              >
                CONTINUE WITH PAYMENTS
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
               onClick={()=>{
                submit();
              }}
                variant="contained"
                color="primary"
                className={`${classes.blueBut} ${classes.width} ${classes.otherMarg}`}
              >
                FINISH
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
/* eslint-disable no-unused-vars */