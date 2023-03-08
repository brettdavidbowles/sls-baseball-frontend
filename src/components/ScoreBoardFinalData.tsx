

export default function ScoreBoardFinalData({ totalInnings }: { totalInnings: number }) {
  return (
    <div className='px-4 flex justify-between w-full'>
      <span>TOTAL INNINGS: {totalInnings}</span>
    </div>
  )
}