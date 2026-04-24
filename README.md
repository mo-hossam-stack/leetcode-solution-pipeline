# LeetCode AI Formatter

A free, open-source web tool that formats accepted LeetCode solutions into clean, structured code files with AI-inferred metadata.

## Features

- **AI-inferred metadata** — Problem name, number, difficulty, and LeetCode URL automatically detected
- **100% code fidelity** — Your code, untouched except for a 3-line header
- **Bilingual UI** — Switch between English and Arabic
- **Download ready** — Get your formatted file instantly
- **No login required** — Anonymous-only, rate-limited

## Quick Start

### Prerequisites

- Python 3.12+
- Node.js 20+
- Docker (optional)

### Local Development

1. **Clone the repository**

```bash
git clone https://github.com/mo-hossam-stack/ai-leetcode-formatter.git
cd ai-leetcode-formatter
```

2. **Set up environment variables**

```bash
cp backend/.env.example .env
# Edit .env and add your Groq API key
```

3. **Run with Docker Compose**

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

### Manual Setup

**Backend:**

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

## API Usage

**Endpoint:** `POST /api/format/`

```bash
curl -X POST http://localhost:8000/api/format/ \
  -H "Content-Type: application/json" \
  -d '{"code": "class Solution:\n    def twoSum(self, nums, target):\n        ..."}'
```

**Response:**

```json
{
  "formatted_code": "# Problem: 1. Two Sum\n# LeetCode: https://leetcode.com/problems/two-sum/description/\n# Difficulty: Easy\n\nclass Solution:\n...",
  "folder": ["arrays", "hashing"],
  "filename": "1_Two_Sum.py",
  "extension": "py"
}
```

## Environment Variables

| Variable | Description |
|---------|-------------|
| `GROQ_API_KEY` | Your Groq API key |
| `SECRET_KEY` | Django secret key |
| `DEBUG` | Set to `False` for production |
| `ALLOWED_HOSTS` | Comma-separated hostnames |
| `THROTTLE_RATE_ANON` | Rate limit (default: 10/hour) |
| `CORS_ALLOWED_ORIGINS` | Frontend URLs |

## Tech Stack

- **Frontend:** React 18 + Vite + TailwindCSS
- **Backend:** Django 5 + Django REST Framework
- **AI:** Groq API (llama-3-70b)
- **Containerization:** Docker + Docker Compose

## License

MIT License — see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING](CONTRIBUTING.md) guidelines first.