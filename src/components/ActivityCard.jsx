/* eslint-disable react/prop-types */
import { ArchiveIcon, PhoneIncomingIcon, PhoneMissed, PhoneOutgoingIcon } from "lucide-react"
import { AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Button } from "./ui/button"
import { updateIsArchived } from "@/lib/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"

const ActivityCard = ({ activity, tab }) => {
  function formatDate(date) {
    const d = new Date(date)
    return d.toLocaleTimeString([], { hour: "numeric", minute: "numeric", hour12: true })
  }

  const queryClient = useQueryClient()
  const updateIsArchivedCallMutation = useMutation({
    mutationFn: (callId) => updateIsArchived(callId, tab == "archived" ? false : true),
    onSuccess: () => {
      queryClient.invalidateQueries("activities")
    },
    onError: (error) => {
      console.error("Error archiving call:", error)
    },
  })

  return (
    <AccordionItem value={activity.id}>
      <AccordionTrigger>
        <div className='flex p-4 gap-5 rounded-lg bg-white justify-between items-center w-full'>
          <div className='flex gap-6 items-center'>
            {activity.call_type == "missed" ? <PhoneMissed size={20} className='text-red-400' /> : activity.direction == "inbound" ? <PhoneIncomingIcon size={20} /> : <PhoneOutgoingIcon size={20} />}

            <div className='flex flex-col gap-2 items-start text-start'>
              <p className='font-black'>{activity.from}</p>
              <p className='text-slate-500 text-xs'>Tried to call on {activity.to}</p>
            </div>
          </div>

          <div className='text-slate-500 text-sm min-w-14'>{formatDate(activity.created_at)}</div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className='flex p-4 gap-5  justify-between items-center w-full'>
          <div>
            <p className='text-slate-500'>Via: {activity.via}</p>
            <p className='text-slate-500'>Duration: {activity.duration}</p>
            <p className='text-slate-500'>Type: {activity.call_type}</p>
            <p className='text-slate-500'>On: {new Date(activity.created_at).toLocaleDateString()}</p>
          </div>
          <div>
            <Button variant='outline' className='bg-red-300 text-black hover:bg-red-400' onClick={() => updateIsArchivedCallMutation.mutate(activity.id)}>
              <ArchiveIcon className='mr-2 h-4 w-4' />
              {tab == "archived" ? "Unarchive" : "Archive"}
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export default ActivityCard
