import { Grid, makeStyles } from "@material-ui/core";
import {
  Paper,
  Checkbox,
  FormControlLabel,
  Divider,
  Button,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: "10px",
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
  },
}));

export default function SavedInputs() {
  const classes = useStyles();
  return (
    <Paper>
      <Grid container xs={12} spacing={2}>
        <Grid item xs={12}>
          <div className="flex mt-2 mb-2">
            <p className=" font-bold ml-4"> Notification </p>
            <p className="ml-4 text-sm text-gray-500">
              Manage notification messages
            </p>
          </div>

          <Divider></Divider>
        </Grid>
        <Grid item xs="2">
          <div className="ml-10 text-sm">
            <FormControlLabel
              control={
                <Checkbox name="checkedB" color="primary" checked={true} />
              }
              label="Email"
              className={classes.font}
            />
          </div>
        </Grid>
        <Grid item xs={2}>
          <div className="ml-10">
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="SMS"
            />
          </div>
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
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
