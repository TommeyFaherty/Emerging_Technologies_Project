import flask
import base64
import numpy as np
import tensorflow
from PIL import Image
from io import BytesIO
from tensorflow import keras
#scipy misc deprecated in newer versions
from flask import Flask, request
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import CustomObjectScope
from keras.preprocessing import image
#from opencv

app = Flask(__name__)

@app.route('/')
def home():
    return app.send_static_file('home.html')

@app.route('/prediction', methods=['GET','POST'])
def prediction():
    
    #Load in model
    model = load_model('../model.h5')
    canvasAsImage = request.values.get("canvasAsImage", "")

    base64Image = (canvasAsImage[22:])

    img = Image.open(BytesIO(base64.b64decode(base64Image)))

    #Test save
    img.save("test.png")

    #Grayscale image using PIL
    greyImg = Image.open('test.png').convert('L')

    greyImg = greyImg.resize([28,28])
    img_pil = image.img_to_array(greyImg)

    img_array = (img_pil.flatten())
    img_array = img_array.reshape(1, 28, 28, 1)

    print("================================")
    print(img_array)
    print(img_array.shape, img_array.size)

    predictNum = model.predict(img_array, batch_size=1)
    print("prediction array")
    print(predictNum)
    
    thePrediction = str(np.argmax(predictNum))
    print("prediction ")
    print(np.argmax(predictNum, axis=1))

    return { "message": thePrediction }

if __name__ == "__main__":
    app.run(debug=True)
