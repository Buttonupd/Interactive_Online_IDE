// Dependencies
const { json } = require("express");
const express = require("express");
const { generateFile } = require('./generateFile')
const { executeCpp } = require("./executeCpp")
// initialize the app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// define the function routing
// route root
app.get("/", (req, res) => {
  return res.send("Hello world");
});

//Define a post req route
app.post("/run",  async(req, res) => {
  //get the properpties(extract) of a request
  // const language = req.body.language;
  // const code = req.body.code;
  //or

  const { language = "cpp", code } = req.body;

  // Handle empty requests
  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Empty code body" });
  }

  // we need to get the c++ content written into a file from the request
  // we need to run the file
  // return the response
  try {
  // generate the filepath- -send response
  const filepath = await generateFile(language, code);

  //we need to run the file and send the response
  const output = await executeCpp(filepath)

  return res.json({filepath, output});
  } catch(err) {
    res.status(500).json({err})
  }
});

// Define and environment variable file
//Define the port the app is running on locally
port = process.env.port || 5000;

//app listens function
app.listen(port, () => {
  console.log(`App listening on http://127.0.0.1:${port}`);
});
