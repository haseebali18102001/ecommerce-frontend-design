document.addEventListener('DOMContentLoaded', () => {
    console.log('index.js loaded');
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
                console.warn('Cart count elements not found on index.html. Expected class: .cart-count');
                showToast('Error: Cart count display not found', 'error');
                return;
            }
            const count = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
            console.log(`Updating cart count to: ${count}`);
            cartCountElements.forEach(el => {
                el.textContent = count;
                el.style.display = count > 0 ? 'inline' : 'none'; // Hide if zero
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

    // Consistent product data
    const products = [
        
        { id: 1, name: 'T-shirts with multiple colors, for men', price: 10.30, image: 'assets/images/T-shirt.png' },
        { id: 2, name: 'Jeans shorts for men blue color', price: 10.30, image: 'assets/images/jeans-shorts.png' },
        { id: 3, name: 'Brown winter coat medium size', price: 12.50, image: 'assets/images/coat.png' },    
        { id: 4, name: 'Coffee maker with advanced brewing technology', price: 34.00, image: 'assets/images/coffee-maker.png' },
        { id: 5, name: 'Samsung Galaxy S21', price: 99.00, image: 'assets/images/smartphone.png' },
        { id: 6, name: 'Canon camera black, 100x zoom', price: 9.99, image: 'assets/images/camera.png' },
        { id: 7, name: 'Headset for gaming with mic', price: 8.99, image: 'assets/images/headphones.png' },
        { id: 8, name: 'Apple Watch Series 6 - Black', price: 10.30, image: 'assets/images/smartwatch.png' },
        { id: 9, name: 'Blue wallet for men leather matarial', price: 10.30, image: 'assets/images/wallet.png' },
        { id: 10, name: 'Laptop with high performance', price: 80.95, image: 'assets/images/laptop.png' },
        { id: 11, name: 'Gaming headset with noise cancellation', price: 80.95, image: 'assets/images/gaming-headset.png' },
        { id: 12, name: 'Black kettle for kitchen', price: 80.95, image: 'assets/images/kettle-black.png' },
    ];


    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.item-card .add-to-cart');
    if (!addToCartButtons.length) {
        console.warn('Add to Cart buttons not found on index.html. Expected: .item-card .add-to-cart');
        showToast('Error: Add to Cart buttons not found', 'error');
    }
    addToCartButtons.forEach(button => {
        const id = parseInt(button.dataset.id);
        if (!id) {
            console.warn('Add to Cart button missing data-id attribute:', button);
            return;
        }
        button.addEventListener('click', () => {
            console.log(`Add to Cart clicked for product ID: ${id}`);
            const product = products.find(p => p.id === id);
            if (!product) {
                console.error('Product not found for ID:', id, 'Products:', products);
                showToast('Error: Product not found', 'error');
                return;
            }
            const existingItem = cart.find(item => item.id === id);
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
        });
    });

    // Navigation
    const logo = document.querySelector('.brand-name');
    if (logo) {
        logo.addEventListener('click', () => navigateTo('index.html'));
    } else {
        console.warn('Brand logo not found on index.html. Expected class: .brand-name');
    }

    const cartIcons = document.querySelectorAll('.cart-count');
    if (!cartIcons.length) {
        console.warn('Cart icons not found on index.html. Expected class: .cart-count');
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
    // Deal timer countdown
  const timerElements = document.querySelectorAll('.deal-timer div');
  let timeLeft = 4 * 24 * 60 * 60 + 13 * 60 * 60 + 34 * 60 + 56;
  const updateTimer = () => {
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;
    timerElements[0].querySelector('strong').textContent = days.toString().padStart(2, '0');
    timerElements[1].querySelector('strong').textContent = hours.toString().padStart(2, '0');
    timerElements[2].querySelector('strong').textContent = minutes.toString().padStart(2, '0');
    timerElements[3].querySelector('strong').textContent = seconds.toString().padStart(2, '0');
    if (timeLeft > 0) timeLeft--;
    else clearInterval(timerInterval);
  };
  const timerInterval = setInterval(updateTimer, 1000);
  updateTimer();


    // Newsletter form
    const newsletterForm = document.querySelector('#newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Subscribed to newsletter!');
            newsletterForm.reset();
        });
    } else {
        console.warn('Newsletter form not found on index.html. Expected ID: #newsletter-form');
    }

    // Initial cart count update
    updateCartCount();
});