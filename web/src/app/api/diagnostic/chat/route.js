export async function POST(req) {
  try {
    const body = await req.json();
    
    // Proxy to external diagnostic backend
    // Live URL: https://concierge-jzf8.onrender.com
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://concierge-jzf8.onrender.com';
    
    console.log(`[Diagnostic Chat] Using API URL: ${apiUrl}`);
    
    const response = await fetch(`${apiUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Diagnostic Chat] Upstream Error (${response.status}):`, errorText);
        return new Response(errorText, {
            status: response.status,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Diagnostic Chat Proxy Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
