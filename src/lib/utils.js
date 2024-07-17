import axios from "axios"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const groupCallsByDate = (calls) => {
  return calls.reduce((acc, call) => {
    const date = new Date(call.created_at).toLocaleDateString("en-US", { dateStyle: "full" })
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(call)
    return acc
  }, {})
}

export const countMissedCalls = (calls) => {
  return calls.filter((call) => call.call_type === "missed" && !call.is_archived).length
}

export const updateIsArchived = async (callId, value) => {
  const response = await axios.patch(`/activities/${callId}`, { is_archived: value })
  return response.data
}
