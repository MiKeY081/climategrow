import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Loader } from 'lucide-react';

const ImageUpload: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        analyzeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        analyzeImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageData: string) => {
    setIsAnalyzing(true);
    setPrediction(null); // Reset previous prediction

    try {
      // Send the image to the Flask backend
      const response = await fetch('http://localhost:5001/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData }), // Send as base64
      });
      console.log(response);
      if (!response.ok) {
        throw new Error('Failed to get prediction');
      }

      const result = await response.json();
      setPrediction(result.prediction); // Set the prediction result
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze the image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Image Analysis</h2>
        <ImageIcon className="h-6 w-6 text-green-600" />
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center
          ${isDragging ? 'border-green-500 bg-green-50' : 'border-gray-300'}
          transition-colors duration-200
        `}
      >
        {image ? (
          <div className="relative">
            <img src={image} alt="Uploaded crop" className="max-h-64 mx-auto rounded-lg" />
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                <div className="text-white flex flex-col items-center">
                  <Loader className="h-8 w-8 animate-spin mb-2" />
                  <span>Analyzing image...</span>
                </div>
              </div>
            )}
            {prediction && !isAnalyzing && (
              <div className="mt-4">
                <p className="text-lg font-semibold text-gray-900">Prediction:</p>
                <p className="text-gray-600">{prediction}</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drag and drop your image here or</p>
            <label className="inline-block">
              <span className="bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-700 transition-colors">
                Browse Files
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileInput}
              />
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;