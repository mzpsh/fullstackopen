import { useEffect, useState } from 'react'
import countriesServices from './services/countries'
import weatherServices from './services/weather'

function App() {
  const [query, setQuery] = useState(null);
  const [result, setResult] = useState(null);

  const onTextTyped = (value) => {
    setQuery(value);
  }

  const queryHook = () => {
    if(query) {
      countriesServices.find(query)
        .then(data => {
            setResult(data)
          }
        )
    }
  }

  useEffect(queryHook, [query]);

  const onShowCountry = (countryName) => {
    setQuery(countryName);
  }

  return (
    <>
      <SearchField {...{onTextTyped}}/>
      <ResultCountries {...{result, onShowCountry}}/>
    </>
  )
}

const ResultCountries = ({result, onShowCountry}) => {

  if (result ?? null != null) {
    if (result.length > 1) {
      if(result.length > 10) {
        return <p>Too many matches, find more specific country.</p>
      } else {
        return <ul>
          {result.map((country, index) => <li key={index} >{country.name.common} <button onClick={() => onShowCountry(country.name.common)}>show</button></li>)}
        </ul>
      }
    } else if (result.length == 0) {
      return <p>
        Country not found.
      </p>
    } else {
      const country = result[0];
      return <Country {...{country}}/>
    }
  }
  return <>
    <p>Type to search</p>
  </>
}

const Country = ({country}) => {
  const [weatherData, setWeatherData] = useState(null);
  
  const weatherHook = () => {
    weatherServices.fetch(country.latlng[0], country.latlng[1])
      .then(data => {
        setWeatherData(data)
      });
  }

  useEffect(weatherHook, []);

  return <>
        <h1>
          {country.name.common}
        </h1>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map((language, index) => <li key={index}>{language}</li>)}
        </ul>
        <img src={country.flags.svg} height={164}/>
        {
          (weatherData ?? null != null) 
            ? <>
                <p>temperature: {(weatherData.main.temp / 10).toFixed(1)} Celcius</p>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="" />
                <p>wind: {(weatherData.wind.speed).toFixed(1)} m/s</p>
              </>
            : <p>loading weather...</p>
        }
      </>
}

const SearchField = ({onTextTyped}) => {
  return <>
    find countries <input type="text" onChange={e => onTextTyped(e.target.value)}/>
  </>
}

export default App
