import { useOnboarding } from "../../context/OnboardingContext";

export default function ParentGuardian() {
  const { data, updateData } = useOnboarding();

  return (
    <>
      <h1>Parent / Guardian</h1>

      <p className="subtitle">
        We'll use this information to manage your child's account securely.
      </p>

      <label>Guardian Name *</label>
      <input
        type="text"
        value={data.guardianName || ""}
        onChange={(e) => updateData({ guardianName: e.target.value })}
      />

      <label>Relationship *</label>
      <select
        value={data.relationship || ""}
        onChange={(e) => updateData({ relationship: e.target.value })}
      >
        <option value="">Select</option>
        <option>Mother</option>
        <option>Father</option>
        <option>Guardian</option>
        <option>Grandparent</option>
        <option>Other</option>
      </select>

      <label>Email *</label>
      <input
        type="email"
        value={data.email || ""}
        onChange={(e) => updateData({ email: e.target.value })}
      />

      <label>Phone Number *</label>
      <input
        type="tel"
        value={data.phone || ""}
        onChange={(e) => updateData({ phone: e.target.value })}
      />
    </>
  );
}