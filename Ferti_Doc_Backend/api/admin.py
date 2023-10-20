from django.contrib import admin
from .models import Fertilizers, Shop_Details
# Register your models here.
class Fertilizers_Admin(admin.ModelAdmin):
    list_display = ['fertilizer_name', 'price_per_kg']
    
admin.site.register(Fertilizers, Fertilizers_Admin)

class Shop_Details_Admin(admin.ModelAdmin):
    list_display = ['shop_id', 'shop_phone','district','shop_name','distance']
    
admin.site.register(Shop_Details, Shop_Details_Admin)