/* eslint-disable react/prop-types */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import ArchivedTab from "./ArchivedTab"
import InboxTab from "./InboxTab"
import { useEffect, useState } from "react"

const ActivityFeed = ({ data, error, isLoading, isError }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger the animation after a short delay
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading)
    return (
      <p>
        Loading... <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      </p>
    )
  if (isError) return <p>Error: {error.message}</p>
  return (
    <div className={`transition-opacity duration-1000 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"}`}>
      <Tabs defaultValue='inbox'>
        <TabsList className='flex justify-around sticky top-0 bg-gray-200 z-10 transition-all duration-500 ease-in-out transform'>
          <TabsTrigger value='inbox' className={`transition-all duration-500 ease-in-out transform ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}>
            Inbox
          </TabsTrigger>
          <TabsTrigger value='archived' className={`transition-all duration-500 ease-in-out transform ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}>
            Archived
          </TabsTrigger>
        </TabsList>

        <TabsContent value='inbox' className={`transition-all duration-500 ease-in-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <InboxTab data={data} />
        </TabsContent>

        <TabsContent value='archived' className={`transition-all duration-500 ease-in-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <ArchivedTab data={data} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ActivityFeed
