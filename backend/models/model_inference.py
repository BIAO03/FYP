from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
model = tf.keras.models.load_model('clothing_model.h5')

@app.route('/classify', methods=['POST'])
def classify():
    file = request.files['image']
    img = Image.open(io.BytesIO(file.read()))
    img = img.resize((128, 128))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    category = np.argmax(prediction, axis=1)[0]

    categories = {0: 'Top', 1: 'Bottom', 2: 'FootWear'}
    return jsonify({'category': categories[category]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
