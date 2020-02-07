$(document).ready(function() {
    let arrayStorage = JSON.parse(localStorage.getItem("arrayStorage"));
    let totalCost = JSON.parse(localStorage.getItem("totalCost"));
    let $orderedProducts = $("#ordered-products")

    for (let i = 0; i < arrayStorage.length; i++) {
        $($orderedProducts).append(
            "<li class='ordered-row'>" +
            "<div class='ordered-img'><img class='card-img-top image product-image'src='" +
                arrayStorage[i].image +
                    "'></div>" +
                "<span class='product-name'>" +
                arrayStorage[i].name +
                "</span>" +
                "<span class='product-price'>" +
                arrayStorage[i].price +
                "</span>" +
                "<span>kr</span>" +
                "<span> " +
                arrayStorage[i].quantity +
                "st<span/>" +
                "</li>"
        );
    }
    $("#ordered-products").append(totalCost);
    localStorage.clear()
});
