import { useOnboarding } from "../../context/OnboardingContext";

export default function TherapistSetup() {
  const { data, updateData } = useOnboarding();

  return (
    <>
      <h1>Therapist & Support</h1>

      <p className="subtitle">
        We'll personalize support based on your child's current therapy journey.
      </p>

      <div className="form-group">
        <label>Is your child currently seeing a speech therapist?</label>

        <select
          value={data.therapist ? "Yes" : "No"}
          onChange={(e) =>
            updateData({ therapist: e.target.value === "Yes" })
          }
        >
          <option>No</option>
          <option>Yes</option>
        </select>
      </div>

      {data.therapist && (
        <div className="form-group">
          <label>Speech Therapist Name</label>

          <input
            type="text"
            placeholder="Enter therapist's name"
            value={data.therapistName}
            onChange={(e) =>
              updateData({ therapistName: e.target.value })
            }
          />
        </div>
      )}

      {!data.therapist && (
        <div className="info-card">
          **No problem!**

          After onboarding, we'll help you find qualified speech therapists
          with ratings and reviews.
        </div>
      )}
    </>
  );
}