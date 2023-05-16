import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useState } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ReactDOM from 'react-dom/client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
function App() {
  
  const [formData,setFormData] = useState({
    name: '',
    author: '',
  });

  const handleChange = (e) => {
    console.log(e.target.value)
    setFormData({
      ...formData,
      
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log(formData.email)
    axios.post("http://localhost:8000/submitdata",formData).then(response =>{
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });

  };

  const getAllBooks = (e) => {
    e.preventDefault();
 
   
    axios.get("http://localhost:8000/getAllBooks").then(response =>{
      console.log(response.data.Items[0]);
    })
    .catch(error => {
      console.error(error);
    });

  };

  return (
    <div className="App">
      <h1>HACKERSHRINE</h1> 
      
      <form onSubmit={handleSubmit}>
      
            Name: <input type="text" name="name" value={formData.name} onChange={handleChange} style={{
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '200px',
    margin: '15px'
 
  }}/>
            Author: <input type="text" name="author" value={formData.author} onChange={handleChange} style={{
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '200px',
    margin: '15px'
   
  }}  />
          
          <Button  type="submit" variant="contained"> Add </Button>
         
    </form>
    
     <form onClick={getAllBooks}>
    <Button type='submit' variant="outlined"  > Get List of all the books </Button>

    </form>

    </div>
  );
}

export default App;
