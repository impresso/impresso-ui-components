export const formatTime = (time: number): string => {
  if (isNaN(time) || time === 0) return '00:00:00'
  const hours = Math.floor(time / 3600)
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return [hours, minutes, seconds]
    .map((d) => d.toString().padStart(2, '0'))
    .join(':')
}
