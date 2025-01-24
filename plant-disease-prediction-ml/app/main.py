from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from PIL import Image
import numpy as np
import tensorflow as tf
from werkzeug.utils import secure_filename
import base64
from io import BytesIO

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up paths
working_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(working_dir, "plant_disease_prediction_model.h5")
class_indices_path = os.path.join(working_dir, "class_indices.json")

# Load the pre-trained model
model = tf.keras.models.load_model('./plant_disease_prediction_model.h5')

# Load class indices
with open(class_indices_path, "r") as f:
    class_indices = json.load(f)

# Function to preprocess the image
def load_and_preprocess_image(image_path, target_size=(224, 224)):
    img = Image.open(image_path)
    img = img.resize(target_size)
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array.astype('float32') / 255.
    return img_array

# Function to predict the class
def predict_image_class(model, image_path, class_indices):
    preprocessed_img = load_and_preprocess_image(image_path)
    predictions = model.predict(preprocessed_img)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    predicted_class_name = class_indices[str(predicted_class_index)]
    return predicted_class_name

# API endpoint for prediction
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    if not data or "image" not in data:
        return jsonify({"error": "No image data provided"}), 400

    try:
        # Decode the base64 image
        image_data = data["image"].split(",")[1]  # Remove the data URL prefix
        image_bytes = base64.b64decode(image_data)
        image = Image.open(BytesIO(image_bytes))

        # Save the image temporarily (optional)
        filename = "uploaded_image.png"
        file_path = os.path.join(working_dir, filename)
        image.save(file_path)

        # Predict the class
        prediction = predict_image_class(model, file_path, class_indices)

        # Clean up the temporary file
        os.remove(file_path)

        return jsonify({"prediction": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)