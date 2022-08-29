/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext,useEffect ,useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { MyContext } from "../../MyContext";
import Dashboard from "../../layout/Dashboard";

import { useHistory } from 'react-router-dom';
import { CheckBox, LocalGasStationRounded } from "@material-ui/icons";
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import App from "../../App";
import { buildQueries } from "@testing-library/dom";


const useStyles = makeStyles({
  root: {
    width: "100%",
    fontSize:"13px"
  },
  width: {
    width: "50%",
  },
  margin:{
      marginLeft:"4px"
  },
  greenBut:{
    marginTop:"4px"
  }
});




export default function StickyHeadTable() {
  const classes = useStyles();
  const [report,setReport]=useState("");
  const [branch,setBranch]=useState("");
  const [nyabu,setNyobu]=useState("nyabugogo");
  const [remera,setRemera]=useState("remera");
  const [daily,setDaily]=useState("daily");
  const [weekly,setWeekly]=useState("weekly");
  const [from,setFrom]=useState("");
  const [to,setTo]=useState("");
  const [invoice,setInvoice]=useState("");

  const [invoBranch,setInvoBra]=useState("");
  const [invoFrom,setInvoFrom]=useState("");
  const [invoTo,setInvoTo]=useState("");
  const [invoNyabu,setinvoNyabu]=useState("nyabugogo");
  const [invoRem,setInvoRem]=useState("remera");
  const [invoDay,setInvoDay]=useState("daily");
  const [invoWeek,setInvoWeek]=useState("weekly");
  const {invoicer,setinvoicer}=useContext(MyContext);
  const {theReport,setTheReport}=useContext(MyContext);


  const [dayReport,setDayReport]=useState("");
  const [dayServiceDaily, setDayServiceDaily]= useState(false);
  
  const {reporter,setReporter}=useContext(MyContext);
  const history=useHistory();



  const printDayReport=(type,from,to)=>{
    history.push("/app/dayReport/table", {
      dayReportData:{type,to,from},
    });
  }

  const printInvoice=(invoice,invoBranch,invoTo,invoFrom)=>{

    setinvoicer({invoice:invoice,branch:invoBranch,from:invoFrom,to:invoTo});

  

    if(invoice==="daily"){


history.push("/app/invoice/daily")
    }
    else{
 history.push("/app/invoice/weekly");
    }

  }


  

  

  
 

  return (
    <Dashboard>
    <Grid container spacing={3}>
        <Grid item={true} xs={6} >
        <Paper className={classes.root}>
        <div className="p-6">
        <p className="mb-4">Night Services</p>
        <div className="flex">
       
        <FormControl
                variant="outlined"
                size="small"
                className={` ${classes.width}`}
                margin="dense"  
              >
                <InputLabel>Report Type</InputLabel>
                <Select label="Report Type"
                value={report}
                onChange={(e)=>{
                  setReport (e.target.value);          
               }}
                
                >
              
           
          <MenuItem value={daily} >Daily Report</MenuItem>
          <MenuItem value={weekly} >Weekly Report</MenuItem>
                 
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                size="small"
                className={` ${classes.width} ${classes.margin}`}
                margin="dense"
               
              >
                <InputLabel>Branch</InputLabel>
                <Select label="Report Type"
                value={branch}
                onChange={(e)=>{
                  setBranch (e.target.value);          
               }}
                
                >
              
           
          <MenuItem value={nyabu} >Nyabugogo</MenuItem>
          <MenuItem value={remera} >Remera</MenuItem>
                 
                </Select>
              </FormControl>
        </div>
        <div className="flex">

        <TextField
                margin="dense"
                id="date"
                label="From"
                variant="outlined"
                value={from}
                type="date"
            
                size="small"
                name="entry_date"
                className={`${classes.width} `}
                InputLabelProps={{
                  shrink: true,
                }}
                 onChange={(e)=>setFrom(e.target.value)}
              />

<TextField
                margin="dense"
                id="date"
                label="To"
                variant="outlined"
                value={to}
                type="date"
                size="small"
                name="entry_date"
                className={`${classes.width} ${classes.margin}`}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>setTo(e.target.value)}
              />

        </div>
        <Button
                variant="contained"
                color="primary"
                className={`${classes.greenBut} ${classes.width} mt-2`}
                onClick={()=>{
                
                  var b={"type":report,"branch":branch,"from":from,"to":to}
                  
                  setTheReport(b);
                 
                  history.push("/app/report/table")          
                }}
              >
              Get Report    
              </Button>

        </div>
    
    </Paper>
        </Grid>

        <Grid item={true} xs={6} >
        <Paper className={classes.root}>
        <div className="p-6">
        <p className="mb-4">Day Services</p>
        <div className="flex">
       
        <FormControl
                variant="outlined"
                size="small"
                className={` ${classes.width}`}
                margin="dense"
               
              >
                <InputLabel>Report Type</InputLabel>
                <Select label="Report Type"
                value={dayReport}
                onChange={(e)=>{
                  setDayReport (e.target.value);  
                   if(e.target.value==="daily"){
                    setDayServiceDaily(true);
                  }else{
                    setDayServiceDaily(false);
                  }      
               }}
                
                >
              
           
          <MenuItem value={daily} >Daily Report</MenuItem>
          <MenuItem value={weekly} >Weekly Report</MenuItem>
                 
                </Select>
              </FormControl>

              
        </div>
        <div className="flex">

        <TextField
                margin="dense"
                id="date"
                label="From"
                variant="outlined"
                value={from}
                type="date"
                disabled={dayServiceDaily}
                size="small"
                name="entry_date"
                className={`${classes.width} `}
                InputLabelProps={{
                  shrink: true,
                }}
                 onChange={(e)=>setFrom(e.target.value)}
              />

<TextField
                margin="dense"
                id="date"
                label="To"
                variant="outlined"
                value={to}
                type="date"
                disabled={dayServiceDaily}
                size="small"
                name="entry_date"
                className={`${classes.width} ${classes.margin}`}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>setTo(e.target.value)}
              />

        </div>
        <Button
                variant="contained"
                color="primary"
                className={`${classes.greenBut} ${classes.width} mt-2`}
                onClick={()=>{
                  printDayReport(dayReport,from,to)               
                }}
              >
              Get Report    
              </Button>

        </div>
    
    </Paper>
        </Grid>

<Grid item={true} xs={6}>
        <Paper className={classes.root}>
        <div className="p-6">
        <p className="mb-4">Night Invoices</p>
        <div className="flex">
       
        <FormControl
                variant="outlined"
                size="small"
                className={` ${classes.width}`}
                margin="dense"
               
              >
                <InputLabel>Invoice Type</InputLabel>
                <Select label="Report Type"
                value={invoice}
                onChange={(e)=>{
                  setInvoice (e.target.value);          
               }}
                
                >
              
           
          <MenuItem value={invoDay} >Daily Invoice</MenuItem>
          <MenuItem value={invoWeek} >Weekly  Invoice</MenuItem>
                 
                </Select>
              </FormControl>

              <FormControl
                variant="outlined"
                size="small"
                className={` ${classes.width} ${classes.margin}`}
                margin="dense"
               
              >
                <InputLabel>Branch</InputLabel>
                <Select label="Report Type"
                value={invoBranch}
                onChange={(e)=>{
                  setInvoBra (e.target.value);          
               }}
                
                >
              
           
          <MenuItem value={invoNyabu} >Nyabugogo</MenuItem>
          <MenuItem value={invoRem} >Remera</MenuItem>
                 
                </Select>
              </FormControl>
        </div>
        <div className="flex">

        <TextField
                margin="dense"
                id="date"
                label="From"
                variant="outlined"
                value={invoFrom}
                type="date"
            
                size="small"
                name="entry_date"
                className={`${classes.width} `}
                InputLabelProps={{
                  shrink: true,
                }}
                 onChange={(e)=>setInvoFrom(e.target.value)}
              />

<TextField
                margin="dense"
                id="date"
                label="To"
                variant="outlined"
                value={invoTo}
                type="date"
            
                size="small"
                className={`${classes.width} ${classes.margin}`}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e)=>setInvoTo(e.target.value)}
              />

        </div>
        <Button
                variant="contained"
                color="primary"
                className={`${classes.greenBut} ${classes.width} mt-2`}
                onClick={()=>{
                
                // printInvoice(invoice,invoBranch,invoTo,invoFrom);
                var b={"type":invoice,"branch":invoBranch,"from":invoFrom,"to":invoTo}
                setinvoicer(b);
                if(b.type==="daily"){
                  history.push("/app/invoice/daily");
                }
                else{
                  history.push("/app/invoice/weekly")
                }
               
                
                }}
              >
               Get Invoice
              </Button>

        </div>
    
    </Paper>
        </Grid>

        <Grid item={true} xs={6}></Grid>

       
        
    </Grid>
   
    </Dashboard>
  );
}

/* eslint-disable no-unused-vars */