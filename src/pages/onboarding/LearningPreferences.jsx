import { useOnboarding } from "../../context/OnboardingContext";

export default function LearningPreferences() {
  const { data, updateData } = useOnboarding();

  return (
    <>
      <h1>Learning Preferences</h1>
      <p className="subtitle">
        Tell us what your child enjoys so we can create personalized stories and songs.
      </p>

      <div className="form-group">
        <label>Favorite Animal</label>
        <input
          type="text"
          placeholder="Example: Dog"
          value={data.animal}
          onChange={(e) => updateData({ animal: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Favorite Story Theme</label>
        <select
          value={data.theme}
          onChange={(e) => updateData({ theme: e.target.value })}
        >
          <option value="">Select a theme</option>
          <option>Fantasy</option>
          <option>Animals</option>
          <option>Space</option>
          <option>Dinosaurs</option>
          <option>Princess</option>
          <option>Adventure</option>
          <option>Superheroes</option>
        </select>
      </div>

      <div className="form-group">
        <label>Favorite Song or Rhyme</label>
        <input
          type="text"
          placeholder="Example: Twinkle Twinkle Little Star"
          value={data.rhyme}
          onChange={(e) => updateData({ rhyme: e.target.value })}
        />
      </div>
    </>
  );
}