from django.urls import path
from .views import AddToCartView, CartListView , UpdateCartQuantityView , RemoveCartQuantityView

urlpatterns = [
    path('', CartListView.as_view(), name='get-cart'),
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
    path('update/', UpdateCartQuantityView.as_view(), name='update-cart'),
    path('remove/', RemoveCartQuantityView.as_view(), name='remove-cart'),
]