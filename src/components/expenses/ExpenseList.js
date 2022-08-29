/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useCallback,useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Grid, IconButton, TextField } from "@material-ui/core";
import { MyContext } from "../../MyContext";
import Dashboard from "../../layout/Dashboard";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const columns = [
  { id: "item", label: "Item", minWidth: 100, align: "left" },
  { id: "amount", label: "Amount", minWidth: 100, align: "left" },
  { id: "observation", label: "Observation", minWidth: 100, align: "left" },
  // { id: "record_date", label: "Record Date", minWidth: 100, align: "left" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  complete: {
    backgroundColor: "#4AAF05",
    width: "10em",
  },
  incomplete: {
    backgroundColor: "#FB8832",
    width: "10em",
  },
  pending: {
    backgroundColor: "#FF5756",
    width: "10em",
  },
  background: {
    fontWeight: "bold",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formHidden: { display: "none" },
  printable: {
    padding: 20,
    width: 800,
    marginLeft: 20,
  },
  classNone: {},
  borderClass: {
    // border: "1px solid #00000060",
    borderTop: "1px solid black",
    borderRight: "1px solid black",
    // // borderLeft: "1px solid black",
  },
  borderLB: {
    borderBottom: "1px solid black",
    borderLeft: "1px solid black",
    // // borderLeft: "1px solid black",
  },
  date_div: {
    padding: "30px 20px",
    fontWeight: "bold",
  },
}));

export default function ExpenseList() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  
  const [today,setTodai]=useState("today");
  const [range,setRange]=useState("range");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState([]);
  const [allRecords, setAllRecords] = React.useState([]);
  // const [incomeRecords, setIncomeRecords] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [printOption, setPrintOption] = React.useState("0");
  const [openDial, setOpenDial] = React.useState(false);
  const [from_date, setFromDate] = React.useState();
  const [to_date, setToDate] = React.useState();
  const [printing, setPrinting] = React.useState(false);
  const { token, setToken } = useContext(MyContext);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetch = useCallback( async() => {
    await axios
      .get(`${process.env.REACT_APP_baseApi}/expense`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setAllRecords(response.data);
        let temp = response.data.filter(
          (d) =>
            d.record_date.split("T")[0] ===
            new Date().toISOString().split("T")[0]
        );

        setData(temp);

        //   await axios.post('/dactivity',json,
        //   {
        //    headers: {
        //      'Authorization': token,
        //      'Content-Type': 'application/json'
        //    }

        //  }).then(res => setIncomeRecords(res.data))
        //      })
        //      .catch(err => console.log(err))
      })
      .catch((error) => {
        setError(error);
      });
  },[token]);

  const printDocument = useCallback( (reset) => {
    let pdf = new jsPDF("l", "pt", [595, 842]);
    pdf.html(document.getElementById("pdfdiv"), {
      callback: function () {
        pdf.save("report.pdf");
        if (reset) {
          setOpenDial(false);
          setFromDate();
          setToDate();
          // }
          let temp = allRecords.filter(
            (d) =>
              d.record_date.split("T")[0] ===
              new Date().toISOString().split("T")[0]
          );
          setData(temp);
        }
        setPrinting(false);
        setPrintOption(0);
        // window.open(pdf.output("bloburl")); // to debug
      },
    });
  },[allRecords]);

  const handlePrintRange = () => {
    let temp = [...allRecords];
    temp = temp.filter(
      (d) =>
        d.record_date.split("T")[0] >= from_date &&
        d.record_date.split("T")[0] <= to_date
    );
    setData(temp);
  };

  const getTotal = () =>
    data.reduce((partial_sum, a) => partial_sum + a.amount, 0);

  useEffect(() => {
    fetch();
    // fetchRental();
  }, [fetch]);

  useEffect(() => {
    if (from_date && to_date) {
      // if (printDocument()) {
      setPrinting(true);
    }
  }, [data,from_date, to_date]);

  useEffect(() => {
    if (printOption === "2") setOpenDial(true);
    if (printOption === "1") setPrinting(true);
  }, [printOption]);

  useEffect(() => {
    if (printing) printDocument(true);
  }, [printing,printDocument]);

  const history = useHistory();

  return (
    <Dashboard>
      <Paper className={classes.root}>
        <Grid item={true} container spacing={3} xs={12}>
          <Grid item={true} xs={8}>
            <div className="flex ml-4 mb-6 mt-4 ">
              <p className="font-bold">List of Daily Expenses</p>
              <p className="text-sm text-gray-500 ml-2">{data.length} total</p>
            </div>
          </Grid>
          <Grid item={true} xs={2}>
            <div className="ml-6 mb-2 mt-1">
              <Button
                variant="outlined"
                color="primary"
                className="w-32"
                onClick={() => {
                  // setNewRenter(true);
                  // setRenting(false);
                  history.push("/app/expense/register");
                }}
              >
                New Record
              </Button>
            </div>
          </Grid>
          <Grid item={true} xs={2}>
            <div className="ml-6 mb-2">
              <IconButton
                value="ddd"
                size="medium"
                // onClick={printDocument}
                onClick={() => setOpen(!open)}
              >
                <PrintOutlinedIcon
                  fontSize="medium"
                  className="text-gray-500"
                ></PrintOutlinedIcon>
              </IconButton>
              <FormControl
                className={open ? classes.formControl : classes.formHidden}
              >
                <Select
                  labelId="demo-controlled-open-select-label"
                  id="demo-controlled-open-select"
                  value={printOption}
                  // open={false}
                  onChange={(e) => setPrintOption(e.target.value)}
                >
                  <MenuItem value={0}>Today</MenuItem>
                  <MenuItem value={1}>Range</MenuItem>
                  {/* <MenuItem value="3">3</MenuItem> */}
                </Select>
              </FormControl>
            </div>
          </Grid>
        </Grid>
        <div
          className={printing ? classes.printable : classes.classNone}
          id="pdfdiv"
        >
          <TableContainer
            // className={[classes.container, printing && classes.borderLB]}
            // !!!!!!!! keli uzashake ubundi buryo ukoresha butari array kuko biteza error muri browser ko className itakira array
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column, index) => (
                    <TableCell
                      key={index}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      // className={[
                      //   classes.background,
                      //   printing && classes.borderClass,
                      // ]}
                      // !!!!!!!! keli uzashake ubundi buryo ukoresha butari array kuko biteza error muri browser ko className itakira array

                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={item._id}
                      >
                        <TableCell
                          border={1}
                          className={
                            printing ? classes.borderClass : classes.classNone
                          }
                        >
                          {item.item}
                        </TableCell>
                        <TableCell
                          className={
                            printing ? classes.borderClass : classes.classNone
                          }
                        >
                          {item.amount}
                        </TableCell>
                        <TableCell
                          className={
                            printing ? classes.borderClass : classes.classNone
                          }
                        >
                          {item.observation}
                        </TableCell>
                        {/* <TableCell className={classes.borderClass}>
                          {item.record_date.split("T")[0]}
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  className={printing ? classes.borderClass : classes.classNone}
                >
                  <TableCell
                    // className={[
                    //   printing && classes.borderClass,
                    //   classes.background,
                    // ]}
                    // !!!!!!!! keli uzashake ubundi buryo ukoresha butari array kuko biteza error muri browser ko className itakira array

                  >
                    Total
                  </TableCell>
                  <TableCell
                    className={
                      printing ? classes.borderClass : classes.classNone
                    }
                  >
                    {getTotal()}
                  </TableCell>
                  <TableCell
                    className={
                      printing ? classes.borderClass : classes.classNone
                    }
                  ></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.date_div}>
            Date :{" "}
            {printOption === "2"
              ? from_date + " - " + to_date
              : new Date().toISOString().split("T")[0]}
          </div>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={allRecords.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog
        open={openDial}
        onClose={() => setOpenDial(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Select Date Range</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="date"
            label="From"
            variant="outlined"
            type="date"
            size="small"
            className={classes.width}
            name="from_date"
            onChange={(e) => setFromDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <span style={{ margin: "0 10px" }}> </span>
          <TextField
            margin="dense"
            id="date"
            label="To"
            variant="outlined"
            type="date"
            size="small"
            className={classes.width}
            name="to_date"
            onChange={(e) => setToDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDial(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePrintRange} color="primary">
            Print
          </Button>
        </DialogActions>
      </Dialog>
    </Dashboard>
  );
}
/* eslint-disable no-unused-vars */
