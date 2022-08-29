import Dashboard from "./pages/Dashboard";
import Settings from "./components/Settings"

const  routes=[{
    path:'dashboard',
    element:<Dashboard/>,
    children:[
        {path:'settings',element:<Settings/>}
    ]
}]

export default routes;