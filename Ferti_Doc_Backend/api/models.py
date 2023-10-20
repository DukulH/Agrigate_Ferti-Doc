from django.db import models

class Shop_Details(models.Model):
    shop_id = models.CharField(primary_key=True)
    shop_phone = models.CharField(null=False, blank=False)
    district = models.CharField(null=False, blank=False)
    shop_name = models.CharField(null=False, blank=False)
    latitude = models.FloatField(null=False, blank=False)
    longitude = models.FloatField(null=False, blank=False)
    distance = models.CharField(null=False, blank=False)
    image = models.CharField(null=True, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True, null=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    
    class Meta:
        ordering = ['-created_at']
        db_table = 'Shop_Details'
        verbose_name = 'Shop_Details'
        verbose_name_plural = 'Shop_Details'
        
class Fertilizers(models.Model):
    fertilizer_name = models.CharField(max_length=255, null=False, blank=False)
    price_per_kg = models.FloatField(null=False, blank=False)
    created_at  = models.DateTimeField(auto_now_add=True, null=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    
    class Meta:
        ordering = ['-created_at']
        db_table = 'Fertilizers'
        verbose_name = 'Fertilizers'
        verbose_name_plural = 'Fertilizers'
        
class Orders (models.Model):
    customer_name = models.CharField(null=False, blank=False)
    customer_phone = models.CharField(null=False, blank=False)
    shop = models.ForeignKey(Shop_Details, on_delete=models.PROTECT, null=True, blank=True)
    created_at  = models.DateTimeField(auto_now_add=True, null=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    
    class Meta:
        ordering = ['-created_at']
        db_table = 'Orders'
        verbose_name = 'Orders'
        verbose_name_plural = 'Orders'
        
class Ordered_Fertilizers(models.Model):
    order = models.ForeignKey(Orders, models.PROTECT)
    fertilizers = models.ForeignKey(Fertilizers, models.PROTECT)
    quantity = models.IntegerField(null=False, blank=False)
    fertilizer_total_price = models.FloatField(null=False, blank=False)
    created_at  = models.DateTimeField(auto_now_add=True, null=True)
    update_at = models.DateTimeField(auto_now=True, null=True)
    
    
    class Meta:
        ordering = ['-created_at']
        db_table = 'Ordered_Fertilizers'
        verbose_name = 'Ordered_Fertilizers'
        verbose_name_plural = 'Ordered_Fertilizers'
    

