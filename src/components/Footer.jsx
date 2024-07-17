/* eslint-disable react/prop-types */
import { countMissedCalls } from "@/lib/utils"
import { User, Settings, MessageCircle, Grip, Phone } from "lucide-react"
import { useMemo } from "react"
import { NavLink } from "react-router-dom"

const Footer = ({ activities }) => {
  const totalMissedCalls = useMemo(() => {
    return countMissedCalls(activities)
  }, [activities])

  return (
    <div className='flex justify-evenly py-4 items-center'>
      <NavLink to='/' className={({ isActive }) => (isActive ? " text-green-600" : "text-gray-500")} style={{ position: "relative" }}>
        <Phone />
        {totalMissedCalls > 0 && <span className='bg-red-500 text-white rounded-full px-2 ml-1 text-xs absolute -top-3 -right-3'>{totalMissedCalls}</span>}
      </NavLink>

      <NavLink to='/profile' className={({ isActive }) => (isActive ? " text-green-600" : "text-gray-500")}>
        <User />
      </NavLink>

      <NavLink to='/keypad' className={({ isActive }) => (isActive ? " border rounded-full p-1 border-green-600" : "text-gray-500")}>
        <div className='rounded-full bg-green-600 p-2 border-4 border-gray'>
          <Grip size={25} color='white' />
        </div>
      </NavLink>

      <NavLink to='/settings' className={({ isActive }) => (isActive ? " text-green-600" : "text-gray-500")}>
        <Settings />
      </NavLink>

      <NavLink to='/messages' className={({ isActive }) => (isActive ? " text-green-600" : "text-gray-500")}>
        <MessageCircle />
      </NavLink>
    </div>
  )
}

export default Footer
