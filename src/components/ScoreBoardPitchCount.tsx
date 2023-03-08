interface ScoreBoardPitchCountProps {
  balls: number,
  strikes: number,
  outs: number
}

export default function ScoreBoardPitchCount(props: ScoreBoardPitchCountProps) {
  return (
    <div className='px-4 flex justify-between w-full'>
      <span>
        BALLS: {props.balls}
      </span>
      <span>
        STRIKES: {props.strikes}
      </span>
      <span>
        OUTS: {props.outs}
      </span>
    </div>
  )
}