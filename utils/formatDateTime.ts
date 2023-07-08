const leadingZero = (num: number) => {
  return String(num).length === 1 ? `0${num}` : num;
}

export const formatDateTime = (date: string, dateOnly: boolean = false) => {
  const dateObj = new Date(date)
  const day = dateObj.getDate()
  const month = dateObj.getMonth() + 1
  const year = dateObj.getFullYear()
  const hours = dateObj.getHours()
  const minutes = leadingZero(dateObj.getMinutes())
  const seconds = leadingZero(dateObj.getSeconds())
  // TODO: timezone
  // const timezone = dateObj?.toTimeString()?.match(/\((.+)\)/)?.[1] || 'UTC'
  const formattedDate = dateOnly ?
    `${month}/${day}/${year}` :
    // `${month}/${day}/${year} ${hours}:${minutes} (${timezone})`
    `${month}/${day}/${year} ${hours}:${minutes}`
  return formattedDate
}