require('dotenv').config();
const express = require('express');
const bodyParser= require('body-parser');
const mongoose = require('mongoose');
const logger = require('./logger/logger');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT =process.env.PORT||6002;
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=>{
    console.log("Mongodb is connected");
    app.listen(PORT,()=>{
        logger.info(`app is running on the port http://localhost:${PORT}`);
    })
}).catch(error=>{
    console.log(`Something went wrong ${error}`);
});
app.get('/',(req,res)=>{
    res.end("This is the home page.");
})
require('./endpoints')(app)

