import AssessmentIcon from '@material-ui/icons/Assessment';
import { Divider, IconButton } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';

export function Reports(){


    const reports=[{name:"Profits report", id:"pr"},{name:"Expenses report", id:"er"},{name:"Night report", id:"nr"},{name:"Day report", id:"dr"},{name:"Renting report", id:"dr"}]

    function view( index){
 console.log(reports[index]);
    }
    return(
<>
<p className=" text-gray-600">Prefered reports</p>

<div>
    {reports.map((report,index)=>(
<div key={index}>
<div className="flex mt-6" >
<div>
    <AssessmentIcon fontSize="large" color="primary"></AssessmentIcon>
</div>
<div className="ml-2">
    <p className="font-semibold text-xs">{report.name}</p>
    <p className="text-xs">It is downloadable</p>
</div>
<div>
    <div className="ml-6">
    <IconButton size="small" onClick={()=>{view(index)}}>
    <VisibilityIcon fontSize="small" color="primary"></VisibilityIcon>
    </IconButton>
  
    </div>
</div>
</div>
<Divider/>
</div>

    ))}


</div>
</>
    )
}