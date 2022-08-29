// import { Grid ,Paper} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { Avatar, Grid, Paper } from "@material-ui/core";
import BusinessIcon from '@material-ui/icons/Business';



const useStyles = makeStyles((theme) => ({

  avatar:{
      backgroundColor:"#EC4C47"
    },
    paper:{
height:"100%",
width:"55%"
    }

}))

const cardInfo=[
    {title:"profits",amount:"24,0000",period:"month"},
    {title:"profits",amount:"24,0000",period:"month"},
    {title:"profits",amount:"24,0000",period:"month"}
];



export default function Cards() {
const classes=useStyles();
  return (
    <div>
     <Grid container spacing={3} >
       {cardInfo.map((info,index)=>(
         <Grid item={true} xs={4} key={index}>
         <Paper className={classes.paper}>
           <div className="flex">
           <div className="ml-4 pt-2">
           <p className="text-gray-500 font-bold uppercase">{info.title}</p>
           <p className="text-lg mt-1">{info.amount}</p>
           <p className="text-sm pt-2">Since {info.period}</p>
           </div>
           <div className="mt-4 ml-4 ">
             <Avatar className={`
               ${classes.avatar} sm:hidden md:hidden lg:hidden`
             } > <BusinessIcon></BusinessIcon> </Avatar>
           </div>
           </div>
           
         </Paper>
         </Grid>
         
       ))}


     </Grid>
    
    </div>
  );
}
