L_NO_TOUCH = false;
L_DISABLE_3D = false;


var map_20653af883cbdb176f3344fcfcb3aaf9 = L.map(
    "map_20653af883cbdb176f3344fcfcb3aaf9",
    {
        center: [0.0, 0.0],
        crs: L.CRS.EPSG3857,
        maxBounds: [[-90, -180], [90, 180]],
        zoom: 1,
        zoomControl: true,
        preferCanvas: false,
    }
);

var tile_layer_4b56c9acb980073b36d4349abaf497f8 = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    { "attribution": "\u0026copy; \u003ca href=\"https://www.openstreetmap.org/copyright\"\u003eOpenStreetMap\u003c/a\u003e contributors", "detectRetina": false, "maxNativeZoom": 19, "maxZoom": 19, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false }
);


tile_layer_4b56c9acb980073b36d4349abaf497f8.addTo(map_20653af883cbdb176f3344fcfcb3aaf9);

function geo_json_156f22fb7d71d7af0bfa589d95e14ddd_onEachFeature(feature, layer) {
    layer.on({
    });
};

var geo_json_156f22fb7d71d7af0bfa589d95e14ddd = L.geoJson(null, {
    onEachFeature: geo_json_156f22fb7d71d7af0bfa589d95e14ddd_onEachFeature,

});

function geo_json_156f22fb7d71d7af0bfa589d95e14ddd_add(data) {
    geo_json_156f22fb7d71d7af0bfa589d95e14ddd
        .addData(data);
}

fetch('./newdata.json')
  .then(response => response.json())
  .then(jsonData => {
    geo_json_156f22fb7d71d7af0bfa589d95e14ddd_add(jsonData);
})

geo_json_156f22fb7d71d7af0bfa589d95e14ddd.addTo(map_20653af883cbdb176f3344fcfcb3aaf9);