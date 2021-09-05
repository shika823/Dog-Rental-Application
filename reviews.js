var reviews = (function () {
    "use strict";
    var pub = {};

    pub.setup = function () {
//retrieves past reviews from JSOn file and appends the to HTMl div
        $.get("reviews.json", function (data) {
            reviews = data;
            for (var i = 0; i < reviews.length; i += 1) {

                $('#reviews').append("<p>" + reviews[i].title + "</p>" +
                    "<p>" + '"' + reviews[i].reviewcontent + '"' + "</p><p>" + '<b>' + reviews[i].author + "</b></p><br><br>");

            }
        });


    };

    return pub;
}());


if (window.addEventListener) {
    window.addEventListener('load', reviews.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', reviews.setup);
} else {
    window.alert("Could not attach 'movieChange.setup' to the 'window.onload' event");
}
