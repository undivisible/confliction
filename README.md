# DiploMap

A flask and folium project that uses maps as a tool to inform the masses on global conflicts

## tasklist
- do testing
- create readme

## file system:

├───src  
│   │ HTML_map_generator.py <-- to create/change maps, developer tool
│   │
│   └───Templates
│       │ index.html <-- run this file for final product
│       │ function.js
│       │ script.js
│       │ style.css
│       └───Static
│           ├───Data <-- customisable files, for developer
│           │   │ country1.json
│           │   │ country2.json
│           │   │ country3.json
│           │   │ country1.csv
│           │   │ country2.csv
│           │   │ country3.csv
│           │
│           └───html_maps <-- generated maps that are put underneath index.html
│               │ home_pins.html
│               │ palestine.html
│               │ sudan.html
│               │ ukraine.html

src="{{ url_for('serve_css', filename='function.js') }}"
href="{{ url_for('serve_css', filename='style.css') }}"
href="style.css"
src="function.js"

Ukraine: 48.37943, 31.16558 <br/>
Sudan: 12.8628, 30.21763 <br/>
Palestine: 31.95216, 35.23315
