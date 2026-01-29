export async function POST(req) {
  try {
    const body = await req.json();
    
    // Proxy to external diagnostic backend
    // Live URL: https://concierge-jzf8.onrender.com
    const response = await fetch('https://concierge-jzf8.onrender.com/api/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Diagnostic Event Proxy Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
