export async function DELETE(req, { params }) {
  try {
    const { sessionId } = params;
    
    // Proxy to external diagnostic backend
    const response = await fetch(`https://concierge-jzf8.onrender.com/api/session/${sessionId}`, {
      method: 'DELETE',
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
    console.error('Diagnostic Session Reset Proxy Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
