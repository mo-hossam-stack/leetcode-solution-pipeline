import json
from django.conf import settings
from groq import Groq


class GroqService:
    def __init__(self):
        self.client = Groq(api_key=settings.GROQ_API_KEY)
        self.model = settings.GROQ_MODEL

    def format_code(self, code: str) -> dict:
        from formatter.prompts import FORMATTER_SYSTEM_PROMPT

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": FORMATTER_SYSTEM_PROMPT},
                {"role": "user", "content": code},
            ],
            temperature=0.1,
            response_format={"type": "json_object"},
        )

        content = response.choices[0].message.content

        try:
            return json.loads(content)
        except json.JSONDecodeError:
            try:
                parsed = json.loads(content.strip("```json").strip("```").strip())
                return parsed
            except json.JSONDecodeError as e:
                raise ValueError(f"Invalid JSON response from Groq: {content}") from e
