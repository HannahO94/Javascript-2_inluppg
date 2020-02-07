$(document).ready(function() {
    $.getJSON("products.json", function(user) {
        let data = user.products;
        //en loop som hämtar json data och för varje produkt skapas html taggar och produkterna appendas till produkt containern. En köp knapp skapas.
        $.each(data, function(i, name) {
            $("#product-container").append(
                '<div class="product-card"' +
                    "<div>" +
                    "<img class='card-img-top image'src=" +
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
                    '<button class="buy-btn btn-warning" style="width: 50px">köp</button>' +
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
            //sparar ner varje bilds url
            let picture = prod.find("img").attr("src");
            
            //hittar input för hur många av produkten som ska köpas.
            let productQty = prod.find("input").val();

            // skapar list-element till varje ny produkt i varukorgen. lägger till pris och en ta bort knapp. Varan läggs till sist i listan .
            // antal produkter som man valt vid köpen hämtas ovan och skickas med till det nya inputfältet som skapas i list itemet i variabeln productQty
            $("#cart-list").append(
                "<li class='cart-row'>" +
                    "<span class='product-name'>" +
                    litext.text() +
                    "</span>" +
                    "<span class='product-price'>" +
                    liprice.text() +
                    "</span>" +
                    "<span>kr</span>" +
                    "<br>" +
                    '<input type="number" max="10" min="1" value="' +
                    productQty +
                    '" class="input-qty" />' +
                    //lägger in bildens url i istan med css display none.
                    "<p style = 'display: none;' class='product-image'>" + 
                    picture +
                    "</p>" +
                    '<button class="remove-btn">Ta bort</button>' +
                    "</li>"
            );

            //resetar inputfältet när man klickat på köp
            $(".product-qty").val("1");

            //klick event för ta bort knapp läggs till varje gång ett nytt item skapas
            $(".remove-btn").click(removeCartItem);
            //funktionen som räknar ut totalsumman körs varje gång en produkt läggs till i varukorgen
            getTotalCost();

            // event för om antalet i input-qty ändras i varukorgen. då körs funktionen get total cost igen
            $(".input-qty").on("input", getTotalCost);
        });
        // funktion för att räkna ut totalsumman när en produkt läggs till i varukorgen. loopar över alla befintliga rader och ränkar ut totalsumman
        function getTotalCost() {
            let totalPrice = 0;
            let $cartRow = $(".cart-row");
            //loopar över varje rad i varukorgen
            $($cartRow).each(function() {
                //hittar priset och antalet på this.cartrow för varje loop
                let $prodPrice = $(this).find(".product-price");
                let $prodQty = $(this)
                    .find("input")
                    .val();
                // gör om från strängar till floats med parseFloat
                let $pPrice = parseFloat($prodPrice.html());
                let $pQty = parseFloat($prodQty);

                totalPrice += $pPrice * $pQty;
            });
            //lägger till den nya totalen på sidan
            document.getElementById("total").innerHTML =
                "<strong>SUMMA:</strong>" + totalPrice + "<br>";
        }

        //funktion för att ta bort item ur varukorgen. tittar på knappens parent element vilket är list elementet och tar bort det
        function removeCartItem(event) {
            let buttonClicked = event.target;
            buttonClicked.parentElement.remove();
            //funktionen som räknar ut totalsumman körs varje gång en produkt tas bort ur varukorgen
            getTotalCost();
        }
        //tar bort alla produkter ur listan. Räknar ut totalsumman, som bilr 0 eftersom varukorgen är tom
        $("#remove-all").click(function() {
            $("ul").empty();
            getTotalCost();
        });
    });
    //När man klickar på beställ så tas samtliga produkter bort ur varukorgen och man får en alert som tackar för köpet
    $("#order").click(function(event) {
        let $cartRow = $(".cart-row");
        if($cartRow.length == 0){
            alert("Din varukorg är tom");
            return false
        }
        else{
        storeToLocalStorage()
        $("li").remove();
        $("#total").html("<strong>SUMMA:</strong>");
        alert("Tack för din beställning!");
        }
    });
    function storeToLocalStorage () {
        
        let arrayStorage = [];
        let $cartRow = $(".cart-row");
        let $totalCost = $("#total").text();

        //kollar på alla list-items och hittar namn, pris och antal 
        $($cartRow).each(function() {

            let $productName = $(this)
                .find(".product-name")
                .html();
            let $productPrice = $(this)
                .find(".product-price")
                .html();
            let $productQty = $(this)
                .find("input")
                .val();
            //hittar den gömda bild url:en i varukorgen. 
            let $productImage = $(this).find(".product-image").text()  

            //gör objekt av alla list items 
            let products = {
                name: $productName,
                price: $productPrice,
                quantity: $productQty,
                image: $productImage
            };
            //pushar in objektet i arrayen.
            arrayStorage.push(products);
        });
    
        // Sparar arrayen i localStorage
        localStorage.setItem("arrayStorage", JSON.stringify(arrayStorage));
        localStorage.setItem("totalCost", JSON.stringify($totalCost));
    }
});

// så här såg getTotalCost ut från början.
// function getTotalCost() {
//     let totalPrice = 0;
//     $(".cart-row")
//         .find(".product-price")
//         .each(function() {
//             totalPrice += parseFloat($(this).html());
//         });
//     document.getElementById("total").innerHTML =
//         "<strong>SUMMA:</strong>" + totalPrice + "<br>";
// }
