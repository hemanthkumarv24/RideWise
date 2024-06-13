from django.urls import path
from .views import (
     TripViewSet, FavoriteRouteViewSet, ReviewViewSet, CabServiceViewSet, RideViewSet,  EstimateFareView, Signup, Login
)

# Define the urlpatterns explicitly for each viewset and view
urlpatterns = [
    # signup and login

    path('signup/', Signup.as_view(), name='signup'),
    path('login/', Login.as_view(), name='login'),

    # TripViewSet paths
    path('trips/', TripViewSet.as_view({'get': 'list', 'post': 'create'}), name='trip-list'),
    path('trips/<int:pk>/', TripViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='trip-detail'),

    # FavoriteRouteViewSet paths
    path('favorite_routes/', FavoriteRouteViewSet.as_view(), name='favoriteroute-list'),
    # path('favorite_routes/<int:pk>/', FavoriteRouteViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='favoriteroute-detail'),

    # ReviewViewSet paths
    path('reviews/', ReviewViewSet.as_view({'get': 'list', 'post': 'create'}), name='review-list'),
    path('reviews/<int:pk>/', ReviewViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='review-detail'),

    # CabServiceViewSet paths
    

    #price estimation
    path('estimate_fare/', EstimateFareView.as_view(), name='estimate_fare'),
    
]
