
require("dotenv").config()
const express = require("express");
const cors  = require("cors");
const connect = require("./db/connection")
const app = express();
const morgan = require("morgan");
const logger = require("./utils/app-logger")(__filename);

const serverLogStream = require('./utils/server-logger');

const port  = process.env.PORT || 5000;

app.use(morgan('combined',{stream:serverLogStream}));

app.use(cors());

app.use(express.json());

app.use("/",require("./routes/feed"));

app.use("/",require("./routes/user"));

app.use("/",require("./routes/messages"));

app.listen(port,err=>{
    if(err){
        console.log('Server Crash '+JSON.stringify(err));
    }
    else{
        logger.debug('Server Start At ' + port);
        console.log('Server Started at '+ port);
        connect(process.env.MONGO_URI);
    }
})


