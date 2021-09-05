var maps = (function () {
    "use strict";
    var pub = {};
    var mark = {};
    var markerLayer = new L.layerGroup();

    pub.setup = function () {

//creates map
        var map = L.map('map').setView([-45.875, 170.500], 12);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 18, attribution: 'Map data &copy; ' +
                    '<a href="http://www.openstreetmap.org/copyright">' +
                    'OpenStreetMap contributors</a> CC-BY-SA'

            }).addTo(map);

//retrives points of intereest from geoJSON file, then adds marker of office location to map
        $.get("POI.geojson", function (data) {

            var points = data;
            var features = points.features;

            var officeMarker = L.marker([Number(features[0].geometry.coordinates[1]), Number(features[0].geometry.coordinates[0])]).addTo(map)
                .bindPopup("<b>Main Office</b>");

// if button is clicked, markers appear over walking tracks and dog parks in Dunedin, with a pop up of information
            $("#showmarker").click(function () {
                for (var i = 0; i < features.length; i += 1) {
                    if (JSON.stringify(features[i].properties.type) !== '"office"') {
                        // if(features[i])
                        var lat = Number(features[i].geometry.coordinates[0]);
                        var long = Number(features[i].geometry.coordinates[1]);

                        mark = L.marker([long, lat]).addTo(map).bindPopup("<b>" +
                            features[i].properties.name + "</b><br><p>" + features[i].properties.type + "</p>").addTo(markerLayer);


                    }

                }
                map.addLayer(markerLayer);

            });

//if button is clicked, markers are removed and only the office location is displayed
            $("#hidemarker").click(function () {

                map.removeLayer(markerLayer);

            });


        });


    };


    return pub;
}());


if (window.addEventListener) {
    window.addEventListener('load', maps.setup);
} else if (window.attachEvent) {
    window.attachEvent('onload', maps.setup);
} else {
    window.alert("Could not attach 'movieChange.setup' to the 'window.onload' event");
}
