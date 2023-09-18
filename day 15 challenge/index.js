// Import the 'http' module to create an HTTP server
const http = require("http");
// Import the 'url' module to parse URLs and query parameters
const url = require("url");

// Define an array of cities with their names, latitudes, and longitudes
const cities = [
  { name: "New York", lat: 40.7128, lng: -74.006 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Paris", lat: 48.8566, lng: 2.3522 },
  { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
  { name: "Sydney", lat: -33.8651, lng: 151.2099 },
  { name: "Rome", lat: 41.9028, lng: 12.4964 },
  { name: "Cairo", lat: 30.0444, lng: 31.2357 },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Rabat", lat: 34.0209, lng: -6.8416 },
];

// Create an HTTP server and define a callback function for handling requests
http.createServer(async (req, res) => {
  // Parse the URL, including query parameters
  const reqUrl = url.parse(req.url, true);

  // Check if the requested path is "/weather"
  if (reqUrl.pathname === "/weather") {
    // Extract the "city" parameter from the query
    const cityName = reqUrl.query.city;

    if (cityName) {
      // Find the selected city in the 'cities' array
      const selectedCity = cities.find(
        (city) => city.name.toLowerCase() === cityName.toLowerCase()
      );

      if (selectedCity) {
        // Extract city data (name, latitude, longitude)
        const { name, lat, lng } = selectedCity;

        // Call the 'getData' function here with the selected city's data
        const temperature = await getData(name, lat, lng);

        // Send a successful response with the temperature
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`The temperature in ${name} is ${temperature} degrees Celsius`);
      } else {
        // Send a 404 response if the city is not found
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("City not found");
      }
    } else {
      // Send a 400 response if the "city" parameter is missing
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("City parameter is missing");
    }
  } else {
    // Send a 404 response if the requested endpoint is not "/weather"
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Endpoint not found");
  }
})
// Start the server on port 3000
.listen(3000);

// Asynchronous function to fetch weather data for a given city
async function getData(name, lat, lng) {
  try {
    // Make a fetch request to an external API to get weather data
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    );
    
    // Parse the response as JSON and extract the current temperature
    const temp = await response.json();

    // Return the current temperature
    return temp.current_weather.temperature;
  } catch (error) {
    // Handle errors if the API request fails
    console.error("Error fetching data:", error);
  }
}