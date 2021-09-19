import "./App.css";
import { useState, useEffect } from "react";
import CasesBox from "./components/CasesBox";
import Table from "./components/Table";
import {sortData} from "./utils";

// function handleWorlWide(countriesList) {
//     let totalActive = 0;
//     let totalRecovered = 0;
//     let totalDeaths = 0;
//     for (let country of countriesList) {
//         if (country.cases.active > 0) {
//             totalActive += country.cases.active;
//         }
//         if (country.cases.recovered > 0) {
//             totalRecovered += country.cases.recovered;
//         }
//         if (country.deaths.total > 0) {
//             totalDeaths += country.deaths.total;
//         }
//     }
//     console.log(totalActive + totalRecovered + totalDeaths);
//     return { totalActive, totalRecovered, totalDeaths };
// }

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

    // useEffect(() => {
    //     const fetchWorldWide = async () => {
    //         const getWorldData = await fetch(
    //             "https://disease.sh/v3/covid-19/all"
    //         )
    //             .then((response) => response.json())
    //             .catch((err) => {
    //                 console.log("Oh No Error during fetch worldWide");
    //                 console.log(err);
    //             });

    //         const editedData = {
    //             cases: {
    //                 active: getWorldData.active,
    //                 recovered: getWorldData.recovered,
    //             },
    //             deaths: {
    //                 total: getWorldData.deaths,
    //             },
    //         };

    //         setCountryData(editedData);
    //         setWorldWide(editedData);
    //         // console.table(getWorldWide)
    //         return getWorldData;
    //     };
    //     fetchWorldWide();
    // }, []);

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
                    console.log("error oh no error");
                    console.error(err);
                });
            for(let country of countriesList){
                if(country.cases.new == null){
                    country.cases.new = "+0";
                }
                country.cases.new = parseInt(country.cases.new.slice(1))
            }

            const sortedCountriesData = sortData(countriesList);
            // console.log(countriesList[0]);
            setCountriesData(sortedCountriesData);
            const [worldWideData] = sortedCountriesData.filter((countryObj) => {
                return countryObj.country === "All";
            });
            // console.log(worldWideData);
            setCountryData(worldWideData);
            // console.log("worldwide");
            // console.log(countriesList);
        };
        getAllCountries();
    }, []);

    const handleChangedCountry = async function (e) {
        const getCountry = e.target.value;
        if (getCountry === "Worldwide") {
            setCountryData(worldWide);
        } else {
            const [myCountry] = countriesData.filter((countryObj) => {
                return countryObj.country === getCountry;
            });
            setCountryData(myCountry);
        }
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
                <CasesBox
                    name="Active"
                    size={countryData.cases.active}
                    total="1662"
                />
                <CasesBox
                    name="Recovered"
                    size={countryData.cases.recovered}
                    total="1662"
                />
                <CasesBox
                    name="Deaths"
                    size={countryData.deaths.total}
                    total="1692"
                />
            </div>
            <div className="tableData">
                <h1>Country Wise Data</h1>

                <tr>
                    <td>Serial No:</td>
                    <td>Country Name</td>
                    <td>New Cases</td>
                   

                    <td>Active Cases</td>
                    <td>Recovered Cases</td>
                    <td>Total Deaths</td>
                </tr>

                {countriesData.map((country, index) => {
                    return (
                        <Table
                            SNo={index + 1}
                            country={country.country}
                            newCases={country.cases.new != null ? country.cases.new : "+0"}
                            active={country.cases.active}
                            recovered={country.cases.recovered}
                            deaths={country.deaths.total}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default App;
