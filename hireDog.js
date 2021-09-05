var hireDog = (function () {
    "use strict";
    var pub = {};

    var dogs;
    var booking;
    var newArr = [];
    var pickup;
    var dogId = [];

//function that creates a cart to store in session
    function CartObj(dogId, name, pickup, numHours) {

        this.dogId = dogId;
        this.name = name;
        this.pickup = pickup;
        this.numHours = numHours;
    }

    //function that creates a date object to store in cartObj
    function PickUpObj(day, month, year, time) {

        this.day = day;
        this.month = month;
        this.year = year;
        this.time = time;
    }

//set up function
    pub.setup = function () {
        //sets initial html to serach icon and hides booking details inputs
        $('#doglist').html("<img src='images/search icon.png' id = 'searchimg'>");
        $("#bookingdetails").hide();

        //when form is submitted, the values entered by the user are retrieved.
        $("#enterdate").on('submit', function (e) {
            e.preventDefault();
            var day = $("#day").val();
            var month = $("#month").val();
            var year = $("#year").val();

            var dogList = $('#doglist');
            dogList.html("");
            var dogArr = [];

            //show booking details form and add html to each label
            $("#bookingdetails").show();

            $("#name").html("<label For='bookingname'>Enter Booking Name: </label><input type='text' id='bookingname' name='name' required/>");

            $("#time").html("<label For='bookingtime'>Enter Booking Time: </label><input type='time' id='bookingtime' name='time' min='09:00' max='18:00' required>");

            $("#length").html("<label For= 'total'>Enter Total Hours: </label><input type='number' id='total' name='total'>");

            //retrieve dogs from JSON file
            $.get("animals.json", function (data) {
                var animals = data.animals;
                dogs = animals.dogs;
                //creates array of dogs
                for (var l = 0; l < dogs.length; l += 1) {
                    dogArr.push(dogs[l]);
                }
                //rerives booking details
                $.get("bookings.json", function (data) {

                    var bookings = data.bookings;
                    booking = bookings.booking;

                //checks if dog ID inat each position (1, 2 or 3) of entered date in booking  in array matches booking date and if it is, removes it from the array
                    for (var i = 0; i < dogArr.length; i += 1) {


                        for (var j = 0; j < booking.length; j += 1) {
                            if ((JSON.stringify(dogArr[i].dogId) === JSON.stringify(booking[j].dogId[0]))

                                && ((JSON.stringify(booking[j].pickup.day) === ('"' + day + '"')) &&
                                    ((JSON.stringify(booking[j].pickup.month) === ('"' + month + '"')))
                                    && ((JSON.stringify(booking[j].pickup.year) === ('"' + year + '"')))
                                )
                            ) {
                                dogArr.splice(i, 1);

                            }

                            if (
                                (JSON.stringify(dogArr[i].dogId) === JSON.stringify(booking[j].dogId[1]))
                                &&
                                ((JSON.stringify(booking[j].pickup.day) === ('"' + day + '"')) &&
                                    ((JSON.stringify(booking[j].pickup.month) === ('"' + month + '"')))
                                    && ((JSON.stringify(booking[j].pickup.year) === ('"' + year + '"')))
                                )

                            ) {
                                dogArr.splice(i, 1);

                            }

                            if (
                                (JSON.stringify(dogArr[i].dogId) === JSON.stringify(booking[j].dogId[2]))
                                &&
                                ((JSON.stringify(booking[j].pickup.day) === ('"' + day + '"')) &&
                                    ((JSON.stringify(booking[j].pickup.month) === ('"' + month + '"')))
                                    && ((JSON.stringify(booking[j].pickup.year) === ('"' + year + '"')))
                                )

                            ) {
                                dogArr.splice(i, 1);

                            }
                        }
                        //sets array to updated dog array (without dogs that are booked on entered date)
                        newArr = dogArr;
                    }

                    //Appends all dogs to div that are not booked for the day
                    for (i = 0; i < newArr.length; i += 1) {

                        dogList.append("<section><h3>" + "Name: " + JSON.stringify(newArr[i].dogName).replace(/\"/g, "") +
                            "</h3><img alt = 'dog' src='images/" + newArr[i].dogName + ".jpg'>" +
                            "<p id = 'dogid'>" + "ID: " + JSON.stringify(newArr[i].dogId).replace(/\"/g, "") + "</p><p>" +
                            "<p>" + "Breed: " + JSON.stringify(newArr[i].dogType).replace(/\"/g, "") + "</p> <p>" +
                            "Description: " + JSON.stringify(newArr[i].description).replace(/\"/g, "") +
                            "</p><button class = 'hireButton'>Add Dog To Cart</button><br><button class = 'cartButton'>Save and View Cart</button></section><br><br><br>");


                    }
                    //when hire button is clicked, the id of the dog is retrieved, if the dog is able to be added to cart, it is pushed to an array,
                    // otherwise, alert messages are displayed
                    $(".hireButton").click(function () {


                        var id = $($(this).parent().find("#dogid")).html().slice(4);

                        if (!dogId.includes(id) && dogId.length < 3) {
                            dogId.push(id);
                            window.alert("Dog added to booking!");

                        } else if (dogId.length > 2) {
                            window.alert("Please select up to 3 dogs per booking");
                        } else if (dogId.includes(id)) {
                            window.alert("You have already selected this dog!");
                        }

                    });

                    //when cart button is clicked, alert messages are displayed if the user is missing a value to check out
                    //otherwise, a date object and cart object of the booking details is created is the local storage
                    $(".cartButton").click(function () {

                        if ($("#bookingname").val() === "") {
                            window.alert("Please enter a booking name");

                        } else if ($("#bookingtime").val() === "") {
                            window.alert("Please enter a booking time");

                        } else if ($("#total").val() === "") {
                            window.alert("Please enter a total");
                        } else if (dogId.length <= 0) {
                            window.alert("Please select a dog");

                        } else {
                            var name = $("#bookingname").val();
                            var time = $("#bookingtime").val();
                            var total = $("#total").val();
                            pickup = new PickUpObj(day, month, year, time);

                            if (!localStorage.hasOwnProperty("Cart")) {
                                var cartob = new CartObj(dogId, name, pickup, total);
                                var objs = JSON.parse(localStorage.getItem("Cart"));
                                if (objs) {
                                    objs.push(cartob);
                                } else {
                                    objs = [cartob];
                                }


                                localStorage.setItem("Cart", JSON.stringify(objs));
                                location.href = 'cart.html';
                            }
                        }


                    });


                });
            });


        });


    };


    return pub;
}());


if (window.addEventListener) {
    window.addEventListener('load', hireDog.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', hireDog.setup);
} else {
    window.alert("Could not attach 'hireDog.setup' to the 'window.onload' event");
}

