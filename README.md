# Weather App

A responsive weather application built with **React, JavaScript, and Vite**, powered by the [Open-Meteo API](https://open-meteo.com/).

Explore current weather conditions, forecasts, air quality, and marine weather through an interactive interface with dynamic weather visuals and Persian/English language support.

## Live Demo

**[Open Weather App](https://codejourney-dev.github.io/weather-app/)**

## Features

- **Current Weather** — View current weather conditions for a selected location.
- **Hourly Forecast** — Explore hourly weather predictions using an interactive carousel.
- **7-Day Forecast** — Browse the upcoming weekly forecast.
- **Air Quality** — Explore air quality data and related environmental indicators.
- **Marine Weather** — View marine conditions and wave-related information where data is available.
- **Location Management** — Search for and manage locations.
- **Bilingual Interface** — Switch between Persian (فارسی) and English.
- **Dynamic Weather Visuals** — Weather illustrations, animated effects, and backgrounds that respond to weather conditions and time of day.
- **Responsive Design** — Layouts designed for desktop and mobile screens.
- **Interactive Components** — Reusable UI components, carousels, and mouse/touch interactions.
- **Settings & Persistence** — Save supported preferences in browser `localStorage`.

*Data availability depends on the selected location and the capabilities of the relevant API endpoints.*

## Tech Stack

| Technology | Purpose |
|---|---|
| React | UI development and reusable components |
| JavaScript (ES Modules) | Application logic |
| Vite | Development server and production builds |
| CSS | Layout, styling, animations, and visual effects |
| React Router | Client-side routing |
| Lucide React | UI icons |
| Open-Meteo APIs | Weather, geocoding, air quality, and marine data |
| Git & GitHub | Version control and source code hosting |
| GitHub Pages | Static website deployment |

## APIs

This project uses Open-Meteo services to retrieve weather and environmental data.

- [Weather Forecast API](https://open-meteo.com/en/docs)
- [Geocoding API](https://open-meteo.com/en/docs/geocoding-api)
- [Air Quality API](https://open-meteo.com/en/docs/air-quality-api)
- [Marine API](https://open-meteo.com/en/docs/marine-weather-api)

See the [Open-Meteo website](https://open-meteo.com/) for API documentation, usage terms, and data availability.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/codejourney-dev/weather-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weather-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal, usually:

   ```text
   http://localhost:5173/
   ```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |

### Production Build

To generate the production files, run:

```bash
npm run build
```

Vite outputs the generated files to the `dist/` directory.

## Project Structure

```text
weather-app/
├── public/                 # Static public assets
├── src/
│   ├── components/
│   │   ├── layout/         # Header and footer
│   │   ├── ui/             # Reusable UI components
│   │   └── weather-visuals/# SVG weather illustrations
│   ├── context/            # React context and language state
│   ├── data/               # Weather variables and codes
│   ├── effects/            # Weather effects and animations
│   ├── features/
│   │   ├── airQuality/     # Air quality features
│   │   ├── location/       # Location management
│   │   ├── marineWeather/  # Marine weather features
│   │   ├── setting/        # Application settings
│   │   └── weather/        # Forecasts and weather details
│   ├── locales/            # English and Persian translations
│   ├── pages/              # Application pages
│   ├── services/           # API requests
│   ├── theme/              # Backgrounds and visual themes
│   ├── utils/               # Helper functions
│   ├── App.jsx
│   └── main.jsx
├── .github/
│   └── workflows/          # GitHub Actions deployment workflow
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Language Support

The application supports:

- **English**
- **Persian (Farsi)**

The interface includes language-specific translations and supports both languages through the application's localization system.

## Deployment

The project is published using **GitHub Pages**.

**Live URL:** https://codejourney-dev.github.io/weather-app/

Deployment is automated through GitHub Actions. When changes are pushed to the `main` branch, the workflow builds the application and deploys the generated `dist/` directory.

## Project Status

**Status: Ongoing development**

The project has evolved from a weather UI prototype into a React application integrated with live weather APIs. Improvements and refinements may continue as development progresses.

## Future Improvements

Potential areas for future development include:

- More weather charts and data visualizations
- Improved loading and error states
- Accessibility and usability refinements
- Further UI and animation improvements
- Additional forecast and location-management enhancements

## License

No license has been specified yet. Unless a license is added to the repository, the project should not be assumed to be open source under a particular license.

---

Built as part of a journey in frontend development and building practical projects with React.
