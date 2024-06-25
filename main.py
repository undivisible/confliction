import folium
from flask import Flask, render_template_string

m = folium.Map(location=(45.5236, -122.6750))
import folium
from jinja2 import Template
from folium.map import Marker

# Modify Marker template to include the onClick event
click_template = """{% macro script(this, kwargs) %}
    var {{ this.get_name() }} = L.marker(
        {{ this.location|tojson }},
        {{ this.options|tojson }}
    ).addTo({{ this._parent.get_name() }}).on('click', onClick);
{% endmacro %}"""

# Change template to custom template
Marker._template = Template(click_template)

location_center = [51.7678, -0.00675564]
m = folium.Map(location_center, zoom_start=5)

# Create the onClick listener function as a branca element and add to the map html
click_js = """function onClick(e) {
                 var point = e.latlng; alert(point)
                 }"""

e = folium.Element(click_js)
html = m.get_root()
html.script.get_root().render()
html.script._children[e.get_name()] = e

# Add marker (click on map an alert will display with latlng values)
marker = folium.Marker([51.7678, -0.00675564]).add_to(m)
folium.Marker(
    location=[45.3288, -121.6625],
    tooltip="Click me!",
    popup="Mt. Hood Meadows",
    icon=folium.Icon(icon="cloud"),
).add_to(m)

folium.Marker(
    location=[45.3311, -121.7113],
    tooltip="Click me!",
    popup="Timberline Lodge",
    icon=folium.Icon(color="green"),
).add_to(m)


app = Flask(__name__)


@app.route("/")
def fullscreen():
    """Simple example of a fullscreen map."""

    return m.get_root().render()

if __name__ == "__main__":
    app.run(debug=True)