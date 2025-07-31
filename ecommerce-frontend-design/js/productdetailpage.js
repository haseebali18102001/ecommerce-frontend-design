document.addEventListener('DOMContentLoaded', () => {
    console.log('productdetailpage.js loaded');
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
                console.warn('Cart count elements not found on productdetailpage.html. Expected class: .cart-count');
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

    // Mock product data
    const product = {
        id: 1,
        name: 'Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle',
        price: 78.00,
        image: 'assets/images/Mens-T-shirt.png'
    };

    // Add to cart
    const addToCartButton = document.querySelector('.add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            console.log(`Add to Cart clicked for product ID: ${product.id}`);
            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                if (cart.reduce((sum, item) => sum + (item.quantity || 0), 0) >= 10) {
                    showToast('Maximum cart quantity (10) reached', 'error');
                    return;
                }
                existingItem.quantity += 1;
            } else {
                if (cart.reduce((sum, item) => sum + (item.quantity || 0), 0) >= 10) {
                    showToast('Maximum cart quantity (10) reached', 'error');
                    return;
                }
                cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.image });
            }
            debouncedSaveState();
            showToast(`${product.name} added to cart!`);
            if (confirm('Item added to cart! Go to cart now?')) {
                navigateTo('productcart.html');
            }
        });
    } else {
        console.warn('Add to Cart button not found on productdetailpage.html. Expected class: .add-to-cart');
        showToast('Error: Add to Cart button not found', 'error');
    }

    // Navigation
    const logo = document.querySelector('.brand-name');
    if (logo) {
        logo.addEventListener('click', () => navigateTo('index.html'));
    } else {
        console.warn('Brand logo not found on productdetailpage.html. Expected class: .brand-name');
    }

    const cartIcons = document.querySelectorAll('.cart-count');
    if (!cartIcons.length) {
        console.warn('Cart icons not found on productdetailpage.html. Expected class: .cart-count');
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
        console.warn('Newsletter form not found on productdetailpage.html. Expected ID: #newsletter-form');
    }

    // Initial cart count update
    updateCartCount();
});