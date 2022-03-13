import './App.css';
import search from "./search.svg"
import { TwitterShareButton } from 'react-share';
import { useState, useEffect } from 'react';
import { AiFillTwitterCircle } from "react-icons/ai";
function App() {
  const [advices, setadvices] = useState([])
  const [searchvalue, setsearch] = useState("life")

  useEffect(() => {
    (
      async () => {
        const response = await fetch(`https://api.adviceslip.com/advice/search/${searchvalue}`)
        const data = await response.json()
        console.log(data.slips)
        setadvices(data.slips)
      }
    )()
  }, [searchvalue])

  return (
    <div className=" h-full  bg-[#212426]">
      <div className="pt-8 text-center text-green-400">
        <h1 className='text-[3rem] logo'>Sudvice</h1>
        <p>Get some  free advice </p>

      </div>
      <div className='w-[90%] max-w-3xl m-auto'>
        <div className='mt-8 w-full bg-[#1f2123] shadow-lg shadow-[#1c1d1f] m-auto py-3 px-4 rounded-3xl flex'>
          <input onChange={(e) => setsearch(e.target.value)} type="text" placeholder='Type to Get Advice' className='text-white  flex-1 bg-transparent outline-none ' />

        </div>
        <p className='text-center text-white w-full m-auto flex items-center px-4 mt-4'>Click <AiFillTwitterCircle className='mx-5'></AiFillTwitterCircle> to share on Twitter </p>

      </div>
      {
        advices ? advices.map(advice => {
          return <div key={advice.id} className='my-5 m-auto w-[90%] px-4 py-5 text-center text-white bg-[#1c1d1f] max-w-3xl'>
            <p className='flex justify-center items-center text-center'>{advice.advice} <TwitterShareButton className='mx-3' url={advice.advice}><AiFillTwitterCircle size={20}></AiFillTwitterCircle></TwitterShareButton></p>
          </div>

        }) :
          <div className='my-14 m-auto w-[90%] px-4 py-5 text-center text-white bg-[#1c1d1f] max-w-3xl'>
            <p>no advice found</p>
          </div>
      }

    </div>
  );
}

export default App;
