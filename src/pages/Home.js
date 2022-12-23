import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";

// import { debounce } from "lodash";
// import { useDebounce } from "use-debounce";
import { GET_WEATHER } from "../graphql/queries";
import "./Home.css";

export default function Home() {
  const [cityName, setCityName] = useState("");
  //   function handleOnChange(event) {
  //     setCityName(event?.target?.value);
  //   }

  //   const debouncedOnChange = debounce(handleOnChange, 200);
  // const value = useDebounce(cityName, 500);

  const [getCityWeather, { loading, error, data, called }] = useLazyQuery(
    GET_WEATHER,
    {
      variables: {
        name: cityName,
      },
    }
  );
  console.log({ error, loading, data, called });
  return (
    <div>
      <h1>Search for weather</h1>
      <input
        type="text"
        value={cityName}
        placeholder="Type a Cityname to search"
        onChange={(e) => {
          e.preventDefault();
          setCityName(e?.target?.value);
        }}
        //   onChange={debouncedOnChange}
      />
      <button onClick={() => getCityWeather()}>Search</button>

      {loading && <div>Loading...</div>}
      {error && <div>error</div>}
      {data && data.getCityByName && (
        <div>
          <h2>{data.getCityByName.name}</h2>
          <h2>
            Weather: {data.getCityByName.weather.summary.title}
            <br />
            Description: {data.getCityByName.weather.summary.description}
          </h2>
          <h2>Max Temperature: {data.getCityByName.weather.temperature.max}</h2>
          <h2>
            Actual Temperature: {data.getCityByName.weather.temperature.actual}
          </h2>
        </div>
      )}
    </div>
  );
}
