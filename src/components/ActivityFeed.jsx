/* eslint-disable react/prop-types */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"
import ArchivedTab from "./ArchivedTab"
import InboxTab from "./InboxTab"

const ActivityFeed = ({ data, error, isLoading, isError }) => {
  if (isLoading)
    return (
      <p>
        Loading... <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      </p>
    )
  if (isError) return <p>Error: {error.message}</p>
  return (
    <Tabs defaultValue='inbox'>
      <TabsList className='flex justify-around sticky'>
        <TabsTrigger value='inbox'> Inbox </TabsTrigger>
        <TabsTrigger value='archived'>Archived</TabsTrigger>
      </TabsList>

      <TabsContent value='inbox'>
        <InboxTab data={data} />
      </TabsContent>

      <TabsContent value='archived'>
        <ArchivedTab data={data} />
      </TabsContent>
    </Tabs>
  )
}

export default ActivityFeed
