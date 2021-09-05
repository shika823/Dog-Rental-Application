var bookings = (function () {
    "use strict";
    var pub = {};
    var bookings;
var booking;

//Set up function
    pub.setup = function () {
        //Gets all previous bookings from JSON file
        $.get("bookings.json", function (data) {

            bookings = data.bookings;
            booking = bookings.booking;

//appends booking details to HTML div, displaying all the completed bookings on page
            for (var i = 0; i < booking.length; i += 1) {
                $('#bookings').append('<p>Dog ID(s): ' + booking[i].dogId + '<br>Booked by: ' + booking[i].name + '<br>Date: ' + booking[i].pickup.day + '/' +
                    booking[i].pickup.month + '/' + booking[i].pickup.year + '<br>Total Hours: ' + booking[i].numHours + '</p><br>');

            }


        });
    };

    return pub;
}());


if (window.addEventListener) {
    window.addEventListener('load', bookings.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', bookings.setup);
} else {
    window.alert("Could not attach 'bookings.setup' to the 'window.onload' event");
}