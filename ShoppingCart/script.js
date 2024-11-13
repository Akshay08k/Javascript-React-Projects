document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Keyboard", price: 99 },
        { id: 2, name: "Mouse", price: 49 },
        { id: 3, name: "CPU", price: 199 },
        { id: 4, name: "Monitor", price: 149 },
        { id: 5, name: "Speaker", price: 75 },
    ];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMsg = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product");
        productItem.innerHTML = `
            <h3>${product.name} - $${product.price.toFixed(2)}</h3>
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = "";
        let totalPrice = 0;

        if (cart.length) {
            emptyCartMsg.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");

            cart.forEach((item) => {
                totalPrice += item.price;
                const cartItem = document.createElement("div");
                cartItem.classList.add("product");
                cartItem.innerHTML = `
                    <span>${item.name} - $${item.price.toFixed(2)}</span>
                    <button class="remove-btn" data-id="${item.id}">Remove</button>`;

                const removeBtn = cartItem.querySelector(".remove-btn");
                removeBtn.addEventListener("click", (e) => {
                    const productId = parseInt(e.target.getAttribute("data-id"));
                    cart = cart.filter(p => p.id !== productId);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    renderCart();
                });

                cartItems.appendChild(cartItem);
            });

            totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            emptyCartMsg.classList.remove("hidden");
            cartTotalMessage.classList.add("hidden");
            totalPriceDisplay.textContent = "$0.00";
        }
    }

    checkoutBtn.addEventListener("click", () => {
        cart = [];
        localStorage.removeItem("cart");
        alert("Checkout Successful");
        renderCart();
    });

    renderCart();
});
