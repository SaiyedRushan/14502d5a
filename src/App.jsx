import "./App.css"
import Header from "@/components/Header/Header"
import { useQuery } from "@tanstack/react-query"
import ActivityFeed from "./components/ActivityFeed"
import Footer from "./components/Footer"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Keypad from "./components/Keypad"
import axios from "axios"
axios.defaults.baseURL = import.meta.env.VITE_APP_BACKEND_URL

function App() {
  const fetchActivities = async () => {
    const { data } = await axios.get("/activities")
    return data
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["activities"],
    queryFn: () => fetchActivities(),
    initialData: [],
  })

  return (
    <Router>
      <div className='container flex flex-col'>
        <Header />
        <div className='container-view bg-slate-100 flex-grow overflow-y-auto'>
          <Routes>
            <Route path='/' element={<ActivityFeed data={data} error={error} isLoading={isLoading} isError={isError} />} />
            <Route path='/keypad' element={<Keypad />} />
          </Routes>
        </div>
        <div className='sticky bottom-0 w-full '>
          <Footer activities={data} />
        </div>
      </div>
    </Router>
  )
}

export default App
