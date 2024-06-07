from django.contrib import admin
from .models import Location, FareEstimate, Trip, FavoriteRoute, Review

admin.site.register(Location)
admin.site.register(FareEstimate)
admin.site.register(Trip)
admin.site.register(FavoriteRoute)
admin.site.register(Review)
