Ecommerce Frontend Design
Welcome to the Ecommerce Frontend Design project, a responsive front-end e-commerce website built to provide a seamless shopping experience. This project features a clean and user-friendly interface for browsing products, adding items to a cart, and completing a checkout process. It is designed using HTML, CSS, and JavaScript, with Bootstrap for responsive styling.
Features

Home Page: Displays featured products with an option to add items to the cart.
Product Grid View: Showcases products in a grid layout with filtering and sorting capabilities.
Product Detail Page: Provides detailed information about a selected product.
Cart Page: Allows users to view, update, and remove items from their cart.
Checkout Page: Simulates order placement with form validation for billing and shipping details.
Responsive Design: Fully responsive across devices using Bootstrap and custom CSS.
Cart Management: Persists cart data using localStorage for a seamless experience.
Toast Notifications: Displays success and error messages for user actions (e.g., adding to cart, form errors).
Newsletter Subscription: Includes a form for users to subscribe to updates.

Technologies Used

HTML5: For structuring the website.
CSS3: For styling, including custom styles and Bootstrap for responsive design.
JavaScript: For interactivity, cart management, and form validation.
Bootstrap 4: For responsive layouts and components (inferred from checkout.css).
LocalStorage: For storing cart data client-side.

Project Structure
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
├── styles.css
├── productgridview.css
├── productdetailpage.css
├── productcart.css
├── product-listing.css
├── checkout.css
├── toast.css
├── index.js
├── productgridview.js
├── productdetailpage.js
├── productcart.js
├── product-listing.js
├── checkout.js
├── README.md

Setup Instructions
To run this project locally, follow these steps:

Clone the Repository:
git clone https://github.com/haseebali18102001/ecommerce-frontend-design.git
cd ecommerce-frontend-design


Open the Project:

Open index.html in a web browser to view the homepage.
Alternatively, use a local development server (e.g., Live Server in VS Code) for a better experience:npx live-server


This will serve the project at http://localhost:8080.


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
