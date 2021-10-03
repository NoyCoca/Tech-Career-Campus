const dotenv = require("dotenv");
dotenv.config();
const dbConnection = process.env.dbConnection;
const dbConnection_test = process.env.dbConnection_test;
const mongoose = require("mongoose");
const chalk = require("chalk");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const rel = "mongodb+srv://Tech-Career:5f4dlTe1Y4cXQ5Pj@tech-career.w0ebs.mongodb.net/Teach_Career?retryWrites=true&w=majority"
  if (process.env.TEST_ENV === "test") {
    console.log(dbConnection_test);
     mongoose
      .connect(dbConnection_test, options)
      .then(() => {
        console.log(chalk.green("mongoDB connected"));
      })
      .catch((err) => {
        console.log(chalk.red("Connection error", err.message));
      });
    
    }else{
      console.log(dbConnection);
      mongoose
      .connect(dbConnection, options)
      .then(() => {
        console.log(chalk.green("mongoDB connected"));
      })
      .catch((err) => {
        console.log(chalk.red("Connection error", err.message));
      });
    }

const db = mongoose.connection;
module.exports = db;
