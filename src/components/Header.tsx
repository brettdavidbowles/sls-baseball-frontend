import Link from "next/link"
import { useRouter } from 'next/router'
import Hamburger from "./Hamburger"

interface Props {
  toggleSlider: Function,
  collapsed: boolean,
  isMobile: boolean
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
          <div className={`py-5 z-20 transition-translate duration-500 -mx-24 absolute ${props.collapsed ? 'translate-x-24' : 'translate-x-1/2'} w-full`}>

            <h1><Link href="/">Baseball Simulator</Link></h1>

          </div>
          <Hamburger handleClick={toggleSlider} />
          <div className={`fixed top-0 left-0 w-full transition-all duration-500 ${props.collapsed ? 'h-20' : 'h-36'} header-gradient`} />
          <div className={`fixed top-0 left-0 transition-all duration-500 ${props.collapsed ? 'pt-7' : 'pt-24'} ${props.collapsed && props.isMobile ? 'opacity-0' : 'opacity-100'} w-full`}>
            <p className={`transition-all duration-500 ${props.collapsed && props.isMobile ? 'opacity-0' : 'opacity-100'} w-full text-center`}>
              An interactive baseball simulator.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      id='header'
      className="relative h-8"
    >
      <div className="fixed z-10 flex justify-end bg-bb-black w-full py-1 px-4">
        {content()}
      </div>
    </div>
  )
}
