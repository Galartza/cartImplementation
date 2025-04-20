// Array de productos
const products = [
    { 
        id: 1,
         name: "Laptop",
         price: 1200,
         image: "laptop.jpg" 
    },
    { 
        id: 2,
         name: "Smartphone",
         price: 800,
         image: "smartphone.jpg" 
    },
    { 
        id: 3,
         name: "Tablet",
         price: 600,
         image: "tablet.jpg" 
    },
    { 
        id: 4,
         name: "Smartwatch",
         price: 300,
         image: "smartwatch.jpg" 
    },
];

// Array para almacenar el carrito de compras(vacío al inicio)

let cart = [];


// Función para mostrar los productos en la página HTML
function displayProducts() {
    const productContainer = document.getElementById("product-container");
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productContainer.appendChild(productDiv);
    });
}
// Función para agregar un producto al carrito
function addToCart(productID) {
    const product = products.find(p => p.id === productID);
    cart.push(product);
    cartUpdate();
}

// Función para actualizar el carrito de compras
function cartUpdate() {
    const cartContainer = document.getElementById("cart-container");
    const totalElement = document.getElementById("total");
    let total = 0;

    cartContainer.innerHTML = ""; // Limpiar el carrito antes de actualizar
    cart.forEach(product => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <h3>${product.name} - $${product.price}</h3>
            <button onclick="removeFromCart(${cart.indexOf(product)})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
        total += product.price;
    })
    totalElement.textContent = `Total: $${total}`;
}
// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar el producto del carrito
    cartUpdate(); // Actualizar el carrito
}


// Funcion comprar (vaciar carrito y mostrar mensaje de compra exitosa)
function buyCart() {
    if (cart.length === 0) {
        alert("El carrito esta vacío. Añade productos antes de comprar.");
        return;
    }

    const total = calculateTotal();
    const confirmation = confirm(`Total: $${total}. ¿Deseas confirmar la compra?`);
    if (confirmation) {
        alert("Compra exitosa! Gracias por tu compra.\nTotal: $" + total);
        cart = []; // Vaciar el carrito
        cartUpdate(); // Actualizar el carrito
    } else {
        alert("Compra cancelada.");
    }

    cart = []; // Vaciar el carrito
    cartUpdate(); // Actualizar el carrito
}

// Función para calcular el total del carrito
function calculateTotal() {
    return cart.reduce((total, product) => total + product.price, 0);
}

// Actualizamos la función updateCart para usar calculateTotal
function updateCart() {
    const cartContainer = document.getElementById("cart-container");
    const totalElement = document.getElementById("total");
    let total = calculateTotal();

    cartContainer.innerHTML = ""; // Limpiar el carrito antes de actualizar
    cart.forEach(product => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <h3>${product.name} - $${product.price}</h3>
            <button onclick="removeFromCart(${cart.indexOf(product)})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });
    totalElement.textContent = `Total: $${total}`;
}


// Llamar a la función para mostrar los productos al cargar la página
window.onload = displayProducts;