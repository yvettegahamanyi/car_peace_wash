import { Grid, makeStyles, Paper } from "@material-ui/core";
import Cards from "./dashboard/Cards.js";
import Chart from "./dashboard/Chart";
import clsx from "clsx";
import Dashboard from "../layout/Dashboard.js";
import { Reports } from "./dashboard/Reports.js";

const useStyles = makeStyles((theme) => ({
  fixedHeight: {
    height: 360,
    width: "80%",
  },
  margin: {
    marginTop: "5%",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Dash() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Dashboard>
      <div>
        <Cards></Cards>
        <div className="flex">
          <Grid container className={classes.margin} spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
              <Paper className={fixedHeightPaper}>
                <p className="font-bold">Cash Flow</p>
                <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <Reports />
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </Dashboard>
  );
}
