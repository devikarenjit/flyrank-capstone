import "./index.css";
import StepLayout from "./components/StepLayout";
import { OnboardingProvider } from "./context/OnboardingContext";
import Dashboard from "./components/Dashboard";

export default function App() {
  return (
    <OnboardingProvider>
      <StepLayout />
    </OnboardingProvider>
  );
}