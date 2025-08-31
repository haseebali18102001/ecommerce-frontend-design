document.addEventListener('DOMContentLoaded', () => {
    console.log('signin.js loaded');
    
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
                console.warn('Cart count elements not found on signin.html');
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

    // Navigate to pages
    const navigateTo = (page) => {
        console.log(`Navigating to: ${page}`);
        window.location.href = page;
    };

    // Sign In form submission
    const signinForm = document.querySelector('#signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Sign In form submitted');
            const email = document.querySelector('#email').value.trim();
            const password = document.querySelector('#password').value.trim();

            if (!email || !password) {
                showToast('Please fill in all required fields', 'error');
                console.warn('Form validation failed: Missing required fields');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast('Please enter a valid email address', 'error');
                console.warn('Invalid email:', email);
                return;
            }

            // Simulate authentication with localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);
            if (!user) {
                showToast('Invalid email or password', 'error');
                console.warn('Authentication failed for email:', email);
                return;
            }

            // Store logged-in user
            localStorage.setItem('currentUser', JSON.stringify(user));
            showToast('Signed in successfully!', 'success');
            console.log('User signed in:', email);
            signinForm.reset();
            setTimeout(() => navigateTo('index.html'), 2000);
        });
    } else {
        console.warn('Sign In form not found on signin.html. Expected ID: #signin-form');
        showToast('Error: Sign In form not found', 'error');
    }

    // Navigation
    const logo = document.querySelector('.brand-name');
    if (logo) {
        logo.addEventListener('click', () => navigateTo('index.html'));
    } else {
        console.warn('Brand logo not found on signin.html');
    }

    const cartIcons = document.querySelectorAll('.cart-count');
    if (!cartIcons.length) {
        console.warn('Cart icons not found on signin.html');
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

    // Initial render
    updateCartCount();
});