from flask import Flask, render_template, request

app = Flask(__name__)


@app.route("/")
def home_map():
    return render_template("home_pins.html")


@app.route("/Ukraine")
def ukraine_map():
    return render_template("ukraine.html")


@app.route('/receive_click', methods=['POST'])
def receive_click():
    point = dict(request.json)
    print(point)
    return {}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)  # Run on all interfaces for external access
