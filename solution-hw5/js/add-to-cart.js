// Add the roll type to the cart
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = parseFloat(basePrice);
        this.totalPrice = 0; 
    }

    calculatePrice() {
        // Define price additions for different glazing options
        const glazingPriceAdjustments = {
            "Keep original": 0.0,
            "Sugar milk": 0.5,
            "Vanilla milk": 0.5,
            "Double chocolate": 1.5
        };
    
        // Define price multipliers for different pack sizes
        const packSizeMultiplier = {
            "1": 1,
            "3": 3,
            "6": 5,
            "12": 10
        };
    
        // Get the price adjustments for glazing and pack size
        const glazingAdjustment = glazingPriceAdjustments[this.glazing] || 0.0;
        const sizeMultiplier = packSizeMultiplier[this.size] || 1;
    
        // Calculate the total price: (basePrice + glazingAdjustment) * sizeMultiplier
        const totalPrice = (this.basePrice + glazingAdjustment) * sizeMultiplier;
        return totalPrice;
    }
};


const cartItemSet = new Set();

function addNewRoll(rollType, rollGlazing, packSize, totalPrice){
    const cartRoll = new Roll(rollType, rollGlazing, packSize, totalPrice);
    cartRoll.totalPrice = cartRoll.calculatePrice();
    cartItemSet.add(cartRoll);
    return cartRoll;
}

const cartItemOne = addNewRoll(
    "Original",
    "Sugar milk",
    "1",
    2.49
);

const cartItemTwo = addNewRoll(
    "Walnut",
    "Vanilla milk",
    "12",
    3.49
);

const cartItemThree = addNewRoll(
    "Raisin",
    "Sugar milk",
    "3",
    2.99
);

const cartItemFour = addNewRoll(
    "Apple",
    "Original",
    "3",
    3.49
);

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
};

function updateElement(cartRoll){

    const rollImageElement = cartRoll.element.querySelector(".cart-img");
    const rollNameElement = cartRoll.element.querySelector(".roll-type");
    const rollGlazingElement = cartRoll.element.querySelector(".roll-glazing");
    const rollSizeElement = cartRoll.element.querySelector(".pack-size");
    const rollPriceElement = cartRoll.element.querySelector(".price");

    rollImageElement.src = `../assets/products/${rolls[cartRoll.type].imageFile}`;
    rollNameElement.textContent = cartRoll.type;
    rollGlazingElement.textContent = cartRoll.glazing;
    rollSizeElement.textContent = cartRoll.size;
    rollPriceElement.textContent = cartRoll.totalPrice.toFixed(2);
}

function deleteRoll(cartRoll){
    cartRoll.element.remove();
    cartItemSet.delete(cartRoll);
}

for (const cartRoll of cartItemSet){
    console.log(cartRoll);
    createElement(cartRoll);
}

