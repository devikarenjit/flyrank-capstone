# FE-04 Workflow Reflection

## Feature Chosen

I rebuilt the Melodic Voice onboarding flow, a multi-step React form with validation, navigation controls, and a progress indicator.

## Branch Comparison

The biggest difference between the two branches was how the work was guided. The `round1-vague` branch came from a short, general prompt, while the `round-two` branch used specific file references, constraints, and verification after every change.

In the first round, the generated code looked complete at first but contained several problems. `StepLayout.jsx` had incorrect JSX closing tags, navigation stopped after Step 2, validation was inconsistent, and the Dashboard was not integrated correctly. Fixing these issues required manual debugging after the code had already been generated.

In the second round, I worked more systematically by updating one file at a time, testing each change in the browser before moving forward, and verifying that every onboarding step rendered correctly.

## Correctness

The second round produced a more reliable implementation. Required fields prevented users from continuing without entering necessary information. The Back and Continue buttons behaved correctly across steps, the Dashboard appeared only after the final step, and the progress bar stayed synchronized with the current step. Testing each screen immediately after editing helped catch mistakes before they spread.

## Accessibility

The improved version made the form easier to use by keeping labels associated with inputs, using clear button text such as "Continue" and "Finish Setup," and providing a consistent navigation flow. Keeping the progress indicator visible also helps users understand where they are in the onboarding process.

## Edge Cases

Several edge cases were handled better in the second round. Empty required fields no longer allowed users to continue, navigation buttons were hidden on the Dashboard where they were unnecessary, and the conditional rendering prevented users from becoming stuck after Step 2. These checks made the onboarding flow more predictable.

## Biggest AI Mistake I Caught

The largest AI mistake was in `StepLayout.jsx`, where incorrect JSX structure introduced extra closing `</div>` tags and broke rendering. I found this by checking the browser, comparing opening and closing tags, and fixing the component structure manually.

## Review Effort

Round two took more deliberate review because every change was verified immediately. Although it involved more testing during development, it reduced debugging later and produced a cleaner, more reliable result than the first round.


## Biggest AI Mistake I Caught

The largest mistake was that AI left `StepLayout.jsx` with incorrect JSX structure after adding the Dashboard. Extra closing `</div>` tags and misplaced conditional rendering caused the page to break. I found this by checking the browser console and matching every opening tag with its closing tag before testing again.
