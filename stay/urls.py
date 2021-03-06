from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from classy import views

router = routers.DefaultRouter()
router.register(r'classifier', views.ClassifierViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^', include('classy.urls'))
]
