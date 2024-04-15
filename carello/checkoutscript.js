
    /* 
         no longer needed because i stored everything i need to know in local storage
        function getQueryParams() {
                var queryParams = {};
                var queryString = window.location.search.substring(1);
                var params = queryString.split("&");
                params.forEach(function(param) {
                    var pair = param.split("=");
                    queryParams[pair[0]] = decodeURIComponent(pair[1]);
                });
                return queryParams;
            } 
            */


$(document).ready(function() {
    // Function to display selected products in the cart
    function displaySelectedProducts() {
        var selectedProducts = JSON.parse(localStorage.getItem('selectedProducts'));
        if (selectedProducts && selectedProducts.length > 0) {
            var tableHTML = "<table><thead><tr><th>Name</th><th>Quantity</th><th>Price</th></tr></thead><tbody>";
            var totalPrice = 0;
            selectedProducts.forEach(function(product) {
                var productTotalPrice = parseFloat(product.price) * parseInt(product.quantity);
                tableHTML += "<tr data-price='" + product.price + "'><td>" + product.name + "</td><td><input type='number' class='quantity' value='" + product.quantity + "' min='1'></td><td class='price'>$" + productTotalPrice.toFixed(2) + "</td></tr>";
                totalPrice += productTotalPrice;
            });
            tableHTML += "</tbody></table>";
            $("#selected-products").html(tableHTML);
            $("#total-price").text("$" + totalPrice.toFixed(2)); // Update total price
        } else {
            $("#selected-products").html("<p>No items selected</p>");
        }
    }

    function updateTotalPrice() {
        var totalPrice = 0;
        $("table tbody tr").each(function(index) {
            var price = parseFloat($(this).data("price"));
            var quantity = parseInt($(this).find(".quantity").val());
            totalPrice += price * quantity;
        });
        $("#total-price").text("$" + totalPrice.toFixed(2));
    }

    // Call the function to display selected products when the page loads
    displaySelectedProducts();

    // Call the function to update total price based on initial quantities
    updateTotalPrice();

    // Event listener for input change
    $(document).on("change", ".quantity", function() {
        updateTotalPrice();
        // Update local storage when quantity changes
        updateLocalStorage();
    });

    function updateLocalStorage() {
        var selectedProducts = [];
        $("table tbody tr").each(function(index) {
            var productName = $(this).find("td:first").text();
            var quantity = parseInt($(this).find(".quantity").val());
            var price = parseFloat($(this).data("price")); // Retrieve price from data-price attribute
            selectedProducts.push({ name: productName, quantity: quantity, price: price });
        });
        localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
    }

        // Clear the local storage
        function completePurchase() {
        localStorage.removeItem('selectedProducts');
        alert("Thank you for your purchase! Your order has been completed.");
        window.location.href = "index.html";
    }

    // Event listener for completing purchase
    $(document).on("click", "[data-action='completePurchase']", completePurchase);
});
