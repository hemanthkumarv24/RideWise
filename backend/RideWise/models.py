from django.db import models
from django.contrib.auth.models import User

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    user_id = models.OneToOneField(User, on_delete=models.CASCADE)
    # Add any other fields you need for the User model

    def __str__(self):
        return self.username

class Trips(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    pickup_location = models.CharField(max_length=100)
    destination_location = models.CharField(max_length=100)
    distance_km = models.DecimalField(max_digits=10, decimal_places=2)
    time_minutes = models.IntegerField()
    surge_multiplier = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    service = models.CharField(max_length=100)
    vehicle_type = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.user.username} - {self.pickup_location} to {self.destination_location}"

class FavoriteRoute(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    pickup_location = models.CharField(max_length=100)
    destination_location = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.user.username} - {self.pickup_location} to {self.destination_location}"

class Review(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.CharField(max_length=100)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.service} - {self.rating}/5"

class CabService(models.Model):
    name = models.CharField(max_length=100)
    vehicle_type = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Ride(models.Model):
    pickup_address = models.CharField(max_length=255)
    destination = models.CharField(max_length=255)
    price = models.FloatField()
    service = models.ForeignKey(CabService, on_delete=models.CASCADE)
    vehicle_type = models.CharField(max_length=255)
    ride_date = models.DateField()

    def __str__(self):
        return f'{self.pickup_address} to {self.destination}'
