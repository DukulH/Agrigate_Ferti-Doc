import requests
import json

# Define the input data as a dictionary
input_data = {
    "Location": "Lakshmipur",
    "Crop_Name": "Soyabean",
    "Soil_Type": "Clayey",
    "Yield": 8
}

# Convert the input data to JSON
input_json = json.dumps(input_data)

# Make a POST request to the Flask API
url = "http://127.0.0.1:8000/api/predict/"  # Local URL
headers = {"Content-Type": "application/json"}
response = requests.post(url, data=input_json, headers=headers)

# Check the response
if response.status_code == 200:
    result = response.json()
    print("Fertilizer Recommendations:")
    print(json.dumps(result, indent=2))
else:
    print(f"Error: {response.status_code}")