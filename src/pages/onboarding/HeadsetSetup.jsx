import { useOnboarding } from "../../context/OnboardingContext";

export default function HeadsetSetup() {
  const { data, updateData } = useOnboarding();

  return (
    <>
      <h1>Headset Setup</h1>

      <p className="subtitle">
        Connect your Melodic Voice headset for noise-free speech recording.
      </p>

      <div className="headset-card">
        <div className="headset-icon">🎧</div>

        <h3>Melodic Voice Headset</h3>

        <p>
          The headset reduces background noise, records speech, and works
          offline for practice sessions.
        </p>

        <button
          type="button"
          className={data.headsetConnected ? "paired-btn" : "pair-btn"}
          onClick={() =>
            updateData({
              headsetConnected: !data.headsetConnected,
            })
          }
        >
          {data.headsetConnected ? "✓ Headset Connected" : "Pair Headset"}
        </button>
      </div>

      {data.headsetConnected && (
        <div className="success-card">
          🎤 Microphone test successful! Your headset is ready for the first
          voice assessment.
        </div>
      )}
    </>
  );
}