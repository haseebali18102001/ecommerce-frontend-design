# Ecommerce Frontend Design

The **Ecommerce Frontend Design** is a responsive, front-end-only e-commerce website built with HTML, CSS, and JavaScript. It offers a user-friendly interface for browsing products, managing a shopping cart, and simulating a checkout process, styled with Bootstrap for cross-device compatibility.

## Features

- **Home Page**: Showcases featured products with "Add to Cart" functionality.
- **Product Grid View**: Displays products in a grid with category filters and sorting options.
- **Product Detail Page**: Shows detailed product information with an option to add to cart.
- **Cart Page**: Allows users to view, update quantities, or remove cart items.
- **Checkout Page**: Includes a form for billing/shipping details with validation and order confirmation.
- **Responsive Design**: Adapts to various screen sizes using Bootstrap and custom CSS.
- **Cart Persistence**: Stores cart data in `localStorage` for seamless navigation.
- **Toast Notifications**: Provides feedback for actions like adding items or form errors.
- **Newsletter Signup**: Enables users to subscribe to updates.

## Technologies Used

- **HTML5**: For page structure.
- **CSS3**: For styling, with custom styles and Bootstrap 4 for responsiveness.
- **JavaScript**: For interactivity, cart management, and form validation.
- **Bootstrap 4**: For responsive layouts (assumed via CDN).
- **LocalStorage**: For client-side cart storage.

## Project Structure

```
ecommerce-frontend-design/
├── assets/
│   ├── images/
│   │   ├── example.png
│   │   ├── placeholder.png
├── index.html
├── productgridview.html
├── productdetailpage.html
├── productcart.html
├── product-listing.html
├── checkout.html
├── css/
│   ├──styles.css
│   ├──productgridview.css
│   ├──productdetailpage.css
│   ├──productcart.css
│   ├──product-listing.css
│   ├──checkout.css
│   ├──toast.css
├── css/
│   ├──index.js
│   ├──productgridview.js
│   ├──productdetailpage.js
│   ├──productcart.js
│   ├──product-listing.js
│   ├──checkout.js
├── README.md
```

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/haseebali18102001/ecommerce-frontend-design.git
   cd ecommerce-frontend-design
   ```

2. **Run the Project**:
   - Open `index.html` in a browser, or use a local server for better performance

3. **Dependencies**:
   - No local dependencies required. Bootstrap is assumed to be included via CDN (e.g., `<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">`).
   - Ensure an internet connection if using CDNs.

4. **Verify Assets**:
   - Confirm `assets/images/example.png` and `assets/images/placeholder.png` exist.
   - Update image paths in JavaScript files if different images are used.

## Usage

- **Home (`index.html`)**: Browse products, add to cart, and view cart count in the header.
- **Product Grid View (`productgridview.html`)**: Filter/sort products and add to cart.
- **Product Detail (`productdetailpage.html`)**: View product details and add to cart.
- **Cart (`productcart.html`)**: Manage cart items and view order summary.
- **Checkout (`checkout.html`)**: Enter billing/shipping details, select payment method, and place order (simulated).
- **Product Listing (`product-listing.html`)**: View products in list format with filters.

## Troubleshooting

- **Cart Count Not Displaying**:
  - Check console for “Cart count elements not found”. Ensure `<span class="cart-count">0</span>` is in the header.
  - Verify `localStorage` has valid cart data (e.g., `[{"id":1,"name":"T-shirt Men","price":10.3,"quantity":1,"image":"assets/images/example.png"}]`).

- **"Product not found" Error**:
  - Ensure `.add-to-cart` buttons have correct `data-id` attributes matching product IDs in JavaScript (e.g., `data-id="1"`).
  - Check console for “Product not found for ID: X”.

- **Checkout Summary Shows $0.00**:
  - Verify `localStorage` cart data. Check console for “Order summary updated: Subtotal=$$X”.
  - Ensure cart items are added before navigating to `checkout.html`.

- **Form Submission Fails**:
  - Confirm form inputs have IDs (`#full-name`, `#email`, `#address`, `#city`, `#zip`, `#payment-method`).
  - Check console for “Form validation failed” or “Checkout attempted with empty cart”.

- **Images Not Loading**:
  - Ensure `assets/images/` contains `example.png` and `placeholder.png`.
  - Check Network tab for 404 errors.

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request with a clear description.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For issues or suggestions, open a GitHub issue or contact the repository owner.

---

Developed by [haseebali18102001](https://github.com/haseebali18102001)


Dependencies:

No external dependencies are required, as Bootstrap is assumed to be included via CDN in the HTML files (e.g., <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">).
Ensure an internet connection if Bootstrap or other CDNs are used.


Verify Assets:

Ensure the assets/images/ folder contains example.png and placeholder.png for product images.
If images are missing, replace them with valid images or update the paths in the JavaScript files.



Usage

Home Page (index.html):

Browse featured products and click "Add to Cart" to add items.
View the cart count in the header, which updates dynamically.
Subscribe to the newsletter using the form at the bottom.


Product Grid View (productgridview.html):

Filter products by category or sort by price/rating.
Add products to the cart with a confirmation prompt to navigate to the cart.


Product Detail Page (productdetailpage.html):

View details of a single product and add it to the cart.


Cart Page (productcart.html):

View cart items, update quantities, or remove items.
See the order summary with subtotal, discount, and tax.


Checkout Page (checkout.html):

Enter billing and shipping details in the form.
Select a payment method and click "Place Order" to simulate order placement.
Upon successful submission, the cart is cleared, and the user is redirected to the homepage.


Product Listing Page (product-listing.html):

View products in a list format with filtering and sorting options.
Add products to the cart or navigate to their detail pages.



Troubleshooting

Cart Count Not Updating:

Check the browser console (F12) for errors like “Cart count elements not found”.
Ensure <span class="cart-count">0</span> is in the header of each HTML file.
Verify localStorage contains valid cart data (e.g., [{"id":1,"name":"T-shirt Men","price":10.3,"quantity":1,"image":"assets/images/example.png"}]).


"Product not found" Error:

Ensure data-id attributes on .add-to-cart buttons match the product IDs in the JavaScript files (e.g., id: 1).
Check console logs for “Product not found for ID: X”.


Checkout Form Issues:

Verify form inputs have correct IDs (#full-name, #email, #address, #city, #zip, #payment-method).
Ensure all fields are filled with valid data (e.g., 5-digit ZIP, valid email).


Images Not Loading:

Confirm assets/images/example.png and assets/images/placeholder.png exist.
Check the browser’s Network tab for 404 errors.



Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request with a detailed description of your changes.

Please ensure your code follows best practices and includes appropriate comments.
License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact
For questions or support, contact the repository owner via GitHub issues or email (if provided).

Built with ❤️ by haseebali18102001
