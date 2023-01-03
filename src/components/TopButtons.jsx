import React from 'react'

function TopButtons({setQuery}) {
    const city=[
        {
            id:1,
            title:'London'
        },
        {
            id:2,
            title:'Sydney'
        },
        {
            id:3,
            title:'Paris'
        },
        {
            id:4,
            title:'France'
        },
        {
            id:5,
            title:'Tokyo'
        },
    ]
  return(
     <div className='flex items-center justify-around my-6'>
    {
        city.map((city)=>(
            <button key={city.id} className='text-white text-lg font-medium' onClick={()=>setQuery({q:city.title})}>{city.title}</button>
        ))
    }
  </div>
  );
}

export default TopButtons