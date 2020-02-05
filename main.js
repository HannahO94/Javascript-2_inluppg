$(document).ready(function() {
    $.getJSON("products.json", function(user) {
        let data = user.products;
        $.each(data, function(i, name) {
            $("#product-container").append(
                '<div class="card" style="width: 18rem;"' +
                    "<div>" +
                    "<img class='card-img-top'src=" +
                    data[i].img +
                    ">" +
                    "<p class='product'>" +
                    data[i].name +
                    "  " +
                    "</p>" +
                    "<span class='price'>" +
                    data[i].price +
                    "</span>" +
                    "<span> kr </span>" +
                    '<button class="btn btn-primary">köp</button>' +
                    "</p>" +
                    "</div>" +
                    "</div>"
            );
        });
        $(".btn").click(function(event) {
            event.preventDefault();
            let prod = $(this).parent();
            let litext = prod.find(".product");
            let liprice = prod.find(".price");

            $("#cart-list").append(
                "<li class='cart-row'>" +
                    litext.text() +
                    "<span class='product-price'>" +
                    liprice.text() +
                    "</span>" +
                    "<span>kr</span>" +
                    "</li>"
            );

            totalPriceAdd();
        });
        // funktion för att räkna ut totalsumman när en produkt läggs till i varukorgen. (En annan variant av koden kommer behövas om man klickar på ta bort knapp)
        function totalPriceAdd() {
            let totalPrice = 0;
            $(".cart-row")
                .find(".product-price")
                .each(function() {
                    totalPrice += parseFloat($(this).html());
                });
            document.getElementById("total").innerHTML =
                "<strong>SUMMA:</strong>" + totalPrice + "<br>";
        }

        //click function för remove button
        $(".remove-btn").click(function(event) {
            event.preventDefault();
            $("#cart-list").remove($(this));
            totalPriceRemove();
        });
        //funktion för att räkna ut nya summan när en produkt är borttagen
        function totalPriceRemove() {
            $(".cart-row")
                .find(".product-price")
                .each(function() {
                    totalPrice -= parseFloat($(this).html());
                });
            document.getElementById("total").innerHTML =
                "<strong>SUMMA:</strong>" + totalPrice + "<br>";
        }
    });

    $("#order").click(function(event) {
        $("li").remove();
        alert("Tack för din beställning!");
    });
});

// $(".btn").click(add);
// function add() {
//     let $list = $("ul");
//     let $card = document.getElementsByClassName("card");
//     console.log($card);
//     let li = "<li>" + $card + "</li>";
//     $list.append(li);
// }

//första koden för att räkna ut totalsumman
// let cartRows = document.getElementsByClassName("cart-row");
// let total = 0;
// let priceEl = 0;
// let price = 0;
// let thePrice = 0;

// // $.each(cartRows, function(i) {
// for (let i = 0; i < cartRows.length; i++) {
//     // let cartRow = cartRows[i];
//     thePrice = $(".product-price");
//     priceEl = thePrice.text();
//     // console.log(priceEl);
//     price = parseFloat(priceEl);
//     total += price;
//     console.log(total);
// }
// document.getElementById("total").innerHTML = "Total: " + total;
