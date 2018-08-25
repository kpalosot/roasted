/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.


$(document).ready(function () {
  console.log("PAGE RENDERED");

  function getOrderDetail() {
    let orderItemNames = [];

    $(".checkout__item").each(function (index) {
      orderItemNames.push($(this).children().children(".checkout__item--quantity--text").text() + " " + $(this).children(".checkout__item--name").text());
    });

    return orderItemNames;
  }

  function updateItemPrice() {
    $(".checkout__item").each(function (index) {
      let itemPrice = 0;
      itemPrice += $(this).data("price") * $(this).children().children(".checkout__item--quantity--text").text();
      $(this).children(".checkout__item--price").text("$" + itemPrice.toFixed(2));
    });
  }

  //at checkout, updates total price 
  function updateTotalPrice() {
    let totalPrice = 0;
    $(".checkout__item").each(function (index) {
      totalPrice += $(this).data("price") * $(this).children().children(".checkout__item--quantity--text").text();
    });
    $(".checkout__sumDisplay--total").text("$" + totalPrice.toFixed(2));
  }

  //at checkout, updates total estimated time
  function updateEstTime() {
    let totalTime = 0;

    $(".checkout__item").each(function (index) {
      totalTime += $(this).data("estimated_time") * $(this).children().children(".checkout__item--quantity--text").text();
    });
    $(".checkout__estimated-time").text(`Ready in ${totalTime} minutes`);
  }

  //add to checkout section
  function addToCheckout(item) {
    const id = item.id;
    const estimated_time = item.estimated_time;
    const description = item.description;
    const type = item.type;
    const img_url = item.img_url;
    const price = item.price;

    let newCheckoutItem = `<li class="checkout__item" data-price=${item.price} data-estimated_time = ${item.estimated_time} data-quantity=1>
            <div class="checkout__item--name">${item.name}</div>
            <div class="checkout__item--quantity">
              <div class="button__checkout--minus button__checkout">-</div>
              <p class="normal-text checkout__item--quantity--text">1</p>
              <div class="button__checkout--plus button__checkout">+</div>
            </div>
            <div class="checkout__item--price">$${item.price}</div>
            <div class="checkout__item--delete">X</div>
          </li>`;
    $(".checkout__list").append(newCheckoutItem);

    updateTotalPrice();
    updateEstTime();
  }

  ///////////////////////////
  //////Event Listeners//////
  ///////////////////////////

  //////////////////////////
  //------- MENU ---------//
  //////////////////////////

  //"place order" button, adding the order to the 
  //database
  $(".button__placeOrder").on("click", function () {
    let totalPrice = $(".checkout__sumDisplay--total").text().replace("$", '');
    let totalTime = $(".checkout__estimated-time").text().replace(/[^0-9]/gi, '');
    let placedOrder = getOrderDetail().join(", ");

    $.ajax('/roasted/order', {
        method: 'POST',
        data: {
          'total_price': `${totalPrice}`,
          'estimated_time': `${totalTime}`,
          'orders': `${placedOrder}`
        },
      })
      .then((response) => {
        console.log("Order placed.");
        $(".checkout__list").children().remove();
        $(".checkout__sumDisplay--total").text("$0.00");
        $(".checkout__estimated-time").text("Estimated Time");
      });
  });

  //Adding menu item to checkout section
  $(".button__add").on("click", function () {
    const menu__container = $(this).parent().parent().parent(".menu__container");

    const newCheckoutItem = {
      id: menu__container.data("id"),
      estimated_time: menu__container.data("esttime"),
      name: menu__container.data("name"),
      description: menu__container.data("description"),
      type: menu__container.data("type"),
      img_url: menu__container.data("img_url"),
      price: menu__container.data("price")
    };

    addToCheckout(newCheckoutItem);
  });


  //Checkout Item's Plus and Minus Button 
  $('.checkout__list').on('click', '.button__checkout--plus', function () {
    const quantityDisplay = $(this).siblings(".checkout__item--quantity--text");

    let totalQuantity = Number(quantityDisplay.text());

    quantityDisplay.text(totalQuantity += 1);
    updateEstTime();
    updateTotalPrice();
    updateItemPrice();
  });

  $('.checkout__list').on('click', '.button__checkout--minus', function () {
    const quantityDisplay = $(this).siblings(".checkout__item--quantity--text");
    let totalQuantity = Number(quantityDisplay.text());
    if (totalQuantity > 0) {
      quantityDisplay.text(totalQuantity -= 1);
    }
    updateEstTime();
    updateTotalPrice();
    updateItemPrice();
  });

  //Delete an item from chckout
  $('.checkout__list').on('click', '.checkout__item--delete', function () {
    $(this).parent().remove();
    updateEstTime();
    updateTotalPrice();
    updateItemPrice();
  });
});
