/* eslint-disable react/prop-types */
import { ArchiveIcon, Loader2 } from "lucide-react"
import { Button } from "./ui/button"
import ActivityCard from "./ActivityCard"
import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Accordion } from "./ui/accordion"
import { useMemo } from "react"
import { groupCallsByDate } from "@/lib/utils"

const ArchivedTab = ({ data }) => {
  const queryClient = useQueryClient()
  const resetAllCalls = async () => {
    const response = await axios.patch(`/reset`)
    return response.data
  }

  const groupedCalls = useMemo(() => groupCallsByDate(data.filter((activity) => activity.is_archived) || []), [data])

  const mutation = useMutation({
    mutationFn: resetAllCalls,
    onSuccess: () => {
      queryClient.invalidateQueries("activities")
    },
    onError: (error) => {
      console.error("Error resetting calls:", error)
    },
  })

  return (
    <div className='flex flex-col gap-3'>
      <Button className='flex gap-3 bg-gray-100 hover:bg-gray-200' variant='outline' onClick={mutation.mutate} disabled={mutation.isLoading}>
        {mutation.isLoading ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          <>
            <ArchiveIcon /> Reset
          </>
        )}
      </Button>

      <Accordion type='single' collapsible>
        {Object.keys(groupedCalls).map((date) => (
          <div key={date} className='mb-3'>
            <h3 className='text-sm text-center'>{date}</h3>
            {groupedCalls[date].map((call) => (
              <ActivityCard key={call.id} activity={call} tab='archived' />
            ))}
          </div>
        ))}
      </Accordion>
    </div>
  )
}

export default ArchivedTab
