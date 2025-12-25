# views.py
from rest_framework.generics import ListAPIView
from .models import Product
from .serializers import ProductSerializer
from .pagination import ProductPagination

class ProductListAPIView(ListAPIView):
    serializer_class = ProductSerializer
    pagination_class = ProductPagination

    def get_queryset(self):
        return Product.objects.filter(is_active=True,stock__gt=0).order_by("-created_at")
