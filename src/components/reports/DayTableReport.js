/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MyContext } from '../../MyContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import moment from 'moment';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function BasicTable() {
  const classes = useStyles();
  const state = useHistory();
  const  dayReportData  = state.location.state.dayReportData;
  const [data,setData]=useState();
  const {token,setToken}=useContext(MyContext);

  async function dayActivity(){
    await axios.get(`${process.env.REACT_APP_baseApi}/dactivity`,
    {
     headers: {
       'Authorization':token
    }
     
   }).then((response)=>{
    const res = response.data.activities;
    const weeklyDayServices = [];
    const DailyDayService = [];

    for (let index = 0; index < res.length; index++) {
        const element = res[index];
        console.log(moment(moment(element.entry_date).format('L')).isAfter(moment(dayReportData.from).format('L')),"  ",moment(element.entry_date).format('L')," and ",moment(dayReportData.from).format('L'));
        console.log(moment(moment(element.entry_date).format('L')).isBefore((moment(dayReportData.to).format('L'))),"  ",moment(element.entry_date).format('L')," and ",moment(dayReportData.to).format('L'));
        if(moment(moment(element.entry_date).format('L')).isSame((moment(new Date()).format('L')))){
            DailyDayService.push(element);
        }else if( dayReportData.to !== "" && dayReportData.from !== "" ){
            if(moment(moment(element.entry_date).format('L')).isAfter((moment(dayReportData.from).format('L'))) && moment(moment(element.entry_date).format('L')).isBefore((moment(dayReportData.to).format('L')))){
                weeklyDayServices.push(element);
            }
        }else{
            setData(response.data.activities);  
        }
    }

    if(dayReportData.type === "daily"){
        setData(DailyDayService);
    }else{
        setData(weeklyDayServices)
    }

    //  setData(response.data.activities);   
   }).catch(error=>{
     console.log(error);
   })
  }

  useEffect(()=>{
    dayActivity();
  },[]) 
  function gen()
  {
  
  
    const input = document.getElementById('print');  
      html2canvas(input)  
        .then((canvas) => {  
          var imgWidth = 200;  
          var imgHeight = canvas.height * imgWidth / canvas.width;  
        
          const imgData = canvas.toDataURL('image/png');  
          const pdf = new jsPDF('p', 'mm', 'a4')  
          var position = 0;  
          var heightLeft = imgHeight;  
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
          pdf.save("download.pdf");  
        }); 
    }  

  return (
    <div>
      {data?
      <div>
    <TableContainer component={Paper} >
      <Table className={classes.table} aria-label="simple table" id="print">
        <TableHead>
          <TableRow>
            <TableCell align="center">Number</TableCell>
            
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Car Type</TableCell>
            <TableCell align="center">Plate number</TableCell>
            <TableCell align="center">Observation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?data.map((row,index) => (
            <TableRow key={row._id}>
              <TableCell  align="center">
                {index+1}
              </TableCell>
              <TableCell align="center">{row.entry_date.split("T")[0] }</TableCell>
              <TableCell align="center">{row.car_type}</TableCell>
              <TableCell align="center">{row.plate_number}</TableCell>
              <TableCell align="center">{row.washed===true?"OK":"NO"}</TableCell>
            </TableRow>
          )):null}
        </TableBody>
      </Table>
      
    </TableContainer>
    <div className="mt-4 ml-10">
    <Button  variant="contained" color="primary" onClick={()=>{gen()}} >Print Report</Button>
    </div>
    </div>
    :<p className="text-red-500">No records available</p>}
    </div>
  );
}
