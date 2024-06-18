const express = require("express");
const router = express.Router();
const controller = require("../controllers/records-controller");
var HELPER = require("../helpers");

//route definitions here
router.get("/records", HELPER.verifyJWTTokenM, controller.getAll);

module.exports = {
    path: "records",
    routes: router
};