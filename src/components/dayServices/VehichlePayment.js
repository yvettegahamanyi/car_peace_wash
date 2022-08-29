/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Grid, TextField, Typography, makeStyles } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import React, { useContext, useEffect,useState } from "react";
import Dashboard from "../../layout/Dashboard";
import { MyContext } from "../../MyContext";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  width: {
    width: "70%",
  },
  margin: {
    marginLeft: "10em",
    marginTop: "10em",
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
}));
function VehichlePayment(props) {
  var dat=new Date();
  var month=dat.getMonth();
  month+=1;
  var final=`${dat.getFullYear()}-${month}-${dat.getDate()}`;
  const classes = useStyles();
  const[agree,setAgree]=React.useState(false);
  const[complete,setComplete]=React.useState(false);
  const[pay,setPay]=React.useState('');
  const[payed,setPayed]=React.useState('');
  const[date,setDate]=React.useState('');
  const[done,setDone]=React.useState('');
  const [service,setService]=useState([]);
  const{toBePayed,setToBePayed}=useContext(MyContext)
  const history=useHistory('');
  const {token,setToken}=useContext(MyContext);
  const [error,setError]=React.useState(false);

  const [state, setState] = React.useState({
    Washing: false,
    Machine_washing: false,
    Mechanic: false,
  });
  
  const handleChanges = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };


 useEffect(()=>{
   setPay(toBePayed.amount_to_pay);
   setDone(toBePayed.amount_payed);
 },[])

  const handleAgree = (event) => {
    setAgree(event.target.checked);
  };
  const handleComp=(event)=>{
 setComplete(event.target.checked)
  }

function  handleChange(e){

 if(e.target.name==="pay"){
setPay(e.target.value)
}
if(e.target.name==="payed"){
  setPayed(e.target.value)
  }
  }

  const save= async()=>{
    
    if(pay===0||payed===""||pay===""||service===""){
 setError(true);
    }
    else{
      setError(false);
    

    var amount_payed=payed;
    if(done>0){
      amount_payed=payed+done;
    }
   
    
    var status;
    var out_date;
    if(status==="COMPLETE"){
      var date=new Date();
      var month=date.getMonth();
      function check(){
        if(month<10){
          var h=month
          month=`0${h}`
        }
       
      }
       check();
       
     
      var final=`${date.getFullYear()}-${month}-${date.getDate()}`
      out_date=final;
     
    }
    else{
      out_date="string";
    }
   
    
  if(state.Machine_washing === true){
    service.push("washing machine")
  }else if(state.Mechanic === true){
    service.push("mechanics")
  }else if(state.Washing === true){
    service.push("washing")
  }


    const json = { 
    
      amount_to_pay: pay,
      amount_payed:amount_payed,
      service: service,
      out_date:new Date()
    }
     await axios.post(`${process.env.REACT_APP_baseApi}/dactivity/pay/${toBePayed._id}`,json,
     {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
      
    }).then((response)=>{
  
  
  history.push("/app/dayservices");
  
    }).catch(error=>{
  
      
      console.log(error);
    })
  
  }
  
  }
  return (
    <Dashboard>
    <div>
      <Grid  container spacing={3}>
     
        <Grid container  className={classes.margin}>
          <Grid item xs={12}>
             
            <p className="text-lg font-bold">Payment for {toBePayed.plate_number}</p>
            {toBePayed.amount_payed>0? <p className="mt-2 mb-2 text-xs ">Already payed: {toBePayed.amount_payed} frw</p>:null}
           
            {error?<p className="text-red-500 mt-4">Fields can't be empty</p>:null}
          </Grid>
         
          <Grid item xs={6} className={classes.inputmag}>
            
            <TextField
              margin="dense"
              label="Amount to pay"
              variant="outlined"
              size="small"
              className={classes.width}
              name="pay"
              value={pay}
              InputLabelProps={{
                shrink: true,
              }}
               onChange={(e)=>handleChange(e)}
            />
        
            <br></br>
          
           <p className="text-lg text-gray-500">Service</p>   
              {/* <FormControl
                variant="outlined"
                size="small"
                className={` ${classes.width}`}
                margin="dense"
               
              >
                <InputLabel>Select</InputLabel>
                <Select label="Service"
                name="service"
                onChange={(e)=>{
                  setService (e.target.value);          
               }}
                
                >
              
              {serviceList?serviceList.map((s)=>{
        return(
          <MenuItem value={s.value} key={s.value}>{s.name}</MenuItem>
        )
              }):null}
             
       
          
                 
                </Select>
              </FormControl> */}
              <FormControl>
                <FormControlLabel
                  control={
                    <Checkbox checked={state.Washing} onChange={handleChanges} name="Washing" color="primary" />
                  }
                  label="Washing"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={state.Machine_washing} onChange={handleChanges} name="Machine_washing" color="primary"/>
                  }
                  label="Machine Washing"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={state.Mechanic} onChange={handleChanges} name="Mechanic" color="primary"/>
                  }
                  label="Mechanic"
                />
              </FormControl>

          </Grid>

          <Grid item xs={6}>
          
          <TextField
              margin="dense"
              label="Payment"
              variant="outlined"
              size="small"
              onChange={(e)=>handleChange(e)}
              className={classes.width}
              name="payed"
              value={payed}
              InputLabelProps={{
                shrink: true,
              }}
              
            />
            <br></br>
           
          </Grid>
          <Grid  container spacing={3} className={classes.inputmag}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                className={`${classes.blueBut} ${classes.width} ${classes.low}`}
              >
                Back
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                className={`${classes.greenBut} ${classes.width} ${classes.low}`}
                onClick={()=>save()}
              >
                Pay
              </Button>
            </Grid>
            
          </Grid>
        </Grid>
      </Grid>
    </div>
    </Dashboard>
  );
}

export default VehichlePayment;
