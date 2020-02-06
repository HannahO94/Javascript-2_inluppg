$(document).ready(function() {
    let arrayStorage = JSON.parse(localStorage.getItem("arrayStorage"));
    let totalCost = JSON.parse(localStorage.getItem("totalCost"));
    console.log(arrayStorage);
    console.log(totalCost);
    for (let i = 0; i < arrayStorage.length; i++) {
        $("#ordered-products").append(
            "<li class='ordered-row'>" +
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
});
