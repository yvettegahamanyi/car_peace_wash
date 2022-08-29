import { Grid } from "@material-ui/core";
import React from "react";
import Header from "./settings/Header.js";
import Dashboard from "../layout/Dashboard.js";
import Profile from "./settings/Profile.js";
import Account from "./settings/Account";
import Notifications from "./settings/Notifications.js";

export default function CenteredTabs(props) {
  const [nav, setNav] = React.useState(
    props.location.state ? props.location.state.nav : 0
  );
  return (
    <Dashboard>
      <div>
        <Grid item={true} container xs={12} spacing={3}>
          <Grid item={true} xs={12}>
            <Header navValue={nav} setNav={setNav}></Header>
          </Grid>
          <Grid item={true} xs={8} className="mt-2">
            {nav === 0 ? (
              <Profile></Profile>
            ) : nav === 1 ? (
              <Account></Account>
            ) : (
              <Notifications></Notifications>
            )}
          </Grid>
        </Grid>
      </div>
    </Dashboard>
  );
}
