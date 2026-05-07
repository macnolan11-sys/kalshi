const KALSHI_BASE = "https://api.elections.kalshi.com";
const API_KEY = "63efc131-7799-4486-b20b-446fbcf911ce";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    const url = new URL(request.url);
    const target = KALSHI_BASE + url.pathname + url.search;
    const kalshiResponse = await fetch(target, {
      method: request.method,
      headers: {
        "Authorization": API_KEY,
        "Content-Type": "application/json",
      },
      body: request.method !== "GET" ? request.body : undefined,
    });
    const data = await kalshiResponse.text();
    return new Response(data, {
      status: kalshiResponse.status,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
    });
  },
};
