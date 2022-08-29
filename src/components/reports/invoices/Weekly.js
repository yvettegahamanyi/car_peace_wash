/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, TextField } from '@material-ui/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const TAX_RATE = 0.07;

const useStyles = makeStyles({
  table: {
  minWidth:"700"
  },
wid:{
  width:"50%"
},
bol:{
  fontWeight:"bold"
}
});

// function ccyFormat(num) {
//   return `${num.toFixed(2)}`;
// }





export default function SpanningTable() {
  const classes = useStyles();
  const [cunit,setCunit]=useState(0);
  const [bunit,setBunit]=useState(0);
  const [coast,setCoast]=useState(845);
  const [bus,setBus]=useState(845);
  const [sub,setSub]=useState(0);

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
       <div className="flex ml-20 mt-20">
      <TextField
                margin="dense"
                label="Coaster unit price"
                variant="outlined"
                name="plate"
                size="small"
                className={classes.width}
               value={cunit}
               onChange={(e)=>setCunit(e.target.value)}
              />
              <div className="ml-6">

              </div>
               <TextField
                margin="dense"
                label="Bus unit price"
                variant="outlined"
                name="plate"
                size="small"
                className={`${classes.width} `}
                 value={bunit}
                onChange={(e)=>setBunit(e.target.value)}
              />
      </div>
    <div className="ml-20 mt-4">
      <p className="  underline mb-6 text-lg font-semibold">Invoice details: 20th-30th August </p>
    <TableContainer component={Paper} className={classes.wid  }>
      <Table className={classes.table} aria-label="spanning table">
     
        <TableBody>
         
            <TableRow >
              <TableCell>{coast}</TableCell>
              <TableCell align="left">Washed Coasters</TableCell>
              <TableCell align="left">{cunit}</TableCell>
              <TableCell align="right">{coast*cunit}</TableCell>
            </TableRow>
            <TableRow >
              <TableCell>{bus}</TableCell>
              <TableCell align="left">Washed Buses</TableCell>
              <TableCell align="left">{bunit}</TableCell>
              <TableCell align="right">{bus*bunit}</TableCell>
            </TableRow>
         

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell className={classes.bol}  colSpan={2}>Subtotal</TableCell>
            <TableCell className={classes.bol} align="right">{(bus*bunit)+(coast*cunit)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell  className={classes.bol} colSpan={2} >VAT 18%</TableCell>
                        <TableCell className={classes.bol}   align="right">100</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className={classes.bol} >Total</TableCell>
            <TableCell  className={classes.bol} align="right">100</TableCell>
         
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    <div className="ml-20 mt-6">
        <Button variant="contained" onClick={()=>{gen()}} color="primary">Generate pdf</Button>
        </div>
       
    </div>
  );
}
