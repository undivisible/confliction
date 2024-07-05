import folium
from folium.map import Marker
from jinja2 import Template

home_map = folium.Map()
ukraine_map = folium.Map()

# JS code to call onClick function when pin on map is pressed
# credit: PeaceLeka, Dec 7 2022,
# on https://stackoverflow.com/questions/74707544/add-a-clickevent-function-to-multiple-folium-markers-with-python
click_template = ("{% macro script(this, kwargs) %}\n"
                  "    var {{ this.get_name() }} = L.marker(\n"
                  "        {{ this.location|tojson }},\n"
                  "        {{ this.options|tojson }}\n"
                  "    ).addTo({{ this._parent.get_name() }}).on('click', onClick);\n"
                  "{% endmacro %}")

Marker._template = Template(click_template)

click_js = ("function onClick(e) {"
            "    var point = e.latlng;"
            "    fetch('/receive_click', {  "
            "        method: 'POST', "
            "        headers: {     "
            "            'Content-Type': 'application/json'   "
            "        },"
            "        body: JSON.stringify(point) "
            "    })"
            "    .then(response => response.json())"
            "}")

click_js = folium.Element(click_js)
plain_home_map = home_map.get_root()
plain_home_map.script.get_root().render()
plain_home_map.script._children[click_js.get_name()] = click_js

# __________ end code insert __________


# __________ home pins __________
ukraine_marker = folium.Marker([48.37943, 31.16558],
                               tooltip="Ukraine")
ukraine_marker.add_to(home_map)

sudan_marker = folium.Marker([12.8628, 30.21763],
                             tooltip="Sudan")
sudan_marker.add_to(home_map)

palestine_marker = folium.Marker([31.95216, 35.23315],
                                 tooltip="Palestine")
palestine_marker.add_to(home_map)

# save home_map
home_map.save("home_pins.html")

# __________ ukraine map __________
countries_border_url = (
    "https://geojson.xyz/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson"
)

countries_border = folium.GeoJson(countries_border_url)
countries_border.add_to(ukraine_map)

ukraine_map.save("test2.html")
