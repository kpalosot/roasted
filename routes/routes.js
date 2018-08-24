"use strict"

const secret = require('dotenv').config();
const express = require('express');
const router = express.Router();

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const twilioNumber = `+1${process.env.TWILIO_NUMBER}`;
const ownerNumber = `+1${process.env.MY_NUMBER}`
const client = require('twilio')(accountSid, authToken);

module.exports = (knex) => {

  /////////////////////////////////////////
  /////////////HELPER FUNCTIONS////////////
  /////////////////////////////////////////

  router.get("/", (req, res) => {
    console.log('I am in get /');
    res.render('index');
  });

  router.get("/menu", (req, res) => {
    console.log("SEINDING MENU PAGE");
    console.log("I AM MENU PAGE");

    knex.select('*')
      .from('menu')
      .then(function (menu) {
        let templateVars = {
          menu
        };
        res.render('menu', templateVars);

      }).catch(function (error) {
        console.error(error);
      });
  });

  router.get("/owner", (req, res) => {
    console.log("SEINDING OWNER PAGE");
    res.render("orders");
  });

  router.post("/order", (req, res) => {
    const customerId = 5; //req.cookie.session.customer_id
    console.log(req.body);
    // inserting order info to db
    if (req.body.orders) {
      knex('orders').insert({
          customer_id: customerId,
          estimated_time: req.body.estimated_time
        })
        .returning('id')
        .catch(err => console.error("Error on order insertion to orders table:", err))
        .then((orderId) => {
          // getting customer's phone number and name from the database
          knex.select('phone_num', 'name')
            .from('customers')
            .where('id', customerId)
            .then((customer) => {
              let customerText = `Your order has been placed with reference ID: ${orderId}, you have ordered: ${req.body.orders}, your total price is: $${req.body.total_price}`;
              let cookText = `An order has been placed by ${customer[0].name} with reference ID ${orderId}. ${req.body.orders}`;
              //sending a text message to the customer, then the owner
              client.messages.create({
                body: customerText,
                from: twilioNumber,
                to: customer[0].phone_num
              }).catch("Sending customer text message failed.");
              client.messages.create({
                body: cookText,
                from: twilioNumber,
                to: ownerNumber
              }).catch("Sending owner text message failed.");
            })
            .catch(err => console.error("Error on notifying customer/owner:", err))
        });
    }
    res.send("order placed.");
  });

  router.post("/login", (req, res) => {
    knex.select('id')
      .from('customers')
      .where('name', req.body.email)
      .then(customer => {
        req.session.customer_id = customer[0].id;
        res.redirect("/roasted/menu");
      })
      .catch(err => console.log('Error on logging in:', err));

  });

  return router;
};
