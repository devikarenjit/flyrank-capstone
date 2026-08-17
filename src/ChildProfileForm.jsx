import { useState } from "react";
import { User, Phone, HeartPulse, Users, Camera, Check } from "lucide-react";
import "./ChildProfileForm.css";

const initialState = {
  photo: null,
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  bloodGroup: "",
  allergies: "",
  medicalNotes: "",
  guardianName: "",
  relationship: "",
  guardianPhone: "",
  emergencyName: "",
  emergencyPhone: "",
};

const genders = ["Girl", "Boy", "Prefer not to say"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Unknown"];

function Field({ label, required, error, children }) {
  return (
    <label className="cpf-field">
      <span className="cpf-field-label">
        {label}
        {required && <span className="cpf-required"> *</span>}
      </span>
      <div className="cpf-field-control">{children}</div>
      {error && <p className="cpf-error">{error}</p>}
    </label>
  );
}

function SectionHeading({ icon: Icon, title, subtitle }) {
  return (
    <div className="cpf-section-heading">
      <div className="cpf-section-icon">
        <Icon size={18} />
      </div>
      <div>
        <h2 className="cpf-section-title">{title}</h2>
        {subtitle && <p className="cpf-section-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

export default function ChildProfileForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (e) => {
    const value = e && e.target ? e.target.value : e;
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((prev) => ({ ...prev, photo: reader.result }));
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = "First name is required";
    if (!form.lastName.trim()) next.lastName = "Last name is required";
    if (!form.dob) next.dob = "Date of birth is required";
    if (!form.guardianName.trim()) next.guardianName = "Guardian name is required";
    if (!form.guardianPhone.trim()) next.guardianPhone = "Guardian phone is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialState);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="cpf-card cpf-success">
        <div className="cpf-success-icon">
          <Check size={28} />
        </div>
        <h2 className="cpf-success-title">Profile saved</h2>
        <p className="cpf-success-text">
          {form.firstName || "The child's"} profile has been recorded.
        </p>
        <button onClick={handleReset} className="cpf-btn cpf-btn-secondary">
          Add another profile
        </button>
      </div>
    );
  }

  return (
    <div className="cpf-card">
      <div className="cpf-header">
        <p className="cpf-eyebrow">Child Registration</p>
        <h1 className="cpf-title">Child Profile</h1>
        <p className="cpf-subtitle">
          Basic details, guardians, and health notes in one place.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Basic info */}
        <section className="cpf-section">
          <SectionHeading icon={User} title="Basic information" />
          <div className="cpf-basic-row">
            <label className="cpf-photo-upload">
              {form.photo ? (
                <img src={form.photo} alt="Child" className="cpf-photo-preview" />
              ) : (
                <div className="cpf-photo-placeholder">
                  <Camera size={20} />
                  <span>Photo</span>
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePhoto} hidden />
            </label>

            <div className="cpf-grid cpf-grid-2">
              <Field label="First name" required error={errors.firstName}>
                <input
                  className="cpf-input"
                  value={form.firstName}
                  onChange={update("firstName")}
                  placeholder="Ava"
                />
              </Field>
              <Field label="Last name" required error={errors.lastName}>
                <input
                  className="cpf-input"
                  value={form.lastName}
                  onChange={update("lastName")}
                  placeholder="Menon"
                />
              </Field>
              <Field label="Date of birth" required error={errors.dob}>
                <input
                  type="date"
                  className="cpf-input"
                  value={form.dob}
                  onChange={update("dob")}
                />
              </Field>
              <Field label="Gender">
                <select className="cpf-input" value={form.gender} onChange={update("gender")}>
                  <option value="">Select</option>
                  {genders.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        </section>

        {/* Health */}
        <section className="cpf-section">
          <SectionHeading icon={HeartPulse} title="Health notes" subtitle="Optional, but helps caregivers" />
          <div className="cpf-grid cpf-grid-2">
            <Field label="Blood group">
              <select className="cpf-input" value={form.bloodGroup} onChange={update("bloodGroup")}>
                <option value="">Select</option>
                {bloodGroups.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Allergies">
              <input
                className="cpf-input"
                value={form.allergies}
                onChange={update("allergies")}
                placeholder="e.g. peanuts, pollen"
              />
            </Field>
            <div className="cpf-span-2">
              <Field label="Medical notes">
                <textarea
                  className="cpf-input cpf-textarea"
                  value={form.medicalNotes}
                  onChange={update("medicalNotes")}
                  placeholder="Conditions, medications, or anything caregivers should know"
                />
              </Field>
            </div>
          </div>
        </section>

        {/* Guardian */}
        <section className="cpf-section">
          <SectionHeading icon={Users} title="Parent / guardian" />
          <div className="cpf-grid cpf-grid-2">
            <Field label="Full name" required error={errors.guardianName}>
              <input
                className="cpf-input"
                value={form.guardianName}
                onChange={update("guardianName")}
                placeholder="Priya Menon"
              />
            </Field>
            <Field label="Relationship to child">
              <input
                className="cpf-input"
                value={form.relationship}
                onChange={update("relationship")}
                placeholder="Mother, Father, Guardian"
              />
            </Field>
            <Field label="Phone number" required error={errors.guardianPhone}>
              <input
                type="tel"
                className="cpf-input"
                value={form.guardianPhone}
                onChange={update("guardianPhone")}
                placeholder="+91 98765 43210"
              />
            </Field>
          </div>
        </section>

        {/* Emergency contact */}
        <section className="cpf-section">
          <SectionHeading icon={Phone} title="Emergency contact" subtitle="Someone other than the guardian above" />
          <div className="cpf-grid cpf-grid-2">
            <Field label="Full name">
              <input
                className="cpf-input"
                value={form.emergencyName}
                onChange={update("emergencyName")}
                placeholder="Optional"
              />
            </Field>
            <Field label="Phone number">
              <input
                type="tel"
                className="cpf-input"
                value={form.emergencyPhone}
                onChange={update("emergencyPhone")}
                placeholder="Optional"
              />
            </Field>
          </div>
        </section>

        <div className="cpf-actions">
          <button type="button" onClick={handleReset} className="cpf-btn cpf-btn-ghost">
            Clear
          </button>
          <button type="submit" className="cpf-btn cpf-btn-primary">
            Save Child Profile
          </button>
        </div>
      </form>
    </div>
  );
}