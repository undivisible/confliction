from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def home_map():
    return render_template("home_pins.html")


@app.route("/Ukraine")
def ukraine_map():
    return render_template("ukraine.html")


@app.route("/Sudan")
def sudan_map():
    return render_template("sudan.html")


@app.route("/Palestine")
def palestine_map():
    return render_template("palestine.html")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)  # Run on all interfaces for external access
