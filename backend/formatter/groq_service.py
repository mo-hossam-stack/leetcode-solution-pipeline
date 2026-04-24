import json
import logging
from django.conf import settings
from groq import Groq

logger = logging.getLogger(__name__)


class GroqService:
    def __init__(self):
        self.model = settings.GROQ_MODEL
        self.api_key = settings.GROQ_API_KEY
        self.client = Groq(api_key=self.api_key)
        logger.info(
            f"GroqService init: model={self.model}, key_len={len(self.api_key)}"
        )

    def format_code(self, code: str) -> dict:
        from formatter.prompts import FORMATTER_SYSTEM_PROMPT

        logger.info(f"Calling Groq with model {self.model}")

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": FORMATTER_SYSTEM_PROMPT},
                    {"role": "user", "content": code},
                ],
                temperature=0.1,
                response_format={"type": "json_object"},
            )
        except Exception as e:
            logger.error(f"Groq API error: {type(e).__name__}: {e}")
            raise

        content = response.choices[0].message.content
        logger.info(f"Groq response: {content[:200]}...")

        try:
            return json.loads(content)
        except json.JSONDecodeError:
            try:
                parsed = json.loads(content.strip("```json").strip("```").strip())
                return parsed
            except json.JSONDecodeError as e:
                raise ValueError(f"Invalid JSON response from Groq: {content}") from e
