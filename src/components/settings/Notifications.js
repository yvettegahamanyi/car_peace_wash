/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { MyContext } from "../../MyContext.js";
import axios from "axios";

const styles = (theme) => ({
  root: {
    width: "100%",
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    padding: 20,
  },
});

function Notifications(props) {
  const { classes } = props;
  const { token, setToken } = useContext(MyContext);
  const { notifications, setNotifications } = useContext(MyContext);
  const [error, setError] = useState("");

  const removeNotification = (id, index, type) => {
    let api = type === "day" ? "dactivity" : "nactivity";

    axios
      .put(
        `/${api}/update/${id}`,
        { seen: true },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        let temp = [...notifications];
        temp.slice(index, 1);
        // temp = temp.filter((x, i) => i !== index);
        setNotifications(temp);
      })
      .catch((err) => setError(err));
  };

  // console.log(notifications);
  // useEffect(() => {
  //   let temp = localStorage.getItem("notifications");
  //   if (temp) setNots(temp);
  //   else setNots([]);
  // }, [notifications]);

  return (
    <div className="ml-20">
      <div className="mb-5 font-bold">Notifications</div>

      <List className={classes.root}>
        {notifications.length > 0 ? (
          notifications.map((item, index) => (
            <ListItem
              key={index}
              button
              onClick={() => removeNotification(index)}
            >
              <ListItemText selected primary={item.msg} secondary={item.date} />
            </ListItem>
          ))
        ) : (
          <div className="mb-5">No new activities.</div>
        )}
      </List>
    </div>
  );
}

Notifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notifications);
