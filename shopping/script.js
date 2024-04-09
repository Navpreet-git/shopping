$(document).ready(function() {
    // Array to store product data
    var products = [
        {
            name: "Milk",
            price: 2.99,
            description: "Fresh and nutritious milk sourced from local farms.",
            features: ["Rich in calcium", "Great for breakfast"]
        },
        {
            name: "Yogurt",
            price: 1.49,
            description: "Creamy and delicious yogurt perfect for snacks.",
            features: ["Live and active cultures", "Variety of flavors"]
        },
        {
            name: "Green Peas",
            price: 1.99,
            description: "Fresh and tender green peas, perfect for adding a pop of color and flavor to your dishes.",
            features: ["High in fiber", "Versatile ingredient"]
        },      
        {
            name: "Capsicum",
            price: 0.79,
            description: "Colorful and crunchy capsicum, perfect for salads, stir-fries, and stuffing.",
            features: ["Rich in vitamins A and C", "Adds vibrant color to dishes"]
        },        
        {
            name: "Broccoli",
            price: 1.49,
            description: "Fresh broccoli florets, great for steaming, roasting,salads.",
            features: ["High in vitamins K and C", "Versatile vegetable for various recipes"]
        },       
        {
            name: "Carrots",
            price: 0.99,
            description: "Crunchy and sweet carrots, perfect for snacking, salads, and cooking.",
            features: ["Rich in beta-carotene and fiber", "Versatile vegetable for various dishes"]
        },      
        {
            name: "Oranges",
            price: 0.69,
            description: "Juicy and refreshing oranges, packed with vitamin C and perfect for snacking or juicing",
            features: ["High in vitamin C", "Great for boosting immunity"]
        },        
        {
            name: "Salad Box",
            price: 6.99,
            description: "Fresh and nutritious salad box containing a variety of mixed greens, vegetables, and toppings.",
            features: ["Includes green veggies", "Perfect for quick and healthy meals"]
        },
        
    ];

    // Define an array to store selected products
    var selectedProducts = [];

// Function to add a product to the selected products array and store it in local storage
function addProduct(name, price) {
    selectedProducts.push({ name: name, price: price });
    // Store selected products in local storage
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
}
var storedProducts = localStorage.getItem('selectedProducts');
if (storedProducts) {
    selectedProducts = JSON.parse(storedProducts);
}
    // Function to navigate to the checkout page with selected products
    function goToCheckout(selectedProducts) {
        var queryString = "?";
        selectedProducts.forEach(function(product, index) {
            queryString += "product" + (index + 1) + "=" + encodeURIComponent(product.name) + "&";
            queryString += "price" + (index + 1) + "=" + encodeURIComponent(product.price) + "&";
        });
        window.location.href = "checkout.html" + queryString;
    }

    // Function to generate product HTML
    function generateProductHTML(product) {
        return `
            <div class="product">
                <div class="product-info">
                    <img class="product-image" src="images/${product.name.toLowerCase()}.jpeg" alt="something went wrong">
                    <div class="product-details">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <h2>$${product.price.toFixed(2)}</h2>
                        <ul class="product-features">
                            ${product.features.map(feature => `<li class="feature">${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <button class="add-to-cart" data-name="${product.name}" data-price="${product.price}">Add</button>
            </div>
        `;
    }

    // Function to display products
    function displayProducts() {
        var productContainer = $('.product-container');
        products.forEach(function(product) {
            productContainer.append(generateProductHTML(product));
        });
    }

    // Call displayProducts when the page loads
    displayProducts();

    // Add click event listener to the "Add" buttons
    $(document).on('click', '.add-to-cart', function() {
        var productName = $(this).data('name');
        var productPrice = parseFloat($(this).data('price'));
        addProduct(productName, productPrice);
    });

    // Add click event listener to the logo image to navigate to checkout with selected products
    $(".logo").click(function() {
        // Navigate to checkout page with selected products
        goToCheckout(selectedProducts);
    });
});
