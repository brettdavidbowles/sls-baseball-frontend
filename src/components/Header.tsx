import Link from "next/link"
import { useRouter } from 'next/router'
import Hamburger from "./Hamburger"

interface Props {
  toggleSlider: Function,
  collapsed: boolean
}

export default function Header(props: Props) {
  const toggleSlider = () => {
    props.toggleSlider()
  }
  const router = useRouter()
  const content = () => {
    return (
      <div className="w-full">
        <div className="relative w-full">
          <div className={`py-5 transition-translate duration-500 absolute ${props.collapsed ? 'translate-x-0' : 'translate-x-1/2 -mx-24'} w-full`}>
            <Link href="/">
              <h1>Baseball Simulator</h1>
            </Link>
          </div>
          <Hamburger handleClick={toggleSlider} />
        </div>
      </div>
    )
  }

  return (
    <div
      id='header'
      className="relative h-8"
    >
      <div className="fixed z-10 flex justify-end bg-bb-dark-blue w-full py-1 px-4">
        {content()}
      </div>
    </div>
  )
}
