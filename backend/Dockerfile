FROM python:3.12-slim

WORKDIR /app

RUN pip install --no-cache-dir uv

COPY backend/requirements.txt .
RUN uv pip install --system -r requirements.txt

COPY backend/ .

COPY backend/.env.example .env

EXPOSE 8000

CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]