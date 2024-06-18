var UUID_GENERATOR = require("uuid");
const CONFIG = require("../config");
const jwt = require("jsonwebtoken");


var JWTToken = function(data, expriry = "1h") {
    var token = jwt.sign(data, "JWT_SECRET", { expiresIn:expriry });
    return token;
}

const normalizePort = function (val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

const uuid = function () {
    return UUID_GENERATOR.v4();
}
var generateJwtToken = function(data, expriry = "1h"){
    var token = jwt.sign(data, CONFIG.JWT_SECRET, { expiresIn:expriry });
    return token;
}

var verifyJWTTokenM = function(request, response, next) {
    let token = request.headers["authorization"];
    console.log(token);
    if(token === null || typeof(token)=== undefined || typeof(token)==='undefined'){
        return response.status(403).sendWithLog({"error": "Forbidden"});
    } else {
        jwt.verify(token, CONFIG.JWT_SECRET, function(err, data){
            if(err && err.name == "TokenExpiredError"){
                response.status(401).sendWithLog({"error": "Uauthorized"})
                return;
            } else if(err) {
                response.status(403).sendWithLog({"error": "Forbidden"})
                return;
            }
        })
    }
}
const onError = function (error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ?
        "Pipe " + port :
        "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

module.exports = {
    normalizePort, uuid, onError, generateJwtToken, verifyJWTTokenM
}