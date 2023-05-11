import { useState } from 'react'

interface Props {
  handleClick: Function,
}

export default function Hamburger(props: Props) {
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  const handleClick = () => {
    props.handleClick()
  }
  return (
    <button onClick={handleClick}>
      <section className="flex flex-col justify-around h-full py-0.5">
        <div className="w-6 h-0.5 bg-white rounded" />
        <div className="w-6 h-0.5 bg-white rounded" />
        <div className="w-6 h-0.5 bg-white rounded" />
      </section>
    </button>
  )
}