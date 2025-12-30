from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Cart
from .serializers import CartSerializer, AddToCartSerializer , UpdateCartQuantitySerializer , RemoveCartQuantitySerializer
from products.models import Product

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = AddToCartSerializer(data=request.data)
        if serializer.is_valid():
            product_id = serializer.validated_data['product_id']
            quantity = serializer.validated_data['quantity']
            
            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
            
            cart_item, created = Cart.objects.get_or_create(
                user=request.user,
                product=product,
                defaults={'quantity': quantity}
            )
            
            if not created:
                cart_item.quantity += quantity
                cart_item.save()
            
            serializer = CartSerializer(cart_item)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CartListView(generics.ListAPIView):
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

class UpdateCartQuantityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = UpdateCartQuantitySerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        cart_item_id = serializer.validated_data["product_id"]
        quantity = serializer.validated_data["quantity"]

        try:
            cart_item = Cart.objects.get(
                product_id=cart_item_id,
                user=request.user
            )
        except Cart.DoesNotExist:
            return Response(
                {"error": "Cart item not found"},
                status=404
            )
    
        cart_item.quantity = quantity
        cart_item.save()

        return Response(
            CartSerializer(cart_item).data,
            status=200
        )

class RemoveCartQuantityView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        serializer = RemoveCartQuantitySerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        
        cart_item_id = serializer.validated_data["product_id"]

        try:
            cart_item = Cart.objects.get(
                product_id=cart_item_id,
                user=request.user
            )
        except Cart.DoesNotExist:
            return Response(
                {"error": "Cart item not found"},
                status=404
            )
        
        cart_item.delete()
        return Response(
            {
                "success": True,
                "message": "Cart item removed successfully",
                "data": {
                    "cart_item_id": cart_item_id
                }
            },
            status=status.HTTP_200_OK
        )