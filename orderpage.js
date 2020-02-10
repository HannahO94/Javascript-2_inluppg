$(document).ready(function() {
    let arrayStorage = JSON.parse(localStorage.getItem("arrayStorage"));
    let totalCost = JSON.parse(localStorage.getItem("totalCost"));
    let $orderedProducts = $("#ordered-products")

    for (let i = 0; i < arrayStorage.length; i++) {
        $($orderedProducts).append(
            "<tr class='ordered-row'>" +
            "<td class='ordered-img'><div class='image-container'><img class='card-img-top image product-image'src='" +
                arrayStorage[i].image +
                    "'></div></td>" +
                "<td class='product-name'>" +
                arrayStorage[i].name +
                "</td>" +
                "<td class='product-price'>" +
                arrayStorage[i].price +
                "<span>kr</span>" +
                "</td>" + 
                "<td> " +
                arrayStorage[i].quantity +
                "st</td>" +
                "</tr>"
        );
    }
    $("#ordered-products").append(totalCost + "<span> kr </span>");
    localStorage.clear()
});
