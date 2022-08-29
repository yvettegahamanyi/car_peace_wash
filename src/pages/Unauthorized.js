import React from 'react';
import Button from "@material-ui/core/Button";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  submit: {
    // margin: theme.spacing(3, 0, 2),
    margin:10,
    width:100

  },
}));


const Unauthorized = () =>{
  const history =useHistory();
  const classes = useStyles();
  return(
    <div class="bg-white">
    <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
        <div className="border-t border-gray-200 text-center pt-8">
          <h1 className="text-9xl font-bold text-blue-500">403</h1>
          <h1 className="text-6xl font-medium py-8">oops! You are unauthorized</h1>
          <p className="text-2xl pb-8 px-12 font-medium">Oops! You can't see the content on this page. You need to get access to see it.</p>
          {/* <button className="bg-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 mr-6">
          HOME
          </button> */}
          <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={()=>{
                      history.push("/")
                    }}
                  >
                    HOME
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={()=>{
                      history.goBack()
                    }}
                  >
                    BACK
                  </Button>
        </div>
      </div>
    </div>
    </div>
  )


}

export default Unauthorized;