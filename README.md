# Weather App

A responsive weather application built with **React** and the
**Open-Meteo API**, featuring weather forecasts, location management,
and a customizable interface.

## Features

-   Current weather conditions
-   Hourly forecast carousel
-   7-day weather forecast carousel
-   Detailed weather information
-   Air quality information
-   Marine weather information
-   Historical weather section
-   Search and manage locations
-   Persian and English interface
-   Responsive layout for desktop and mobile
-   Mouse, touch, and carousel interactions
-   Weather-dependent backgrounds, illustrations, and visual effects
-   Settings and browser-based persistence with `localStorage`

> Some weather data and features depend on the availability of the
> relevant Open-Meteo API endpoints.

## Tech Stack

-   **React**
-   **JavaScript (JSX)**
-   **CSS**
-   **Open-Meteo API**
-   **Git and GitHub**

## API

Weather and geocoding data are provided by
[Open-Meteo](https://open-meteo.com/).

-   [Open-Meteo Weather API](https://open-meteo.com/en/docs)
-   [Open-Meteo Geocoding
    API](https://open-meteo.com/en/docs/geocoding-api)

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) and npm
-   Git (optional, for cloning the repository)

### Installation

1.  Clone the repository:

    ``` bash
    git clone <repository-url>
    ```

2.  Move into the project directory (and into the frontend directory if
    your `package.json` is there):

    ``` bash
    cd <project-directory>
    ```

3.  Install dependencies:

    ``` bash
    npm install
    ```

4.  Start the development server:

    ``` bash
    npm run dev
    ```

    If the project uses a different setup, check the available scripts
    in `package.json`.

### Production Build

To create a production build:

``` bash
npm run build
```

For a Vite project, the production files are typically generated in the
`dist` directory.

## Language Support

The interface supports **Persian** and **English**. The language setting
can be changed in the application. Some location names may depend on the
language returned by the geocoding service.

## Project Structure

The exact structure may change as the project evolves. The application
is organized around reusable UI and weather-related components, with
styles and API/data logic separated where appropriate.

## Deployment

The app can be deployed to a static hosting platform such as:

-   [Netlify](https://www.netlify.com/)
-   [Cloudflare Pages](https://pages.cloudflare.com/)

Both offer free hosting options and a platform-provided subdomain, so
purchasing a custom domain is not required. Connect the GitHub
repository and configure the build command and output directory
according to the project's setup.

## Project Goal

This project began as a weather UI prototype and evolved into a
functional React application connected to a real weather API. It is also
part of a broader learning journey in frontend development, from Vanilla
JavaScript to React and eventually full-stack development.

## Status

**Completed initial release --- ongoing improvements are possible.**

Future improvements may include additional weather charts, refinements
to loading and error states, accessibility improvements, and further UI
polish.