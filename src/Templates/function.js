async function text(conflict) {
    const ids = [
        "classification",
        "emoji",
        "title",
        "date",
        "injuredCount",
        "killCount",
        "specialCount",
        "special",
        "text",
      ];

    //if (conflict == 'clear') {
            //document.getElementById('two').style.animation = 'fadeOut 1s ease-out forwards';
    //}
   // else {
        try {
            const response = await fetch("json/" + conflict + ".json");
            const data = await response.json();
        
            ids.forEach((id) => {
              const element = document.getElementById(id);
              if (element) {
                if (id === "injuredCount" || id === "killCount" || id === "specialCount") {
                    let current = 0;
                    const increment = data[id] / (3000 / 16);
        
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= data[id]) {
                            clearInterval(timer);
                            current = data[id];
                        }
                        element.textContent = Math.round(current);
                    }, 16);
                } 
                else { 
                  element.innerHTML = data[id];
                  if (id === "classification") {
                        if (data[id] == 'CRITICAL') {
                            element.innerHTML = element.innerHTML + '<span class="material-symbols-rounded">warning</span>';
                            element.style.backgroundColor = '#462114';
                            element.style.color = '#FE4002';
                        }
                        else if (data[id] == 'SEVERE') {
                            element.style.backgroundColor = '#4c342c';
                            element.style.color = '#FF845B';
                        }
                        else if (data[id] == 'VOLATILE') {
                            element.style.backgroundColor = '#4c4c3f';
                            element.style.color = '#FFFDBB';
                        }
                  }
              }
              }
              //document.getElementById('two').style.animation = 'fadeIn 1s ease-in forwards';
            });
          } catch (error) {
            console.error("Error fetching or updating JSON data:", error);
          }
    //}
}

function swap(page) {
  sidebar = document.getElementById("sidebar");
  content = document.getElementById("main");
  if (page == 'home') {
    text('clear');
    content.style.animation = "swapR 1s forwards"
  }
  else {
    content.style.animation = "swap 1s forwards";
    text(page);
  }
}

async function map() {
  var map_978e1658a9f7586289ba29a1a5516b8c = L.map(
    "map_978e1658a9f7586289ba29a1a5516b8c",
    {
      center: [0.0, 0.0],
      crs: L.CRS.EPSG3857,
      zoom: 1,
      zoomControl: true,
      preferCanvas: false,
    }
  );

  var tile_layer_05af2b5a63cfd8fc9dac4ef4054b7fb2 = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '\u0026copy; \u003ca href="https://www.openstreetmap.org/copyright"\u003eOpenStreetMap\u003c/a\u003e contributors \u0026copy; \u003ca href="https://carto.com/attributions"\u003eCARTO\u003c/a\u003e',
      detectRetina: false,
      maxNativeZoom: 20,
      maxZoom: 20,
      minZoom: 0,
      noWrap: false,
      opacity: 1,
      subdomains: "abcd",
      tms: false,
    }
  );

  tile_layer_05af2b5a63cfd8fc9dac4ef4054b7fb2.addTo(
    map_978e1658a9f7586289ba29a1a5516b8c
  );

  function onClick(e) {
    let extension;
    let new_url;
    const point = String(e.latlng);
    if (point === "LatLng(48.37943, 31.16558)") {
      extension = "Ukraine";
    } else if (point === "LatLng(12.8628, 30.21763)") {
      extension = "Sudan";
    } else if (point === "LatLng(31.95216, 35.23315)") {
      extension = "Palestine";
    }
    new_url = window.location.href.concat(extension);
    window.location.replace(new_url);
  }

  tile_layer_05af2b5a63cfd8fc9dac4ef4054b7fb2.addTo(
    map_978e1658a9f7586289ba29a1a5516b8c
  );

  var marker_05a02d552547f924b9028c4e38080b7d = L.marker(
    [48.37943, 31.16558],
    {}
  )
    .addTo(map_978e1658a9f7586289ba29a1a5516b8c)
    .on("click", onClick);

  marker_05a02d552547f924b9028c4e38080b7d.bindTooltip(
    `<div>
             Ukraine
         </div>`,
    { sticky: true }
  );

  var marker_967c0de8e69743ab65321833b196dafe = L.marker(
    [12.8628, 30.21763],
    {}
  )
    .addTo(map_978e1658a9f7586289ba29a1a5516b8c)
    .on("click", onClick);

  marker_967c0de8e69743ab65321833b196dafe.bindTooltip(
    `<div>
             Sudan
         </div>`,
    { sticky: true }
  );

  var marker_1bbe6e6596b1b361fa13b1339083e3ae = L.marker(
    [31.95216, 35.23315],
    {}
  )
    .addTo(map_978e1658a9f7586289ba29a1a5516b8c)
    .on("click", onClick);

  marker_1bbe6e6596b1b361fa13b1339083e3ae.bindTooltip(
    `<div>
             Palestine
         </div>`,
    { sticky: true }
  );
  mapper();
}

function mapper() {
  L_NO_TOUCH = false;
  L_DISABLE_3D = false;

  var map_20653af883cbdb176f3344fcfcb3aaf9 = L.map(
    "map_20653af883cbdb176f3344fcfcb3aaf9",
    {
      center: [0.0, 0.0],
      crs: L.CRS.EPSG3857,
      maxBounds: [
        [-90, -180],
        [90, 180],
      ],
      zoom: 1,
      zoomControl: true,
      preferCanvas: false,
    }
  );

  var tile_layer_4b56c9acb980073b36d4349abaf497f8 = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      attribution:
        '\u0026copy; \u003ca href="https://www.openstreetmap.org/copyright"\u003eOpenStreetMap\u003c/a\u003e contributors',
      detectRetina: false,
      maxNativeZoom: 19,
      maxZoom: 19,
      minZoom: 0,
      noWrap: false,
      opacity: 1,
      subdomains: "abc",
      tms: false,
    }
  );

  tile_layer_4b56c9acb980073b36d4349abaf497f8.addTo(
    map_20653af883cbdb176f3344fcfcb3aaf9
  );

  function geo_json_156f22fb7d71d7af0bfa589d95e14ddd_onEachFeature(
    feature,
    layer
  ) {
    layer.on({});
  }

  var geo_json_156f22fb7d71d7af0bfa589d95e14ddd = L.geoJson(null, {
    onEachFeature: geo_json_156f22fb7d71d7af0bfa589d95e14ddd_onEachFeature,
  });

  function geo_json_156f22fb7d71d7af0bfa589d95e14ddd_add(data) {
    geo_json_156f22fb7d71d7af0bfa589d95e14ddd.addData(data);
  }

  fetch("./newdata.json")
    .then((response) => response.text())
    .then((Data) => {
      geo_json_156f22fb7d71d7af0bfa589d95e14ddd_add(Data);
    });

  geo_json_156f22fb7d71d7af0bfa589d95e14ddd.addTo(
    map_20653af883cbdb176f3344fcfcb3aaf9
  );
}

document.addEventListener("DOMContentLoaded", () => {
  map();
});
