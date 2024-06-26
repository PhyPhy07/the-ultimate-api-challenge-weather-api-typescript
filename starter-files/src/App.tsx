
import { useState, ChangeEvent } from 'react'
import { optionType } from './types'

const App = (): JSX.Element => {  //need state for reactive values when user searches
  
  const [term, setTerm] = useState<string>('')
  const [options, setOptions] = useState<[]> ([])



const getSearchOptions= (value:string) => {//q=query parameters
 fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${process.env.REACT_APP_API_KEY}`)
 .then((res)=> res.json())
 .then((data)=>setOptions(data))
}
  
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    const value = e.target.value.trim()
    setTerm(value)

    if (value === '') return 

    getSearchOptions(value)
  }
const onOptionSelect = (option: optionType) => {
 
  console.log(option.name)
  fetch(`https://api.openweathermap.org/data/3.0/weather?lat=${option.lat}&lon=${option.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)

  .then((res)=> res.json())
  .then((data)=> console.log({data}))
}
  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      
      <section className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg text-zinc-700">
     <h1 className="text-4x1 font-thin"> Weather<span className="font-black">Forecast</span> </h1>
     
     <p className="text-sm mt-2"> Enter any place in the box below to populate the deets on the weather! <span className="font-black">
       HINT: Texas is hotter than the hinges of hell just fyi!</span> </p>

  <div className="relative flex mt-10 md:mt-4">
      <input type="text" 
      value={term} 
      className="px-2 py-1 rounded-1-md border-2 border-white"
      onChange= {onInputChange}/>

<ul className='absolute top-9 bg-white m1-1 rounded-b-md'>
{options.map((option: optionType, index: number) => (

<li key= {option.name + '-' + index}  >
  <button className='text-left text-sm w-full hover:text-white px-2 py-1 cursor-pointer onClick={()=> onOptionSelect'>{option.name}
  </button>
</li>

))}
</ul>
    
    
    <button className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer"> Lets Go!
   </button>
   </div>
  </section> 
  </main>
  )
}

export default App
