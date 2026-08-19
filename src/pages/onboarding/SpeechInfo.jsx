import { useOnboarding } from "../../context/OnboardingContext";

export default function SpeechInfo() {
  const { data, updateData } = useOnboarding();

  return (
    <>
      <h1>Speech Information</h1>
      <p className="subtitle">
        Help us personalize your child's speech practice.
      </p>

      <div className="form-group">
        <label>How does your child communicate?</label>
        <select
          value={data.communication}
          onChange={(e) => updateData({ communication: e.target.value })}
        >
          <option>Speaking</option>
          <option>Mostly Speaking</option>
          <option>Few Words</option>
          <option>Non-Verbal</option>
        </select>
      </div>

      <div className="form-group">
        <label>Difficult Sounds or Words</label>
        <textarea
          rows="4"
          placeholder="Example: s, r, rabbit, strawberry"
          value={data.difficultWords}
          onChange={(e) => updateData({ difficultWords: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>Any diagnosed condition?</label>
        <select
          value={data.condition}
          onChange={(e) => updateData({ condition: e.target.value })}
        >
          <option>None</option>
          <option>Speech Delay</option>
          <option>Autism</option>
          <option>Stuttering</option>
          <option>Apraxia</option>
          <option>Other</option>
        </select>
      </div>
    </>
  );
}