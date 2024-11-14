# Banner 3D

This project uses Vite for build and dev environment. It is set up to publish to github pages automatically on update of the `main` branch.

# Running Locally

It is recommended to use [Volta](https://volta.sh/) to ensure compatible Node.JS and other CLI utils are in use. Otherwise, reference the `volta` property in `package.json` for expected versions.

* run `npm install`
* run `npm run dev`

# Functionality

This app displays 3D text of a configured string and allows setting the following properties with dynamic inputs on the page:

* Banner Text — The text to be displayed
* Thiccness — Controls the amount of curve and expansion of the text
* Twisty — The amount the text is twisted along the horizontal axis
* Text Color — The color of the rendered object
* Light Color — The color of light shining on the front face of the text

The app is displayed in light or dark mode according to the user's OS and browser settings.

Enjoy!
