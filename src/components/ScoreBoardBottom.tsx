import ScoreBoardFinalData from "./ScoreBoardFinalData"
import ScoreBoardPitchCount from "./ScoreBoardPitchCount"

interface ScoreBoardBottomProps {
  balls?: number,
  strikes?: number,
  outs?: number,
  totalInnings?: number,
}


export default function ScoreBoardBottom(props: ScoreBoardBottomProps) {
  if (props.totalInnings) {
    return <ScoreBoardFinalData totalInnings={props.totalInnings} />
  } else if (props.balls && props.strikes && props.outs) {
    return (
      <ScoreBoardPitchCount
        balls={props.balls}
        strikes={props.strikes}
        outs={props.outs}
      />
    )
  }
  return (<div></div>)
}