import { dateObj } from "types/types";
import { formatDateTime } from "utils/formatDateTime";
import { useEffect, useState } from "react";

export default function DateTime({ dateTime }: { dateTime: string }) {
  const [dateObj, setDateObj] = useState<dateObj>({ date: '', time: '', timezone: '' })
  useEffect(() => {
    setDateObj(formatDateTime(dateTime))
  }, [dateTime])

  const { date, time, timezone }: dateObj = dateObj

  const dateTimeComponent = () => {
    if (!dateObj?.date) {
      return (
        <div className="flex flex-col py-2">
          <div className="h-6" />
          <div className="h-6" />
        </div>
      )
    }
    return (

      <div className="flex flex-col py-2">
        <div className="h-6">
          {date}
        </div>
        <div className="h-6">
          {`${time} (${timezone})`}
        </div>
      </div>
    )
  }

  return (
    dateTimeComponent()
  );
}