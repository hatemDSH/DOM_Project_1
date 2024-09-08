// Preselected items in the cart
const cartItems = [
    { id: 1, name: 'Laptop', price: 1200, quantity: 1, liked: false },
    { id: 2, name: 'Smartphone', price: 800, quantity: 2, liked: false },
    { id: 3, name: 'Headphones', price: 200, quantity: 1, liked: false }
];

const cartContainer = document.getElementById('cart');
const totalPriceElement = document.getElementById('total-price');

// Function to render the cart
function renderCart() {
    cartContainer.innerHTML = '';
    let totalPrice = 0;

    cartItems.forEach(item => {
        totalPrice += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <span>${item.name} - $${item.price}</span>
            <div class="quantity-controls">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <span class="heart ${item.liked ? 'liked' : ''}" onclick="toggleLike(${item.id})">&#10084;</span>
            <button onclick="removeItem(${item.id})">Delete</button>
        `;

        cartContainer.appendChild(cartItem);
    });

    totalPriceElement.innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Function to change the quantity of an item
function changeQuantity(itemId, amount) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.quantity += amount;
        if (item.quantity < 1) item.quantity = 1;
    }
    renderCart();
}

// Function to remove an item from the cart
function removeItem(itemId) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
    }
    renderCart();
}

// Function to toggle the liked status of an item
function toggleLike(itemId) {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
        item.liked = !item.liked;
    }
    renderCart();
}

// Initial render of the cart
renderCart();
