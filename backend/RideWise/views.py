from rest_framework import viewsets,status
from .models import  Trips, FavoriteRoute, Review,CabService
from .serializers import TripSerializer, FavoriteRouteSerializer, ReviewSerializer, CabServiceSerializer
from django.conf import settings
from django.views import View
import requests
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
from django.http import JsonResponse, HttpResponse
from urllib.parse import urlencode
from django.utils.decorators import method_decorator
import json
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView


class FavoriteRouteViewSet(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        try:
            user_exists = User.objects.filter(id=user_id).exists()
            if not user_exists:
                return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
                
            serializer = FavoriteRouteSerializer(data=request.data)
            print(serializer)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get(self, request):
        user_id = request.data.get('user_id')
        try:
            favorite_route = FavoriteRoute.objects.get(user_id=user_id)
            serializer = FavoriteRouteSerializer(favorite_route)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except FavoriteRoute.DoesNotExist:
            return Response({'error': 'Favorite route not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ReviewViewSet(APIView):
    queryset = Review.objects.all()
    serializer = ReviewSerializer

    def post(self, request):
        user_id = request.data.get('user_id')
        service_name = request.data.get('service_name')  # Get service_name from payload
        try:
            user_exists = User.objects.filter(id=user_id).exists()
            if not user_exists:
                return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Get the first CabService object with matching service_name
            cab_services = CabService.objects.filter(service_name=service_name)
            if not cab_services.exists():
                return Response({'error': 'Service does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            
            # Assuming we take the first match
            cab_service = cab_services.first()
            
            # Update service_id in request.data with the matching service_id from CabService
            request.data['service_id'] = cab_service.service_id
            
            serializer = ReviewSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):
        user_id = request.data.get('user_id')
        try:
            review = Review.objects.get(user_id=user_id)
            serializer = ReviewSerializer(review)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Review.DoesNotExist:
            return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CabServiceViewSet(APIView):
    def get(self, request):
        service_name = request.query_params.get('service_name', None)
        try:
            if service_name:
                cab_services = CabService.objects.filter(service_name=service_name)
            else:
                cab_services = CabService.objects.all()
                
            serializer = CabServiceSerializer(cab_services, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class Signup(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')

        if not username or not password or not email:
            return Response({'error': 'Please provide username, password, and email'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=username, email=email)
            user.set_password(password)
            user.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': f'Failed to create user: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@method_decorator(csrf_exempt, name='dispatch')
class Login(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'error': 'Please provide username and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            # Return user_id and username on successful login
            return Response({'message': 'Login successful', 'user_id': user.id, 'username': user.username}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)

# Fare estimation API
# Uber Pricing
UBER_PRICING = {
    'auto': {'base_rate': 25, 'per_km_rate': 9, 'per_min_rate': 1, 'operating_fee': 10},
    'go': {'base_rate': 40, 'per_km_rate': 11, 'per_min_rate': 1.5, 'operating_fee': 15},
    'moto': {'base_rate': 20, 'per_km_rate': 5, 'per_min_rate': 1, 'operating_fee': 7},
    'premier': {'base_rate': 60, 'per_km_rate': 20, 'per_min_rate': 2.5, 'operating_fee': 20},
    'uberxl': {'base_rate': 80, 'per_km_rate': 24, 'per_min_rate': 3, 'operating_fee': 25},
    'gosedan': {'base_rate': 50, 'per_km_rate': 14, 'per_min_rate': 2, 'operating_fee': 18},
    'uberxs': {'base_rate': 30, 'per_km_rate': 10, 'per_min_rate': 1.2, 'operating_fee': 12},
    'pool': {'base_rate': 20, 'per_km_rate': 8, 'per_min_rate': 1, 'operating_fee': 10},
    'xlplus': {'base_rate': 90, 'per_km_rate': 25, 'per_min_rate': 3.5, 'operating_fee': 30}
}

# Ola Pricing
OLA_PRICING = {
    'prime_sedan': {'base_rate': 50, 'base_distance': 1.9, 'per_km_rate': 14, 'per_min_rate': 2, 'operating_fee': 18},
    'mini': {'base_rate': 30, 'base_distance': 1.9, 'per_km_rate': 10, 'per_min_rate': 1.2, 'operating_fee': 12},
    'auto': {'base_rate': 25, 'base_distance': 2, 'per_km_rate': 8, 'per_min_rate': 1, 'operating_fee': 10},
    'share': {'base_rate': 20, 'base_distance': 1.9, 'per_km_rate': 7, 'per_min_rate': 1, 'operating_fee': 8},
    'rentals': {'base_rate': 300, 'base_distance': 10, 'per_km_rate': 15, 'per_min_rate': 2.5, 'operating_fee': 50},
    'outstation': {'base_rate': 1000, 'base_distance': 50, 'per_km_rate': 18, 'per_min_rate': 3, 'operating_fee': 100},
    'luxury': {'base_rate': 200, 'base_distance': 1.9, 'per_km_rate': 25, 'per_min_rate': 4, 'operating_fee': 50},
    'taxi_for_sure': {'base_rate': 40, 'base_distance': 1.9, 'per_km_rate': 12, 'per_min_rate': 1.5, 'operating_fee': 15}
}

# Namma Yatri Pricing
NAMMA_YATRI_PRICING = {
    'non_ac_mini': {'base_rate': 35, 'per_km_rate': 12, 'per_min_rate': 1.2, 'operating_fee': 15},
    'ac_mini': {'base_rate': 45, 'per_km_rate': 15, 'per_min_rate': 1.5, 'operating_fee': 20},
    'sedan': {'base_rate': 55, 'per_km_rate': 18, 'per_min_rate': 2, 'operating_fee': 25},
    'xl_cab': {'base_rate': 75, 'per_km_rate': 22, 'per_min_rate': 2.5, 'operating_fee': 30},
}

# Rapido Pricing
RAPIDO_PRICING = {
    'auto': {'base_rate': 20, 'per_km_rate': 6, 'per_min_rate': 0.8, 'operating_fee': 8},
    'bike': {'base_rate': 15, 'per_km_rate': 5, 'per_min_rate': 0.5, 'operating_fee': 5},
}

DEFAULT_SURGE_MULTIPLIER = 1.0
def calculate_fare(pricing, distance_km, time_min, surge_multiplier=DEFAULT_SURGE_MULTIPLIER):
    base_rate = pricing['base_rate']
    if 'base_distance' in pricing:
        base_distance = pricing['base_distance']
        distance_cost = 0 if distance_km <= base_distance else (distance_km - base_distance) * pricing['per_km_rate']
    else:
        distance_cost = distance_km * pricing['per_km_rate']
    
    time_cost = time_min * pricing['per_min_rate']
    total_fare = base_rate + distance_cost + time_cost + pricing['operating_fee']
    total_fare *= surge_multiplier
    return total_fare

class EstimateFareView(APIView):
    def post(self, request):
        try:
            body = json.loads(request.body)
            user_id = body.get('user_id')
            distance_km = float(body.get('distance_km'))
            time_min = float(body.get('time_min'))
            surge_multiplier = float(body.get('surge_multiplier', DEFAULT_SURGE_MULTIPLIER))
            
            # Check if the user exists
            if User.objects.filter(id=user_id).exists():
                fares = {
                    'uber': {
                        'auto': round(calculate_fare(UBER_PRICING['auto'], distance_km, time_min, surge_multiplier), 2),
                        'go': round(calculate_fare(UBER_PRICING['go'], distance_km, time_min, surge_multiplier), 2),
                        'moto': round(calculate_fare(UBER_PRICING['moto'], distance_km, time_min, surge_multiplier), 2),
                        'premier': round(calculate_fare(UBER_PRICING['premier'], distance_km, time_min, surge_multiplier), 2),
                        'uberxl': round(calculate_fare(UBER_PRICING['uberxl'], distance_km, time_min, surge_multiplier), 2),
                        'gosedan': round(calculate_fare(UBER_PRICING['gosedan'], distance_km, time_min, surge_multiplier), 2),
                        'uberxs': round(calculate_fare(UBER_PRICING['uberxs'], distance_km, time_min, surge_multiplier), 2),
                        'pool': round(calculate_fare(UBER_PRICING['pool'], distance_km, time_min, surge_multiplier), 2),
                        'xlplus': round(calculate_fare(UBER_PRICING['xlplus'], distance_km, time_min, surge_multiplier), 2)
                    },
                    'ola': {
                        'prime_sedan': round(calculate_fare(OLA_PRICING['prime_sedan'], distance_km, time_min, surge_multiplier), 2),
                        'mini': round(calculate_fare(OLA_PRICING['mini'], distance_km, time_min, surge_multiplier), 2),
                        'auto': round(calculate_fare(OLA_PRICING['auto'], distance_km, time_min, surge_multiplier), 2),
                        'share': round(calculate_fare(OLA_PRICING['share'], distance_km, time_min, surge_multiplier), 2),
                        'rentals': round(calculate_fare(OLA_PRICING['rentals'], distance_km, time_min, surge_multiplier), 2),
                        'outstation': round(calculate_fare(OLA_PRICING['outstation'], distance_km, time_min, surge_multiplier), 2),
                        'luxury': round(calculate_fare(OLA_PRICING['luxury'], distance_km, time_min, surge_multiplier), 2),
                        'taxi_for_sure': round(calculate_fare(OLA_PRICING['taxi_for_sure'], distance_km, time_min, surge_multiplier), 2)
                    },
                    'namma_yatri': {
                        'non_ac_mini': round(calculate_fare(NAMMA_YATRI_PRICING['non_ac_mini'], distance_km, time_min, surge_multiplier), 2),
                        'ac_mini': round(calculate_fare(NAMMA_YATRI_PRICING['ac_mini'], distance_km, time_min, surge_multiplier), 2),
                        'sedan': round(calculate_fare(NAMMA_YATRI_PRICING['sedan'], distance_km, time_min, surge_multiplier), 2),
                        'xl_cab': round(calculate_fare(NAMMA_YATRI_PRICING['xl_cab'], distance_km, time_min, surge_multiplier), 2)
                    },
                    'rapido': {
                        'auto': round(calculate_fare(RAPIDO_PRICING['auto'], distance_km, time_min, surge_multiplier), 2),
                        'bike': round(calculate_fare(RAPIDO_PRICING['bike'], distance_km, time_min, surge_multiplier), 2)
                    }
                }
                
                response = {
                    'distance_km': distance_km,
                    'time_min': time_min,
                    'surge_multiplier': surge_multiplier,
                    'fares': fares
                }
                return Response(response)
            else:
                return Response({'error': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)
        except (ValueError, TypeError, json.JSONDecodeError):
            return Response({'error': 'Invalid input, please provide valid JSON with numeric values for distance, time, and surge multiplier'}, status=status.HTTP_400_BAD_REQUEST)

class TripData(APIView):
    def post(self, request):
        body = json.loads(request.body)
        user_id = body.get('user_id')
        pickup_location = body.get('pickup_location')
        destination_location = body.get('destination_location')
        distance_km = body.get('distance_km')
        time_minutes = body.get('time_minutes')
        surge_multiplier = body.get('surge_multiplier')
        service_name = body.get('service_name')
        vehicle_type = body.get('vehicle_type')
        price = body.get('price')

        if not user_id or not pickup_location or not destination_location or not distance_km or not time_minutes or not surge_multiplier or not service_name or not vehicle_type or not price:
            return Response({'error': 'Please provide all the required data'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(id=user_id)  # Fetch the User instance

            trip = Trips.objects.create(
                user_id=user,  # Assign the User instance
                pickup_location=pickup_location,
                destination_location=destination_location,
                distance_km=distance_km,
                time_minutes=time_minutes,
                surge_multiplier=surge_multiplier,
                service_name=service_name,
                vehicle_type=vehicle_type,
                price=price
            )
            return Response({'message': 'Trip data stored successfully'}, status=status.HTTP_201_CREATED)
        except User.DoesNotExist:
            return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': f'Failed to store trip data: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def get(self, request):
        user_id = request.query_params.get('user_id')
        if user_id:
            try:
                user = User.objects.get(id=user_id)
                trips = Trips.objects.filter(user_id=user)
            except User.DoesNotExist:
                return Response({'error': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            trips = Trips.objects.all()
            
        serializer = TripSerializer(trips, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)