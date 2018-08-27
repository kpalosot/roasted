
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  function deleteMenu(){
    return knex('menu').del();
  }

  function deleteOrders(){
    return knex('orders').del();
  }

  function deleteUsers(){
    return knex('users').del();
  }

  function insertMenu(){
    return knex('menu').insert([
      { name: 'Roasted Corn', description:'Bacon-wrapped roasted corn with butter and sprinkled with ground pepper.',
        type: 'snack', price: 3.50 ,
        img_url: 'https://hugsandcookiesxoxo.com/wp-content/uploads/2014/02/bacon-roasted-corn.jpg',
        order_time_estimate: 1},

      { name: 'Roasted Chicken', description:'Roasted chicken with plain rice on the side, topped with chopped chives',
        type: 'Combo', price: 8.65,
        img_url: 'https://img.taste.com.au/TYwgr6nS/taste/2016/11/tikka-masala-roast-chicken-with-spiced-pilau-rice-85312-1.jpeg',
        order_time_estimate: 2},

      { name: 'Roasted Pork Belly', description:'Roasted Pork Belly with plain rice on the side, partnered with in-house special sauce',
        type: 'Combo', price: 9.70,
        img_url: 'https://i.imgur.com/hP0ECqn.jpg',
        order_time_estimate: 2},

      { name: 'Chili Roasted Sweet Potatoes', description:'Roasted sweet potatoes seasoned with salt, pepper and chili.',
        type: 'Snack', price: 5,
        img_url: 'https://www.thehungryhutch.com/wp-content/uploads/2018/02/Chili-Roasted-Sweet-Potatoes-Chili-Powder-0.jpg',
        order_time_estimate: 1},

      { name: 'Roasted Vegetables', description:'A variety of sliced garden vegetables, roasted and mixed with secret seasoning and topped with some basil.',
        type: 'Combo', price: 4.75,
        img_url: 'https://musicwithdinner.files.wordpress.com/2015/02/roasted-vegetables-and-rice.jpg',
        order_time_estimate: 1},

      { name: 'Crab and Sweet Corn Soup', description:'Crab and sweet corn soup with an egg drop, garnished with shredded scalions and bits of chicken.',
        type: 'Snack', price: 6.25,
        img_url: 'http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/food/2014/11/27/WomansDayBR104628/crab-and-sweet-corn-soup.jpg',
        order_time_estimate: 1},

      { name: 'Beer', description:'What else can go well with a roasted meal?',
        type: 'Drink', price: 2.50 ,
        img_url: 'https://s3.scoopwhoop.com/anj/beeeeer/904432527.jpg',
        order_time_estimate: 1},

      { name: 'Sangria', description:'If you are feeling fancier than beer.',
        type: 'Drink', price: 8,
        img_url: 'https://hips.hearstapps.com/hmg-prod/images/sangria-horizontal-jpg-1522265291.jpg',
        order_time_estimate: 1}
      ]);
  }

  function insertUsers(){
    return knex('users').insert([
      {name: 'user1@example.com', phone_num: '6476378072', type: 'customer'},
      {name: 'user2@example.com', phone_num: '9055999119', type: 'customer'},
      {name: 'user3@example.com', phone_num: '9052518621', type: 'customer'},
      {name: 'owner@example.com', phone_num: '6476378072', type: 'owner'}
      ]).returning('*');
  }

  // randomization of which customer to access for seeding
  function randomCustomer(){
    return Math.floor(Math.random() * 3);
  }

  // Takes in an integer(defaults to zero) and subtracts that from the current time
  // To simulate multiple orders at different time
  // returns a string format of time
  // Note: in UTC; give or take a few minutes
  function getAlteredTime(x = 0){
    let rightNow = new Date().getTime();
    rightNow -= 1000 * 60 * x;
    rightNow = new Date(rightNow);
    return rightNow.toISOString().slice(10);
  };

  function insertOrders(customers){
    // simulating different order times
    // const orderTime1 = getAlteredTime(20);
    // const orderTime2 = getAlteredTime(15);
    // const orderTime3 = getAlteredTime(11);
    // const orderTime4 = getAlteredTime(9);
    // const orderTime5 = getAlteredTime();

    // simulating different customers within the table
    // const customer1 = randomCustomer();
    // const customer2 = randomCustomer();
    // const customer3 = randomCustomer();
    // const customer4 = randomCustomer();
    // const customer5 = randomCustomer();

    // return knex('orders').insert([
    //   { customer_id: customers[customer1].id,
    //     created_at: orderTime1, estimated_time: 33},

    //   { customer_id: customers[customer2].id,
    //     created_at: orderTime2, estimated_time: 12},

    //   { customer_id: customers[customer3].id,
    //     created_at: orderTime3, estimated_time: 28},

    //   { customer_id: customers[customer4].id,
    //     created_at: orderTime4, estimated_time: 24},

    //   { customer_id: customers[customer5].id,
    //     created_at: orderTime5, estimated_time: 26}
    //   ]);
    return knex('orders').insert({
      customer_id: customers[0].id,
      estimated_time: 2
    });

  }



  return deleteMenu()
  .then(deleteOrders)
  .then(deleteUsers)
  .then(insertMenu)
  .then(insertUsers)
  .then(customers => insertOrders(customers));
};
