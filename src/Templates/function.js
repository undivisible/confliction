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

    if (conflict == 'clear') {
      setTimeout(() => {
        ids.forEach((id) => {
          const element = document.getElementById(id);
          element.innerHTML = '';
        }); 
      }, 100);
    }
   else {
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
            });
          } catch (error) {
            console.error("Error fetching or updating JSON data:", error);
          }
    }
}

function swap(page) {
  sidebar = document.getElementById("sidebar");
  content = document.getElementById("main");
  if (page == 'home') {
    content.style.animation = "swapR 1s forwards"
    setTimeout(() => {
      text('clear');   
    }, 100);
  }
  else {
    content.style.animation = "swap 1s forwards";
    text(page);
  }
}

async function maphp() {
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
    const point = String(e.latlng);
    if (point === "LatLng(48.37943, 31.16558)") {
      swap('ukraine');
    } else if (point === "LatLng(12.8628, 30.21763)") {
      swap('sudan');
    } else if (point === "LatLng(31.95216, 35.23315)") {
      swap('palestine');
    }
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

function mapps() {
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

  var tile_layer_eda7452dc5c70d0fcff1c9d8c0a6720d = L.tileLayer(
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

  tile_layer_eda7452dc5c70d0fcff1c9d8c0a6720d.addTo(
    map_978e1658a9f7586289ba29a1a5516b8c
  );

  function geo_json_e6620713a4fae29e852f806f290fffd8_styler(feature) {
    switch (feature.properties.admin) {
      case "Aruba":
      case "Afghanistan":
      case "Angola":
      case "Anguilla":
      case "Albania":
      case "Aland":
      case "Andorra":
      case "United Arab Emirates":
      case "Argentina":
      case "Armenia":
      case "American Samoa":
      case "Antarctica":
      case "Ashmore and Cartier Islands":
      case "French Southern and Antarctic Lands":
      case "Antigua and Barbuda":
      case "Australia":
      case "Austria":
      case "Azerbaijan":
      case "Burundi":
      case "Belgium":
      case "Benin":
      case "Burkina Faso":
      case "Bangladesh":
      case "Bulgaria":
      case "Bahrain":
      case "The Bahamas":
      case "Bosnia and Herzegovina":
      case "Saint Barthelemy":
      case "Belarus":
      case "Belize":
      case "Bermuda":
      case "Bolivia":
      case "Brazil":
      case "Barbados":
      case "Brunei":
      case "Bhutan":
      case "Botswana":
      case "Central African Republic":
      case "Canada":
      case "Switzerland":
      case "Chile":
      case "China":
      case "Ivory Coast":
      case "Cameroon":
      case "Democratic Republic of the Congo":
      case "Republic of Congo":
      case "Cook Islands":
      case "Colombia":
      case "Comoros":
      case "Cape Verde":
      case "Costa Rica":
      case "Cuba":
      case "Cura\u00e7ao":
      case "Cayman Islands":
      case "Northern Cyprus":
      case "Cyprus":
      case "Czech Republic":
      case "Germany":
      case "Djibouti":
      case "Dominica":
      case "Denmark":
      case "Dominican Republic":
      case "Algeria":
      case "Ecuador":
      case "Egypt":
      case "Eritrea":
      case "Spain":
      case "Estonia":
      case "Ethiopia":
      case "Finland":
      case "Fiji":
      case "Falkland Islands":
      case "France":
      case "Faroe Islands":
      case "Federated States of Micronesia":
      case "Gabon":
      case "Georgia":
      case "Guernsey":
      case "Ghana":
      case "Guinea":
      case "Gambia":
      case "Guinea Bissau":
      case "Equatorial Guinea":
      case "Greece":
      case "Grenada":
      case "Greenland":
      case "Guatemala":
      case "Guam":
      case "Guyana":
      case "Hong Kong S.A.R.":
      case "Heard Island and McDonald Islands":
      case "Honduras":
      case "Croatia":
      case "Haiti":
      case "Hungary":
      case "Indonesia":
      case "Isle of Man":
      case "India":
      case "Indian Ocean Territories":
      case "British Indian Ocean Territory":
      case "Ireland":
      case "Iran":
      case "Iraq":
      case "Iceland":
      case "Israel":
      case "Italy":
      case "Jamaica":
      case "Jersey":
      case "Jordan":
      case "Japan":
      case "Siachen Glacier":
      case "Kazakhstan":
      case "Kenya":
      case "Kyrgyzstan":
      case "Cambodia":
      case "Kiribati":
      case "Saint Kitts and Nevis":
      case "South Korea":
      case "Kosovo":
      case "Kuwait":
      case "Laos":
      case "Lebanon":
      case "Liberia":
      case "Libya":
      case "Saint Lucia":
      case "Liechtenstein":
      case "Sri Lanka":
      case "Lesotho":
      case "Lithuania":
      case "Luxembourg":
      case "Latvia":
      case "Macao S.A.R":
      case "Saint Martin":
      case "Morocco":
      case "Monaco":
      case "Moldova":
      case "Madagascar":
      case "Maldives":
      case "Mexico":
      case "Marshall Islands":
      case "Macedonia":
      case "Mali":
      case "Malta":
      case "Myanmar":
      case "Montenegro":
      case "Mongolia":
      case "Northern Mariana Islands":
      case "Mozambique":
      case "Mauritania":
      case "Montserrat":
      case "Mauritius":
      case "Malawi":
      case "Malaysia":
      case "Namibia":
      case "New Caledonia":
      case "Niger":
      case "Norfolk Island":
      case "Nigeria":
      case "Nicaragua":
      case "Niue":
      case "Netherlands":
      case "Norway":
      case "Nepal":
      case "Nauru":
      case "New Zealand":
      case "Oman":
      case "Pakistan":
      case "Panama":
      case "Pitcairn Islands":
      case "Peru":
      case "Philippines":
      case "Palau":
      case "Papua New Guinea":
      case "Poland":
      case "Puerto Rico":
      case "North Korea":
      case "Portugal":
      case "Paraguay":
      case "Palestine":
      case "French Polynesia":
      case "Qatar":
      case "Romania":
      case "Russia":
      case "Rwanda":
      case "Western Sahara":
      case "Saudi Arabia":
      case "Sudan":
      case "South Sudan":
      case "Senegal":
      case "Singapore":
      case "South Georgia and South Sandwich Islands":
      case "Saint Helena":
      case "Solomon Islands":
      case "Sierra Leone":
      case "El Salvador":
      case "San Marino":
      case "Somaliland":
      case "Somalia":
      case "Saint Pierre and Miquelon":
      case "Republic of Serbia":
      case "Sao Tome and Principe":
      case "Suriname":
      case "Slovakia":
      case "Slovenia":
      case "Sweden":
      case "Swaziland":
      case "Sint Maarten":
      case "Seychelles":
      case "Syria":
      case "Turks and Caicos Islands":
      case "Chad":
      case "Thailand":
      case "Tajikistan":
      case "Turkmenistan":
      case "East Timor":
      case "Trinidad and Tobago":
      case "Tunisia":
      case "Turkey":
      case "Taiwan":
      case "United Republic of Tanzania":
      case "Uganda":
      case "United States of America":
      case "Uzbekistan":
      case "Vatican":
      case "Saint Vincent and the Grenadines":
      case "Venezuela":
      case "British Virgin Islands":
      case "United States Virgin Islands":
      case "Vietnam":
      case "Vanuatu":
      case "Wallis and Futuna":
      case "Samoa":
      case "Yemen":
      case "South Africa":
      case "Zambia":
      case "Zimbabwe":
        return {
          color: "black",
          dashArray: "5, 5",
          fillColor: "#008000",
          weight: 2,
        };
      default:
        return {
          color: "black",
          dashArray: "5, 5",
          fillColor: "#f54b42",
          weight: 2,
        };
    }
  }

  function geo_json_e6620713a4fae29e852f806f290fffd8_onEachFeature(
    feature,
    layer
  ) {
    layer.on({});
  }
  var geo_json_e6620713a4fae29e852f806f290fffd8 = L.geoJson(null, {
    onEachFeature: geo_json_e6620713a4fae29e852f806f290fffd8_onEachFeature,

    style: geo_json_e6620713a4fae29e852f806f290fffd8_styler,
  });

  function geo_json_e6620713a4fae29e852f806f290fffd8_add(data) {
    geo_json_e6620713a4fae29e852f806f290fffd8.addData(data);
  }
  fetch('json/countries.txt')
  .then(response => response.text())
  .then((data) => {
    geo_json_e6620713a4fae29e852f806f290fffd8_add(data);
  })
}

document.addEventListener("DOMContentLoaded", () => {
  mapps();
});
