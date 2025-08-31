document.addEventListener('DOMContentLoaded', () => {
    console.log('signup.js loaded');
    
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
                console.warn('Cart count elements not found on signup.html');
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

    // Sign Up form submission
    const signupForm = document.querySelector('#signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Sign Up form submitted');
            const username = document.querySelector('#username').value.trim();
            const email = document.querySelector('#email').value.trim();
            const password = document.querySelector('#password').value.trim();
            const confirmPassword = document.querySelector('#confirm-password').value.trim();

            if (!username || !email || !password || !confirmPassword) {
                showToast('Please fill in all required fields', 'error');
                console.warn('Form validation failed: Missing required fields');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showToast('Please enter a valid email address', 'error');
                console.warn('Invalid email:', email);
                return;
            }

            if (password.length < 6) {
                showToast('Password must be at least 6 characters long', 'error');
                console.warn('Invalid password length');
                return;
            }

            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                console.warn('Password mismatch');
                return;
            }

            // Check if email already exists
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(u => u.email === email)) {
                showToast('Email already registered', 'error');
                console.warn('Email already exists:', email);
                return;
            }

            // Store new user
            const user = { username, email, password };
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(user));
            showToast('Signed up successfully!', 'success');
            console.log('User signed up:', email);
            signupForm.reset();
            setTimeout(() => navigateTo('index.html'), 2000);
        });
    } else {
        console.warn('Sign Up form not found on signup.html. Expected ID: #signup-form');
        showToast('Error: Sign Up form not found', 'error');
    }

    // Navigation
    const logo = document.querySelector('.brand-name');
    if (logo) {
        logo.addEventListener('click', () => navigateTo('index.html'));
    } else {
        console.warn('Brand logo not found on signup.html');
    }

    const cartIcons = document.querySelectorAll('.cart-count');
    if (!cartIcons.length) {
        console.warn('Cart icons not found on signup.html');
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