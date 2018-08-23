"use strict"

const secret = require('dotenv').config();
const express = require('express');
const router  = express.Router();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const twilioNumber = `+1${process.env.TWILIO_NUMBER}`;
const client = require('twilio')(accountSid, authToken);

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
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
    const customerId = 7;//req.cookie.session.customer_id

    // inserting order info to db
    knex('orders').insert({
      customer_id: customerId,
      estimated_time: req.body.estimated_time
    }).catch(err => console.error("Error on order insertion to orders table:", err));

    knex.select('phone_num')
      .from('customers')
      .where('id', customerId)
      .then((customer) => {
        client.messages.create({
          body: req.body.orders,
          from: twilioNumber,
          to: `+1${customer[0].phone_num}`
        })
        .then(res.sendStatus(200));
      })
      .catch(err => console.error("Error on sending text to restaurant owner:", err));
  });


  router.post("/login", (req, res) =>{
    knex.select('id')
    .from('customers')
    .where('name', req.body.username)
    .then(customer => {
      req.session.customer_id = customer[0].id;
    })
      .then(res.sendStatus(200));

  });

  return router;
}
