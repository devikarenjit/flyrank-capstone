import { useState } from "react";
import "./ChildProfileForm.css";

export default function ChildProfileForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    language: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.dob || !formData.language) {
      alert("Please fill in all required fields.");
      return;
    }

    alert("Profile saved successfully!");
    console.log(formData);
  };

  const handleBack = () => {
    alert("Back button clicked.");
  };

  return (
    <div className="profile-container">
      <form className="profile-card" onSubmit={handleSubmit}>
        <h1>Child Profile</h1>
        <p>Tell us a little about your child to personalize their experience.</p>

        <div className="field">
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Last Name (Optional)</label>
          <input
            type="text"
            name="lastName"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label>Primary Language *</label>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="">Select language</option>
            <option value="English">English</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Arabic">Arabic</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="actions">
          <button
            type="button"
            className="secondary"
            onClick={handleBack}
          >
            Back
          </button>

          <button type="submit" className="primary">
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
}