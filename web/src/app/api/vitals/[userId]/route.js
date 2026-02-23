export async function GET(req, { params }) {
  try {
    const { userId } = params;
    console.log(`[PROXY DEBUG] Fetching vitals for UserID: ${userId}`);
    
    // Proxy to external diagnostic backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://concierge-jzf8.onrender.com';
    const targetUrl = `${apiUrl}/api/vitals/${userId}`;
    console.log(`[PROXY DEBUG] Target URL: ${targetUrl}`);
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    console.log(`[PROXY DEBUG] Backend Response Status: ${response.status}`);

    if (!response.ok) {
        throw new Error(`Backend responded with ${response.status}`);
    }

    const data = await response.json();
    console.log("[PROXY DEBUG] Data Snapshot:", JSON.stringify(data).substring(0, 200));
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Vitals Proxy Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
