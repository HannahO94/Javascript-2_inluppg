$(document).ready(function() {
    let arrayStorage = JSON.parse(localStorage.getItem("arrayStorage"));
    let totalCost = JSON.parse(localStorage.getItem("totalCost"));
    let $orderedProducts = $("#ordered-products")
    // loopen går igenom varje objekt i arrayen arraystorage och hämtar bildens url, namn, pris och antal. 
    // lägger till tabellens html och lägger in allt i rätt tabell-kolumn. 
    for (let i = 0; i < arrayStorage.length; i++) {
        $($orderedProducts).append(
            "<tr class='ordered-row'>" +
            "<td class='ordered-img'><div class='img-container'><img class='card-img-top image product-image'src='" +
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
    //totalsumman hämtas och läggs till efter tabellen 
    $("#ordered-products").append(totalCost + "<span> kr </span>");
    //tar bort allt som fanns lagrat i local storage. 
    localStorage.clear()
});
