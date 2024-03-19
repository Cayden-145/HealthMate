# [HealthMate](https://healthmate.site)

### Introducing HealthMate. Your comprehensive health companion designed to empower you on your wellness journey. Whether you're striving for fitness goals, monitoring your health, or simply making lifestyle changes, HealthMate is here to support you every step of the way.

- ✔ Best Practices across All Pages: `100`
- ✔ Performance across all pages: `100`
- ✔ SEO across all pages: `100`
- ✔ Accessibility across all pages: `100`

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white) ![WebStorm](https://img.shields.io/badge/webstorm-143?style=for-the-badge&logo=webstorm&logoColor=white&color=black)

```
Login via Popup on Mobile Devices V1.6.7
```
- Mobile phones can now login via popup (Google or GitHub)
- Fixed some styling issues in `/login`
- Updated Google & GitHub .svg
- Changed /home to HealthMate v.1.6.7
- Removed filter for GitHub.svg

```
Account Authentication V1.6.6
```
- Redesigned `/login` page
- Added the ability to login via **Google** or **GitHub**
- Added an `unsupported domian` popup.
  - Only shows if you aren't using the new domain *https://healthmate.site*
- Updated css for container in `/manage-account`
- Changed background gradient for all pages
- Added buttons for significant pages at the bottom of `/home`
- Fixed overflow & other styling issues on `/home`

```
Home V1.6.5
```
- Overhauled Home page
- Updated props for toggle.tsx
- Added display name option for auth details
- Various Other Bug Fixes

```
Dashboard: Weight Loss V1.6.4
```

- Added `Weight Loss` to dashboard component
  - Calculates by: `Recent Weight (in lbs)` - `Oldest Weight (in lbs)`
  - Currently only outputs in pounds, but later will convert it to either lbs or kilograms, depending on the value for the users' goal.
  - An arrow accompanies the result as a way for users to quickly see if they are loosing or gaining weight
  - Requires 2 or more pieces of data.
- Updated styling for `Goal` dashboard component on smaller screens
- Added aria-label to all buttons and links for accessibility
- Converted all files from `.png` to `.svg` to improve load times
- Added robots.txt for crawlers
- Updated meta tag in `index.html`
- Updated loader on `/manage-account`
  - Dashboard Components now indicate when they are loading
- Bug Fixes

```
Dashboard: Recent Weight V1.6.3
```
- Added `Recent Weight` to dashboard component
  - Works with both stone + pounds & kilograms
- Updated styling for `/manage-account` when not logged in to suite smaller screens

```
Phone Support V1.6.2
```

- HealthMate can now be used on the go, through a browser on your phone!
- Multiple css issues have been addressed, and fixed accordingly.
- All pages support phones.

```
Dashboard V1.6.1
```

- Dashboard Component
  - Visible via `/manage-account`
  - Users can set their own goal, which is saved to a secure cloud database
  - Access to a clean view of their 3 most recent BMI saves
- **Plans have been made to add more to the dashboard, once we have more data.**
- Changes to other files throughout the codebase, mostly cleaning up and removing the `hidden` classname.
- Updated account security to prevent possible information leaks via inspect element.
- Fixed data not showing if one or more values are 0 on page `/manage-account`
- Added a range property to your saved data, visible on `/manage-account`
  - The range depends on your BMI, which follows the structure:
    - Less than 18.5: Underweight
    - Between 18.5 and 24.9: Healthy Weight
    - Between 25 and 29.9: Overweight
    - Over 30: Obese
- Fixed issue with the footer, which was present when shrinking the browser height; content no longer overflows.
- Updated position of toasts, now visible in the top-middle of the screen.
- Improved layout of text on `/home`, lengths of paragraphs have been changed to further improve the UI.
- Fixed bouncing on toggles
- Data visible on `/manage-account` is now shown in chronological order.
- Addressed the issue of being able to see saved data via inspect element whilst not logged in.

```
Saving Feature V1.6
```

- Implemented firestore cloud database
  - Users that are logged in can now save their BMI calculators to their account
  - Saved data follows the structure of:
    - BMI: 0.00
    - Feet, Inches / Metres
    - Stone, Pounds / Kilograms
    - Date: dd/mm/yyyy
    - User: user ID (not displayed)
  - Data can be deleted by the user
  - Data can be tracked on the /manage-account page
  - Saved data is not accessed by anyone other than the logged-in user, and fully secure via firestore cloud service
- Implemented toast notifications for updated components & pages
- Further updates to styling on specific pages
- New button animations for /manage-account
- GitHub Repository now has an MIT licence
- Added styles to inputs upon error
- Results stying on /bmi-calculator page has been updated to include the inputted height and weight.
- Improved styling for /bmi-calculator on smaller screens


```
Display Name Feature + Styling Issues Addressed V1.5.2
UI/UX Overhaul V1.5.1
Authentication V1.5
Header Component V1.4.2
Performance V1.4.1
Parameters V1.4
Routing V1.3
...
```
