export default async function TestOrchestrator() {
  const onboardingData = {
    porosity: "High Porosity",
    scalp: "Dry",
    damage: "Yes",
    density: "Thick",
    texture: "Coily",
  };

  try {
    const response = await fetch("https://concierge-jzf8.onrender.com/orchestrator/run-orchestrator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(onboardingData),
    });

    const data = await response.json();
    console.log("Orchestrator API Response:", data);

    return (
      <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>Orchestrator API Test</h1>
        <p>API call made with payload:</p>
        <pre style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "8px" }}>
          {JSON.stringify(onboardingData, null, 2)}
        </pre>
        <p>Check the server terminal log for the response.</p>
        <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h2>Response Preview</h2>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error calling Orchestrator API:", error);
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        <h1>Error</h1>
        <p>Failed to call the API. Check terminal logs.</p>
      </div>
    );
  }
}
