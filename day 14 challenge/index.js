const fs = require("fs");
const inputFile = fs.readFileSync("input.txt", "utf8");
const data = eval(inputFile);

const cities = data;
function selectRandomCity(cities) {
  const randomIndex = Math.floor(Math.random() * cities.length);
  return cities[randomIndex];
}
const { name, lat, lng } = selectRandomCity(cities);
async function getData() {
  try {
    response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    )
      .then((res) => res.json())
      .then((temp) => {
        const message =
          " The temperature in " +
          name +
          " is " +
          temp.current_weather.temperature +
          " degrees Celsius ";
        console.log(message);
        fs.writeFileSync("weather.txt", message);
        fs.unlinkSync("input.txt");
      });
  } catch (e) {
    console.error('Error getting the temperature:', e);
  }
}

getData();
