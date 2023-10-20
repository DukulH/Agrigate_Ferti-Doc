from rest_framework import serializers
from .models import Shop_Details, Fertilizers, Ordered_Fertilizers, Orders


class Shop_Details_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Shop_Details
        fields = '__all__'
        
class Fertilizers_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Fertilizers
        fields = '__all__'
        
class Orders_Serializer(serializers.ModelSerializer):
    shop_details = Shop_Details_Serializer(read_only=True)
    class Meta:
        model = Orders
        fields='__all__'
        
class Ordered_Fertilizers_Serializer(serializers.ModelSerializer):
    order = Orders_Serializer(read_only=True)
    fertilizers = Fertilizers_Serializer(read_only=True)
    class Meta:
        model = Ordered_Fertilizers
        fields = '__all__'