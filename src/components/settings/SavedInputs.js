/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable */
import { Grid, makeStyles } from "@material-ui/core";
import { Paper, TextField, Divider, Button } from "@material-ui/core";
import { MyContext } from "../../MyContext.js";
import jwt from "jwt-decode";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CryptoAES from "crypto-js/aes";
import CryptoENC from "crypto-js/enc-utf8";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: "15px",
    marginRight: "15px",
  },
  marginBottom: {
    marginBottom: "10px",
    marginLeft: "20%",
  },
  height: {
    height: "20%",
  },
  button: {
    minWidth: "30%",
    marginLeft: "20px",
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

export default function SavedInputs() {
  const classes = useStyles();
  const { user, setUser } = useContext(MyContext);
  const { token, setToken } = useContext(MyContext);
  const [log, setLog] = useState("");
  const [creds, setCreds] = useState({});
  const [edited, setEdited] = useState({});
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState("password");

  useEffect(() => {
    setUser(jwt(token));

    async function fetch() {
      await axios
        .get(`/users/`, {
          headers: {
            Authorization: token,
          },
        })
        .then((response) => {
          setLog(response.data);
        })
        .catch((error) => {
          setError(error);
        });
    }
    fetch();
  }, []);

  function handleChange(e) {
    let temp = { ...edited };
    temp[e.target.name] = e.target.value;
    setEdited(temp);
  }

  const decryptP = (password) => {
    var text = CryptoAES.decrypt(password, process.env.REACT_APP_CRYTPO_KEY);
    return text.toString(CryptoENC);
  };
  const updateUser = () => {
    if (Object.keys(edited).length > 0) {
      axios
        .put(`/users/${user.id}`, edited, { headers: { Authorization: token } })
        .then((res) => {
          setUser({
            id: user.id,
            email: res.data.user.email,
            first_name: res.data.user.first_name,
            last_name: res.data.user.last_name,
            phone_number: res.data.user.phone_number,
            password: res.data.user.password,
            role: res.data.user.role,
          });
        })
        .catch((err) => setError(err));
    }
  };
  return (
    <Paper>
      {user && (
        <Grid container xs={12}>
          <Grid item xs={12}>
            <div className="flex mt-2 mb-2">
              <p className=" font-bold ml-4"> Basic Profile </p>
              <p className="ml-4 text-sm text-gray-500">
                You can change your profile
              </p>
            </div>
            <Divider></Divider>
          </Grid>
          <Grid container xs={6}>
            <form
              noValidate
              autoComplete="off"
              className={classes.marginBottom}
            >
              <TextField
                label="First Name"
                variant="outlined"
                size="small"
                defaultValue={user.first_name}
                className={classes.margin}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                name="first_name"
              />
              <TextField
                label="Email"
                variant="outlined"
                size="small"
                defaultValue={user.email}
                className={classes.margin}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
                name="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                name="password"
                defaultValue={decryptP(user.password)}
                label="Password"
                type={showPassword}
                id="password"
                autoComplete="current-password"
                size="small"
                onChange={handleChange}
                onFocus={() => setShowPassword("text")}
                onBlur={() => setShowPassword("password")}
              />
            </form>
          </Grid>
          <Grid xs={6} container>
            <form noValidate autoComplete="off">
              <TextField
                label="Last Name"
                variant="outlined"
                className={classes.margin}
                size="small"
                defaultValue={user.last_name}
                onChange={handleChange}
                name="last_name"
              />
              <TextField
                label="
                 Phone Number"
                variant="outlined"
                size="small"
                className={classes.margin}
                defaultValue={user.phone_number}
                name="phone_number"
              />
            </form>
          </Grid>
          <Grid item xs={12}>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              href="#contained-buttons"
              className={classes.button}
              onClick={updateUser}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}
