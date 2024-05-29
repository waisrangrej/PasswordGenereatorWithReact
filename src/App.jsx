import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setpassword] = useState("")

  const passwordref =useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numbersAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+{}?"

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length +1)
      pass+=str.charAt(char)

    }
    setpassword(pass)
  }, [length, numbersAllowed, charAllowed, setpassword])

const copytoclipboard=useCallback(()=>{
  window.navigator.clipboard.writeText(password)
},[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numbersAllowed, charAllowed, passwordGenerator])

  return (
    <div className='w-full h-screen bg-black flex items-center'>
      <div className='w-1/2 bg-gray-700 rounded-xl m-auto text-black'>
        <h1 className='text-center text-2xl p-5'>Password Genereator</h1>
        <div className='w-full h-full flex'>
          <input className='outline-none p-2 rounded-xl w-full' type="text" value={password} placeholder='password' readOnly ref={passwordref} />
          <button onClick={copytoclipboard} className='px-5 py-3 bg-blue-600 rounded-xl'>copy</button>

        </div>
        <div className='flex text-white'>
          <div className='w-full '>
            <input type="range" minLength={8} max={100} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label>Label:{length}</label>
          </div>
          <div className='w-full'>
            <input type="checkbox" defaultChecked={numbersAllowed} id='numberinput' onChange={() => { setNumberAllowed((prev) => !prev) }} />
            <label >Numbers</label>
          </div>
          <div className='flex gap-1'>
            <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={() => { setCharAllowed((pre) => !pre) }} />
            <label>Character</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App