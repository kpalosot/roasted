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

  //GET
  //Route:"/owner"
  //Description: Render orders.ejs
  router.get("/owner", (req, res) => {
    knex
      .select('*')
      .from('users')
      .join('orders', 'orders.customer_id', '=', 'users.id')
      .then(function (orders) {
        let templateVars = {
          orders
        };
        res.render('orders', templateVars);

      }).catch(function (error) {
        console.error(error);
      });
  });

  router.post("/order", (req, res) => {
    const customerId = req.session.user_id;
    console.log(req.body);
    console.log(req.session.user_id);
    // inserting order info to db
    if (req.body.orders && customerId !== undefined) {
      console.log("real order placed.");
      knex('orders').insert({
          customer_id: customerId,
          estimated_time: req.body.estimated_time
        })
        .returning('id')
        .catch(err => console.error("Error on order insertion to orders table:", err))
        .then((orderId) => {
          // getting customer's phone number and name from the database
          knex.select('phone_num', 'name')
            .from('users')
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
    console.log("I'm in post login")
    console.log("req.body.email:", req.body.email);
    knex.select('id')
      .from('users')
      .where('name', req.body.email)
      .then(customer => {
        if (customer.length === 0) {
          console.log('in if statement or something like that')
          res.sendStatus(401);
        }
        console.log(customer[0].id);
        req.session.customer_id = customer[0].id;
        res.send(200, {
          redirect: "/roasted/menu"
        });
      })
      .catch(err => console.log('Error on logging in:', err));
  });

  //Delete order from database
  router.delete("/owner", (req, res) => {
    console.log("I am on the DELETE /owner route.");

    let order_id = req.body.order_id;
    console.log("order_id is,", order_id);

    knex('orders')
      .where({
        id: order_id
      })
      .del().then(() => {
        res.send("order deleted.");
      });
  });

  router.post('/register', (req, res) => {
    knex('users').insert({
        name: req.body.email,
        phone_num: req.body.phone_num,
        type: 'customer'
      }).returning('*')
      .then((user) => {
        req.session.user_id = user[0].id;
        client.messages.create({
            body: "Thank you for signing up with Roasted.",
            from: twilioNumber,
            to: user[0].phone_num
          })
          .then(() => {
            res.status(200).send({
              redirect: '/roasted/menu'
            });
          });
      });
  });
  return router;
};
