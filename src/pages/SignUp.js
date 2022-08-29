/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import bg from "../images/bg.jpg";
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
import { useHistory } from 'react-router-dom';
import axios from 'axios';



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
    margin: theme.spacing(4, 4),
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


export default function SignUpSide() {

  
  const classes = useStyles();
  const [error, setError] = useState("");
  const [fname,setFname]=useState("");
  const [lname,setLname]=useState("");
  const [phone,setPhone]=useState("");
  const [pass,setPass]=useState("");
  const [email,setEmail]=useState("");
  const [empty,setEmpty]=useState(false);
  const [inUse,setInUse]=useState(false);
  const [remember,setRemember]=useState("");
  const history =useHistory();
 const handleOnChange=(e)=>{

  if(e.target.name==="fname"){
       setFname(e.target.value);
  
  }

  if(e.target.name==="lname"){


       setLname(e.target.value);
      

  }

  if(e.target.name==="phone"){

  
       setPhone(e.target.value);

       if(phone.length>9){
        
       }
      
       
  }


if(e.target.name==="pass"){

   
       setPass(e.target.value);
      
 

  }

  if(e.target.name==="email"){

   
    setEmail(e.target.value);
   


}

 }
  const handleChange=(e)=>{
    if(e.target.checked){
    setRemember(true);
    }
    else{
      setRemember(false);
    }
    
    }

    const submit=async(
        fname,lname,password,phone
    )=>{

      

      if(fname===""||lname===""||password===""||phone===""||email===""){
  setEmpty(true);
      }
      if(empty){
        if(fname===""){
          setFname("n")
        }
         if(lname===""){
          setLname("n")
        }
         if(password===""){
          setPass("n")
        }
        if(phone===""){
          setPhone("n")
       
        }
        if(isNaN(phone)){
           setPhone("un");
       }
        if(phone.length>10){
           setPhone("inv");
       }
      }
    else{
      console.log({
        first_name: fname,
         last_name: lname,
         phone_number:phone,
         email:email,
         role: "611d8a1191640d4534c50e62",
         password: password
       });
 await axios.post('/users/signup', {
 first_name: fname,
  last_name: lname,
  phone_number:phone,
  email:email,
  role: "611d8a1191640d4534c50e62",
  password: password
})
.then((response) => {
  var message=response.data.message;
  if(message==="Failed! Phone number is already in use!"){
    setError("Phone number is already in use");
  }
  else{
    setInUse(false);
    history.push("/wait")
  }
}, (error) => {
  if(password.length >= 6){
  setError("Phone number is already in use");

  }else{
  setError("password must be at least 6 characters long");

  }
  console.log(error);
});
    }
    }

  

  return (
    <div className="w-2/3 h-96 ml-52">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square >
          <div className={classes.paper}>

            <div className=" mb-4">
              <Typography variant="h6">Sign Up to Peace Carwash</Typography>
              <Typography className="text-gray-500" variant="body2">
                Sign In into the car wash, mechanic and rent management platform
              </Typography>
            </div>
            <div className="text-red-500 text-sm"> 
  
   </div>
            

            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="first_name"
                label="First Name"
                name="fname"
                autoComplete="first_name"
                size="small"
                
                autoFocus
                inputProps={{ spellCheck: 'false' }}
                onChange={(e)=>{handleOnChange(e);}}
              />
              {fname==="n"?<p className="text-red-500 text-xs">First Name required</p>:null}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lname"
                label="Last Name"
                name="lname"
                autoComplete="lname"
                autoFocus
                size="small"
                inputProps={{ spellCheck: 'false' }}
                onChange={(e)=>{handleOnChange(e);}}
              />
              {lname==="n"?<p className="text-red-500 text-xs"> Last Name required</p>:null}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="lname"
                autoFocus
                size="small"
                inputProps={{ spellCheck: 'false' }}
                onChange={(e)=>{handleOnChange(e);}}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone number"
                name="phone"
                autoComplete="phone number"
                autoFocus
                size="small"
                onChange={(e)=>{handleOnChange(e);}}
              />
              {phone==="n"?<p className="text-red-500 text-xs">Phone number required</p>:inUse?<p className="text-red-500">Change Number</p>:
            phone==="un"?  <p className="text-red-500 text-xs">Only numbers are allowed</p>:phone==="inv"?
            <p className="text-red-500 text-xs">Invalid number</p>:null
            }
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="pass"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                size="small"
                onChange={(e)=>{handleOnChange(e);}}
              />
              {pass==="n"?<p className="text-red-500 text-xs">Password required</p>:null}

              {error !== "" ? (
              <p className="text-red-500 text-xs">{error}</p>
            ) : null}
              <FormControlLabel
                control={
                  <Checkbox value="remember" name="remember" 
                  
                  color="primary" fontSize="small"
                  
                  onChange={(e)=>{
                    handleChange(e);
                  }}
                  />
                }
                label={
                  <span style={{ fontSize: "0.9em", color: "#9c9c9c" }}>
                    Rember me
                  </span>
                }
              />
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=>{submit(fname,lname,pass,phone)}}
               
              >
                Sign Up
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Already Have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
        <Grid item xs={false} sm={4} md={6} className={classes.image} />
      </Grid>
    </div>
  );
}
/* eslint-enable no-unused-vars */
