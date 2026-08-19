import { useEffect, useState } from "react";

export default function HealthCheck() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    fetch("https://api.github.com")
      .then((res) => res.json())
      .then(() => setStatus("API is working"))
      .catch(() => setStatus("API unavailable"));
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Health Check</h1>
      <p>{status}</p>
    </div>
  );
}