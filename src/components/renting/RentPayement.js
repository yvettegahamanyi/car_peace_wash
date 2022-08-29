/* eslint-disable no-unused-vars */
import { Grid, TextField, Typography, makeStyles } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import React,{useState,useContext} from "react";
import Dashboard from "../../layout/Dashboard";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../../MyContext";

const useStyles = makeStyles((theme) => ({
  width: {
    width: "70%",
  },
  margin: {
    marginLeft: "10em",
    marginTop: "5em",
  },
  otherMargin: {
    marginTop: "20em",
  },
  greenBut: {
    backgroundColor: "#4AAF05",
    color: "white",
  },
  blueBut: {
    backgroundColor: "#1665D8",
    color: "white",
  },
  inputmag: {
    marginTop: "10px",
  },
  othermargin: {
    marginTop: "30px",
  },
}));

function RentingPayment() {
  const classes = useStyles();
  const history=useHistory();
  const state = useHistory();

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

  
  const  rental  = state.location.state.rental;
  const [amount_to_pay, setamount_to_pay]= useState(rental.amount_to_pay);
  const [amount_payed, setamount_payed]= useState(rental.amount_payed);
  const [amount_remaining, setamount_remaining]= useState(rental.amount_remaining);
  const [payment_date, setpayment_date]= useState(fromDatetoDate(new Date()));
  const [payment_status, setpayment_status]= useState(rental.amount_remaining);
  const {token,setToken}=useContext(MyContext);

  const[error,setError]=useState();

  const  handleBlur=(e)=>{

    if(e.target.name==="amount_payed"){
      if (e.target.value==="") {
       
      }
      else{
        setamount_payed(e.target.value);
      }
    }  
  }
  
const submit=async()=>{

  if(amount_payed===""){
   setError(true);
  }

  else{
    setError(false);
    const json = JSON.stringify({
      amount_payed: amount_payed,
      payment_date:payment_date
    })
   await axios.put(`${process.env.REACT_APP_baseApi}/rent/pay/${rental._id}`,json,
   {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
    
  }).then((response)=>{
    setamount_to_pay(0);
    setpayment_date("");
    setamount_payed(0);
    setpayment_status("");
    setamount_remaining(0);
  if(response.data.message === "Success"){
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
          <Typography variant="h6">Rent Payment</Typography>
        </Grid>
        <Grid container item xs={12} className={classes.margin}>
          <Grid item xs={12}>
            <p className="text-lg font-bold">
              Make Payment For Rent in Peace Car Wash
            </p>
            <p className="text-sm text-gray-500">
              Pay now individual or group to rent place where they can establish
              their workings
            </p>
            {rental.payment_status === "INCOMPLETE"? (
              <p className="pt-4 text-sm text-gray-500">
              Amount payed <span className="font-bold text-red-500">{rental.amount_payed}</span> 
            </p>
            ):null}
            
          </Grid>
          <Grid item xs={6} className={`${classes.othermargin}`}>
            <TextField
              margin="dense"
              label="Amount To Pay"
              variant="outlined"
              type="number"
              size="small"
              value={rental.amount_to_pay}
              className={classes.width}
            />
            <br></br>
          </Grid>

          <Grid item xs={6} className={`${classes.othermargin}`}>
          <TextField
              margin="dense"
              label="Amount"
              variant="outlined"
              type="number"
              size="small"
              className={classes.width}
              name="amount_payed"
                onChange={(e)=>{
                  handleBlur(e);
                }}
            />
            <br></br>
          </Grid>
          <Grid item xs={12} container spacing={3} className={classes.inputmag}>
            <Grid item xs={6}>
              <Button
               onClick={()=>{
                history.goBack()
              }}
                variant="contained"
                color="primary"
                className={`${classes.blueBut} ${classes.width} ${classes.low}`}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
               onClick={()=>{
                submit()
              }}
                variant="contained"
                color="primary"
                className={`${classes.greenBut} ${classes.width} ${classes.low}`}
              >
                Finish
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
    </Dashboard>
  );
}

export default RentingPayment;

/* eslint-disable no-unused-vars */
