from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.PredictView.as_view()),
    path('shop_details/<str:district>/', views.ShopDetailsByDistrict.as_view()),
    path('orders/', views.CreateOrderView.as_view()),
]