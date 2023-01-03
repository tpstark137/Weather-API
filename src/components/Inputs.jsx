import React from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import { useState } from 'react';
import { toast } from 'react-toastify';

function Inputs({setQuery,units,setUnits}) {
  const [city, setCity] = useState("");

  const handleSearchClick=()=>{
    if(city!=='') setQuery({q: city})
  }

    const handleLocationClick=()=>{
      if(navigator.geolocation){
        toast.info('Fetching users location..' )
        navigator.geolocation.getCurrentPosition((position)=>{
          toast.success('Location successfully searched!')
          let lat=position.coords.latitude
          let lon=position.coords.longitude

          setQuery({
            lat,
            lon,
          })
        })
      }
    }
    const tempClickC=(e)=>{
          const selectedUnit=e.current.target.name
          if(units!==selectedUnit) setUnits(selectedUnit);

    }
  
  return (
    <div className='flex flex-row justify-center my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
         <input type="text" placeholder='Search for city....'
          className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase' value={city}
          onChange={(e)=>setCity(e.currentTarget.value)} />
          
          <UilSearch size={25} 
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSearchClick}/>
          <UilLocationPoint size={25} 
          className="text-white cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}/>
        </div>
        <div className='flex flex-row w-3/4 items-center justify-center'>
            <button name='meteric' className='text-xl text-white font-light transition:ease-out hover:scale-125'
            onClick={tempClickC}>°C</button>
            <p className='text-xl text-white mx-1'> | </p>
            <button name='imperial' className='text-xl text-white font-light transition:ease-out hover:scale-125' onClick={tempClickC}>°F</button>
        </div>
    </div>
  )
}

export default Inputs