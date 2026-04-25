# LeetCode Solution Pipeline

> Paste your accepted LeetCode solution. Get a clean, structured file with AI-inferred metadata -- ready to organize, download, and archive.

**[Live Demo](https://leetcode-solution-pipeline.netlify.app/)** | **[Report Bug](https://github.com/mo-hossam-stack/leetcode-solution-pipeline/issues)** | **[Request Feature](https://github.com/mo-hossam-stack/leetcode-solution-pipeline/issues)**

---

## What It Does

LeetCode Solution Pipeline is a free, open-source web tool that transforms raw LeetCode solutions into neatly formatted code files. Powered by Groq's LLM API, it analyzes your code and automatically infers:

- **Problem number & title** (e.g., `1. Two Sum`)
- **Difficulty level** (Easy / Medium / Hard)
- **LeetCode URL** linked directly to the problem
- **Topic tags** (arrays, dynamic programming, graphs, etc.)
- **File name & extension** matching the detected language

Your code stays untouched -- only a clean 3-line metadata header is added. Download the file instantly and drop it into your organized solutions repo.

## Key Features

- **Zero code modification** -- 100% fidelity; your solution is never reformatted or altered
- **Multi-language support** -- Python, JavaScript, Java, C++, Go, and any language LeetCode supports
- **Bilingual UI** -- Full English and Arabic interface with RTL support
- **One-click download** -- Get your formatted file with a single click
- **No login required** -- Completely anonymous; no accounts, no tracking
- **Rate-limited API** -- Fair usage with built-in throttling (10 requests/hour)

---

## Tech Stack

| Layer          | Technology                                  |
| -------------- | ------------------------------------------- |
| **Frontend**   | React 19, Vite, TailwindCSS                 |
| **Backend**    | Django 5, Django REST Framework              |
| **AI**         | Groq API (LLaMA 3.3 70B)                    |
| **Caching**    | Redis (production) / In-memory (dev)         |
| **Server**     | Gunicorn + Nginx reverse proxy               |
| **Containers** | Docker, Docker Compose                       |
| **Deployment** | Netlify (frontend), Railway (backend)         |

---

## Architecture

```
┌────────────────────┐         ┌────────────────────┐         ┌──────────────┐
│   React Frontend   │  POST   │   Django Backend    │  API    │   Groq LLM   │
│   (Vite + Tailwind)│────────>│   (DRF + Gunicorn)  │────────>│  (LLaMA 3.3) │
│                    │<────────│                     │<────────│              │
│  - Code input      │  JSON   │  - Validation       │  JSON   │  - Infer     │
│  - File download   │         │  - Rate limiting    │         │    metadata  │
│  - i18n (EN/AR)    │         │  - Caching          │         │  - Classify  │
└────────────────────┘         └────────────────────┘         └──────────────┘
```

---

## Getting Started

### Prerequisites

| Tool       | Version | Required |
| ---------- | ------- | -------- |
| Python     | 3.12+   | Yes      |
| Node.js    | 20+     | Yes      |
| Docker     | Latest  | Optional |
| Groq API Key | --    | Yes      |

> Get a free Groq API key at [console.groq.com](https://console.groq.com)

### Clone the Repository

```bash
git clone https://github.com/mo-hossam-stack/leetcode-solution-pipeline.git
cd leetcode-solution-pipeline
```

---

### Option 1: Docker (Recommended)

The fastest way to get everything running with a single command.

**1. Configure environment variables**

```bash
cp backend/.env.example backend/.env
```

Edit `backend/.env` and set your values:

```env
GROQ_API_KEY=your_groq_api_key_here
SECRET_KEY=your_django_secret_key
DEBUG=True
ALLOWED_HOSTS=localhost
CORS_ALLOWED_ORIGINS=http://localhost:3000
GROQ_MODEL="llama-3.3-70b-versatile"
THROTTLE_RATE_ANON=10/hour
REDIS_URL="your_redis_url_here"  # Required for production
```

**2. Build and start all services**

```bash
docker compose up --build
```

**3. Open the app**

| Service  | URL                        |
| -------- | -------------------------- |
| Frontend | http://localhost:3000       |
| Backend  | http://localhost:8000       |
| Health   | http://localhost:8000/api/health/ |

To stop:

```bash
docker compose down
```

---

### Option 2: Manual Setup

Run the backend and frontend separately for a more hands-on development experience.

#### Backend

```bash
cd backend

# Create and activate virtual environment
uv venv .venv

source .venv/bin/activate        # Linux/macOS
# .venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp backend/.env.example .env
# Edit .env and add your GROQ_API_KEY

# Run migrations and start the server
python manage.py migrate
cd backend && python manage.py runserver
```

The API will be available at **http://localhost:8000**.

#### Frontend

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Ensure VITE_API_URL points to your backend (default: http://localhost:8000)

# Start the dev server
npm run dev
```

The app will be available at **http://localhost:3000**.

---

## API Reference

### Format Code

```
POST /api/format/
```

**Request:**

```bash
curl -X POST http://localhost:8000/api/format/ \
  -H "Content-Type: application/json" \
  -d '{"code": "class Solution:\n    def twoSum(self, nums, target):\n        seen = {}\n        for i, n in enumerate(nums):\n            if target - n in seen:\n                return [seen[target-n], i]\n            seen[n] = i"}'
```

**Response:**

```json
{
  "formatted_code": "# Problem: 1. Two Sum\n# LeetCode: https://leetcode.com/problems/two-sum/description/\n# Difficulty: Easy\n\nclass Solution:\n    def twoSum(self, nums, target):\n        ...",
  "folder": ["arrays", "hashing"],
  "filename": "1_Two_Sum.py",
  "extension": "py"
}
```

### Health Check

```
GET /api/health/
```

Returns service status and configuration validation.

---

## Environment Variables

| Variable               | Description                          | Default               |
| ---------------------- | ------------------------------------ | --------------------- |
| `GROQ_API_KEY`         | Groq API key (required)              | --                    |
| `GROQ_MODEL`           | LLM model to use                     | `llama-3.3-70b-versatile` |
| `SECRET_KEY`           | Django secret key                    | --                    |
| `DEBUG`                | Enable debug mode                    | `True`                |
| `ALLOWED_HOSTS`        | Comma-separated allowed hostnames    | `localhost`           |
| `THROTTLE_RATE_ANON`   | Anonymous rate limit                 | `10/hour`             |
| `CORS_ALLOWED_ORIGINS` | Allowed frontend origins             | `http://localhost:3000` |
| `REDIS_URL`            | Redis connection URL (optional)      | --                    |
| `VITE_API_URL`         | Backend URL for frontend             | `http://localhost:8000` |

---

## Project Structure

```
leetcode-solution-pipeline/
├── backend/
│   ├── config/
│   │   ├── settings/
│   │   │   ├── base.py              # Shared Django settings
│   │   │   ├── development.py       # Local dev config
│   │   │   └── production.py        # Production config
│   │   ├── urls.py                  # Root URL routing
│   │   └── wsgi.py
│   ├── formatter/
│   │   ├── views.py                 # API endpoint (FormatView)
│   │   ├── groq_service.py          # Groq LLM integration
│   │   ├── prompts.py               # System prompt for the AI
│   │   ├── serializers.py           # Request/response validation
│   │   └── health.py                # Health check endpoint
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.jsx                  # Main application component
│   │   ├── api.js                   # Backend API client
│   │   └── i18n/                    # English & Arabic translations
│   ├── package.json
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml               # Development setup
├── docker-compose.prod.yml          # Production setup
├── nginx.conf                       # Reverse proxy config
└── netlify.toml                     # Frontend deployment config
```

---

## Contributing

Contributions are welcome! See the [Contributing Guide](CONTRIBUTING.md) for details on:

- Reporting bugs and requesting features
- Setting up the development environment
- Code style guidelines (PEP 8 + Black for Python, ESLint for JS)
- Pull request process

---