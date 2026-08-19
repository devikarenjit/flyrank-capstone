import { useOnboarding } from "../context/OnboardingContext";

export default function Dashboard() {
  const { data } = useOnboarding();

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h1>Welcome, {data.firstName}! 🎉</h1>
        <p>Your Melodic Voice profile has been created successfully.</p>

        <div className="dashboard-grid">
          <div className="dashboard-box">
            <h3>Speech Assessment</h3>
            <p>Start your first voice assessment.</p>
          </div>

          <div className="dashboard-box">
            <h3>AI Stories</h3>
            <p>Personalized stories with practice words.</p>
          </div>

          <div className="dashboard-box">
            <h3>AI Songs</h3>
            <p>Songs tailored to speech goals.</p>
          </div>

          <div className="dashboard-box">
            <h3>Progress</h3>
            <p>View speech improvements over time.</p>
          </div>
        </div>
      </div>
    </div>
  );
}