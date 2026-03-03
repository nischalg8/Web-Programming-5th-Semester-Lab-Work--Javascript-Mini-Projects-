import { productList } from "./products.js";

const productListDiv = document.querySelector(".productList");
productList.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <img src="${product.imageUrl}" alt="${product.title}-img">
    <h3 class="product-title">${product.title}</h3>
    <p class="product-price">Rs. ${product.price}</p>
    <button type="button" class="add-to-cart">Add to Cart</button>
`;
    productDiv.dataset.id = product.id;
    productListDiv.append(productDiv);
});

productListDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        const productId = parseInt(e.target.closest(".product").dataset.id);
        const product = productList.find(p => p.id === productId);

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find(item => item.id === product.id);

        if(existing)
        {
            existing.quantity +=1;
        }
        else{
            cart.push(
                {
                    id: product.id, 
                    title: product.title,
                    price: product.price,
                    imageUrl: product.imageUrl,
                    quantity: 1
                }
            );
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Added to cart!");
    }
});
