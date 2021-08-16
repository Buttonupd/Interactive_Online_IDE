import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [output, setOutPut] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");

  const handleSubmit = async () => {
    const payload = {
      language: language,
      code,
    };
    try {
      setJobId("");
      setStatus("");
      setOutPut("");
      const { data} = await axios.post("http://127.0.0.1:5000/run", payload);
      console.log(data);
      setJobId(data.jobId);
      let intervalId;
      
      intervalId = setInterval( async() =>{
        const {data:dataRes} = await axios.get("http://127.0.0.1:5000/status",
        {params: {id: data.jobId}});
        const {success, job, error} = dataRes;
      
        if(success){
          const {status: jobStatus, output:jobOutput} = job;
          setStatus(jobStatus);
          if (jobStatus === "pending") return;
          setOutPut(jobOutput);
          clearInterval(intervalId);
        }
        else{
          setStatus("Error Please Retry");
          console.log(error);
          clearInterval(intervalId);
          setOutPut(error)
        }
        console.log(dataRes);
      }, 1000)  ;
      
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        setOutPut(errMsg)

      } else {
        setOutPut("Error connecting to server");
      }
    }
  };

  return (
    <div className="App">
      <h1>Online Compiler</h1>
      <div>
        <label>Language: </label>
        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            console.log(e.target.value);
          }}
        >
          <option value="cpp">C++</option>
          <option value="py">Python</option>
          <option value="js">Javascript</option>
          <option value="war">Java</option>
          <option value="c">C</option>
        </select>
      </div>
      <br />
      <textarea
        rows="20"
        cols="75"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
        }}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
      <p>{status}</p>
      <p>{jobId && `jobId:${jobId}`}</p>
    </div>
  );
}

export default App;
