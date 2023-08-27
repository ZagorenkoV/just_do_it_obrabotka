from django.urls import path
from ..download_file import views

urlpatterns = [
    path('api/upload_vk/', views.FileUploadView.as_view(), name='file-upload'),
    path('api/download/', views.FileUploadView.as_view(), name='download')]

