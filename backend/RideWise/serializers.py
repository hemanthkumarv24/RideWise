from rest_framework import serializers
from .models import Location, FareEstimate, Trip, FavoriteRoute, Review

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class FareEstimateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FareEstimate
        fields = '__all__'

class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = '__all__'

class FavoriteRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteRoute
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
