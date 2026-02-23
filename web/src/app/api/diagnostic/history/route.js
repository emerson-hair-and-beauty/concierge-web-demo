export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return new Response(JSON.stringify({ error: "userId is required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Proxy to external diagnostic backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://concierge-jzf8.onrender.com';
    const targetUrl = `${apiUrl}/api/events/${userId}`;
    
    const response = await fetch(targetUrl, {
      method: 'GET',
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
    console.error('Diagnostic History Proxy Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
