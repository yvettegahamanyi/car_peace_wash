/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext,useEffect ,useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dashboard from "../../layout/Dashboard";
import { useHistory } from 'react-router-dom';
import { Paper } from "@material-ui/core";




const useStyles = makeStyles({
  root: {
    width: "50%",
    marginLeft:"20%",
    marginTop:"15%"
  },
  text:{
      fontSize:"12px",
      marginLeft:"4px",
      textDecoration:"underline",
      color:"#3F51B5",
      letterSpacing:"1px"
  }

 
});




export default function StickyHeadTable() {
  const classes = useStyles();
  const state = useHistory();
  const  data  = state.location.state
  console.log(data)

 
  return (
    <Dashboard>
    <Paper className={classes.root}>
     <p className=" font-bold p-4 pl-14">Car Details <span className={classes.text} >edit</span></p>


     {/* amount_payed: 5002000
amount_to_pay: 2000
car_type: "bus"
customer_name: "Uwizeye kampariza"
entry_date: "2021-09-17T00:00:00.000Z"
out_date: "2021-09-17T23:03:43.521Z"
phone_number: "0788132345"
plate_number: "RAC2034"
registered_by: {user_status: 'ACTIVE', registration_date: 'Sun Sep 12 2021', _id: '613df4909177670016171f06', first_name: 'Yvet', last_name: 'Gahamanyi', …}
seen: false
service: ['washing']
status: "COMPLETE"
taker_fname: "uwizeye tuyishime"
taker_lname: "string"
taker_number: "0788132345" */}




<div className="flex pb-4 text-xs">
    <div className="ml-14">

<div className="flex">
    <p>Plate number:</p>
    <p className="ml-2">{data.plate_number}</p>
</div>
<div className="flex">
    <p>Customer name:</p>
    <p className="ml-2">{data.customer_name}</p>
</div>
<div className="flex">
    <p>Customer number:</p>
    <p className="ml-2">{data.phone_number}</p>
</div>
<div className="flex">
    <p>Service:</p>
    <p className="ml-2">{data.service}</p>
</div>


    </div>


    <div className="ml-14">
    <div className="flex">
    <p>Entry Date: </p>
    <p className="ml-2">{data.entry_date}</p>
</div>
    <div className="flex">
    <p>Amount Payed: </p>
    <p className="ml-2"> {data.amount_payed}</p>
</div>



    <div className="flex">
    <p>Care Taker: </p>
    <p className="ml-2">{data.taker_fname} {data.taker_lname}</p>
</div>
<div className="flex">
    <p>Taker Number: </p>
    <p className="ml-2">{data.taker_number}</p>
</div>



    </div>
</div>



    </Paper>
    </Dashboard>
  );
}

/* eslint-disable no-unused-vars */