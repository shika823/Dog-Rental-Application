
var displayCart = (function () {
    "use strict";
    var pub;
    pub = {};

    pub.createCart = function () {

        var sess = localStorage.getItem("Cart");
        var storedSess = JSON.parse(sess);


        if (storedSess === null) {

            $('#yourcart').append("Cart empty, go select a dog first!");


        } else {



                $('#yourcart').append("<p>" + "Dog ID(s): " + JSON.stringify(storedSess[0].dogId).replace("[", "")
                        .replace("]", "").replaceAll('"', "")
                    + "<br>Booked By: " + storedSess[0].name + "<br>Date: " + storedSess[0].pickup.day + "/" +
                    storedSess[0].pickup.month + "/" + storedSess[0].pickup.year + "<br>Hours Total: " + storedSess[0].numHours   +

            "<br><button id = 'cartButton'>Delete Booking</button>" + "</p");





            }

        $("#cartButton").click(function () {
            localStorage.clear();
            location.href = 'index.html';
        });

    };


    return pub;
}());

if (window.addEventListener) {
    window.addEventListener('load', displayCart.createCart);
} else if (window.attachEvent) {
    window.attachEvent('onload', displayCart.createCart());
} else {
    window.alert("Could not attach 'Cart.setup' to the 'window.onload' event");
}
