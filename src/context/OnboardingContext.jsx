import { createContext, useContext, useState } from "react";

const OnboardingContext = createContext();

export const useOnboarding = () => useContext(OnboardingContext);

export function OnboardingProvider({ children }) {
  const [step, setStep] = useState(0);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    primaryLanguage: "English",

    communication: "Speaking",
    difficultSounds: [],
    difficultWords: "",
    condition: "None",

    animal: "",
    theme: "",
    rhyme: "",

    therapist: false,
    therapistName: "",

    headsetConnected: false,
    micPermission: false,
    notifications: false,
  });

  const updateData = (values) => {
    setData((prev) => ({ ...prev, ...values }));
  };

  return (
    <OnboardingContext.Provider
      value={{ step, setStep, data, updateData }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}