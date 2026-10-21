export async function POST(req) {
  try {
    const body = await req.json();

    // Proxy to the backend's advisor chat endpoint (decision-state pipeline).
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://concierge-jzf8.onrender.com';

    const response = await fetch(`${apiUrl}/api/advisor/chat/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok || !response.body) {
      const errorText = await response.text().catch(() => '');
      console.error(`[Advisor Chat] Upstream Error (${response.status}):`, errorText);
      return new Response(errorText, {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Pass the backend's newline-delimited-JSON stream straight through.
    return new Response(response.body, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    console.error('Advisor Chat Proxy Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
