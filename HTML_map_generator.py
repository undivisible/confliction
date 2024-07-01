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

# Add the change to the default codes for the pins
Marker._template = Template(click_template)

click_js = """function onClick(e) {
                 var point = e.latlng; alert(point)
                 }"""

click_js = folium.Element(click_js)
html = home_map.get_root()
html.script.get_root().render()
html.script._children[click_js.get_name()] = click_js

# ____________________________________________________________________________________


# __________ home pins __________
ukraine_marker = folium.Marker([48.37943, 31.16558])
ukraine_marker.add_to(home_map)

sudan_marker = folium.Marker([12.8628, 30.21763])
sudan_marker.add_to(home_map)

palestine_marker = folium.Marker([31.95216, 35.23315])
palestine_marker.add_to(home_map)

# __________ ukraine map __________
political_countries_url = (
    "http://geojson.xyz/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson"
)
folium.GeoJson(political_countries_url).add_to(ukraine_map)

home_map.save("test.html")
ukraine_map.save("test2.html")