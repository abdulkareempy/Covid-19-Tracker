import "./App.css";
import react, { useState, useEffect } from "react";
import CasesBox from "./components/CasesBox";




function handleWorlWide(countriesList){
  let totalActive = 0;
  let totalRecovered = 0;
  let totalDeaths = 0;
  for(let country of countriesList){
    if(country.cases.active>0){
      totalActive += country.cases.active;
    }
    if(country.cases.recovered>0){
      totalRecovered += country.cases.recovered;
    }
    if(country.deaths.total>0){
      totalDeaths += country.deaths.total;
    }
  }
  console.log(totalActive+totalRecovered+totalDeaths);
  return{totalActive,totalRecovered,totalDeaths}
}

function App() {
  const [countriesData, setCountriesData] = useState([]);
  const [worldWide, setWorldWide] = useState({
    cases: {
      active: "loading...",
      recovered: "loading...",
    },
    deaths: {
      total: "loading...",
    },
  });

  const [countryData, setCountryData] = useState({
    cases: {
      active: "loading...",
      recovered: "loading...",
    },
    deaths: {
      total: "loading...",
    },
  });

  useEffect(() => {
    const getAllCountries = async () => {
      const countriesList = await fetch(
        "https://covid-193.p.rapidapi.com/statistics",
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key":
              "34880edaa3mshe862cfb3a401212p1d7722jsn58fd9ac0425a",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => data.response)
        .catch((err) => {
          console.error(err);
        });
      setCountriesData(countriesList);
      setCountryData(countriesList[0])
      console.log("worldwide")
      console.log(handleWorlWide(countriesList));
      // console.log(countriesList[0])
    };
    getAllCountries();
  }, []);

  const handleChangedCountry = async function (e) {
    const getCountry = e.target.value;
    // console.log("changed triggered",getCountry);
    const [myCountry] = countriesData.filter((countryObj) => {
      return countryObj.country === getCountry;
    });
    setCountryData(myCountry);
    // console.log(myCountry[0]);
  };
  return (
    <div className="App">
      {/* {console.log("worldwide", worldWide)} */}
      <h1>Viviano Di Vinci</h1>
      <select onChange={handleChangedCountry}>
        <option key={"Worldwide"} value={"Worldwide"}>
          {"Worldwide"}
        </option>
        {countriesData.map((country) => {
          return (
            <option key={country.country} value={country.country}>
              {country.country}
            </option>
          );
        })}
      </select>
      <div className="caseBoxWrapper">
        {/* {console.log(countryData)} */}
        <CasesBox name="Active" size={countryData.cases.active} total="1662" />
        <CasesBox
          name="Recovered"
          size={countryData.cases.recovered}
          total="1662"
        />
        <CasesBox name="Deaths" size={countryData.deaths.total} total="1692" />
      </div>
    </div>
  );
}

export default App;
