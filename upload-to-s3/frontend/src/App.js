import { useState, useEffect } from "react";
import axios from "axios";
// import { Stack }  from '@material-ui/core';
import { Button, Container, Grid, GridList, Box, ListItem, List, ListItemText } from "@material-ui/core";
import { SendOutlined, ExpandMoreIcon } from "@material-ui/icons";

function App() {

  const style = {
    minWidth: 1,
  
    margin: '10px'
 }

  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [files, setFiles] = useState([]);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log(formData)
    console.log(selectedFile.name)

    axios.post('http://localhost:8000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    }).then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }


  const handleFiles = () => {

    axios.get('http://localhost:8000/getallfiles')
      .then((response) => {
        setFiles(response.data.Contents);

      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div>


    <Box sx={{ flexGrow: 4 }}> 
      <Container container spacing={2}>


        <h1>HACKERSHRINE</h1>
        
        <Grid item sm={8}>
        
        <Button variant="contained" component="label">
          Choose file
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
             
        <Button style={style} onClick={handleUpload} variant="contained" color="primary" endIcon={<SendOutlined/>}> Upload </Button>
         
        </Grid>
       
        <Grid item sm={6}>
        <Button onClick={handleFiles} variant="contained" color="primary" >Get files</Button>
          <h1>List of Files:</h1>
          <List>
          {files.map((file, index) => (
            <ListItem key={index}>
                <ListItemText primary={file.Key} /> 
            </ListItem>
         ))}
          </List>
        </Grid>
      </Container>
      
    </Box>

    </div>
  );
}

export default App;
