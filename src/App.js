/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";

import ShowDay from "./components/dayServices/ShowDay"
import { createBrowserHistory } from "history";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./App.css";
import { MyContext } from "./MyContext";
import { useEffect, useState } from "react";
import Dash from "./components/Dash";
import DayServices from "./components/dayServices/ServiceList";
import VehichlePayment from "./components/dayServices/VehichlePayment";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import socketIOClient from "socket.io-client";
import RegisterDay from "./components/dayServices/DayServices";
import RentingList from "./components/renting/RentingList";
import RentingRegister from "./components/renting/RentingRegister";
import RentPayement from "./components/renting/RentPayement";
import Settings from "./components/Settings";
import RentingPayment from "./components/renting/RentPayement";
import DayTableReport from "./components/reports/DayTableReport";
import NightList from "./components/nightServices/nyabugogo/NightList";

import AfterSignUp from "./pages/AfterSigUp";
import EditDayService from "./components/dayServices/EditDaySevice";
import EdtitNyabugogo from "./components/nightServices/nyabugogo/EditNight";
import RentingEdit from "./components/renting/RentingEdit";
import Unauthorized from "../src/pages/Unauthorized";
import ProtectedRoute from "../src/components/ProtectedRoute";
import NotFound from "../src/pages/NotFound";
import ExpenseRegister from "./components/expenses/ExpenseRegister";
import ExpenseList from "./components/expenses/ExpenseList";
import Night from "./components/nightServices/NightChoose";
import RegN from "./components/nightServices/nyabugogo/NightRegister";
import Main from "./components/reports/Main";
import Daily from "./components/reports/invoices/Daily";
import TableReport from "./components/reports/TableReport";
import Weekly from "./components/reports/invoices/Weekly";

import NList from "./components/nightServices/remera/NightList";
import Redit from "./components/nightServices/remera/EditNight";
import Reg from "./components/nightServices/remera/NightRegister";
const ENDPOINT = "https://garage--backend.herokuapp.com";




function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [open, setOpen] = useState(true);
  const [serviceList, setServiceList] = useState("");
  const [toBePayed, setToBePayed] = useState("");
  const [user, setUser] = useState();
  const [roles, setRoles] = useState();
  const [loged, setLoged] = useState(true);
  const [toEdit, setToEdit] = useState("");
  const [search, setSearch] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [groups, setGroups] = useState("");
  const [reporter, setReporter] = useState("");
  const [invoicer, setinvoicer] = useState("");
  const [theReport, setTheReport] = useState("");

  async function getRoles() {
    await axios
      .get("/roles", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const getGroups = async () => {
    await axios
      .get("/group", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGroups();
    getRoles();
  }, []);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.once("new_notification", (data) => {
      // let nots = localStorage.getItem("notifications");
      // if (!nots) nots = [];
      let nots = [...notifications];
      nots.push({
        msg: data.message,
        date: new Date().toISOString().split("T")[0],
      });
      setNotifications(nots);
      // localStorage.setItem("notifications", nots);
    });
  }, []);

  const history = createBrowserHistory();

  return (
    <MyContext.Provider
      value={{
        token,
        setToken,
        open,
        setOpen,
        toBePayed,
        setToBePayed,
        user,
        setUser,
        loged,
        setLoged,
        toEdit,
        setToEdit,
        search,
        setSearch,
        notifications,
        setNotifications,
        groups,
        setGroups,
        reporter,
        setReporter,
        invoicer,
        setinvoicer,
        theReport,
        setTheReport,
        roles,
      }}
    >
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <ProtectedRoute
              path="/app"
              permissions={["admin", "user"]}
              user={token}
              exact
              component={Dash}
            />

            <ProtectedRoute
              path="/app/settings"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={Settings}
            />

            <ProtectedRoute
              path="/app/rent"
              user={token}
              permissions={["admin"]}
              exact
              component={RentingList}
            />
            <ProtectedRoute
              path="/app/rent/payment"
              user={token}
              permissions={["admin"]}
              exact
              component={RentingPayment}
            />
            <ProtectedRoute
              path="/app/rent/register"
              user={token}
              permissions={["admin"]}
              exact
              component={RentingRegister}
            />

            <ProtectedRoute
              path="/app/rent/edit"
              user={token}
              permissions={["admin"]}
              exact
              component={RentingEdit}
            />

            <ProtectedRoute
              path="/app/dayservices"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={DayServices}
            />
            <ProtectedRoute
              path="/app/dayservices/payment"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={VehichlePayment}
            />
            <ProtectedRoute
              path="/app/dayservices/register"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={RegisterDay}
            />
               <ProtectedRoute
              path="/app/day/view"
              user={token}
              permissions={["admin","user"]}
              exact
              component={ShowDay}
            />
            <ProtectedRoute
              path="/app/dayservices/edit"
              user={token}
              permissions={["admin"]}
              exact
              component={EditDayService}
            />

            <ProtectedRoute
              path="/app/nyabugogoNight"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={NightList}
            />
            <ProtectedRoute
              path="/app/night"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={Night}
            />

            <ProtectedRoute
              path="/app/night/remera"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={NList}
            />
            <ProtectedRoute
              path="/app/night/remera/edit"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={Redit}
            />

            <ProtectedRoute
              path="/app/night/remera/register"
              user={token}
              permissions={["admin", "user"]}
              exacts
              component={Reg}
            />

            <ProtectedRoute
              path="/app/night/nyabugogo/register"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={RegN}
            />

            <ProtectedRoute
              path="/app/night/nyabugogo/edit"
              user={token}
              permissions={["admin"]}
              exact
              component={EdtitNyabugogo}
            />

            <ProtectedRoute
              path="/app/expense"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={ExpenseList}
            />
            <ProtectedRoute
              path="/app/expense/register"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={ExpenseRegister}
            />
            <ProtectedRoute
              path="/app/reports"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={Main}
            />

            <ProtectedRoute
              path="/app/invoice/daily"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={Daily}
            />
            <ProtectedRoute
              path="/app/invoice/weekly"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={Weekly}
            />
            <ProtectedRoute
              path="/app/report/table"
              user={token}
              permissions={["admin", "user"]}
              exact
              component={TableReport}
            />
            <ProtectedRoute
              path="/app/dayReport/table"
              user={token}
              permissions={["admin","user"]}
              exact
              component={DayTableReport}
            />

            <Route path="/wait" exact component={AfterSignUp} />
            <Route exact path="/unauthorized" component={Unauthorized} />
            <Route path="" exact component={NotFound} />
          </Switch>
        </Router>
      </div>
    </MyContext.Provider>
  );
}

export default App;
