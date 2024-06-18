from django.db import models
from django.contrib.auth.models import User
from django.conf import settings

class FavoriteRoute(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    pickup_location = models.CharField(max_length=100)
    destination_location = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user_id} - {self.pickup_location} to {self.destination_location}"

class Trips(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    pickup_location = models.CharField(max_length=100)
    destination_location = models.CharField(max_length=100)
    distance_km = models.DecimalField(max_digits=10, decimal_places=2)
    time_minutes = models.IntegerField()
    surge_multiplier = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    service_name = models.CharField(max_length=100)
    vehicle_type = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.user.username} - {self.pickup_location} to {self.destination_location}"

class Review(models.Model):
    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=1)
    service_name = models.CharField(max_length=100)
    service_id = models.CharField(max_length=100)  # New field
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.service} - {self.rating}/5"

class CabService(models.Model):
    service_id = models.CharField(max_length=100)
    service_name = models.CharField(max_length=100, default='Uber')  # Default value added
    vehicle_type = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.service_name
