/* eslint-disable react/prop-types */
import { ArchiveIcon, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import ActivityCard from "./ActivityCard"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { Accordion } from "./ui/accordion"
import { groupCallsByDate, updateIsArchived } from "@/lib/utils"

const InboxTab = ({ data }) => {
  const queryClient = useQueryClient()
  const [archiving, setArchiving] = useState(false)

  const archiveCallMutation = useMutation({
    mutationFn: (callId) => updateIsArchived(callId, true),
    onError: (error) => {
      console.error("Error archiving call:", error)
    },
  })

  const groupedCalls = useMemo(() => groupCallsByDate(data.filter((activity) => activity.direction == "inbound" && !activity.is_archived) || []), [data])

  const handleArchiveAll = async () => {
    try {
      setArchiving(true)
      await Promise.all(data.map((call) => archiveCallMutation.mutateAsync(call.id)))
      queryClient.invalidateQueries("activities")
      setArchiving(false)
    } catch (error) {
      console.error("Error archiving one or more calls:", error)
    }
  }

  return (
    <div className='flex flex-col gap-3'>
      <Button className='flex gap-3 bg-gray-100 hover:bg-gray-200' variant='outline' onClick={handleArchiveAll}>
        {archiving ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <>
            <ArchiveIcon />
            Archive all calls
          </>
        )}
      </Button>

      <Accordion type='single' collapsible>
        {Object.keys(groupedCalls).map((date) => (
          <div key={date} className='mb-3'>
            <h3 className='text-sm text-center'>{date}</h3>
            {groupedCalls[date].map((call) => (
              <ActivityCard key={call.id} activity={call} tab='inbox' />
            ))}
          </div>
        ))}
      </Accordion>
    </div>
  )
}

export default InboxTab
