import json
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .serializers import FormatRequestSerializer, FormatResponseSerializer
from .groq_service import GroqService


class FormatView(APIView):
    throttle_classes = [AnonRateThrottle]

    def post(self, request):
        serializer = FormatRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        code = serializer.validated_data["code"]

        try:
            groq_service = GroqService()
            result = groq_service.format_code(code)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        response_serializer = FormatResponseSerializer(data=result)
        if not response_serializer.is_valid():
            return Response(
                {
                    "error": "Invalid response from AI",
                    "details": response_serializer.errors,
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(response_serializer.data)
