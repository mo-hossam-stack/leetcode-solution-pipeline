from rest_framework import serializers


class FormatRequestSerializer(serializers.Serializer):
    code = serializers.CharField(required=True, help_text="LeetCode solution code")

    def validate_code(self, value):
        if not value or len(value.strip()) < 10:
            raise serializers.ValidationError("Code must be at least 10 characters")
        return value.strip()


class FormatResponseSerializer(serializers.Serializer):
    formatted_code = serializers.CharField()
    folder = serializers.ListField(child=serializers.CharField())
    filename = serializers.CharField()
    extension = serializers.CharField()
