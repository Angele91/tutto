import formatDuration from 'format-duration'
import { h, m, s } from 'time-convert'

export const secondsToHoursAndMinutes = (seconds) => s.to(h, m)(seconds)
export const calculateCummulativeTime = (historyItems) => {
  const wholeDuration = historyItems.reduce((acc, item) => {
    return acc + item.duration
  }, 0)

  return formatDuration(wholeDuration * 1000)
}