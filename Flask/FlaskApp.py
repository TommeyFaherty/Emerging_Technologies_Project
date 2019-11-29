#import flask
from flask import Flask, request
from keras.models import load_model

app = Flask(__name__)

@app.route('/')
def home():
    return app.send_static_file('home.html')

@app.route('/predict', methods=['GET','POST'])
def predict():
    #model = load_model('../model.h5')

    canvasAsImage = request.values.get("canvasAsImage", "")

    #print to console
    print(canvasAsImage)

    return { "message":canvasAsImage }

if __name__ == "__main__":
    app.run(debug=True)
