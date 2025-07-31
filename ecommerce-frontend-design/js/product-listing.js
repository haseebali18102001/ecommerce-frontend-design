document.addEventListener('DOMContentLoaded', () => {
    console.log('product-listing.js loaded');
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
                console.warn('Cart count elements not found on product-listing.html. Expected class: .cart-count');
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

    // Consistent product data
    const products = [
        { id: 1, name: 'Canon Camera EOS 2000, Black 10x zoom', price: 998.00, category: 'Electronics', rating: 7.5, image: 'assets/images/camera.png' },
        { id: 2, name: 'GoPro HERO6 4K Action Camera - Black', price: 998.00, category: 'Electronics', rating: 7.5, image: 'https://m.media-amazon.com/images/I/51nWHfz5I-L.__AC_SY300_SX300_QL70_FMwebp_.jpg' },
        { id: 3, name: 'Apple Smart Watch Series 6 - Black', price: 399.00, category: 'Smartphones', rating: 7.5, image: 'assets/images/smart-watches.png' },
        { id: 4, name: 'Laptop Dell XPS 13', price: 998.00, category: 'Electronics', rating: 7.5, image: 'assets/images/laptop.png' },
        { id: 5, name: 'Samsung Galaxy S21', price: 998.00, category: 'Smartphones', rating: 7.5, image: 'assets/images/smartphone.png' },
        { id: 6, name: 'Headphones Sony WH-1000XM4', price: 348.00, category: 'Electronics', rating: 7.5, image: 'assets/images/headphones.png' },
    ];

    // Render Products
    const productListing = document.querySelector('.product-listing');
    if (!productListing) {
        console.error('Product listing container not found on product-listing.html. Expected class: .product-listing');
        showToast('Error: Product listing container not found', 'error');
        return;
    }
    const renderProducts = (filteredProducts) => {
        console.log('Rendering products:', filteredProducts);
        productListing.innerHTML = '';
        if (filteredProducts.length === 0) {
            productListing.innerHTML = '<p class="no-products">No products found.</p>';
            showToast('No products match the selected filters', 'error');
            return;
        }
        filteredProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='assets/images/placeholder.png'">
                </div>
                <div class="product-details">
                    <div class="product-title">${product.name}</div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <div class="old-price">$${product.price * 1.2.toFixed(2)}</div>
                    <div class="ratings">
                        <i class="stars">${'★'.repeat(Math.floor(product.rating / 2))}</i>
                        <span>${product.rating} • 154 orders</span>
                        <span class="free-shipping">• Free Shipping</span>
                    </div>
                    <p class="description">${product.name} is a great product for enthusiasts.</p>
                    <a href="productdetailpage.html" class="view-link">View details</a>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button class="fav-button" aria-label="Toggle favorite for ${product.name}">🤍</button>
                </div>
            `;
            productListing.appendChild(card);
        });

        // Add event listeners
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        if (!addToCartButtons.length) {
            console.warn('Add to Cart buttons not found on product-listing.html. Expected: .product-card .add-to-cart');
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

        const favButtons = document.querySelectorAll('.fav-button');
        favButtons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('active');
                button.textContent = button.classList.contains('active') ? '❤️' : '🤍';
                showToast(button.classList.contains('active') ? 'Added to favorites' : 'Removed from favorites');
            });
        });

        const viewLinks = document.querySelectorAll('.view-link');
        viewLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo('productdetailpage.html');
            });
        });
    };

    // Navigation
    const logo = document.querySelector('.brand-name');
    if (logo) {
        logo.addEventListener('click', () => navigateTo('index.html'));
    } else {
        console.warn('Brand logo not found on product-listing.html. Expected class: .brand-name');
    }

    const cartIcons = document.querySelectorAll('.cart-count');
    if (!cartIcons.length) {
        console.warn('Cart icons not found on product-listing.html. Expected class: .cart-count');
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

    // Filter and Sort
    const filterCheckboxes = document.querySelectorAll('.filter-body input[type="checkbox"]');
    const sortSelect = document.querySelector('.filters-right select');
    const filterTagsContainer = document.querySelector('.filters');

    if (filterCheckboxes.length && filterTagsContainer) {
        filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const selectedFilters = Array.from(filterCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                const filteredProducts = selectedFilters.length
                    ? products.filter(product => selectedFilters.includes(product.category))
                    : products;
                filterTagsContainer.innerHTML = selectedFilters.map(filter => `
                    <span class="filter-tag">${filter} ✕</span>
                `).join('') + '<a href="#" class="clear-filters">Clear all filter</a>';
                renderProducts(filteredProducts);
                showToast(selectedFilters.length ? `Filtered by ${selectedFilters.join(', ')}` : 'All filters cleared');
            });
        });

        filterTagsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('clear-filters')) {
                e.preventDefault();
                filterCheckboxes.forEach(cb => cb.checked = false);
                filterTagsContainer.innerHTML = '<a href="#" class="clear-filters">Clear all filter</a>';
                renderProducts(products);
                showToast('All filters cleared');
            } else if (e.target.classList.contains('filter-tag')) {
                const filterValue = e.target.textContent.replace(' ✕', '');
                const checkbox = Array.from(filterCheckboxes).find(cb => cb.value === filterValue);
                if (checkbox) checkbox.checked = false;
                const selectedFilters = Array.from(filterCheckboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                filterTagsContainer.innerHTML = selectedFilters.map(filter => `
                    <span class="filter-tag">${filter} ✕</span>
                `).join('') + '<a href="#" class="clear-filters">Clear all filter</a>';
                const filteredProducts = selectedFilters.length
                    ? products.filter(product => selectedFilters.includes(product.category))
                    : products;
                renderProducts(filteredProducts);
                showToast(selectedFilters.length ? `Filtered by ${selectedFilters.join(', ')}` : 'All filters cleared');
            }
        });
    } else {
        console.warn('Filters not found on product-listing.html. Expected: .filter-body, .filters');
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortValue = sortSelect.value;
            let sortedProducts = [...products];
            if (sortValue === 'lowest-price') {
                sortedProducts.sort((a, b) => a.price - b.price);
            } else if (sortValue === 'highest-rating') {
                sortedProducts.sort((a, b) => b.rating - a.rating);
            }
            renderProducts(sortedProducts);
            showToast(`Sorted by ${sortSelect.options[sortSelect.selectedIndex].text}`);
        });
    } else {
        console.warn('Sort select not found on product-listing.html. Expected: .filters-right select');
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
        console.warn('Newsletter form not found on product-listing.html. Expected ID: #newsletter-form');
    }

    // Initial render
    updateCartCount();
    renderProducts(products);
});