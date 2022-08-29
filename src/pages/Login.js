/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import bg from "../images/bg.jpg";
import { Link as Linker } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../MyContext";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "80hv",
    marginTop: "30px",
  },
  image: {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide() {
  const history = useHistory();
  const classes = useStyles();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [not, setNot] = useState("");
  const [remember, setRemember] = useState(false);
  const { token, setToken } = useContext(MyContext);
  const [go, setGo] = useState(false);
  const { loged, setLoged } = useContext(MyContext);

  const handleOnblur = (e) => {
    if (e.target.name === "phone") {
      setPhone(e.target.value);
    }

    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleOnChange = (e) => {
    if (e.target.checked) {
      setRemember(true);
    } else {
      setRemember(false);
    }
  };

  const submit = async (pass, phone) => {
    if (pass === "") {
      setPassword("n");
    } else if (phone === "") {
      setPhone("n");
    } else {
      await axios
        .post(`${process.env.REACT_APP_baseApi}/users/signin`, {
          phone_number: phone,
          password: pass,
        })
        .then(
          (response) => {
            if (response.data.message === "Success") {
              localStorage.setItem("token",response.data.token)
              setToken(localStorage.getItem("token"));

              setLoged(true);
              setNot(false);
              history.push("/app");
            }
          },
          (error) => {
            // if (error.message === "Request failed with status code 404") {
            //   console.log(error.message);
            //   
            // }
            setNot(true);
          }
        );
    }
  };

  return (
    <div className="w-2/3 h-96 ml-52 bg-blue-50">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={6} className={classes.image} />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <div className=" mb-10">
              <Typography variant="h6">Sign In to Peace Carwash</Typography>
              <Typography className="text-gray-500" variant="body2">
                Sign In into the car wash, mechanic and rent management platform
              </Typography>
            </div>
            {not ? (
              <Typography className="text-red-500 text-xs " variant="body2">
                invalid phone number or password
              </Typography>
            ) : null}

            <form className={classes.form} noValidate>
              <TextField
                defaultValue=""
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone Number"
                name="phone"
                autoComplete="phone"
                autoFocus
                onBlur={(e) => {
                  handleOnblur(e);
                }}
              />
              {phone === "n" ? (
                <p className="text-sm text-red-500">Phone required</p>
              ) : null}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onBlur={(e) => {
                  handleOnblur(e);
                }}
              />
              {password === "n" ? (
                <p className="text-sm text-red-500">Password Required</p>
              ) : null}

              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    fontSize="small"
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                  />
                }
                label={
                  <span style={{ fontSize: "0.9em", color: "#9c9c9c" }}>
                    Rember me
                  </span>
                }
              />
              {/* <Linker to="/dashboard"> */}
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => {
                  submit(password, phone);
                }}
              >
                Sign In
              </Button>

              {/* </Linker> */}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              {/* <Box mt={5}>
              <Copyright />
            </Box> */}
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
/* eslint-disable no-unused-vars */
