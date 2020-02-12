$(document).ready(function() {
    fetchOrder();

    function fetchOrder() {
        let $order = JSON.parse(localStorage.getItem("arrayStorage"));
        let $totalCost = JSON.parse(localStorage.getItem("total"));

        let $receipt = $("#receipt");

        for (let i = 0; i < $order.length; i++) {
            let $prodName = $order[i].name;
            let $prodPrice = $order[i].price;
            let $prodQty = $order[i].qty;
            let $prodImg = $order[i].img;

            $($receipt).append(
                "<li class='item-name'>" +
                    "<div class='order-img'>" +
                    "<img class='item-img' src=" +
                    $prodImg +
                    ">" +
                    "</div>" +
                    "<div class='order-text'>" +
                    "<span class='item-qty'>" +
                    $prodQty +
                    " st</span>" +
                    " " +
                    "<span>" +
                    $prodName +
                    "</span>" +
                    " " +
                    "<span class='item-price'>" +
                    $prodPrice +
                    "kr" +
                    "</span>" +
                    "</div>" +
                    "</li>"
            );
        }

        document.getElementById("receipt-total").innerHTML =
            "<span><h3>" + $totalCost;
        +"kr" + "</h3></span>";
    }

    localStorage.clear();
});
