import { Phone } from "lucide-react"
import { Button } from "./ui/button"

/* eslint-disable react/prop-types */
function Keypad() {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"]

  const handleKeyPress = (key) => {
    console.log(key)
  }

  return (
    <div className='flex flex-col gap-5 items-center justify-around h-full'>
      <input type='text' className='w-3/4 h-12 p-4' />
      <div className='grid grid-cols-3 gap-2 '>
        {keys.map((key, index) => (
          <button key={index} className='w-12 h-12 rounded-full bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 focus:outline-none' onClick={() => handleKeyPress(key)}>
            {key}
          </button>
        ))}
      </div>
      <Button variant='outline' className='rounded-full h-14 w-14 bg-green-500 text-white'>
        <Phone />
      </Button>
    </div>
  )
}

export default Keypad
