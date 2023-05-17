import * as React from 'react'
import ScoreBoardBottom from './ScoreBoardBottom'

interface PitchCount {
  balls: number,
  strikes: number
}

interface ScoreBoardProps {
  visitorScores: number[],
  homeScores: number[],
  pitchCount?: PitchCount,
  outs?: number,
  visitorHits: number,
  homeHits: number,
  totalInnings?: number,
  visitorErrors: number,
  homeErrors: number,
  visitorName: string,
  homeName: string,
}
const tableHeaders: JSX.Element[] = []
for (let i = 1; i < 10; i++) {
  tableHeaders.push(
    <th key={`header-${i}`}>
      {i}
    </th>
  )
}
const makeNineInnings = (scores: number[]) => {
  const newScores = [...scores]
  newScores.length = 9
  return newScores
}

const abbreviateName = (name: string) => {
  return name?.split(' ')[0]
}


export class ScoreBoard extends React.Component<ScoreBoardProps>{
  constructor(props: ScoreBoardProps) {
    super(props)
  }
  render() {
    return (
      <div>
        <div className='p-2'>
          <div className="m-1 p-2 border-4 scoreboard overflow-auto">
            {/* {this.props.teamOne} */}
            <table>
              <thead>
                <tr>
                  <td>&nbsp;</td>
                  {tableHeaders}
                  <th>
                    EI
                  </th>
                  <td>&nbsp;</td>
                  <th>
                    R
                  </th>
                  <th>
                    H
                  </th>
                  <th>
                    E
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* move these to another component */}
                  <th className='px-2 text-left'>
                    {abbreviateName(this.props.visitorName)}
                  </th>
                  {
                    makeNineInnings(this.props.visitorScores).map((score, index) => (
                      <td key={`vistor-score-inning-${index}`}>
                        {score}
                      </td>
                    ))
                  }
                  <td>
                    {
                      this.props.visitorScores.slice(9).reduce((a, b) => a + b, 0)
                    }
                  </td>
                  <td>&nbsp;</td>
                  <td>
                    {this.props.visitorScores.reduce((a, b) => a + b, 0)}
                  </td>
                  <td>
                    {this.props.visitorHits}
                  </td>
                  <td>
                    {this.props.visitorErrors}
                  </td>
                </tr>
                <tr>
                  <th className='px-2 text-left'>
                    {abbreviateName(this.props.homeName)}
                  </th>
                  {
                    makeNineInnings(this.props.homeScores).map((score, index) => (
                      <td key={`vistor-score-inning-${index}`}>
                        {score}
                      </td>
                    ))
                  }
                  <td>
                    {
                      this.props.homeScores.slice(9).reduce((a, b) => a + b, 0)
                    }
                  </td>
                  <td>&nbsp;</td>
                  <td>
                    {this.props.homeScores.reduce((a, b) => a + b, 0)}
                  </td>
                  <td>
                    {this.props.homeHits}
                  </td>
                  <td>
                    {this.props.homeErrors}
                  </td>
                </tr>

              </tbody>
            </table>
            <ScoreBoardBottom totalInnings={this.props.totalInnings} />
          </div>
        </div>
      </div>
    )
  }
}
