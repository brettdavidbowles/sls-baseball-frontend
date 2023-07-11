import { dateObj } from 'types/types'

const leadingZero = (num: number) => {
  return String(num).length === 1 ? `0${num}` : num;
}

export const formatDateTime = (date: string): dateObj => {
  const dateObj = new Date(date)
  const day = dateObj.getDate()
  const month = dateObj.getMonth() + 1
  const year = dateObj.getFullYear()
  const hours = dateObj.getHours()
  const minutes = leadingZero(dateObj.getMinutes())
  const seconds = leadingZero(dateObj.getSeconds())
  const timezone = dateObj?.toTimeString()?.match(/\((.+)\)/)?.[1] || 'UTC'
  return {
    date: `${month}/${day}/${year}`,
    time: `${hours}:${minutes}:${seconds}`,
    timezone
  }
}