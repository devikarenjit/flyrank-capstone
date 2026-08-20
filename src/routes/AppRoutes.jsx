import { Routes, Route } from "react-router-dom";
import App from "../App";
import Navigation from "../components/Navigation";
import HealthCheck from "../pages/HealthCheck";
import AIChat from "../pages/AIChat";

function Placeholder({ title }) {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>{title}</h1>
      <p>Placeholder page</p>
    </div>
  );
}

export default function AppRoutes() {
  return (
  <>
    <Navigation />

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/child-profile" element={<App />} />
      <Route path="/aichat" element={<AIChat />} />
      <Route path="/speech-assessment" element={<Placeholder title="Speech Assessment" />} />
      <Route path="/ai-stories" element={<Placeholder title="AI Stories" />} />
      <Route path="/ai-songs" element={<Placeholder title="AI Songs" />} />
      <Route path="/progress" element={<Placeholder title="Progress" />} />
      <Route path="/health" element={<HealthCheck />} />
    </Routes>
  </>
);
}