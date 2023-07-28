import axios from "axios";
import React, { useState } from "react";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=20629eff6e23c8a0ff2ba7f8bf03a473`;

  const searchLocation = () => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setLocation("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchLocation();
    }
  };

  return (
    <div className="bg-gradient-to-b from-indigo-600 to-orange-400 w-full h-screen text-white">
      <div className="search text-center p-4">
        <input
          className="py-3 px-6 text-xl rounded-3xl border border-solid border-white/80 bg-white/10 placeholder-gray-50 text-gray-50  "
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      {data.main && (
        <div className="container flex flex-col justify-between max-w-3xl h-auto m-auto py-0 px-4 relative top-24">
          <div className="top w-full my-4 mx-auto">
            <div className="location">
              <p className="text-base mx-6">{data.name}</p>
            </div>
            <div className="temp">
              <h1 className="text-8xl font-bold ml-6 mt-10">
                {data.main && data.main.temp.toFixed()} °C
              </h1>
            </div>
            <div className="description relative origin-top-left -rotate-90">
              <p className="text-base">
                {data.weather && data.weather[0].main}
              </p>
            </div>
          </div>
          <div className="bottom flex justify-evenly text-center w-full mt-24 mb-4 mx-auto p-4 rounded-2xl bg-white/20 ">
            <div className="feels">
              <p className="text-base font-bold">
                {data.main && data.main.feels_like.toFixed()}
              </p>
              <p className="text-base">Feels Like</p>
            </div>
            <div className="humidity">
              <p className="text-base font-bold">
                {data.main && data.main.humidity} %
              </p>
              <p className="text-base">Humidity</p>
            </div>
            <div className="wind">
              <p className="text-base font-bold">
                {data.wind && data.wind.speed.toFixed()} Km/h
              </p>
              <p className="text-base">Wind Speed</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
