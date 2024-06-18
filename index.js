#!/usr/bin/env node
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const http = require('http');
const cors = require("cors");
const HELPER = require("./helpers");

//var q = require("q");
var port = HELPER.normalizePort(process.env.PORT || "3000");

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next)=>{
    console.log("recieved request: ", req.path);
    let path = req.path;
    // res.sendWithLog = ((data) => {
    //     res.send(data);
    // });
    //var def = q.defer();
    //console.log(require("./helpers/records.json"));

    let data = require("./helpers/records.json");
    let limit = req.query["limit"];
    let color = req.query["color"];
    let offset = req.query["offset"];

    //exrtact based on color input
    var filters = { color };

    if (filters.color.length > 0) {
        data =  data.filter(item => Object.keys(filters).every(key => filters[key].includes(item[key])));
    }

    //slice will default undefined offset or limit to 0 (all records)
    res.send(data.slice(offset,limit));



    next();
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).sendWithLog("<html>Something went wrong!!</html>");
});

app.get("/", function (req, res, next) {
    res.status(200).sendWithLog("<html><marquee><h3>Server running!!</h3></marquee></html>");
});

//Loading all the routes needed from routes folder
fs.readdirSync(path.join(__dirname, "routes")).forEach(function (file) {
    try {
        app.use("/api/" + require("./routes/" + file)["path"], require("./routes/" + file)["routes"]);
        //console.info("/api/" + require("./routes/" + file)["path"], require("./routes/" + file)["routes"]);
    } catch (err) {
        console.log(err);
    }
});


process.on("uncaughtException", function (err) {
    console.error("Caught exception: " + err);
});

const server = http.createServer(app);


server.listen(port);
server.on("error", HELPER.onError);

console.info("Server running at port " + port);
