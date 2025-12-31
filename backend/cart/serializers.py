from rest_framework import serializers
from .models import Cart
from products.serializers import ProductSerializer

class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Cart
        fields = ['id', 'product', 'product_id', 'quantity', 'created_at']
        read_only_fields = ['id', 'created_at']

class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1, min_value=1)


class UpdateCartQuantitySerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField()

class RemoveCartQuantitySerializer(serializers.Serializer):
    product_id = serializers.IntegerField()

class CheckOutItemSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    name = serializers.CharField()
    image = serializers.ImageField()
    quantity = serializers.IntegerField()
    price = serializers.IntegerField()
    total_price = serializers.IntegerField()
    
class CheckOutPreviewSerializer(serializers.Serializer):
    items = CheckOutItemSerializer(many=True)
    tax_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
    total_amount = serializers.DecimalField(max_digits=10, decimal_places=2)
