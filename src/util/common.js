// Data stored as JSON (temporary until back-end is up)
import api_data_products from "@/data/products.js";
import api_data_reviews from "@/data/products_reviews.js";
import api_data_users from "@/data/users.js";

// Simulate api promise
function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}
export { delay }

// Search for and return a product
async function findProduct(id) {
    // Simulate network delay
    await delay(450);

    // Search for product
    var products = api_data_products.getProducts();
    for (var prod of products) {
        if (prod.id == id) {
            return prod;
        }
    }
    // No product found
    return null;
}
export { findProduct }

// Get reviews for a product
async function getProductReviews(id) {
    // Simulate network delay
    await delay(450);

    // Search for product
    var reviews = [];
    var allReviews = api_data_reviews.getReviews();
    for (var review of allReviews) {
        if (review.product_id == id) {
            // Add to list
            reviews.push(review);
        }
    }
    // Return all matched reviews
    return reviews;
}
export { getProductReviews }

// Fetch image for a product
function fetchProductImg(product) {
    if (Object.prototype.hasOwnProperty.call(product, "img") == false) {
        return null;
    }
    return require("@/assets/products/" + product.img);
}
export { fetchProductImg }

// Get details for a user
function getUser(id) {
    // Search for user
    var users = api_data_users.getUsers();
    for (var user of users) {
        console.log(users)
        if (user.id == id) {
            return user;
        }
    }
    // No user found
    return null;
}
export { getUser }

// Fetch image for a product
function getUserImg(user) {
    if (Object.prototype.hasOwnProperty.call(user, "img") == false) {
        return null;
    }
    return require("@/assets/avatars/" + user.img);
}
export { getUserImg }

// Generate a random int,inclusive
function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export { randomNumberBetween }