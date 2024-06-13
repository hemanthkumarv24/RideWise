from rest_framework import serializers
from .models import Trips, FavoriteRoute, Review, CabService, Ride, User


class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trips
        fields = '__all__'

class FavoriteRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteRoute
        fields = '__all__'
        
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class CabServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = CabService
        fields = '__all__'

class RideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ride
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'