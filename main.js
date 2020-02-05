$(document).ready(function() {
    $.getJSON("products.json", function(user) {
        let data = user.products;
        //en loop som hämtar json data och för varje produkt skapas html taggar och produkterna appendas till produkt containern. En köp knapp skapas.
        $.each(data, function(i, name) {
            $("#product-container").append(
                '<div class="product-card"' +
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
                    "<br>" +
                    '<input type="number" max="10" min="1" value="1" class="product-qty" />' +
                    '<button class="buy-btn btn-primary">köp</button>' +
                    "</p>" +
                    "</div>" +
                    "</div>"
            );
        });
        //klick event på köp knappen. Hittar pris och produkt elementen.
        $(".buy-btn").click(function(event) {
            event.preventDefault();
            let prod = $(this).parent();
            let litext = prod.find(".product");
            let liprice = prod.find(".price");
            //hittar input för hur många av produkten som ska köpas.
            let productQty = prod.find("input").val();

            // skapar list-element till varje ny produkt i varukorgen. lägger till pris och en ta bort knapp. Varan läggs till sist i listan .
            // antal produkter som man valt vid köpen hämtas ovan och skickas med till det nya inputfältet som skapas i list itemet i variabeln productQty
            $("#cart-list").append(
                "<li class='cart-row'>" +
                    litext.text() +
                    "<span class='product-price'>" +
                    liprice.text() +
                    "</span>" +
                    "<span>kr</span>" +
                    "<br>" +
                    '<input type="number" max="10" min="1" value="' +
                    productQty +
                    '" />' +
                    '<button class="remove-btn">Ta bort</button>' +
                    "</li>"
            );

            //resetar inputfältet när man klickat på köp
            let prodinput = prod.find(".product-qty");
            prodinput.val("1");

            //klick event för ta bort knapp läggs till varje gång ett nytt item skapas
            $(".remove-btn").click(removeCartItem);
            //funktionen som räknar ut totalsumman körs varje gång en produkt läggs till i varukorgen
            getTotalCost();
        });
        // funktion för att räkna ut totalsumman när en produkt läggs till i varukorgen. loopar över alla befintliga rader och ränkar ut totalsumman
        function getTotalCost() {
            let totalPrice = 0;
            $(".cart-row")
                .find(".product-price")
                .each(function() {
                    totalPrice += parseFloat($(this).html());
                });
            document.getElementById("total").innerHTML =
                "<strong>SUMMA:</strong>" + totalPrice + "<br>";
        }

        //funktion för ta bort knapp
        function removeCartItem(event) {
            let buttonClicked = event.target;
            buttonClicked.parentElement.remove();
            //funktionen som räknar ut totalsumman körs varje gång en produkt tas bort ur varukorgen
            getTotalCost();
        }
        //tar bort alla produkter ur listan.
        $("#remove-all").click(function() {
            $("ul").empty();
            getTotalCost();
        });
    });
    //När man klickar på beställ så tas samtliga produkter bort ur varukorgen och man får en alert som tackar för köpet
    $("#order").click(function(event) {
        $("li").remove();
        alert("Tack för din beställning!");
    });
});
