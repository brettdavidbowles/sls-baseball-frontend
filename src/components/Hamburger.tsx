import { useState } from 'react'

interface Props {
  handleClick: Function,
}

export default function Hamburger(props: Props) {
  const handleClick = () => {
    props.handleClick()
  }
  return (
    <button className="absolute right-2 top-5 z-20" onClick={handleClick}>
      <section className="flex flex-col justify-around h-7 py-0.5">
        <div className="w-6 h-0.5 bg-bb-tan rounded" />
        <div className="w-6 h-0.5 bg-bb-tan rounded" />
        <div className="w-6 h-0.5 bg-bb-tan rounded" />
      </section>
    </button>
  )
}