const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '');

if (!API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

export async function formatCode(code) {
  const response = await fetch(`${API_URL}/api/format/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error(data.seconds_remaining ? 'rate_limit' : 'rate_limit');
    }
    throw new Error(data.error || 'Unknown error');
  }

  return data;
}