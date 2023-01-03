
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons';
import getFormattedWeatherData from './services/WeatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Snow from'./assets/Snow.mp4'

//import UilReact from '@iconscout/react-unicons/icons/uil-react'

function App() {

  const [query, setQuery] = useState({ q: "Shimla" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  useEffect(()=>{
    const message=query.q ? query.q:'current location.'

    toast.info('Fetching weather for '+message)

   const fetchWeather=async()=>{
    await getFormattedWeatherData({...query,units}).then((data)=>{
      toast.success(`Successfully fetched weather for ${data.name}, ${data.country} `)
      setWeather(data)
      console.log(data);
    })
    
   };

   fetchWeather();
  },[query,units])

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div className='main'>
      <video src={Snow} autoPlay loop muted/>
      <div className="content">
        
  <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
    <TopButtons setQuery={setQuery}/>
    <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
   
  {weather &&(
    <div>
  <TimeAndLocation weather={weather}/>
  <TemperatureAndDetails weather={weather}/>


  <Forecast title="Horly forecast" items={weather.hourly}/>
  <Forecast title="Daily forecast"items={weather.daily}/>
  </div>
  )}
   
   <ToastContainer autoClose={5000} theme='colored' newestOnTop={true}/>
  </div>
  </div>
  </div>
  
  );
}


export default App;
