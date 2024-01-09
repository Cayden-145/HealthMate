Introducing HealthMate. Your comprehensive health companion designed to empower you on your wellness journey. Whether you're striving for fitness goals, monitoring your health, or simply making lifestyle changes, HealthMate is here to support you every step of the way.

- [Check out V1.6 here](https://healthmate-c8e5c.web.app)

___Recent Updates___

```
Saving Feature V1.6
```

- Implemented firestore cloud database
  - Users that are logged in can now save their BMI calculators to their account
  - Saved data follows the structure of:
    - BMI: 0.00
    - Date: dd/mm/yyyy
    - User: user ID (not displayed)
  - Data can be deleted by the user
  - Data can be tracked on the /manage-account page
  - Saved data is not tracked, and fully secure via firestore cloud service
- Implemented toast notifications for updated components & pages
- Further updates to styling on specific pages
- New button animations for /manage-account
- GitHub Repository now has an MIT licence
- Added styles to inputs upon error

```
Display Name Feature + Styling Issues Addressed V1.5.2
```

- Added a display name field upon sign up.
  - Field is required when signing up.
  - All accounts without a display name have been reset.
- Added a new logo to footer component
- Fixed styling issues for home page
  - When working with a smaller window, "key features" presented an issue causing items to load off of screen.
- Fixed styling issues for BMI Calculator
  - When working with a smaller window, "/bmi-calculator" page presented an issue causing items to load off of screen.

```
 UI/UX Overhaul V1.5.1
```

- Frontend
  - Updated UI for all pages
  - Added unsupported device page (mobile devices)
  - Improved UX
    - Fixed issues with signup and login page
    - Custom Component
- Backend
  - Updated Firebase API
  - Updated parameters for certain pages
  - Addressed issues when logging in
  - Addressed performance issues
  - New Component
    - Custom toggle button
    - Accessible using the following pages:
      - BMI Calculator
      - Height Converter
      - Weight Converter
    - Animated
  - Addressed issues with parameters

```
 Authentication V1.5
```

- Added authentication via firebase.
  - Account Management Pages
    - Login
    - Sign Up
    - Reset Password
- Updated header component
  - Hamburger Menu

```
 Header Component V1.4.2
```

- Updated header
- Fixed styling for header component
  - Updated styling to header to accommodate for a smaller browser.
- New color scheme for header component
- Added login button. (not functional yet)


```
Performance V1.4.1
Parameters V1.4
Routing V1.3
```

Note:

- Website may not function and display as expected on smaller devices. (phones, tablets, other small screens.)


