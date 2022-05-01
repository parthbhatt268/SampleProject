import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import BasicTable from './Table'



function Text() {
    //---------------------------------------------------------//
    const[name, setName] = useState('')
    const[id, setId] = useState('')
    const[data, setData] = useState([])


    const nameUpdate = (e)=>{
        setName(e.target.value)
    }
    const idUpdate = (e)=>{
        setId(e.target.value)
    }
    //--------------------------------------------------------//

    const update = async()=>{                // submit button
 
        const response = await axios.post('http://localhost:8000/employees',{empName: name, empId: id})
        console.log("Response", response)

        axios.get('http://localhost:8000/getemployees')
            .then(response => setData(response.data));
        reset()

    }

    const reset = ()=>{
        const nullname = ' '
        const nullid = ' '
        setName(nullname)
        setId(nullid)
    }
    //--------------------------------------------------------//
  
    useEffect(() => {
        // GET request using axios inside useEffect React hook
        axios.get('http://localhost:8000/getemployees')
            .then(response => setData(response.data));
        
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);


  return (
    <>
    <div>
    <br/>
    <TextField id="outlined-basic" label="Employee Name" variant="outlined" width="100%" 
    onChange={nameUpdate} value={name}/> <br/><br/>

    <TextField id="outlined-basic" label="Employee ID" variant="outlined" 
    onChange={idUpdate} value={id}/> <br/><br/>

    <Button variant="contained" onClick={update}>Submit</Button> <span></span><span></span>
    <Button variant="contained" onClick={reset}>Reset</Button> <br/><br/>   

   
    
   {/*<div>
   {JSON.stringify(data)}
   </div>*/}

   <BasicTable data={data}/>


    </div>
    </>

  )
}

export default Text