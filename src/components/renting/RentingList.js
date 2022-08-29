/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import { Grid, IconButton } from "@material-ui/core";
import { MyContext } from "../../MyContext";
import Dashboard from "../../layout/Dashboard";
import { useHistory } from "react-router-dom";
import axios from "axios";
import moment from 'moment';

const columns = [
  { id: "last_name", label: "Customer", minWidth: 100, align: "left" },
  { id: "registration_date", label: "Date", minWidth: 100, align: "left" },
  { id: "amount_to_pay", label: "amount_to_pay", minWidth: 100, align: "left" },
  { id: "amount_payed", label: "amount_payed", minWidth: 100, align: "left" },
  { id: "payment_status", label: "Status", minWidth: 80, align: "left" },
  { id: "actions", label: "Actions", minWidth: 50, align: "left" },
];

function createData(plot, customer, date, status, actions) {
  return {
    plot,
    customer,
    date,
    status,
    actions,
  };
}


const useStyles = makeStyles({
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
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState([]);
  const { token, setToken } = useContext(MyContext);
  const { search, setSearch } = useContext(MyContext);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fromDatetoDate = (parameter) => {
    var date = new Date(parameter);
    var month = date.getMonth();
    month += 1;
    function check() {
      if (month < 10) {
        var h = month;
        month = `0${h}`;
      }
    }
    check();

    var final = `${date.getFullYear()}/${month}/${date.getDate()}`;
    return final;
  };

  const edit = (index) => {
    history.push("/app/rent/edit", {
      rental: data[index],
    });
  };

  const calculateRentalMonth = async()=>{
    for (let index = 0; index < data.length; index++) {
      const timeToPay = moment(new Date(data[index].registration_date)).add(30, 'days').calendar();
      if(new Date(timeToPay) === new Date()){
        
        // console.log("it is time to pay for :",data[index].last_name,"\n");
        //call an api to register a notification
        
      }else{
        // console.log("it is not time to pay for :",data[index].last_name,"\n");
        continue;
      }
    }
  }
  const fetch = async () => {
    await axios
      .get(`${process.env.REACT_APP_baseApi}/rent`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetch();
    calculateRentalMonth();
  }, []);

  const deleteRent = async (index) => {
    let id = data[index]._id;
    await axios
      .delete(`${process.env.REACT_APP_baseApi}/rent/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        fetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const pay = (index) => {
    history.push("/app/rent/payment", {
      rental: data[index],
    });
  };
  const { day, setDay } = useContext(MyContext);
  const { settings, setSettings } = useContext(MyContext);
  const { rent, setRenting } = useContext(MyContext);
  const { dash, setDash } = useContext(MyContext);
  const { newRenter, setNewRenter } = useContext(MyContext);

  const history = useHistory();

  return (
    <Dashboard>
      <Paper className={classes.root}>
        <Grid item={true} container spacing={3} xs={12}>
          <Grid item={true} xs={10}>
            <div className="flex ml-4 mb-6 mt-4 ">
              <p className="font-bold">List of Renters</p>
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
                  history.push("/app/rent/register");
                }}
              >
                New Record
              </Button>
            </div>
          </Grid>
        </Grid>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={index}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className={classes.background}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ? data
                    .filter((val) => {
                      if (search === "") {
                        return val;
                      } else if (
                        val.last_name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((data, num) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={num}>
                          {columns.map((col, index) => {
                            const value = data[col.id];
                            if (col.id === "actions") {
                              return (
                                <TableCell key={index} align={col.align}>
                                  <IconButton
                                    value={index}
                                    size="small"
                                    onClick={() => {
                                      edit(num);
                                    }}
                                  >
                                    <CreateIcon
                                      fontSize="small"
                                      className="text-gray-500"
                                    ></CreateIcon>
                                  </IconButton>
                                  <IconButton
                                    size="small"
                                    onClick={() => {
                                      deleteRent(num);
                                    }}
                                  >
                                    <DeleteIcon
                                      fontSize="small"
                                      className="text-gray-500"
                                    ></DeleteIcon>
                                  </IconButton>
                                </TableCell>
                              );
                            } else if (col.id === "payment_status") {
                              return (
                                <TableCell key={index} align={col.align}>
                                  {value === "PENDING" ? (
                                    <Button
                                      variant="contained"
                                      color="secondary"
                                      onClick={() => {
                                        pay(num);
                                      }}
                                      className={classes.pending}
                                    >
                                      {value}
                                    </Button>
                                  ) : value === "INCOMPLETE" ? (
                                    <Button
                                      variant="contained"
                                      onClick={() => pay(num)}
                                      color="primary"
                                      className={classes.incomplete}
                                    >
                                      {value}
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="contained"
                                      disabled
                                      className={classes.complete}
                                    >
                                      {value}
                                    </Button>
                                  )}
                                </TableCell>
                              );
                            } else if (col.id === "registration_date") {
                              return (
                                <TableCell key={index} align={col.align}>
                                  {fromDatetoDate(value)}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={index} align={col.align}>
                                  {value}
                                </TableCell>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    })
                : null}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Dashboard>
  );
}
/* eslint-disable no-unused-vars */
