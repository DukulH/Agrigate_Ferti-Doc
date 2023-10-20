from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView 
import joblib
import logging
import numpy
import pandas as pd
from .serializers import Shop_Details_Serializer, Orders_Serializer, Fertilizers_Serializer, Ordered_Fertilizers_Serializer
from .models import Shop_Details, Orders, Fertilizers, Ordered_Fertilizers

class PredictView(APIView):
    def post(self, request):
        # Load the pre-trained model
        loaded_model = joblib.load('api/models/fertidoc_model.pkl')

        # Define your custom mappings as before
        location_mapping = {
            'Lalmonirhat': 1,
            'Rangpur': 2,
            'Dinajpur': 3,
            'Lakshmipur': 4
        }

        crop_mapping = {
            'Maize': 1,
            'Soyabean': 2,
            'Boro Rice': 3,
            'Aus Rice': 4,
            'Aman Rice': 5,
            'Sesame': 6
        }

        soil_type_mapping = {
            'Sandy': 1,
            'Loamy': 2,
            'Clayey': 3
        }

        # Extract data from the request and perform predictions
    
        # Get the JSON input from the request
        user_input = request.data
        print(user_input)
        # Create a DataFrame for user input
        user_input_df = pd.DataFrame([user_input])
        # Map user input using the same mappings
        user_input_df['Location'] = user_input_df['Location'].map(location_mapping)
        user_input_df['Crop_Name'] = user_input_df['Crop_Name'].map(crop_mapping)
        user_input_df['Soil_Type'] = user_input_df['Soil_Type'].map(soil_type_mapping)

        # Ensure the columns are in the same order as the training data
        user_input_df = user_input_df[['Location', 'Crop_Name', 'Soil_Type', 'Yield']]

        # Make predictions
        predicted_values = loaded_model.predict(user_input_df)
        # Create a dictionary to hold the fertilizer recommendations
        fertilizer_recommendations = {
            'Predicted_Urea': round(predicted_values[0, 12]),
            'Predicted_MOP': round(predicted_values[0, 13]),
            'Predicted_TSP': round(predicted_values[0, 14]),
            'Predicted_Gypsum': round(predicted_values[0, 15]),
            'Predicted_Hepta_Zinc': round(predicted_values[0, 16],2),
            'Predicted_Boric_Acid': round(predicted_values[0, 17],2),
            'Predicted_Magnesium_Sulphate': round(predicted_values[0, 18],2),
            'Urea_Price':25,
            'MOP_Price':11,
            'TSP_Price':11,
            'Gypsum_Price':28,
            'Hepta_Zinc_Price':250,
            'Boric_Acid_Price':300,
            'Magnesium_Sulphate_Price':20,
            'user_input': user_input
        }
       
        # Return the prediction as a response
        return Response({'prediction': fertilizer_recommendations}, status=status.HTTP_200_OK)
    
    
class ShopDetailsByDistrict(generics.ListAPIView):
    queryset = Shop_Details.objects.all()
    serializer_class = Shop_Details_Serializer

    def get_queryset(self):
        district = self.kwargs.get('district')
        return Shop_Details.objects.filter(district=district)
    
class CreateOrderView(APIView):
    def post(self, request, format=None):
        # Extract data from the request
        data = request.data
        customer_name = data.get('customer_name')
        customer_phone = data.get('customer_phone')
        shop_id = data.get('shop_id')
        fertilizer_data = data.get('fertilizerData')

        # Create an Order
        try:
            shop = Shop_Details.objects.get(shop_id=shop_id)
        except Shop_Details.DoesNotExist:
            return Response({"error": "Shop not found"}, status=status.HTTP_400_BAD_REQUEST)

        order = Orders(customer_name=customer_name, customer_phone=customer_phone, shop=shop)
        order.save()

        # Create Ordered_Fertilizers instances
        for fertilizer_item in fertilizer_data:
            name = fertilizer_item['name']
            try:
                fertilizers = Fertilizers.objects.get(fertilizer_name=name)
            except Fertilizers.DoesNotExist:
                return Response({"error": f"Fertilizer '{name}' not found"}, status=status.HTTP_400_BAD_REQUEST)

            quantity = fertilizer_item['quantity']
            total_price = fertilizer_item['total_price']
            price = fertilizer_item['price']

            ordered_fertilizer = Ordered_Fertilizers.objects.create(order=order, fertilizers=fertilizers, quantity=quantity, fertilizer_total_price=total_price)

        return Response({"message": "Order created successfully"}, status=status.HTTP_201_CREATED)

