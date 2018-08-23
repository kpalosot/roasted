"use strict"

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render('index');
    });

  router.get("/menu", (req, res) => {
    console.log("SEINDING MENU PAGE");
    console.log("I AM MENU PAGE");
  });

  router.get("/owner", (req, res) => {
    console.log("SEINDING OWNER PAGE");
    console.log("I AM OWNER PAGE");
  });

  router.get("/login", (req, res) => {
    console.log("SEINDING LOGIN PAGE");
    console.log("I AM login PAGE");
  });

  router.post("/order", (req, res) => {
    console.log("posting an order");
  });

  router.post("/login", (req, res) =>{
    console.log("posting a login");
  });

  return router;
};
