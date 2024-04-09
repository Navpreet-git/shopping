$(document).ready(function() {
    // Function to get query parameters from URL
    function getQueryParams() {
        var queryParams = {};
        var queryString = window.location.search.substring(1);
        queryString.split("&").forEach(function(param) {
            var pair = param.split("=");
            queryParams[pair[0]] = decodeURIComponent(pair[1]);
        });
        return queryParams;
    }
    
    // Function to display selected products
    function displaySelectedProducts() {
        var queryParams = getQueryParams();
        var tableHTML = "<table><thead><tr><th>Name</th><th>Quantity</th><th>Price</th></tr></thead><tbody>";
        for (var key in queryParams) {
            if (key.startsWith("product")) {
                var index = key.substring(7);
                var productName = queryParams[key];
                var productPrice = parseFloat(queryParams["price" + index]);
                var quantity = localStorage.getItem(productName) || 1; 
                tableHTML += `<tr><td>${productName}</td><td><input type='number' class='quantity' value='${quantity}' min='1'></td><td class='price'>$${productPrice.toFixed(2)}</td></tr>`;
            }
        }
        tableHTML += "</tbody></table>";
        $("#selected-products").html(tableHTML);
    }

    // Function to update total price based on quantity
    function updateTotalPrice() {
        var totalPrice = 0;
        $("table tbody tr").each(function() {
            var price = parseFloat($(this).find(".price").text().replace("$", ""));
            var quantity = parseInt($(this).find(".quantity").val());
            totalPrice += price * quantity;
            localStorage.setItem($(this).find("td:first").text(), quantity); 
        });
        $("#total-price").text("$" + totalPrice.toFixed(2));
    }

    // Call functions on page load
    displaySelectedProducts();
    updateTotalPrice();

    // Event listener for quantity change
    $(document).on("change", ".quantity", updateTotalPrice);
});
