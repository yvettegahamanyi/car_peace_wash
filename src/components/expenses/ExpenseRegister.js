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
    backgroundColor: "#FF5756",
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

function ExpenseRegister() {
  const classes = useStyles();
  const { payRent, setPayRent } = useContext(MyContext);
  const { newRenter, setNewRenter } = useContext(MyContext);
  const { token, setToken } = useContext(MyContext);
  const history = useHistory();

  const fromDatetoDate = (parameter) => {
    // var date=new Date(parameter);
    var month = parameter.getMonth();
    function check() {
      if (month < 10) {
        var h = month;
        month = `0${h}`;
      }
    }
    check();

    var final = `${parameter.getFullYear()}-${month}-${parameter.getDate()}`;
    return final;
  };
  var date = new Date();
  var paymentDate = new Date(date.setMonth(date.getMonth() + 1));

  const [item, setItem] = useState("");
  const [amount, setAmount] = useState(0);
  const [observation, setObservation] = useState("");
  const [occupation, setoccupation] = useState("");

  const [error, setError] = useState();

  const handleBlur = (e) => {
    if (e.target.name === "item") {
      if (e.target.value === "") {
      } else {
        setItem(e.target.value);
      }
    }

    if (e.target.name === "observation") {
      if (e.target.value === "") {
      } else {
        setObservation(e.target.value);
      }
    }

    if (e.target.name === "amount") {
      if (e.target.value === "") {
      } else {
        setAmount(e.target.value);
      }
    }
  };

  const registerExpense = () => {
    if (item === "" || amount === 0) {
      setError(true);
      //  console.log(care_lname)
    } else {
      setError(false);
      let newExpense = {
        item,
        amount,
      };
      if (observation) newExpense.observation = observation;
      axios
        .post("/expense", newExpense, { headers: { Authorization: token } })
        .then((res) => {
          history.push("/app/expense");
        })
        .catch((err) => setError(err));
    }
  };

  const cancelRegistration = () => {
    setItem("");
    setAmount(0);
    setObservation("");
    history.push("/app/expense");
  };

  return (
    <Dashboard>
      <div>
        <Grid xs="12" container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h6">Add Expense</Typography>
          </Grid>
          <Grid item xs={12} className={classes.container}>
            <p className="text-lg font-bold">Expense From Peace Car Wash</p>
            <p className="text-gray-500">Register new expense</p>
            {error ? (
              <p className="text-red-500 mt-2">
                Some Fields shouldn't be left empty
              </p>
            ) : null}
            <Grid xs={12} container spacing={3} className={classes.margin}>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  label="Item"
                  variant="outlined"
                  size="small"
                  name="item"
                  className={classes.width}
                  onChange={(e) => {
                    handleBlur(e);
                  }}
                />
                <TextField
                  margin="dense"
                  label="Amount"
                  variant="outlined"
                  size="small"
                  name="amount"
                  className={`${classes.width} ${classes.otherMarg}`}
                  onChange={(e) => {
                    handleBlur(e);
                  }}
                />
                <TextField
                  margin="dense"
                  label="Observation"
                  variant="outlined"
                  size="small"
                  name="observation"
                  className={`${classes.width} ${classes.otherMarg}`}
                  onChange={(e) => {
                    handleBlur(e);
                  }}
                />
              </Grid>
            </Grid>

            <Grid xs={12} container spacing={3}>
              <Grid item xs={6}>
                <Button
                  onClick={registerExpense}
                  variant="contained"
                  className={`${classes.greenBut} ${classes.width}  ${classes.otherMarg}`}
                >
                  Register
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={cancelRegistration}
                  variant="contained"
                  //   color="red"
                  className={`${classes.blueBut} ${classes.width} ${classes.otherMarg}`}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Dashboard>
  );
}

export default ExpenseRegister;
/* eslint-disable no-unused-vars */
