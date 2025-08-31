document.addEventListener('DOMContentLoaded', () => {
    console.log('checkout.js loaded');
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
                console.warn('Cart count elements not found on checkout.html. Expected class: .cart-count');
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
            updateSummary();
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

    // Update order summary
    const updateSummary = () => {
        const summaryDetails = document.querySelector('.summary-details');
        if (!summaryDetails) {
            console.warn('Summary details container not found on checkout.html. Expected class: .summary-details');
            showToast('Error: Order summary container not found', 'error');
            return;
        }
        const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
        const discount = subtotal > 100 ? 60 : 0;
        const tax = 14;
        const total = subtotal - discount + tax;
        summaryDetails.innerHTML = `
            <div class="line"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
            <div class="line"><span>Discount</span><span>- $${discount.toFixed(2)}</span></div>
            <div class="line"><span>Tax</span><span>+ $${tax.toFixed(2)}</span></div>
            <div class="line total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
        `;
        console.log(`Order summary updated: Subtotal=$${subtotal.toFixed(2)}, Total=$${total.toFixed(2)}`);
    };

    // Form validation and submission
    const checkoutForm = document.querySelector('.checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Checkout form submitted');
            const fullName = document.querySelector('#full-name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const address = document.querySelector('#address').value.trim();
            const city = document.querySelector('#city').value.trim();
            const zip = document.querySelector('#zip').value.trim();
            const paymentMethod = document.querySelector('#payment-method').value;

            if (!fullName || !email || !address || !city || !zip || paymentMethod === 'Select Payment Method') {
                showToast('Please fill in all required fields', 'error');
                console.warn('Form validation failed: Missing required fields');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast('Please enter a valid email address', 'error');
                console.warn('Invalid email:', email);
                return;
            }

            if (!/^\d{5}$/.test(zip)) {
                showToast('Please enter a valid 5-digit ZIP code', 'error');
                console.warn('Invalid ZIP code:', zip);
                return;
            }

            if (cart.length === 0) {
                showToast('Your cart is empty', 'error');
                console.warn('Checkout attempted with empty cart');
                return;
            }

            // Simulate order placement
            cart = [];
            debouncedSaveState();
            showToast('Order placed successfully!', 'success');
            console.log('Order placed, cart cleared');
            checkoutForm.reset();
            setTimeout(() => navigateTo('index.html'), 2000);
        });
    } else {
        console.warn('Checkout form not found on checkout.html. Expected class: .checkout-form');
        showToast('Error: Checkout form not found', 'error');
    }

    // Continue shopping button
    const continueShoppingBtn = document.querySelector('.continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            console.log('Continue shopping clicked');
            navigateTo('index.html');
        });
    } else {
        console.warn('Continue shopping button not found on checkout.html. Expected class: .continue-shopping');
    }

    // Navigation
    const logo = document.querySelector('.brand-name');
    if (logo) {
        logo.addEventListener('click', () => navigateTo('index.html'));
    } else {
        console.warn('Brand logo not found on checkout.html. Expected class: .brand-name');
    }

    const cartIcons = document.querySelectorAll('.cart-count');
    if (!cartIcons.length) {
        console.warn('Cart icons not found on checkout.html. Expected class: .cart-count');
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

    // Breadcrumb navigation
    const breadcrumbs = document.querySelectorAll('.breadcrumb a');
    breadcrumbs.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (link.textContent.trim() === 'Home') {
                navigateTo('index.html');
            } else if (link.textContent.trim() === 'Cart') {
                navigateTo('productcart.html');
            }
        });
    });

    // Newsletter form
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Subscribed to newsletter!');
            newsletterForm.reset();
        });
    } else {
        console.warn('Newsletter form not found on checkout.html. Expected ID: #newsletter-form');
    }

    // Initial render
    updateCartCount();
    updateSummary();
});