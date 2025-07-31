const getCart = () => JSON.parse(localStorage.getItem('cart')) || [];
const setCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));

const getSavedForLater = () => JSON.parse(localStorage.getItem('savedForLater')) || [];
const setSavedForLater = (saved) => localStorage.setItem('savedForLater', JSON.stringify(saved));

const updateCartCount = () => {
  const cart = getCart();
  const cartCountElements = document.querySelectorAll('.cart-count');
  cartCountElements.forEach(el => {
    el.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  });
};

const findItemIndex = (items, id) => items.findIndex(item => item.id === id);

const formatPrice = (price) => `$${parseFloat(price).toFixed(2)}`;

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const products = [
  { id: 1, name: "T-shirts with multiple colors, for men", price: 10.30, image: "assets/images/tshirt.jpg", category: "Clothings", brand: "Artel Market", rating: 7.5, details: { size: "medium", color: "blue", material: "Plastic", seller: "Artel Market" } },
  { id: 2, name: "Jeans shorts for men blue color", price: 10.30, image: "assets/images/jeans-shorts.png", category: "Clothings", brand: "Best factory LLC", rating: 7.5, details: { size: "medium", color: "blue", material: "Plastic", seller: "Best factory LLC" } },
  { id: 3, name: "Table Lamp", price: 170.50, image: "assets/images/lamp.jpg", category: "Home interiors", brand: "Artel Market", rating: 7.5, details: { size: "medium", color: "blue", material: "Plastic", seller: "Artel Market" } },
  { id: 4, name: "Samsung Galaxy Pad 5", price: 699.50, image: "assets/images/galaxypad.jpg", category: "Electronics", brand: "Samsung", rating: 7.5, details: { seller: "Artel Market" } },
  { id: 5, name: "Apple iPhone 13", price: 599.50, image: "assets/images/iphone13.jpg", category: "Smartphones", brand: "Apple", rating: 7.5, details: { seller: "Artel Market" } },
  { id: 6, name: "Apple Watch Series 6 - Black", price: 299.50, image: "assets/images/applewatch.jpg", category: "Smartphones", brand: "Apple", rating: 7.5, details: { seller: "Artel Market" } },
  { id: 7, name: "Dell Laptop - XPS 13", price: 99.50, image: "assets/images/laptop.png", category: "Electronics", brand: "Dell", rating: 7.5, details: { seller: "Artel Market" } },
  { id: 8, name: "Canon Camera EOS 2000", price: 998.00, image: "assets/images/canon2000.jpg", category: "Electronics", brand: "Canon", rating: 7.5, details: { seller: "Artel Market" } },
  { id: 9, name: "GoPro HERO6", price: 998.00, image: "assets/images/gopro.jpg", category: "Electronics", brand: "GoPro", rating: 7.5, details: { seller: "Artel Market" } },
  { id: 10, name: "Samsung Galaxy S21", price: 998.00, image: "assets/images/galaxys21.jpg", category: "Smartphones", brand: "Samsung", rating: 7.5, details: { seller: "Artel Market" } },
  { id: 11, name: "Headphones Sony WH-1000XM4", price: 348.00, image: "assets/images/sonyheadphones.jpg", category: "Electronics", brand: "Sony", rating: 7.5, details: { seller: "Artel Market" } },
  { id: 12, name: "Mens Long Sleeve T-shirt", price: 100.00, image: "assets/images/tshirtlong.jpg", category: "Clothings", brand: "Guanjoi Trading LLC", rating: 9.3, details: { size: "medium", material: "Plastic", seller: "Guanjoi Trading LLC" } }
];

const categories = ["Clothings", "Electronics", "Smartphones", "Home interiors", "Modern tech"];
const brands = ["Samsung", "Apple", "Huawei", "Poco", "Lenovo", "Artel Market", "Best factory LLC", "Guanjoi Trading LLC", "Canon", "GoPro", "Sony", "Dell"];
const conditions = ["Any", "Refurbished", "Brand new", "Old Items"];
const ratings = [5, 4, 3];

export { getCart, setCart, getSavedForLater, setSavedForLater, updateCartCount, findItemIndex, formatPrice, validateEmail, products, categories, brands, conditions, ratings };