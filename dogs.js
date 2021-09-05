var dogs = (function(){
    "use strict";
    var pub = {};
    var animals;

    pub.setup = function() {

//gets details of all dogs from a JSON file
        $.get( "animals.json", function(data){
            animals = data.animals;
            dogs = animals.dogs;
            //Adds Name, size etc of all dogs in file to the page. Displays image depending on dog size
            for(var i = 0; i < dogs.length; i += 1) {
                $('#doglist').append("<section><h3>" + "Name: " + JSON.stringify(dogs[i].dogName).replace(/\"/g, "") +
                    "</h3><img src='images/"+ dogs[i].dogName + ".jpg'>" +

                    "<p>Breed: " + JSON.stringify(dogs[i].dogType).replace(/\"/g, "") + "</p> <p>" +
                    "Size: " + JSON.stringify(dogs[i].dogSize).replace(/\"/g, "")+ "</p> <p>" +
                    "Description: " + JSON.stringify(dogs[i].description).replace(/\"/g, "") +
                    "</p></section><br><br><br>");


            }
        });

    };

    return pub;
}());


if (window.addEventListener) {
    window.addEventListener('load', dogs.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', dogs.setup);
} else {
    window.alert("Could not attach 'movieChange.setup' to the 'window.onload' event");
}



