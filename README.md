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

* The user will be presented with two clocks in two different timezones: [US Pacific time and Taipei time](https://www.worldtimebuddy.com/pst-to-taiwan-taipei).
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
