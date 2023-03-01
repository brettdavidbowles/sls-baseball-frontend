const leadingZero = (num: number) => {
  return String(num).length === 1 ? `0${num}` : num;
}

export const formatDateTime = (date: string) => {
  const dateObj = new Date(date)
  const day = dateObj.getDate()
  const month = dateObj.getMonth() + 1
  const year = dateObj.getFullYear()
  const hours = dateObj.getHours()
  const minutes = leadingZero(dateObj.getMinutes())
  const seconds = leadingZero(dateObj.getSeconds())
  const formattedDate = `${month}/${day}/${year} ${hours}:${minutes} UTC`
  return formattedDate
}