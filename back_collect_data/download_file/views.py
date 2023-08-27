import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser
from rest_framework import status
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from datetime import datetime
from .ocr_vk import function

class FileUploadView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request):
        uploaded_files = request.FILES.getlist('files')
        processed_files = []
        time_folder = str(datetime.now()).replace(':', '-')
        # if not os.path.exists(time_folder):
        #     os.makedirs(time_folder)
        for file in uploaded_files:
            function(file)
            # Process the file here (you can modify this according to your needs)
            # For example, read the file content and modify it in some way.
            content = file.read()
            processed_content = content

            # Save the processed file temporarily
            processed_file_name = f"proc_{file.name}"
            processed_file_path = default_storage.save(processed_file_name, ContentFile(processed_content))
            processed_files.append(processed_file_path)
        # print(uploaded_files)
        # function(uploaded_files)

        return Response({"processed_files": processed_files}, status=status.HTTP_200_OK)

    def get(self, request):
        # Get the file name from the query parameters
        file_name = request.query_params.get('file_name')

        # Construct the file path based on your server's file storage
        file_path = f'/path/to/your/files/{file_name}'

        try:
            # Open the file in binary mode
            with open(file_path, 'rb') as file:
                # Create a response with the file content
                response = Response(file.read())
                # Set appropriate headers for the response
                response['Content-Type'] = 'application/octet-stream'
                response['Content-Disposition'] = f'attachment; filename="{file_name}"'
                return response
        except FileNotFoundError:
            # If the file is not found, return a 404 response
            return Response({'error': 'File not found.'}, status=404)
        except Exception as e:
            # Handle other exceptions gracefully
            return Response({'error': str(e)}, status=500)


