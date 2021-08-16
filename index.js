// Dependencies
const { json } = require("express");
const mongoose = require("mongoose");
const express = require("express");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const { executePy } = require("./executePy");
const {addJobToQueue} = require("./jobQueue")
const Job = require("./models/Job");

// Initialize Mongo Connection. Import the schema from the model.
mongoose.connect(
  "mongodb://localhost/compilerapp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log("Successfully connected to the database");
  }
);

// initialize the app
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// define the function routing
// route root


//Define a post req route
app.post("/run", async (req, res) => {
  //get the properpties(extract) of a request
  // const language = req.body.language;
  // const code = req.body.code;
  //or

  const { language = "cpp", code } = req.body;
  console.log(language);
  // Handle empty requests
  if (code === undefined) {
    return res.status(404).json({ success: false, error: "Empty code body" });
  }

  // we need to get the c++ content written into a file from the request
  // we need to run the file
  // return the response
  let job;
  // Place job instance in a try catch block

  try {
    // generate the filepath- -send response
    const filepath = await generateFile(language, code);

    job = await new Job({ language, filepath}).save();
    const jobId = job["_id"];
    addJobToQueue(jobId);
    console.log(job);
    res.status(201).json({success:true, jobId});

    //we need to run the file and send the response

    let output;
  //   job["startedAt"] = new Date();
    
  //   if (language === "cpp") {
  //     output = await executeCpp(filepath);
  //   } else {
  //     output = await executePy(filepath);
  //   }

  //   console.log(output);

  //   job["completedAt"] = new Date();
  //   job["status"] = "success";
  //   job["output"] = output;
    
  //   await job.save();
  //   // return res.json({ filepath, output });
  //   console.log(job);
  // } catch (err) {
  //   // res.status(500).json({ err });
  //   job["completedAt"] = new Date();
  //   job["status"] = "error";
  //   job["output"] = JSON.stringify(err)

  //   await job.save();
  //   console.log(err);
  } catch (err) {
    return res.status(500).json({success:false})
  }
});

app.get("/status", async (req, res) => {
  const jobId = req.query.id;

  if (jobId === undefined) {
    return res
      .status(400)
      .json({ success: false, error: "missing id query param" });
  }
  try {
  const job = await Job.findById(jobId);
  console.log("status requested", jobId);
  if (job === undefined) {
    return res.status(404).json({ success: false, error: "couldn't find job" });
  }
  return res.status(200).json({success:true, job});
  } catch (err){
    return res.status(400).json({ success: false, error:JSON.stringify(err) });
}
 
});
// Define and environment variable file
//Define the port the app is running on locally
port = process.env.port || 5000;

//app listens function
app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
