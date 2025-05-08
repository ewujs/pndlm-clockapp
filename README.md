# PNDLM Clock App

- A **Login Page** with Redux-managed authentication (using `fetch` + `localStorage`/`sessionStorage`)
- A **Clocks Page** displaying two analog clocks (Las Vegas & Taipei) with timezone support
- Global state management via **Redux Toolkit**
- Responsive UI using a custom-built RWD system
- Dark/Light mode toggle with CSS variable theming
- Multiple clock faces

---

## 📁 Folder Structure Overview

```
src/
├── api/
│   ├── fetchClient.ts
│   └── userApi.ts
├── assets/
│   └── svg/
│       ├── eye-regular.svg
│       └── eye-slash-regular.svg
├── components/
│   ├── buttons/
│   │   ├── Button.tsx
│   │   ├── LoginButton.tsx
│   │   ├── LogoutButton.tsx
│   │   └── ThemeSlideButton.tsx
│   ├── clock/
│   │   ├── AnalogClock.tsx
│   │   ├── ClockDateDay.tsx
│   │   ├── ClockHands.tsx
│   │   ├── ClockItem.tsx
│   │   ├── ClockLabel.tsx
│   │   ├── ClockMarkers.tsx
│   │   ├── ClockNumerals.tsx
│   │   └── ClockTicks.tsx
│   ├── form/
│   │   ├── LoginExtras.tsx
│   │   ├── LoginForm.tsx
│   │   ├── LoginIdentifierField.tsx
│   │   ├── LoginPasswordField.tsx
│   │   ├── LoginRegisterLink.tsx
│   │   ├── LoginSubmit.tsx
│   │   ├── RememberMeCheckbox.tsx
│   │   └── ShowPasswordIcon.tsx
│   ├── icons/
│   │   ├── CloseIcon.tsx
│   │   ├── ErrorIcon.tsx
│   │   ├── MoonIcon.tsx
│   │   └── SunIcon.tsx
│   ├── BackgroundEllipses.tsx
│   ├── Ellipse.tsx
│   ├── FloatingCollapseSelector.tsx
│   ├── FloatingError.tsx
│   ├── Logo.tsx
│   └── MenuToggle.tsx
├── config/
│   ├── apiConfig.tsx
│   └── clocksConfig.ts
├── hooks/
│   ├── useAnimationTimer.tsx
│   ├── useClocksInit.tsx
│   └── useZoneDateSync.ts
├── layouts/
│   ├── clocks/
│   │   ├── ClocksGrid.tsx
|   │   ├── ClocksItems.tsx
|   │   ├── ClocksPageLayout.tsx
│   │   └── LogoutButtonSection.tsx
│   └── login/
│       ├── LoginGrid.tsx
|       ├── LoginItems.tsx
│       └── LoginPageLayout.tsx
├── pages/
│   ├── ClocksPage.tsx
│   └── LoginPage.tsx
├── redux/
│   ├── appReducer.ts
│   ├── authReducer.ts
│   ├── clockReducer.ts
│   ├── dateReducer.ts
│   ├── store.ts
│   ├── storeHooks.ts
│   └── themeReducer.ts
├── rwd/
│   ├── breakpoints.ts
│   ├── index.ts
│   ├── mediaFeatures.ts
│   ├── mediaQueries.ts
│   ├── mediaQueryHelpers.ts
│   ├── rwd.ts
│   ├── useBreakpoint.ts
│   ├── useDeviceType.ts
│   ├── useMediaQuery.ts
│   └── useOrientation.ts
├── styles/
│   ├── clocksPageStyles.ts
│   ├── loginGridStyles.ts
│   └── loginPageStyles.ts
├── types/
│   ├── authTypes.ts
│   ├── clockTypes.ts
│   ├── commonTypes.ts
│   ├── rwdTypes.ts
│   └── themeTypes.ts
├── App.tsx
├── AppRoot.tsx
├── main.tsx
├── style.ts
├── theme.d.ts
├── utils.ts
├── vite-env.d.ts
```

---

## 🔐 Login Flow (with Local/Session Storage Token Management)

### 1. User submits credentials via `LoginPage`

- The form includes:
  - Smart input field (auto-detects username, email, or phone)
  - Password field
  - "Forgot Password?" link
  - "Remember me for 30 days" checkbox
  - Login button
  - "Register" link

### 2. On successful login

- A token is returned from the server
- The token is stored in:
  - `localStorage` if "Remember me" is checked
  - `sessionStorage` otherwise
- `authSlice` updates Redux state with the active session
- The user is redirected to the Clocks Page

### 3. On app startup

- The app checks for an existing token in local/session storage
- If a valid token is found, the session is restored
- The user is automatically redirected to the Clocks Page

### 4. Logout

- Redux clears the `authSlice` state
- Token is removed from both `localStorage` and `sessionStorage`

---

## 🌐 API Calls Using Fetch

### fetchClient.ts

- Automatically includes authentication tokens (from `localStorage`, `sessionStorage`, or cookies depending on environment)
- Sets common headers (e.g., `Content-Type`)
- Handles common error responses
- Serves as a base wrapper for all API modules like `userApi.ts`

### userAPI.ts

- Sends login requests with credentials
- Fetches authenticated user data

## 🕒 Clocks Page with Analog Clocks

### Features

- Two clocks:
  - Las Vegas (PST/PDT timezone)
  - Taipei (UTC+8)
- Redux Integration:
  - Dispatches the current timestamp and static timezone configurations using the `useClocksInit` hook
  - Stores the current timestamp and static timezone configurations in `clockSlice`
  - Stores the theme mode in `themeSlice` (supports dark/light theme toggle)
  - Stores the clock face in `themeSlice` (supports minimalist, classic, and luxury)
  - Stores the formatted date in `dateSlice` for multiple time zones
- Responsive and Animated:
  - Clocks are responsive and include smooth animations
  - Each clock has 12 evenly spaced tick marks for a traditional analog look
- Synchronization:
  - Schedules updates for the date/day at midnight for each time zone

### Clock Structure

- `AnalogClock.tsx`: Main wrapper
- `ClockDateDay.tsx`: Renders the day portion of the date
- `ClockHands.tsx`: Renders hour, minute, and second hands
- `ClockLabel.tsx`: Renders the city label
- `ClockMarkers.tsx`: Renders 60 markers around the clock face to represent seconds or minute ticks
- `ClockNumerals.tsx`: Renders the numerals around an analog clock face
- `ClockTicks.tsx`: Renders 12 tick marks with correct rotation and positioning

### Responsiveness

- Clock sizes adapt to screen width
- Tick marks and hands adjust with scaling
- Second hand uses smooth CSS transform transitions for glide movement

---

## 🧱 UI Layout

- Responsive layout built with **CSS Grid** and **Flexbox**
- Clean component-based design with Emotion CSS-in-JS
- Uses custom utils for media queries and breakpoints

### ✨ Responsive Design Utilities for React + Emotion

#### Features

- Breakpoint utilities (useBreakpoint, useMediaQuery, useDeviceType)
- Media query helpers (e.g., media, media.add, media.or)
- rwd() function for writing Emotion styles
- Detects screen orientation (portrait or landscape)

#### Files and Structure

```
src/rwd/
├── breakpoints.ts         # Defined screen sizes
├── index.ts               # Central export file
├── mediaFeatures.ts       # A list of valid CSS media features
├── mediaQueries.ts        # Media query strings
├── mediaQueryHelpers.ts   # Helpers to inject responsive styles
├── rwd.ts                 # `rwd()` function to create responsive variants
├── useBreakpoint.ts       # Hook to detect current breakpoint
├── useDeviceType.ts       # Infer phone/tablet/desktop
├── useMediaQuery.ts       # Generic media query hook
└── useOrientation.ts      # Detect landscape/portrait
```

---

## 🧠 Redux Toolkit Integration

### authReducer.ts

- Manages authentication state: login, logout, and error display/clearing
- Includes async thunk: `login`
- Stores the access token in `localStorage` or `sessionStorage` based on the "Remember Me" flag
- Automatically clears token and errors on logout

### clockReducer.ts

- Stores static timezone config for Las Vegas and Taipei
- Maintains the current timestamp for synchronized clock rendering
- Dispatches an action on ClocksPage mount to initialize and update clock data

### themeReducer.ts

- Stores the current theme mode (light or dark)
- Handles theme toggling and explicit mode updates

---

## 🧪 Tech Stack

- React with TypeScript
- Redux Toolkit
- Emotion
- CSS Grid and Flexbox
- Fetch API
- React Router

---

# Feedback

Overall, this is a strong take-home exercise. It's well-defined, practical, flexible, and focused on relevant skills.

## What I Liked:

- Clear Objectives: The introduction clearly states the purpose of the exercise and what aspects will be evaluated.
- Practicality:
  - Using Figma for designs is standard industry practice.
  - Integrating with a real API (dummyjson.com) for the login screen makes the task more realistic than just mocking responses locally.
  - Providing a choice between screens (Login, Clocks, or both) allows candidates to manage their time and showcase different skills (forms/API vs. UI/animation/state).
- Technical Flexibility:
  - Offering a choice between React and Flutter caters to different skill sets.
  - Within React, specifying preferred libraries (Redux Toolkit, TypeScript, Emotion) gives insight into your stack but allowing alternatives makes the exercise accessible even if the candidate isn't familiar with your specific preferred tools. This is a great balance.
- Good Scaffolding: Providing a Vite-based starter repository significantly lowers the barrier to entry and saves the candidate time on setup, allowing them to focus on the core task.
- Requesting Feedback: Asking for feedback on the exercise itself shows a commitment to improving your hiring process.

## Minor Suggestions:

- Clarify Error Handling: Add a bullet point under Login requirements like: "If the login fails, an appropriate error message should be displayed to the user."

---

<img src="https://static.pndlm.net/pndlm/4row-currentcolor-full.svg" width="360" alt="☵☲ PNDLM" />

# Clock App (2025)

Welcome!  In this exercise you'll build one or two screens of a mobile-first frontend.  Your work here will help us understand your frontend programming capabilities as well as your approach and philosophy toward this type of work.

We will primarily evaluate:

* Your attention to consistency and aesthetic details.
* The cleanliness, flexibility, responsiveness, and reusability of your components and styling.
* Your ability to work naturally within the provided codebase.

Making software that looks and feels great to the end-user is the highest priority.  However, well-thought-out, beautifully designed code lends itself extremely in this endeavor!  Be sure to leave comments in the code explaining your reasoning processes.

## The Project

Please review the design comps on Figma at the link below.  You can create a free Figma account if you don't already have one.

* https://www.figma.com/design/qBqiiKfWL0fWwzO0NLLKgt/CLOCK!-Front-End?node-id=0-1&t=Z9A2AdXSUlBJM16O-1

There are designs for two screens available.  You can choose to build either one, or both.

### Screen 1: Login

* The user should be able to enter a username and password and press the Login button.
* When the Login button is pressed, the app should call the [Login API endpoint on DummyJSON](https://dummyjson.com/docs/auth#auth-login).
* If the login is successful, a success message should be displayed— or if you are building both screens, the user should be moved to the Clocks screen.
* "Forgot Password", "Register" and "Remember me" should be tappable, but don't need to perform any action, or can just display a simple "coming soon" alert box.

### Screen 2: Clocks

* The user will be presented with two clocks.
* You may add a second (秒) hand to the clocks if so desired.
* Optional: Perform clock updates via dispatches to Redux.

## Design Details

We have only provided designs for mobile form factor.  Do your best to make the designs look nice also when viewed on tablet- and desktop-size screens.  Responsive code is encouraged!

You should also favor vector graphics and drawing technologies over raster graphics, unless there is a specific situation where you reason a raster would be a better choice.

The fonts and icons used in the designs are available at [Fontsource](https://fontsource.org/fonts/figtree) and [FontAwesome](https://fontawesome.com/icons/eye-slash?f=classic&s=regular).

## Technical Details

You may perform this exercise as a React web app or as a Flutter app.  Please choose the technology in which you are most comfortable today.

### Web

If you are performing this exercise as a React app, please fork or clone this repository as a starting point, and replace the included landing screen with your work.  This repo is set up with [Vite](https://vite.dev) and supports hot reloading.

Our preferred libraries are also integrated, but you may also use alternatives where you are uncomfortable:

* In lieu of [Redux Toolkit](https://redux-toolkit.js.org) you may use built-in React state and context capabilities.
* In lieu of [Typescript](https://www.typescriptlang.org) you may write plain Javascript files.
* In lieu of [@emotion/styled components](https://emotion.sh/docs/styled) you may use any other styling technology supported by Vite.

To get started, install [nodejs](https://nodejs.org/en/download) v22+.

Clone the repository to your computer, and install the npm packages:
```bash
cd clockapp
npm install
```

Then run the Vite dev server:
```bash
npm run dev
```

You should now be able to access the app at the address provided.

See also Vite's [getting started](https://vite.dev/guide/) documentation if you need more information on how to use it.

### Flutter

If you are performing this exercise as a Flutter app, please follow the instructions online for getting started [default new app template](https://docs.flutter.dev/get-started/codelab) for your work.

## Help !!

Don't be afraid to ask questions!  We understand not everyone will be immediately familiar with all of the technologies we've put in the stack.  Please reach out to your hiring manager if you need any assistance or clarification on the project requirements.

## Finished?

To submit your work, please share your fork with us on Github or zip up your work (minus gitignored files) and send it back.

As this is a new exercise we have just created, we would appreciate your feedback on what you liked about it and what you did not, and any ideas you have for making it better.

Thank you for participating and we're excited to talk with you after your submission!
