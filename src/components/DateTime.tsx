import { dateObj } from "types/types";
import { formatDateTime } from "utils/formatDateTime";

export default function DateTime({ dateTime }: { dateTime: string }) {
  const { date, time, timezone }: dateObj = formatDateTime(dateTime)
  return (
    <div className="flex flex-col py-2">
      <div>
        {date} {time}
      </div>
      <div>({timezone})</div>
    </div>
  );
}