/* Add the roll type to the cart */
class addRoll {
    constructor(rollType, rollGlazing, packSize, basePrice, totalPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = parseFloat(basePrice);
        this.totalPrice = parseFloat(totalPrice);
    }
};

/* Set that stores cart items */
const cartItemSet = new Set();


/* Adds a new roll to the Set */
function addNewRoll(rollType, rollGlazing, packSize, basePrice, totalPrice) {
    const cartRoll = new addRoll(rollType, rollGlazing, packSize, basePrice, totalPrice);
    cartItemSet.add(cartRoll);
    saveCart(); 
    return cartRoll;
}

/* function that takes a Roll instance as an argument, and appends the appropriate DOM elements to the shopping cart page  */
function createElement(cartRoll){
    const template = document.getElementById("cart-item-template");
    const clone = template.content.cloneNode(true);

    cartRoll.element = clone.querySelector(".cart-item");

    const btnDelete = cartRoll.element.querySelector(".btn-delete");
    console.log(btnDelete);
    btnDelete.addEventListener("click", () => {
        deleteRoll(cartRoll);
    });

    const rollListElement = document.querySelector(".cart");
    rollListElement.prepend(cartRoll.element);

    updateElement(cartRoll);

    cartTotalPrice();
};

/* Displays the items on the shopping cart */
function updateElement(cartRoll){

    const rollImageElement = cartRoll.element.querySelector(".cart-img");
    const rollNameElement = cartRoll.element.querySelector(".roll-type");
    const rollGlazingElement = cartRoll.element.querySelector(".roll-glazing");
    const rollSizeElement = cartRoll.element.querySelector(".pack-size");
    const rollPriceElement = cartRoll.element.querySelector(".price");

    rollImageElement.src = `../assets/products/${rolls[cartRoll.type].imageFile}`;
    rollNameElement.textContent = cartRoll.type + " Cinnamon Roll";
    rollGlazingElement.textContent = "Glazing: " + cartRoll.glazing;
    rollSizeElement.textContent = "Pack Size: " + cartRoll.size;
    rollPriceElement.textContent = "$" + cartRoll.totalPrice.toFixed(2);

}


/* Deletes a roll from the cart */
function deleteRoll(cartRoll) {
    cartRoll.element.remove();
    cartItemSet.delete(cartRoll);
    cartTotalPrice();
    saveCart(); 
}

/* Calculates the total price of the items in the cart */
function cartTotalPrice(){
    let totalPrice = 0;
    for (const cartRoll of cartItemSet){
        totalPrice += cartRoll.totalPrice;
    }

    const totalPriceElement = document.querySelector(".total-price");
    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

/* Loops through the cartItemSet to create DOM elements */
function updateCartPage() {
    const cartContainer = document.querySelector('.cart');
    cartContainer.innerHTML = ''; 

    for (const item of cartItemSet) {
        createElement(item);
    }

    cartTotalPrice();
}

/* Save the cart to local storage */
function saveCart() {
    const cartArray = Array.from(cartItemSet).map(item => ({
        type: item.type,
        glazing: item.glazing,
        size: item.size,
        basePrice: item.basePrice,
        totalPrice: item.totalPrice
    }));
    localStorage.setItem('cart', JSON.stringify(cartArray));
}

/* Load the cart from local storage */
function loadCart() {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cartItemSet.clear();
        savedCart.forEach(item => {
            const cartRoll = new addRoll(item.type, item.glazing, item.size, item.basePrice, item.totalPrice);
            cartItemSet.add(cartRoll);
        });
    }
}

/* Call loadCart when the document is ready */
document.addEventListener('DOMContentLoaded', loadCart);

/* Call updateCartPage when the document is ready */
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    updateCartPage();
});