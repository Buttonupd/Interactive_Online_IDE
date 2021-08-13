// import dependencies
const path = require("path");
const fs = require("fs");

const { v4: uuid } = require("uuid");
//using uuid v4 as a variable in our code bad
//instead import uuid v4 and extract the provided uuid
//rename it as uuid

const dirCodes = path.join(__dirname, "codes");
//define a desired location to source code from

if (!fs.existsSync(dirCodes)) {
  //handle instances which break code
  //like handling the inexistence of the 'codes' folder
  //this functions checks if it exists
  //if false, generate the folder using 'fs' module
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {
  //generate a uniqueCode for every generated code
  //use .join to add .cpp extensions for c++ files(code)

  const jobId = uuid();
  const filename = `${jobId}.${format}`;

  //create a filepath using dirCodes
  const filepath = path.join(dirCodes, filename);
  await fs.writeFileSync(filepath, content);
  return filepath;
};

module.exports = {
  generateFile,
};
