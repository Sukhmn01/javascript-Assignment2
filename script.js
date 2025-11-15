/* 
--------------------------------------------------------------
Attribution:
I added some advanced features in this project, such as using 
Flexbox inside dynamically created elements, displaying images 
in the modal, and building HTML with createElement(). 
I learned these techniques from an online tutorial on W3Schools.
--------------------------------------------------------------
*/function Smoothie(name, price, qty) {
    this.name = name;  // Save smoothie name
    this.price = price;  // Save smoothie name
    this.qty = qty; // Save how many user wants 
}

Smoothie.prototype.getTotal = function(addonCost) { // Simple function to calculate total price for a smoothie
    return (this.price + addonCost) * this.qty;  // Base price + add-ons × quantity
};

var addonPrices = { // Pre-set prices for optional add-ons
    protein: 2,
    chia: 1.5,
    honey: 1,
    peanutButter: 2.5,
    iceCream: 3,
    oats: 1.5
};

// Getting all the HTML elements we need from the page
var placeOrderBtn = document.getElementById("placeOrder"); // The "Place Order" button
var custName = document.getElementById("custName"); // Customer name input
var sizeSelect = document.getElementById("sizeSelect");
var sweetnessSelect = document.getElementById("sweetnessSelect");
var iceSelect = document.getElementById("iceSelect");
var orderModal = document.getElementById("orderModal");  
var modalDrinks = document.getElementById("modalDrinks");
var grandTotalDiv = document.getElementById("grandTotal");  // Displays total price
var closeModal = document.getElementById("closeModal");  // Close button

function getAddonTotal() { // Function to add up all checked add-ons
    var total = 0; // Start add-on total at zero

     // Add price only if checkbox is checked
    if (document.getElementById("protein").checked) total += addonPrices.protein;
    if (document.getElementById("chia").checked) total += addonPrices.chia;
    if (document.getElementById("honey").checked) total += addonPrices.honey;
    if (document.getElementById("peanutButter").checked) total += addonPrices.peanutButter;
    if (document.getElementById("iceCream").checked) total += addonPrices.iceCream;
    if (document.getElementById("oats").checked) total += addonPrices.oats;

    return total; // Return the final add-on amount
}

var viewButtons = document.getElementsByClassName("view-ingredients");

for (var i = 0; i < viewButtons.length; i++) {
    viewButtons[i].addEventListener("click", function() {
        var box = this.nextElementSibling;// Ingredients box below button

         // Hide/show logic
        if (box.style.display === "block") {
            box.style.display = "none";
            this.textContent = "View Ingredients";
        } else {
            box.style.display = "block";
            this.textContent = "Hide Ingredients";
        }
    });
}
placeOrderBtn.addEventListener("click", function() { // When user clicks "Place Order"

    modalDrinks.innerHTML = "";  // Clear old drinks from modal
    
    var customer = custName.value || "Customer";  // Default name if empty
    var cards = document.getElementsByClassName("smoothie-card"); // All drink cards
    var addonCost = getAddonTotal(); // Total add-on cost
    var grandTotal = 0; // Start total at zero
    var size = sizeSelect.value;  //options for size
    var sweet = sweetnessSelect.value; //options for sweetness
    var ice = iceSelect.value; //options for ice level


    for (var i = 0; i < cards.length; i++) { //loop throgh all smoothie cards

        var card = cards[i];
        var qtyBox = card.querySelector(".smoothie-qty");
        var qty = parseInt(qtyBox.value) || 0; // Convert to number

        if (qty > 0) {

            var name = card.getAttribute("data-name");
            var price = parseFloat(card.getAttribute("data-price"));
            var image = card.getElementsByTagName("img")[0].src;
            var sm = new Smoothie(name, price, qty);
            var total = sm.getTotal(addonCost);  // Price with add-ons

            grandTotal += total;
 
            var box = document.createElement("div");  // Make a container for the drink info
            box.style.display = "flex";      // Laying things side-by-side
            box.style.gap = "10px";         // Add some space between the picture and text 
            box.style.marginBottom = "10px";  // Space below each drink row
            box.style.alignItems = "center";  // Make everything nicely centered vertically

            var pic = document.createElement("img"); // Make a small picture of the smoothie
            pic.src = image;            // Using the smoothie picture from the card   
            pic.style.width = "50px";       // Make the image small
            pic.style.height = "50px";     // Keep it square so it looks neat

            // Make a text description of what the user ordered
            var info = document.createElement("p"); 
            info.textContent =
                qty + " × " + name +
                " | Size: " + size +  // Add size
                " | Sweetness: " + sweet + // Add sweetness preference
                " | Ice: " + ice +     // Add ice level
                " | Add-ons: $" + addonCost.toFixed(2);  // Show total add-on price

            var cost = document.createElement("p"); 
            cost.style.marginLeft = "auto";   // Push the price all the way to the right
            cost.textContent = "$" + total.toFixed(2); // Show final price for this drink

            box.appendChild(pic);     
            box.appendChild(info);
            box.appendChild(cost);

            modalDrinks.appendChild(box); // Finally, add this completed drink row into the modal
        }
    }
 
    grandTotalDiv.textContent = "Grand Total: $" + grandTotal.toFixed(2); // Show the grand total inside the modal
    orderModal.style.display = "flex"; 
});

closeModal.addEventListener("click", function() { //close modal
    orderModal.style.display = "none"; // Hide modal
});
