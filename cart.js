// Cart page functionality
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
    setupClearCart();
});

// Display cart items
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="product.html">Start shopping!</a></p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cartItems.forEach(item => {
        const price = parseFloat(item.price.replace('$', ''));
        total += price;
        
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">${item.price}</p>
                </div>
                <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
    cartTotal.textContent = '$' + total.toFixed(2);
}

// Remove item from cart
function removeItem(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart counter
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        const count = cart.length;
        cartBadge.textContent = count;
        cartBadge.style.display = count > 0 ? 'inline-block' : 'none';
    }
    
    // Refresh cart display
    displayCart();
}

// Setup clear cart button
function setupClearCart() {
    const clearBtn = document.getElementById('clear-cart-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear your cart?')) {
                localStorage.setItem('cart', JSON.stringify([]));
                displayCart();
                
                // Update cart counter
                const cartBadge = document.getElementById('cart-count');
                if (cartBadge) {
                    cartBadge.textContent = '0';
                    cartBadge.style.display = 'none';
                }
            }
        });
    }
}

