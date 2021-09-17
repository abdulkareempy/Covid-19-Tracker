import "./App.css";
import react, { useState,useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const getAllCountries = async () => {
      fetch("https://covid-193.p.rapidapi.com/statistics", {
        method: "GET",
        headers: {
          "x-rapidapi-host": "covid-193.p.rapidapi.com",
          "x-rapidapi-key":
            "34880edaa3mshe862cfb3a401212p1d7722jsn58fd9ac0425a",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then(data=>{
          const countriesList = data.response.map(countryObj=>{
            return countryObj.country;
          })
          setCountries(countriesList);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getAllCountries();
  }, []);
  return (
    <div className="App">
      <h1>Covid 19 project</h1>
      <select>
        {countries.map((country) => {
          return <option>{country}</option>;
        })}
      </select>
    </div>
  );
}

export default App;
