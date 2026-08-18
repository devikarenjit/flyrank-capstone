import ProgressBar from "./ProgressBar";
import ChildProfile from "../pages/onboarding/ChildProfile";
import SpeechInfo from "../pages/onboarding/SpeechInfo";
import LearningPreferences from "../pages/onboarding/LearningPreferences";
import TherapistSetup from "../pages/onboarding/TherapistSetup";
import HeadsetSetup from "../pages/onboarding/HeadsetSetup";
import ParentGuardian from "../pages/onboarding/ParentGuardian";
import PrivacyConsent from "../pages/onboarding/PrivacyConsent";
import Dashboard from "./Dashboard";
import { useOnboarding } from "../context/OnboardingContext";

export default function StepLayout() {
  const { step, setStep, data } = useOnboarding();

  const canContinue = () => {
    switch (step) {
      case 0:
        return (
          data.firstName?.trim() &&
          data.dob &&
          data.primaryLanguage
        );

      case 1:
        return (
          data.communication &&
          data.difficultWords?.trim()
        );

      case 2:
        return (
          data.animal?.trim() &&
          data.theme &&
          data.rhyme?.trim()
        );

      case 3:
        return !data.therapist || data.therapistName?.trim();

      case 4:
        return data.headsetConnected;

      case 5:
        return (
          data.guardianName?.trim() &&
          data.relationship &&
          data.email?.trim() &&
          data.phone?.trim()
        );

      case 6:
        return (
          data.consentRecording &&
          data.consentAI &&
          data.consentTherapist &&
          data.consentTerms
        );

      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!canContinue()) return;

    if (step === 6) {
      setStep(7);
    } else {
      setStep(step + 1);
    }
  };

  // After onboarding, show Dashboard
  if (step === 7) {
    return <Dashboard />;
  }

  return (
    <div className="page">
      <div className="card">
        <ProgressBar />

        {step === 0 && <ChildProfile />}
        {step === 1 && <SpeechInfo />}
        {step === 2 && <LearningPreferences />}
        {step === 3 && <TherapistSetup />}
        {step === 4 && <HeadsetSetup />}
        {step === 5 && <ParentGuardian />}
        {step === 6 && <PrivacyConsent />}

        <div className="buttons">
          {step > 0 && (
            <button
              className="secondary"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}

          <button onClick={handleNext} disabled={!canContinue()}>
            {step === 6 ? "Finish Setup" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}