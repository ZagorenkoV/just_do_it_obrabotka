import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework import status
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.http import FileResponse, HttpResponse
from .ocr_vk import walk_folder
from datetime import datetime

class FileUploadView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request):
        uploaded_files = request.FILES.getlist('files')
        processed_files = []
        for file in uploaded_files:
            content = file.read()
            processed_content = content

            # Save the processed file temporarily
            processed_file_name = file.name
            processed_file_path = default_storage.save(processed_file_name, ContentFile(processed_content))
            processed_files.append(processed_file_path)
        walk_folder('download_file/media/')

        return Response({"processed_files": 'vk_data.xlsx'}, status=status.HTTP_200_OK)

    def get(self, request, *args, **kwargs):
        file_path = 'back_collect_data/vk_data.xlsx'
        response = FileResponse(open(file_path, 'rb'))
        return response


