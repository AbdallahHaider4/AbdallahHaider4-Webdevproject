// Shopping Cart - Simple version
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize cart counter on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
    setupAddToCartButtons();
});

// Update cart counter in navigation
function updateCartCounter() {
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        const count = cart.length;
        cartBadge.textContent = count;
        cartBadge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

// Setup Add to Cart buttons
function setupAddToCartButtons() {
    const addToCartButtons = document.querySelectorAll('.product-card button');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('p').textContent;
            const productImage = productCard.querySelector('img').src;
            
            addToCart(productName, productPrice, productImage);
        });
    });
}

// Add product to cart
function addToCart(name, price, image) {
    const product = {
        id: Date.now(),
        name: name,
        price: price,
        image: image
    };
    
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

// Get cart items
function getCartItems() {
    return cart;
}

// Clear cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCounter();
}
