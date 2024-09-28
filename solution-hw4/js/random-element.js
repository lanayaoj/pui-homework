/*
References: 
HTML DOM Events:
https://www.w3schools.com/jsref/dom_obj_event.asp

Defer attribute:
https://www.w3schools.com/tags/att_script_defer.asp

toFixed() method to format a number with a specific number of digits to the right of the decimal:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed

onchange event:
https://www.w3schools.com/jsref/event_onchange.asp

eventListener:
https://www.w3schools.com/jsref/event_onchange.asp


selectedIndex Property:
https://www.w3schools.com/jsref/prop_select_selectedindex.asp

*/

/* Compute and update the price on the Product Detail page based on user selections. */
function displayPrice() { 
    
    if (!document.querySelector(".total-price")) {
        console.error("Total price element not found!");
        return;
    }

    const glazePrice = parseFloat(glazeSelect.value);
    const packPrice = parseInt(packSelect.value);
    const totalPrice = (currentRoll.basePrice + glazePrice) * packPrice;
    
    document.querySelector(".total-price").textContent = totalPrice.toFixed(2);
}

function glazingChange(element) {
    // get value of selected glazing option from the dropdown 
    displayPrice();
}

function packChange(element) {
    // get value of selected pack option from the dropdown 
    displayPrice();
   
}


/* Define the glazing and pack options.*/
const glazingOptions = [
    {glaze: "Keep original", 
    price: 0.00,
    },

    {glaze: "Sugar milk ", 
    price: 0.00,
    },

    {glaze: "Vanilla milk", 
    price: 0.50,
    },

    {glaze: "Double chocolate", 
    price: 1.50,
    },

];

const packSizeOptions = [
    {packSize: "1", 
    units: 1,
    },
    
    {packSize: "3",
    units: 3,
    },

    {packSize: "6",
    units: 5,
    },
    
    {packSize: "12",
    units: 10,
    },
];

/* Get the drop-down fields from the HTML. */
const glazeSelect = document.getElementById("glazingOptions");
const packSelect = document.getElementById("packOptions");

/*Populates the options of the drop-down fields with these glazing and pack options.*/ 
function populateOptions() {

    for(var i =0; i < glazingOptions.length; i++) {
        const option = glazingOptions[i];
        const optionElement = document.createElement("option");
        optionElement.textContent = option.glaze;
        optionElement.value = option.price;  
        glazeSelect.appendChild(optionElement);  
          
    }

    
    for(var i =0; i < packSizeOptions.length; i++) {
        const option = packSizeOptions[i];
        const optionElement = document.createElement("option");
        optionElement.textContent = option.packSize;
        optionElement.value = option.units;
        packSelect.appendChild(optionElement);
          
    }
}

/* Add event listeners to the drop-down fields to update the price when the user selects a new option. */
glazeSelect.addEventListener("change", glazingChange);
packSelect.addEventListener("change", packChange);

/* Call the function to populate the options. */
populateOptions();


// Initialize the cart

const cart = [];

// Add the roll type to the cart
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

// Parse  the URL to ge the roll type
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

//get the roll information from the JSON file
const currentRoll = rolls[rollType];

//Update the DOM with the roll information
document.querySelector(".tagline p").textContent = `${rollType} Cinnamon Roll`;
document.querySelector(".item-customization").src = `../assets/products/${currentRoll.imageFile}`;
document.querySelector(".total-price").textContent = currentRoll.basePrice.toFixed(2); 


// Add to cart button
function addToCart() {
    const glazingChoice = glazeSelect.options[glazeSelect.selectedIndex].text; 
    const packSizeChoice = packSelect.options[packSelect.selectedIndex].text;

    const cartRoll = new Roll(rollType, glazingChoice, packSizeChoice, currentRoll.basePrice);
    cart.push(cartRoll);
    console.log(`Cart: Array(${cart.length})`, cart);
}



document.getElementById("add-btn").addEventListener("click", addToCart);
