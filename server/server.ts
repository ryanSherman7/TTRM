const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const logger = require('./src/services/logger.service.ts');

// load our environment variables
(function() {
  const dotenv = require('dotenv');
  const result = dotenv.config({
    path: 'config.env'
  });
  if (result.error) {
    logger.error("Warning: Starting server WITHOUT .env file")
  }
})()

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// import routes
const userRoute = require('./src/routes/user.route.ts');
app.use('/api/v1', userRoute);

// connect to our DB
const dbo = require("./src/db/dbConnection");

// start the application
const port = process.env.PORT || 5000;
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function(err: Error) {
    if (err) logger.error(err);

    // test();
  });
  logger.log(`TTRM server is running on port: ${port}`);
});

// const test = async function() {
//   const Collection = require('./src/db/models/user.schema.ts')
//   console.log(Collection)
//   const sample = new Collection();
//   await sample.create();
//   // console.log(sample)
//   // await sample.validate();
//   // await sample.save();
//   // console.log(sample);
//   // const test = await Collection.find({});
//   // console.log(test);
// }