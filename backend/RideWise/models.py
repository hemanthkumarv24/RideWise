from django.db import models
from django.contrib.auth.models import User

class Location(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return f"{self.name} ({self.latitude}, {self.longitude})"

class FareEstimate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pickup_location = models.ForeignKey(Location, related_name='pickup_location', on_delete=models.CASCADE)
    destination_location = models.ForeignKey(Location, related_name='destination_location', on_delete=models.CASCADE)
    service = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10)
    distance = models.FloatField()
    duration = models.IntegerField()  # in minutes
    wait_time = models.IntegerField()  # in minutes
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.service} - {self.price} {self.currency} ({self.duration} mins, {self.distance} km)"

class Trip(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pickup_location = models.ForeignKey(Location, related_name='trip_pickup_location', on_delete=models.CASCADE)
    destination_location = models.ForeignKey(Location, related_name='trip_destination_location', on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    service = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=50, default='pending')

    def __str__(self):
        return f"{self.user.username} - {self.pickup_location} to {self.destination_location} on {self.date}"

class FavoriteRoute(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pickup_location = models.ForeignKey(Location, related_name='favorite_pickup_location', on_delete=models.CASCADE)
    destination_location = models.ForeignKey(Location, related_name='favorite_destination_location', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} - {self.pickup_location} to {self.destination_location}"

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    service = models.CharField(max_length=100)
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.service} - {self.rating}/5"
