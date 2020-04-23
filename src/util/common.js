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
    await delay(350);

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

// Get reviews for a product
async function getRelatedProducts(id) {
    // Simulate network delay
    // await delay(100);

    var related = [];
    // var relatedMatchedCount = [];
    var products = api_data_products.getProducts();

    // First, get this product's data
    var thisProduct = await findProduct(id);

    // Make sure product data is returned
    if (!thisProduct) {
        console.log("Error fetching related products");
        return [];
    }

    // Make sure it has tags
    if (!thisProduct.tags || thisProduct.tags.length < 1) {
        console.log("No related products found (no tags)");
        return [];
    }

    // Keep track of matches
    var matchedFrequencyList = {};

    // Check the tags for this product against the tags of all the other products
    for (var prod of products) {
        // console.log(prod)
        // Check if product has tags
        if (!prod.tags || prod.tags.length < 1) continue;

        // Skip self
        if (prod.id == thisProduct.id) continue;

        // Iterate this product's tags to see if they have any in common
        for (var tag of thisProduct.tags) {
            // Make all tags lowercase
            // -- code here

            //  Check if tag exists on other product
            if (prod.tags.includes(tag)) {
                // Matched
                if (!matchedFrequencyList[prod.id]) {
                    // Create new prod entry
                    matchedFrequencyList[prod.id] = [];
                }

                // Add tag
                matchedFrequencyList[prod.id].push(tag);
            }
        }

        // Add product to list
        if (matchedFrequencyList[prod.id]) {
            related.push(prod);
        }
    }

    // Sort the list by number of tags in common
    related.sort((a, b) => (matchedFrequencyList[a.id].length < matchedFrequencyList[b.id].length) ? 1 : -1);

    // Return all matched reviews
    return related;
}
export { getRelatedProducts }

// Generate a random int,inclusive
function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export { randomNumberBetween }

// Navigate to product page
function browseToProduct(prodId) {
    this.$router.push({ path: `/products/${prodId}` });
}
export { browseToProduct }