import { useState } from "react";
import "./ChildProfileForm.css";

const initialForm = {
  childName: "",
  dob: "",
  gender: "",
  profilePhoto: null,

  primaryLanguage: "",
  additionalLanguages: "",
  learningLanguage: "",

  communication: "",
  difficultSounds: "",
  therapist: "",
  specialistReferral: "",
  notes: "",

  animals: "",
  colors: "",
  characters: "",
  songs: "",
  themes: "",

  headsetName: "",
  pairing: "",
  offlineRecording: "",

  guardianName: "",
  relationship: "",
  email: "",
  phone: "",

  goals: [],
  additionalGoals: "",
};

const goalOptions = [
  "Pronunciation",
  "Vocabulary",
  "Sentence Formation",
  "Confidence in Speaking",
  "Storytelling",
  "Reading Aloud",
];

export default function ChildProfileForm() {
  const [formData, setFormData] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleGoalChange = (goal) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Child Profile:", formData);
    alert("Child Profile Saved!");
  };

  return (
    <div className="container">
      <h1>🎵 Melodic Voice</h1>
      <p className="subtitle">Child Profile Form</p>

      <form onSubmit={handleSubmit}>
        {/* Child Information */}
        <section className="card">
          <h2>Child Information</h2>

          <label>Child's Full Name</label>
          <input
            type="text"
            name="childName"
            value={formData.childName}
            onChange={handleChange}
            placeholder="Enter full name"
          />

          <label>Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />

          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to say</option>
          </select>

          <label>Profile Photo</label>
          <input
            type="file"
            name="profilePhoto"
            accept="image/*"
            onChange={handleChange}
          />
        </section>

        {/* Language */}
        <section className="card">
          <h2>Language Information</h2>

          <label>Primary Language</label>
          <input
            type="text"
            name="primaryLanguage"
            value={formData.primaryLanguage}
            onChange={handleChange}
          />

          <label>Additional Languages Spoken</label>
          <input
            type="text"
            name="additionalLanguages"
            value={formData.additionalLanguages}
            onChange={handleChange}
          />

          <label>Preferred Learning Language</label>
          <input
            type="text"
            name="learningLanguage"
            value={formData.learningLanguage}
            onChange={handleChange}
          />
        </section>

        {/* Speech */}
        <section className="card">
          <h2>Speech & Communication</h2>

          <label>Communication Style</label>
          <select
            name="communication"
            value={formData.communication}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Speaking</option>
            <option>Single words</option>
            <option>Short sentences</option>
            <option>Gestures</option>
            <option>Other</option>
          </select>

          <label>Difficult Sounds or Words</label>
          <textarea
            name="difficultSounds"
            value={formData.difficultSounds}
            onChange={handleChange}
            rows="3"
          />

          <label>Speech Therapist</label>
          <input
            type="text"
            name="therapist"
            value={formData.therapist}
            onChange={handleChange}
          />

          <label>Specialist Referral</label>
          <select
            name="specialistReferral"
            value={formData.specialistReferral}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Referred by a specialist</option>
            <option>Not referred</option>
          </select>

          <label>Guardian/Therapist Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
          />
        </section>

        {/* Learning Preferences */}
        <section className="card">
          <h2>Learning Preferences</h2>

          <label>Favorite Animals</label>
          <input
            type="text"
            name="animals"
            value={formData.animals}
            onChange={handleChange}
          />

          <label>Favorite Colors</label>
          <input
            type="text"
            name="colors"
            value={formData.colors}
            onChange={handleChange}
          />

          <label>Favorite Characters</label>
          <input
            type="text"
            name="characters"
            value={formData.characters}
            onChange={handleChange}
          />

          <label>Favorite Songs or Rhymes</label>
          <input
            type="text"
            name="songs"
            value={formData.songs}
            onChange={handleChange}
          />

          <label>Favorite Story Themes</label>
          <input
            type="text"
            name="themes"
            value={formData.themes}
            onChange={handleChange}
          />
        </section>

        {/* Headset */}
        <section className="card">
          <h2>Headset Setup</h2>

          <label>Headset Name</label>
          <input
            type="text"
            name="headsetName"
            value={formData.headsetName}
            onChange={handleChange}
          />

          <label>Device Pairing</label>
          <select
            name="pairing"
            value={formData.pairing}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Connected</option>
            <option>Not Connected</option>
          </select>

          <label>Offline Recording</label>
          <select
            name="offlineRecording"
            value={formData.offlineRecording}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Enabled</option>
            <option>Disabled</option>
          </select>
        </section>

        {/* Parent */}
        <section className="card">
          <h2>Parent / Guardian</h2>

          <label>Guardian Name</label>
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
          />

          <label>Relationship</label>
          <input
            type="text"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </section>

        {/* Goals */}
        <section className="card">
          <h2>Learning Goals</h2>

          <div className="checkbox-group">
            {goalOptions.map((goal) => (
              <label key={goal} className="checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.goals.includes(goal)}
                  onChange={() => handleGoalChange(goal)}
                />
                {goal}
              </label>
            ))}
          </div>

          <label>Additional Goals</label>
          <textarea
            name="additionalGoals"
            value={formData.additionalGoals}
            onChange={handleChange}
            rows="3"
          />
        </section>

        <button className="save-btn" type="submit">
          Save Child Profile
        </button>
      </form>
    </div>
  );
}