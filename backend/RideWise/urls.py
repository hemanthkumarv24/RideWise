from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LocationViewSet, FareEstimateViewSet, TripViewSet, FavoriteRouteViewSet, ReviewViewSet

router = DefaultRouter()
router.register(r'locations', LocationViewSet)
router.register(r'fare_estimates', FareEstimateViewSet)
router.register(r'trips', TripViewSet)
router.register(r'favorite_routes', FavoriteRouteViewSet)
router.register(r'reviews', ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
