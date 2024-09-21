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
*/


const basePrice = 2.49;

/* Compute and update the price on the Product Detail page based on user selections. */
function displayPrice() {   
    const basePrice = 2.49;
    const glazePrice = parseFloat(glazeSelect.value);
    const packPrice = parseInt(packSelect.value);
    const totalPrice = (basePrice + glazePrice) * packPrice;
    document.querySelector("#total-price").textContent = totalPrice.toFixed(2);
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


document.querySelector("#total-price").textContent = basePrice.toFixed(2);



