/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Delete from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import { Grid } from "@material-ui/core";
import { MyContext } from "../../MyContext";
import axios from "axios";

const columns = [
  { id: "names", label: "User", minWidth: 100, align: "left" },
  { id: "date", label: "Date", minWidth: 100, align: "left" },
  { id: "status", label: "Role", minWidth: 100, align: "left" },
  { id: "actions", label: "Actions", minWidth: 100, align: "left" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
  background: {
    fontWeight: "bold",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const { token, roles, user } = useContext(MyContext);
  const [all_users, setAllUsers] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getPendingAccounts =React.useCallback( async() => {
    axios({
      method: "post",
      url: "/users/pending",
      headers: { Authorization: token },
    })
      .then((res) => setData(res.data))
      .catch((err) => setError(err));
  },[token]);

  const getAllUsers = React.useCallback( async () =>  {
    axios({
      method: "get",
      url: "/users",
      headers: { Authorization: token },
    })
      .then((res) => {
        let fil_users = res.data.filter(
          (u) => u._id !== user.id && u.account_status !== "DELETE"
        );
        setAllUsers(fil_users);
      })
      .catch((err) => setError(err));
  },[ user.id, token]);

  const changeAccountStatus = async (id, status, object) => {
    // axios.put(`/users/${id}`, {account_status:"APPROVED"})
    axios({
      method: "put",
      url: `/users/${id}`,
      data: { account_status: status },
      headers: { Authorization: token },
    })
      .then((res) => {
        let temp = object === "data" ? [...data] : [...all_users];
        temp = temp.filter((x) => x._id !== id);

        if (object === "data") setData(temp);
        else setAllUsers(temp);
      })
      .catch((err) => setError(err));
  };

  const changeRole = async (e, id, object) => {
    let temp = object === "data" ? [...data] : [...all_users];
    let index = temp.findIndex((x) => x._id === id);
    temp[index].role = roles.find((x) => x._id === e.target.value);

    if (object === "data") setData(temp);
    else setAllUsers(temp);

    axios
      .put(
        `/users/${id}`,
        { role: e.target.value },
        { headers: { Authorization: token } }
      )
      .then((res) => {})
      .catch((err) => setError(err));
  };

  useEffect(() => {
    getPendingAccounts();
    getAllUsers();
  }, [getPendingAccounts, getAllUsers]);

  return (
    <div className="mt-10">
      <Paper className={classes.root}>
        <Grid container spacing={3} xs={12}>
          <Grid item xs={10}>
            <div className="flex ml-4 mb-6 mt-4 ">
              <p className="font-bold">List of Pending Accounts</p>
              <p className="text-sm text-gray-500 ml-2">{data.length} total</p>
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
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={item._id}
                    >
                      <TableCell>{`${item.first_name}  ${item.last_name}`}</TableCell>
                      <TableCell>{item.registration_date}</TableCell>
                      <TableCell>
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={item.role._id}
                            onChange={(e) => changeRole(e, item._id, "data")}
                          >
                            <MenuItem value={roles[0]._id}>
                              {roles[0].name}
                            </MenuItem>
                            <MenuItem value={roles[1]._id}>
                              {roles[1].name}
                            </MenuItem>
                            <MenuItem value={roles[2]._id}>
                              {roles[2].name}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          title="Approve"
                          onClick={() =>
                            changeAccountStatus(item._id, "APPROVED", "data")
                          }
                        >
                          <CheckIcon
                            fontSize="small"
                            className="ml-2 text-gray-500"
                          ></CheckIcon>
                        </Button>
                        <Button
                          onClick={() =>
                            changeAccountStatus(item._id, "DELETE", "data")
                          }
                        >
                          <Delete
                            className="ml-1 text-gray-500"
                            fontSize="small"
                          ></Delete>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
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

      <div style={{ margin: "50px" }}></div>

      <Paper className={classes.root}>
        <Grid container spacing={3} xs={12}>
          <Grid item xs={10}>
            <div className="flex ml-4 mb-6 mt-4 ">
              <p className="font-bold">List of All Accounts</p>
              <p className="text-sm text-gray-500 ml-2">
                {all_users.length} total
              </p>
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
              {all_users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={item._id}
                    >
                      <TableCell>{`${item.first_name}  ${item.last_name}`}</TableCell>
                      <TableCell>{item.registration_date}</TableCell>
                      <TableCell>
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            value={item.role._id}
                            onChange={(e) => changeRole(e, item._id, "users")}
                          >
                            <MenuItem value={roles[0]._id}>
                              {roles[0].name}
                            </MenuItem>
                            <MenuItem value={roles[1]._id}>
                              {roles[1].name}
                            </MenuItem>
                            <MenuItem value={roles[2]._id}>
                              {roles[2].name}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          title="Suspend User"
                          onClick={() =>
                            changeAccountStatus(item._id, "PENDING", "users")
                          }
                        >
                          <CloseIcon
                            fontSize="small"
                            className="ml-2 text-gray-500"
                          ></CloseIcon>
                        </Button>
                        <Button
                          title="Delete User"
                          onClick={() =>
                            changeAccountStatus(item._id, "DELETE", "users")
                          }
                        >
                          <Delete
                            className="ml-1 text-gray-500"
                            fontSize="small"
                          ></Delete>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
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
    </div>
  );
}
/* eslint-disable no-unused-vars */
