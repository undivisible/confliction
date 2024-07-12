import folium
import csv
from folium.map import Marker
from jinja2 import Template

print("Creating map objects")

home_map = folium.Map(tiles="cartodbpositron")
ukraine_map = folium.Map(tiles="cartodbpositron")
sudan_map = folium.Map(tiles="cartodbpositron")
palestine_map = folium.Map(tiles="cartodbpositron")

print("Changing templates")

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

click_js = ("function onClick(e) {\n"
            "    let extension;\n"
            "    let new_url;\n"                                                                   
            "    const point = String(e.latlng)\n" 
            "    if (point === 'LatLng(48.37943, 31.16558)') {extension = 'Ukraine'}\n"
            "    else if (point === 'LatLng(12.8628, 30.21763)') {extension = 'Sudan'}\n"
            "    else if (point === 'LatLng(31.95216, 35.23315)') {extension = 'Palestine'}\n"
            "    new_url = window.location.href.concat(extension);\n"                                                                     
            "    window.location.replace(new_url);\n"
            "}")

click_js = folium.Element(click_js)
plain_home_map = home_map.get_root()
plain_home_map.script.get_root().render()
plain_home_map.script._children[click_js.get_name()] = click_js

# __________ end code insert __________
button_template = """<button onclick='window.location.replace(window.location.href.split("/").slice(0, -1).join("/"))' 
style='position: fixed; top: 20px; left: 50px; width: 50px; height: 50px; background-color: white; border: 2px solid 
black; border-radius: 5%; z-index: 900; text-align: center; padding: 2px; font-size: 30px;'><</button>"""

button_template = folium.Element(button_template)

ukraine_map.get_root().html.add_child(button_template)
sudan_map.get_root().html.add_child(button_template)
palestine_map.get_root().html.add_child(button_template)

print("Creating pins and saving home page")

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
home_map.save("Templates/home_pins.html")

print("Finding country borders and reading colour data")

# __________ ukraine map __________
countries_border_url = (
    "https://geojson.xyz/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson"
)

country_colours = {}
for i in ["Ukraine", "Sudan", "Palestine"]:
    with open(f"Data/{i}_colours.csv", "r") as file:
        country_colours[i] = {}

        for row in csv.reader(file):
            country_colours[i][row[0]] = row[1]


def get_country_colour(feature, country_map):
    country = feature["properties"]["name"]
    if country in country_colours[country_map]:
        return country_colours[country_map][country]
    else:
        return "#008000"  # default colour


print("Adding colour to ukraine map")
countries_border = (
    folium.GeoJson(countries_border_url,
                   style_function=lambda feature: {
                       "fillColor": get_country_colour(feature, "Ukraine"),
                       "color": "black",
                       "weight": 2,
                       "dashArray": "5, 5"
                   }))
countries_border.add_to(ukraine_map)

print("Adding colour to sudan map")
countries_border = (
    folium.GeoJson(countries_border_url,
                   style_function=lambda feature: {
                       "fillColor": get_country_colour(feature, "Sudan"),
                       "color": "black",
                       "weight": 2,
                       "dashArray": "5, 5"
                   }))
countries_border.add_to(sudan_map)

print("Adding colour to palestine map")
countries_border = (
    folium.GeoJson(countries_border_url,
                   style_function=lambda feature: {
                       "fillColor": get_country_colour(feature, "Palestine"),
                       "color": "black",
                       "weight": 2,
                       "dashArray": "5, 5"
                   }))
countries_border.add_to(palestine_map)

print("Saving remaining maps")

ukraine_map.save("Templates/Lucas_split_files/ukraine.html")
sudan_map.save("Templates/Lucas_split_files/sudan.html")
palestine_map.save("Templates/Lucas_split_files/palestine.html")
