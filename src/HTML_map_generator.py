import folium
import csv
from folium.map import Marker
from jinja2 import Template

print("Creating map objects")

# create maps
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

Marker._template = Template(click_template)  # add template to marker

# create js function to pick up pin clicks that change the pages
click_js = ("function onClick(e) {\n"
            "    let extension;\n"
            "    const point = String(e.latlng);\n"
            "    if (point === 'LatLng(48.37943, 31.16558)') {extension = 'ukraine'}\n"
            "    else if (point === 'LatLng(12.8628, 30.21763)') {extension = 'sudan'}\n"
            "    else if (point === 'LatLng(31.95216, 35.23315)') {extension = 'palestine'}\n"
            "    text(extension);\n"
            "}")

# add function to scripts
click_js = folium.Element(click_js)
plain_home_map = home_map.get_root()
plain_home_map.script.get_root().render()
plain_home_map.script._children[click_js.get_name()] = click_js

# code to create back button (no longer needed)
"""
button_template = (
    "<button onclick='window.location.replace(window.location.href.split(\"/\").slice(0, -1).join(\"/\"))'"
    "style='position: fixed; top: 20px; left: 50px; width: 50px; height: 50px;"
    "background-color: white; border: 2px solid black; border-radius: 5%; z-index: 900;"
    "text-align: center; padding: 2px; font-size: 30px;'><</button>"
    )
button_template = folium.Element(button_template)

ukraine_map.get_root().html.add_child(button_template)
sudan_map.get_root().html.add_child(button_template)
palestine_map.get_root().html.add_child(button_template)
"""
print("Creating pins and saving home page")

# __________ home pins __________
# add pin to home map for each country
ukraine_marker = folium.Marker([48.37943, 31.16558], tooltip="Ukraine")
ukraine_marker.add_to(home_map)

palestine_marker = folium.Marker([31.95216, 35.23315], tooltip="Palestine")
palestine_marker.add_to(home_map)

# sudan_marker = folium.Marker([12.8628, 30.21763], tooltip="Sudan")
# sudan_marker.add_to(home_map)

# save home_map
home_map.save("Templates/home_pins.html")

print("Finding country borders and reading colour data")

# get country boarders
countries_border_url = (
    "https://geojson.xyz/naturalearth-3.3.0/ne_50m_admin_0_countries.geojson"
)

country_colours = {} # dictionary of all country colours
for i in ["Ukraine", "Sudan", "Palestine"]:  # for each country
    # grab the CSV file of the country from Data/
    with open(f"Templates/Static/Data/{i}_colours.csv", "r") as file:
        # dictionary of country colours inside country_colours, dict in dict
        country_colours[i] = {}

        for num, row in enumerate(csv.reader(file)):  # for every country in CSV file
            try:
                country_colours[i][row[0]] = row[1]  # add country and colour to dict
            except Exception:  # catch errors
                print(row, i, num)


def get_country_colour(feature, country_map):
    country = feature["properties"]["name"]
    if country in country_colours[country_map]:
        return country_colours[country_map][country]
    else:
        return "#446324"  # default colour


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

ukraine_map.save("Templates/html_maps/ukraine.html")
sudan_map.save("Templates/html_maps/sudan.html")
palestine_map.save("Templates/html_maps/palestine.html")
