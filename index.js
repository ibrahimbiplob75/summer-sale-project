
const cart = [];
let totalPrice = 0;
let couponApplied = false;

function addToCart(productName, price) {
    const cartItem = {
        productName,
        price,
    };
    cart.push(cartItem);
    totalPrice += price;

    updateCart();
}


function updateCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";
    var num = 0;
    cart.forEach(item => {
        const itemDiv = document.createElement("div");
        num++;
        itemDiv.classList.add("mb-2");
        itemDiv.innerHTML = `
         
        <p class="mt-3">${num + "- " + item.productName}</p>
        
      `;
        cartDiv.appendChild(itemDiv);
    });

    const totalSpan = document.getElementById("totalPrice");
    totalSpan.textContent = totalPrice.toFixed(2);

    updatePurchaseButton();
}


function applyCoupon() {
    const couponInput = document.getElementById("couponInput");
    const couponCode = couponInput.value;

    if (couponCode === "SELL200" && totalPrice >= 200) {
        couponApplied = true;
        const discountSpan = document.getElementById("discount");
        discountSpan.textContent = "20%";

        const priceAfterDiscountSpan = document.getElementById("priceAfterDiscount");
        const discountedPrice = totalPrice * 0.8; // 20% discount
        priceAfterDiscountSpan.textContent = discountedPrice.toFixed(2);
    } else {
        couponApplied = false;
        const discountSpan = document.getElementById("discount");
        discountSpan.textContent = "0%";

        const priceAfterDiscountSpan = document.getElementById("priceAfterDiscount");
        priceAfterDiscountSpan.textContent = totalPrice.toFixed(2);
    }

    updatePurchaseButton();
}

function updatePurchaseButton() {
    const purchaseBtn = document.getElementById("purchaseBtn");
    if (totalPrice > 0) {
        purchaseBtn.removeAttribute("disabled");
        purchaseBtn.classList.remove("hidden");
    } else {
        purchaseBtn.setAttribute("disabled", "true");
        purchaseBtn.classList.add("hidden");
    }
}

function showCongratulationsModal() {
    const modal = document.getElementById("congratulationsModal");
    modal.classList.remove("hidden");
}

function resetCartAndHideModal() {
    cart.length = 0;
    totalPrice = 0;
    couponApplied = false;
    const couponInput = document.getElementById("couponInput");
    couponInput.value = "";

    const discountSpan = document.getElementById("discount");
    discountSpan.textContent = "0%";

    const priceAfterDiscountSpan = document.getElementById("priceAfterDiscount");
    priceAfterDiscountSpan.textContent = "0.00";

    updateCart();

    const modal = document.getElementById("congratulationsModal");
    modal.classList.add("hidden");
}