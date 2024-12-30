from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GroupViewSet, CollectibleViewSet

router = DefaultRouter()
router.register(r'groups', GroupViewSet, basename='group')
router.register(r'collectibles', CollectibleViewSet, basename='collectible')

urlpatterns = [
    path('', include(router.urls)),
]