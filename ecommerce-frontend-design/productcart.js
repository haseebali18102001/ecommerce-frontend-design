document.addEventListener('DOMContentLoaded', () => {
    console.log('productcart.js loaded');
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Initial cart:', cart);

    // Shared toast notification function
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('role', 'status');
    liveRegion.style.position = 'absolute';
    liveRegion.style.opacity = '0';
    document.body.appendChild(liveRegion);
    function showToast(message, type = 'success') {
        console.log(`Showing toast: ${message} (${type})`);
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);
        liveRegion.textContent = message;
        setTimeout(() => {
            toast.remove();
            liveRegion.textContent = '';
        }, 3000);
    }

    // Update cart count
    const updateCartCount = () => {
        try {
            const cartCountElements = document.querySelectorAll('.cart-count');
            if (!cartCountElements.length) {
                console.warn('Cart count elements not found on productcart.html. Expected class: .cart-count');
                showToast('Error: Cart count display not found', 'error');
                return;
            }
            const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
            console.log(`Updating cart count to: ${count}`);
            cartCountElements.forEach(el => {
                el.textContent = count;
                el.style.display = count > 0 ? 'inline' : 'none';
                el.classList.add('updated');
                setTimeout(() => el.classList.remove('updated'), 300);
            });
        } catch (error) {
            console.error('Error updating cart count:', error);
            showToast('Error updating cart count', 'error');
        }
    };

    // Save cart to localStorage
    const saveState = () => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
            console.log('Cart saved:', cart);
            updateCartCount();
            renderCart();
        } catch (error) {
            console.error('Error saving cart:', error);
            showToast('Error saving cart', 'error');
        }
    };

    // Debounce function
    function debounce(fn, ms) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), ms);
        };
    }

    const debouncedSaveState = debounce(saveState, 300);

    // Navigate to pages
    const navigateTo = (page) => {
        console.log(`Navigating to: ${page}`);
        window.location.href = page;
    };

    // Render cart
    const cartContainer = document.querySelector('.cart');
    if (!cartContainer) {
        console.error('Cart container not found on productcart.html. Expected class: .cart');
        showToast('Error: Cart container not found', 'error');
        return;
    }
    const renderCart = () => {
        console.log('Rendering cart:', cart);
        cartContainer.innerHTML = '<h2>My cart</h2>';
        if (cart.length === 0) {
            cartContainer.innerHTML += '<p>Your cart is empty.</p>';
            updateSummary();
            return;
        }
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" onerror="this.src='assets/images/placeholder.png'">
                <div class="details">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
                    <div class="actions">
                        <button class="remove" data-id="${item.id}">Remove</button>
                        <button class="save" data-id="${item.id}">Save for later</button>
                    </div>
                </div>
                <div class="price-qty">
                    <p>$${item.price.toFixed(2)}</p>
                    <select class="quantity-select" data-id="${item.id}">
                        ${[1, 2, 3, 4, 5].map(q => `<option value="${q}" ${item.quantity === q ? 'selected' : ''}>Qty: ${q}</option>`).join('')}
                    </select>
                </div>
            `;
            cartContainer.appendChild(itemElement);
        });

        // Add event listeners for remove and save
        const removeButtons = document.querySelectorAll('.remove');
        removeButtons.forEach(button => {
            const id = parseInt(button.dataset.id);
            button.addEventListener('click', () => {
                console.log(`Removing item with ID: ${id}`);
                cart = cart.filter(item => item.id !== id);
                debouncedSaveState();
                showToast('Item removed from cart');
            });
        });

        const saveButtons = document.querySelectorAll('.save');
        saveButtons.forEach(button => {
            button.addEventListener('click', () => {
                showToast('Saved for later (not implemented)');
            });
        });

        const quantitySelects = document.querySelectorAll('.quantity-select');
        quantitySelects.forEach(select => {
            const id = parseInt(select.dataset.id);
            select.addEventListener('change', (e) => {
                console.log(`Updating quantity for ID: ${id} to ${e.target.value}`);
                const quantity = parseInt(e.target.value);
                const item = cart.find(item => item.id === id);
                if (item) {
                    item.quantity = quantity;
                    debouncedSaveState();
                    showToast('Quantity updated');
                }
            });
        });

        updateSummary();
    };

    // Update summary
    const updateSummary = () => {
        const summary = document.querySelector('.summary');
        if (!summary) {
            console.warn('Summary container not found on productcart.html. Expected class: .summary');
            return;
        }
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const discount = subtotal > 100 ? 60 : 0;
        const tax = 14;
        const total = subtotal - discount + tax;
        summary.innerHTML = `
            <h3>Order Summary</h3>
            <div class="line"><span>Subtotal:</span><span>$${subtotal.toFixed(2)}</span></div>
            <div class="line"><span>Discount:</span><span>- $${discount.toFixed(2)}</span></div>
            <div class="line"><span>Tax:</span><span>+ $${tax.toFixed(2)}</span></div>
            <div class="line total"><span>Total:</span><span>$${total.toFixed(2)}</span></div>
            <button class="checkout-btn">Checkout</button>
            <div class="payment-methods" style="display: flex; justify-content: space-between; gap: 10px; align-items: center; margin-top: 20px;">
                <img src="assets/images/american-express.png" alt="American Express" />
                <img src="assets/images/visa.png" alt="Visa" />
                <img src="assets/images/mastercard.png" alt="MasterCard" />
                <img src="assets/images/paypal.png" alt="PayPal" />
                <img src="assets/images/applepay.png" alt="Apple Pay" />
            </div>
        `;
        const checkoutBtn = summary.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => navigateTo('checkout.html'));
        }
    };


    // Navigation
    const logo = document.querySelector('.brand-name');
    if (logo) {
        logo.addEventListener('click', () => navigateTo('index.html'));
    } else {
        console.warn('Brand logo not found on productcart.html. Expected class: .brand-name');
    }

    const cartIcons = document.querySelectorAll('.cart-count');
    if (!cartIcons.length) {
        console.warn('Cart icons not found on productcart.html. Expected class: .cart-count');
    }
    cartIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            if (cart.length === 0) {
                showToast('Your cart is empty', 'error');
                return;
            }
            navigateTo('productcart.html');
        });
    });

    const backButton = document.querySelector('.back');
    if (backButton) {
        backButton.addEventListener('click', () => navigateTo('index.html'));
    } else {
        console.warn('Back button not found on productcart.html. Expected class: .back');
    }

    const removeAll = document.querySelector('.remove-all');
    if (removeAll) {
        removeAll.addEventListener('click', () => {
            console.log('Removing all cart items');
            cart = [];
            debouncedSaveState();
            showToast('All items removed from cart');
        });
    } else {
        console.warn('Remove all button not found on productcart.html. Expected class: .remove-all');
    }
    

    // Newsletter form
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Subscribed to newsletter!');
            newsletterForm.reset();
        });
    } else {
        console.warn('Newsletter form not found on productcart.html. Expected ID: #newsletter-form');
    }

    // Initial render
    updateCartCount();
    renderCart();
});