import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container } from "@material-ui/core";
// import { Hello } from "@material-ui/icons";

function App() {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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



  // useEffect(() => {
  //   axios.get("http://localhost:8000").then((response) => {
  //     console.log(response)
  //     setMessage(response.data["name"]);
  //   });
  // }, []);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;
