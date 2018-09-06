# Roasted (Food Pick-up Ordering)
A food ordering experience for a single restaurant. Hungry clients of this fictitious restuarant can visit its website, select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready.

The restaurant and client both need to be notified since this app serves as an intermediary,

When an order isplaced the restaurant receives the order via SMS. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the webside updates for the client and also notifies them via SMS.


## Final Product
!["Welcome Page"](https://github.com/kpalosot/roasted/blob/master/img/welcome_page.png?raw=true)
!["Welcome Page Location using Google Maps"](https://github.com/kpalosot/roasted/blob/master/img/welcome_page_location.png?raw=true)
!["Customer can place an order"](https://github.com/kpalosot/roasted/blob/master/img/customer_menu_page.png?raw=true)
!["Customer has to login to place an order(pop-up)"](https://github.com/kpalosot/roasted/blob/master/img/login_popup.png?raw=true)
!["User has to register if user has no account with restaurant(pop-up)"](https://github.com/kpalosot/roasted/blob/master/img/register_popup.png?raw=true)
!["Owner can see list of orders with countdown timer to the time before customer arrives"](https://github.com/kpalosot/roasted/blob/master/img/owner_list_order_page.png?raw=true)
!["Owner can add new items to menu page and will be shown the new item summary"](https://github.com/kpalosot/roasted/blob/master/img/add_menu_item_page.png?raw=true)

## Design Decisions
- Order details (what was ordered and quantity) are not stored in the database as this is sent to both owner and customer upon placement.
- No payment options available as payment happens in person.
- Time estimate is stored in the database and calculated by item; Owner does not have to send an estimate for every order.

## Getting Started
- Install dependencies `npm i`.
- Run `npm start`
- Visit `http://localhost:8080/`

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Body Parser: 1.15.2 or above
- Cookie Session: 2.0.0 or above
- EJS: 2.4.1 or above
- Express: 4.13.4 or above
- dotenv: 2.0.0 or above
- JQuery: 3.3.1 or above
- Knex: 0.11.10 or above
- Knex-logger: 0.1.0 or above
- Morgan: 1.7.0 or above
- Postgres: 6.0.2 or above
- Twilio: 3.19.1 or above (need to register for API SID and token)

## Collaborators
- Sean Ye (https://github.com/danovity)
- Neenus Gabriel (https://github.com/neenus)
- Kyla Palos (https://github.com/kpalosot)

