// require the express module
import express from "express";


// create a new Router object
const routes = express.Router();

const cartItems  = [
  // hard-code
  { id: 111, product: "Pizza", price: 4, quantity: 1 },
  { id: 222, product: "Chicken", price: 3, quantity: 2 },
  { id: 333, product: "Steak", price: 2, quantity: 3 },
  { id: 444, product: "Salad", price: 1, quantity: 4 },
];

let nextId = cartItems.length + 1;// next id = 5 needs to be global!!

// routes.get("/cart-items", (req, res) => {
//   res.json(cartItems); // route is going though the array
// }); // endpoints go to postman

routes.get("/cart-items", (req, res) => {
  const { maxPrice, prefix, pageSize } = req.query;
  let results = cartItems;

  if (maxPrice) {
    results = results.filter(item => item.price <= Number(maxPrice));
  }
  if (prefix) {
    results = results.filter(item =>
      item.product.startsWith(prefix.toString())// turns it into a string
      //also can do for lower case toLower^
    );
  }
  if (pageSize) {
    results = results.slice(0, Number(pageSize));
    //+pagesize is the same thing
  }

  res.status(200);
  res.json(results);
});

routes.get("/cart-items/:id", (req, res) => {
  // If the item with that ID cannot be found in the array, return a string response “ID Not Found” with response code 404 (Not Found)

  console.log(req.params.id); // calls the id (string)
  // let{id} = req.params;// short way 
  // let foundItem = cartItems.find(item => item.id === Number(id))

  let id = parseInt(req.params.id); //#2 turns string into a number
  let itemId = cartItems.find((shop) => shop.id === id);
  if (itemId) {
    // saying if it exist
    res.json(itemId); // to call itemId
    res.status(200); // ? is a search query
  } else {
    res.status(404); // ? is a search query
    res.json({ error: `ID Not Found: ${req.params.id}` });
  }
});

// //POST /cart-items  grab the item and post that Item in the cart
// //Action: Add a cart item to the array using the JSON body of the request. Also generate a unique ID for that item.
// //Response: the added cart item object as JSON.
// //Response Code: 201 (Created)
// ON POSTMAN CLICK POST, BODY, RAW, JSON***

routes.post("/cart-items", (req, res)=> {
let item = req.body;// saved a item

  item.id = nextId;// makes an adds a unique ID 
  nextId++;

  cartItems.push(item);// then push

  res.status(201);
  res.json(req.body);//the body of JSON
})

// //PUT /cart-items/:id 
// //Action: Update the cart item in the array that has the given id. Use the JSON body of the request as the new properties.
routes.put("/cart-items/:id", (req, res) => { // id coming from parameters
  let{id} = req.params; // capture ID
  let updatedItem = req.body;// saved the request body

  let index: number = cartItems.findIndex(item => item.id === Number (id))// loop to find index ^

  if (index > -1) { //if it = 0 we do this*
    // update array to be Item //
    cartItems[index] = updatedItem;
    res.status(200);// slide 13,14,15
    res.json(updatedItem);//updated cart item object as JSON
  } else {
    res.json();
  }
})

routes.delete("/cart-items/:id", (req, res) =>{
  let{id} = req.params;
  let deleteItem = req.body; 

  let index:number = cartItems.findIndex(item => item.id === Number(id))

  if (index > -1) {
    deleteItem = cartItems.splice(index, 1);
    res.status(204);
    res.json();
  } else{
    res.json(cartItems);// else not necessary 
  }

  //slice effects the original *
})

routes.delete("/cart-items/:id", (req,res)=>{
  let {id} = req.params; //access to the id 
  let foundIndex = cartItems.findIndex(item=>item.id === Number(id)
  )
  cartItems.splice(foundIndex,1)
})// DELETE

export default routes;
