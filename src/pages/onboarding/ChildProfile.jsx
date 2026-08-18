import { useOnboarding } from "../../context/OnboardingContext";

export default function ChildProfile() {
  const { data, updateData } = useOnboarding();

  return (
    <>
      <h1>Child Profile</h1>
      <p className="subtitle">
        Let's personalize your child's learning journey.
      </p>

      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          value={data.firstName}
          onChange={(e) => updateData({ firstName: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Last Name (Optional)</label>
        <input
          type="text"
          placeholder="Last Name"
          value={data.lastName}
          onChange={(e) => updateData({ lastName: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Date of Birth</label>
        <input
          type="date"
          value={data.dob}
          onChange={(e) => updateData({ dob: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Primary Language</label>
        <select
          value={data.primaryLanguage}
          onChange={(e) => updateData({ primaryLanguage: e.target.value })}
        >
          <option>English</option>
          <option>Malayalam</option>
          <option>Arabic</option>
        </select>
      </div>
    </>
  );
}