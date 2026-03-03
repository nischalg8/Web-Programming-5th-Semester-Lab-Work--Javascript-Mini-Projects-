const cartContainer = document.getElementById("cart-container");
const grandTotalSpan = document.getElementById("grand-total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    cartContainer.innerHTML = "";
    let grandTotal = 0;

    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        grandTotal += itemTotal;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${item.imageUrl}" width="100">
            <h3>${item.title}</h3>
            <p>Unit: Rs. ${item.price}</p>

            <button class="decrease" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="increase" data-id="${item.id}">+</button>

            <p>Total: Rs. ${itemTotal.toFixed(2)}</p>
            <button class="remove" data-id="${item.id}">Remove</button>
        `;

        cartContainer.appendChild(div);
    });

    grandTotalSpan.textContent = grandTotal.toFixed(2);
}

cartContainer.addEventListener("click", function (e) {
    const id = parseInt(e.target.dataset.id);
    const item = cart.find((p) => p.id === id);

    if (!item) return;

    if (e.target.classList.contains("increase")) {
        item.quantity++;
    }
    if (e.target.classList.contains("decrease")) {
        item.quantity--;
    }
    if (e.target.classList.contains("remove")) {
        cart = cart.filter((p) => p.id !== id);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
});

renderCart();
