// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "Cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

// Exercise 1

//Buscar
function buscarCart(id) {
  let indice = cart.findIndex((objeto) => objeto.id === id);
  return indice !== -1 ? indice : -1;
}

function buscarIndiceProducts(id) {
  let indice = products.findIndex((product) => product.id === id);
  return indice;
}

function buy(id) {
  // 1. Loop for to the array products to get the item to add to cart
  // 2. Add found product to the cart array
  let indiceCart = buscarCart(id);
  let indiceProducts = buscarIndiceProducts(id);
  if (indiceCart < 0) {
    products[indiceProducts] = Object.assign(
      { quantity: 1 },
      products[indiceProducts]
    );
    products[indiceProducts] = Object.assign(
      { subtotalWithDiscount: products[indiceProducts].price },
      products[indiceProducts]
    );
    //Es treballa amb el camp subtotalWithDiscount a l'exercici 4.
    console.log(products[indiceProducts]);
    cart.push(products[indiceProducts]);
  } else {
    let sumQuantity = (cart[indiceCart].quantity += 1);
    let sumSubtotal = (cart[indiceCart].subtotalWithDiscount +=
      cart[indiceCart].price);
  }
  applyPromotionsCart(cart, applyPromotion);
  console.log("TOTAL IMPORT= " + calculateTotal());
  document.getElementById("count_product").innerHTML = cart.length;
}

// Exercise 2
function cleanCart() {
  let cartList = cart;
  let cleanCartList = cartList.splice(0, cartList.length);
  console.table("Clean cart List" + cleanCartList);

  let tableBody = document.getElementById("cart_list");
  let tableContent = "";
  tableBody.innerHTML = tableContent;

  document.getElementById("total_price").innerHTML = calculateTotal();
}

// Exercise 3
function calculateTotal() {
  let sumTotal = 0;
  // Calculate total price of the cart using the "cartList" array
  for (let i = 0; i < cart.length; i++) {
    sumTotal += cart[i].subtotalWithDiscount;
  }
  return sumTotal;
}

// Exercise 4
function applyDiscount(array, indice) {
  let quantitat, quantitatDesc, solution;
  if (indice >= 0 && array[indice].offer) {
    quantitat = array[indice].quantity;
    quantitatDesc = array[indice].offer.number;
    solution = quantitat >= quantitatDesc ? true : false;
    return solution;
  } else {
    return false;
  }
}
function applyPromotion(array) {
  let preu, percentatgeOferta, quantitat, percentDiscount, totalWithDiscount;
  preu = array.price;
  quantitat = array.quantity;
  percentatgeOferta = array.offer.percent;
  percentDiscount = (preu * percentatgeOferta) / 100;
  totalWithDiscount = (preu - percentDiscount) * quantitat;
  return Number(totalWithDiscount.toFixed(2));
}

function applyPromotionsCart(array, promotion) {
  let apply, nom, solution, subtotalIgual;
  for (let i = 0; i < array.length; i++) {
    subtotalIgual = array[i].subtotalWithDiscount;
    nom = array[i].name;
    apply = applyDiscount(array, i);
    if (apply == true) {
      solution = promotion(array[i]);
      array[i].subtotalWithDiscount = solution;
      console.table(array);
    } else {
      solution = array[i].subtotalWithDiscount;
      console.table(array);
    }
  }
}

// Exercise 5
function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom
  let tableBody = document.getElementById("cart_list");
  let tableContent = "";

  for (let i = 0; i < cart.length; i++) {
    let producte = `<td>${cart[i].name}</td>`;
    let preu = `<td>$${cart[i].price}</td>`;
    let quantitat = `<td>${cart[i].quantity}</td>`;
    let totalDesc = `<td>$${cart[i].subtotalWithDiscount}</td>`;
    tableContent += `<tr>${producte + preu + quantitat + totalDesc}</tr>`;
    tableBody.innerHTML = tableContent;
  }
  document.getElementById("total_price").innerHTML = calculateTotal();
}

// ** Nivell II **

// Exercise 7
function removeFromCart(id) {}

function open_modal() {
  printCart();
}
