from rest_framework import viewsets
from .models import Location, FareEstimate, Trip, FavoriteRoute, Review
from .serializers import LocationSerializer, FareEstimateSerializer, TripSerializer, FavoriteRouteSerializer, ReviewSerializer

class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer = LocationSerializer

class FareEstimateViewSet(viewsets.ModelViewSet):
    queryset = FareEstimate.objects.all()
    serializer = FareEstimateSerializer

class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer = TripSerializer

class FavoriteRouteViewSet(viewsets.ModelViewSet):
    queryset = FavoriteRoute.objects.all()
    serializer = FavoriteRouteSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer = ReviewSerializer
