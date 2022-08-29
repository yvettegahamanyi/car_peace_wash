/* eslint-disable no-unused-vars */
import React, { useContext,useEffect ,useState} from "react";
    
function New(){

    const [theReport,setTheReport]=useState("");

    return(
        <div>
           <button onClick={()=>{
               setTheReport("pipo");
               console.log(theReport);
           }}>hello</button>
        </div>
    )

}

export default New;