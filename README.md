
# Such Weather
A weather app with humor

[![Netlify Status](https://api.netlify.com/api/v1/badges/df1f9511-03fc-4477-be65-59af7f5cfae3/deploy-status)](https://app.netlify.com/sites/such-weather/deploys)

## Table of Contents
- [About](#about)
- [Functionalities](#functionalities)
- [Features](#features)
  - [Today's Weather](#todays-weather)
  - [5 Day Forecast](#5-day-forecast)
  - [Daily Temperature](#daily-temperature)
  - [Umbrella Tracker](#umbrella-tracker)
- [Extra Added Features ✨](#extra_features)
    - [Dynamic Color (based on Weather)](#dynamic_color)
    - [Weather Relevant Jokes](#humor)
    - [Rain Checker](#rain_checker)
- [Tools and Technologies](#tools-and-technologies)
- [API](#api)
- [Installation](#installation)
- [Future Development](#future-development)
- [Thanks](#thanks)

## About
Such Weather is a weather app with a touch of humor, providing users with comprehensive weather information and a delightful experience.

## Functionalities

### Integration with external APIs
Seamlessly integrates with OpenWeatherMap's Geolocation and OneCall APIs to provide accurate and up-to-date weather information.

### User interface design and responsiveness
Features an intuitive and aesthetically pleasing design, ensuring a seamless user experience on various devices and screen sizes.

### Implementation of data visualization
Data visualization is implemented through Chart.js, offering users a clear and visually appealing representation of temperature trends.

### Search functionality and error handling
Such Weather includes a robust search functionality for users to easily find weather information for different locations. Error handling mechanisms are in place to provide a smooth user experience even in case of unexpected issues.

### Code organization and structure
The project follows a well-organized code structure, making it easy to maintain and understand. Modules and components are appropriately organized for clarity and modularity.

### Use of React features and hooks
Such Weather leverages React features and hooks to enhance functionality and improve the overall performance of the app.

## Features

### Today's Weather
Get a snapshot of the current weather, including temperature, humidity, wind, and more. Such Weather keeps you informed about what to expect right now.

### 5 Day Forecast
Plan ahead with a detailed 5-day forecast, ensuring you're prepared for the upcoming weather changes.

### Daily Temperature
Explore the week's temperature trends through an intuitive line chart, offering a visual representation of daily temperature variations.

### Umbrella Tracker
Stay dry by knowing how many days it's going to rain.

## Extra Added Features

### Dynamic Color (based on Weather)
Such Weather changes the background color based on the current weather condition. This feature adds a visual element to the app, making it more engaging and immersive.

### Weather Relevant Jokes
To add a touch of humor, Such Weather displays weather-relevant jokes throughout the app. These jokes provide a lighthearted and enjoyable experience while checking the weather.

### Rain Checker
Such Weather includes a doughnut graph that shows the number of days it is going to rain or be sunny in the next 7 days. This feature helps users plan their activities and decide when to carry an umbrella.

## Tools and Technologies
- React
- Javascript
- CSS
- HTML
- Vite
- Tailwind CSS
- Chart.js

## API
Such Weather relies on two APIs provided by OpenWeatherMap:

- **Location API:** This API is responsible for converting city names to coordinates. It allows the app to retrieve the latitude and longitude of a given location, which is essential for accurate weather data retrieval.

- **OneCall API:** The OneCall API is used to fetch detailed forecast data. It provides comprehensive weather information for a specific location, including current weather conditions, hourly forecasts, daily forecasts, and more. This API enables Such Weather to display up-to-date and accurate weather information to its users.

By utilizing these APIs, Such Weather ensures that users can access reliable and precise weather data for any location they search for.


## Installation
To run Such Weather, follow these steps:

1. Clone the repository.
    ```bash
    git clone <repository_url>
    ```

2. Install the dependencies.
    ```bash
    npm install
    ```

3. Obtain your OpenWeatherMap API key.

4. Create a `.env` file in the project root.

5. Add your API key to the `.env` file:
    ```bash
    VITE_WEATHER_API=<your_api_key>
    ```

6. Start the development server.
    ```bash
    npm run dev
    ```

7. Click the link provided by VITE and voila!


## Future Development
Such Weather is continuously evolving. Look forward to the following enhancements:
- Custom Wallpaper based on today's time and weather
- Updated weather Icons
- Language options
- Weather animations

## Acknowledgements
Special thanks to `OrangeToolz` for providing the opportunity to delve into the creation of Such Weather, making it stand out from other weather apps, and exploring the fascinating world of weather-related information.
