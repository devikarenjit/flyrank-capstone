# FE-04 Workflow Reflection

## Feature Chosen

I rebuilt the Melodic Voice onboarding flow with validation and a multi-step navigation system.

## Round One

In the first round, I used a simple prompt and accepted much of the generated code. It created the basic onboarding screens, but several issues appeared during testing. Examples included broken imports for `TherapistSetup`, undefined variables such as `handleNext`, mismatched closing tags in `StepLayout.jsx`, and navigation stopping after Step 2. Validation was also incomplete because users could continue without filling required fields.

## Round Two

In the second round, I worked much more systematically. Instead of asking for general fixes, I referenced specific files such as `src/components/StepLayout.jsx` and `OnboardingContext.jsx`. I fixed one issue at a time, verified the browser after every change, and tested every onboarding step before moving to the next.

The second approach produced cleaner results. I added validation for required fields, fixed conditional rendering for every onboarding page, added the Dashboard as the final screen after onboarding, prevented navigation buttons from appearing on the Dashboard, and corrected JSX structure by matching opening and closing tags.

## Biggest AI Mistake I Caught

The largest mistake was that AI left `StepLayout.jsx` with incorrect JSX structure after adding the Dashboard. Extra closing `</div>` tags and misplaced conditional rendering caused the page to break. I found this by checking the browser console and matching every opening tag with its closing tag before testing again.

## Review Effort

Round two took more editing than round one, but it was much faster overall because every change was verified immediately. Checking the browser after each edit prevented multiple bugs from stacking together and made debugging much easier.
