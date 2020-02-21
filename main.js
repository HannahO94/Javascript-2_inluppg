$(document).ready(function() {
    $.getJSON("products.json", function(item) {
        let data = item.products;
        $.each(data, function(i) {
            $("#product-container").append(
                "<div class='product-card'>" +
                    "<img class='card-img-top'src=" +
                    data[i].img +
                    ">" +
                    '<span class="product">' +
                    data[i].name +
                    "</span>" +
                    "<br>" +
                    '<span class="price">' +
                    data[i].price +
                    "</span>" +
                    "<span>kr</span>" +
                    "<br>" +
                    '<input type="number" max="10" min="1" value="1" class="product-qty" />' +
                    " st" +
                    "<br>" +
                    "<br>" +
                    '<button class="btn btn-warning">Köp </button>' +
                    "</div>"
            );
        });

        $(".btn").click(addToCart);

        function addToCart(event) {
            event.preventDefault();
            let $productParent = $(this).parent();
            let $itemName = $productParent.find(".product");
            let $itemPrice = $productParent.find(".price");
            let $itemQty = $productParent.find("input").val();
            let $itemImg = $productParent.find(".card-img-top").attr("src");

            $("#cart-list").append(
                "<li class='cart-row'>" +
                    "<div class='img-container'>" +
                    $itemImg +
                    "</div>" +
                    "<span class='product-name'>" +
                    $itemName.text() +
                    "</span>" +
                    "<br> " +
                    "<span class='product-price'>" +
                    $itemPrice.text() +
                    "</span>" +
                    "<span>kr</span>" +
                    " " +
                    '<input type="number" max="10" min="1" value="' +
                    $itemQty +
                    '" class="input-qty" />' +
                    " st" +
                    "<button class='remove-btn'>❌</button>" +
                    "</li>"
            );

            $(".product-qty").val("1");
            $(".remove-btn").click(removeCartItem);
            getTotalCost();
            $(".input-qty").on("input", getTotalCost);
        }

        function getTotalCost() {
            let $totalPrice = 0;
            let $cartRow = $(".cart-row");
            $($cartRow).each(function() {
                let $prodPrice = $(this).find(".product-price");
                let $prodQty = $(this)
                    .find("input")
                    .val();
                let $pPrice = parseFloat($prodPrice.text());
                let $pQty = parseFloat($prodQty);
                $totalPrice += $pPrice * $pQty;
            });
            document.getElementById("total").innerHTML =
                "<strong>SUMMA: </strong>" + $totalPrice + "kr" + "<br>";
        }

        $("#order").click(function() {
            let $cartRow = $(".cart-row");
            if ($cartRow.length === 0) {
                alert("Din varukorg är tom!");
                return false;
            } else {
                storeToLocalStorage();
                $("li").remove();
                $("#total").html("<strong>SUMMA: </strong>");
                alert("Tack för din beställning!");
            }
        });

        function removeCartItem(event) {
            let buttonClicked = event.target;
            buttonClicked.parentElement.remove();
            getTotalCost();
        }

        $("#remove-all").click(function() {
            $("ul").empty();
            getTotalCost();
        });

        function storeToLocalStorage() {
            let arrayStorage = [];
            let $totalCost = $("#total").text();
            let $cartRow = $(".cart-row");

            $($cartRow).each(function() {
                let $prodName = $(this)
                    .find(".product-name")
                    .text();
                let $prodPrice = $(this)
                    .find(".product-price")
                    .text();
                let $prodQty = $(this)
                    .find("input")
                    .val();
                let $img = $(this)
                    .find(".img-container")
                    .text();

                let $prodInfo = {
                    name: $prodName,
                    price: $prodPrice,
                    qty: $prodQty,
                    img: $img
                };

                arrayStorage.push($prodInfo);
            });

            localStorage.setItem("arrayStorage", JSON.stringify(arrayStorage));
            localStorage.setItem("total", JSON.stringify($totalCost));
        }
    });
});
