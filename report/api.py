from rest_framework import generics, viewsets, permissions, status
from rest_framework.response import Response
from .serializers import (
    GenerateSerializer,
)
from .models import Report
from django.core.files import File
from django.conf import settings
from tempfile import TemporaryFile
import base64
import string
import random
import decimal

# Register API


class GenerateReportViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = GenerateSerializer
    queryset = Report.objects.all()

    def get_queryset(self):
        return Report.objects.all()

    def update(self, request, *args, **kwargs):
        if request.method == "PUT":
            instance = self.get_object()

            # with file.open(instance.file) as f:
            #     print(f.read())
            # print("Generating file ......................")
            # with open(settings.MEDIA_ROOT + '/hello.txt', 'w') as f:
            #     myfile = File(f)
            #     myfile.write('Hello World')
            #     print("Writing file content ......................")
            #     myfile.closed
            #     f.closed

            random_loop = random.randint(4, 6)
            random_list = []

            i = 0
            while i < random_loop:
                random_choice = random.randint(1, 4)
                random_length = random.randint(5, 15)

                alphabetical = ''.join(random.choices(
                    string.ascii_lowercase, k=random_length))

                alphanumeric = ''.join(random.choices(
                    string.ascii_lowercase + string.digits, k=random_length))

                digit = ''.join(random.choices(string.digits, k=random_length))

                real_number = decimal.Decimal(random.randrange(123, 4560))/100

                choices = {1: alphabetical, 2: alphanumeric,
                           3: str(digit).lstrip("0"), 4: str(real_number)}
                result = choices.get(random_choice, 'default')
                random_list.append(result)

                i += 1
                print(random_choice)

            final_result = ', '.join(random_list)

            text = ""
            if instance.file != "":  # append new generated string to existing file
                text = base64.b64decode(
                    instance.file).decode() + ', ' + final_result
            else:
                text = final_result

            tempList = [e.strip() for e in text.split(',')]
            total_alpha = [s for s in tempList if s.isalpha()]
            total_alpha_num = [s for s in tempList if s.isalnum()]
            total_integer = [s for s in tempList if s.isdigit()]
            total_real_number = [
                s for s in tempList if s.replace('.', '', 1).isdigit()]

            request.data['total_alphabetical'] = len(total_alpha)
            request.data['total_real_number'] = len(total_real_number)
            request.data['total_integer'] = len(total_integer)
            request.data['total_alphanumeric'] = len(total_alpha_num)

            with TemporaryFile() as f:
                f.write(text.encode())
                f.seek(0)  # go back to the beginning of the file
                request.data['file'] = base64.b64encode(f.read()).decode()
                f.seek(0, 2)
                file_size = f.tell()  # get file size in bytes

            # print(request.data['file'])
            serializer = self.get_serializer(instance, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            if file_size < 2097152:  # 2MB
                return Response(status=status.HTTP_200_OK)
            else:
                return Response({"Failed": "Reach maximum file size 2MB"}, status=status.HTTP_400_BAD_REQUEST)
