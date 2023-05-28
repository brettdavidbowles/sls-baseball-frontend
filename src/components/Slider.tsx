import Link from "next/link"
import { useMemo } from "react"

interface linkObject {
  text: string
  href: string
}
interface functionObject {
  text: string,
  onClick: Function
}

interface Props {
  showSlider: boolean
  links: (linkObject | functionObject)[]
  isMobile: boolean
  closeSlider: Function
  headerCollapsed: boolean
}

const isLinkObject = (link: linkObject | functionObject): link is linkObject => {
  return (link as linkObject).href !== undefined
}

export default function Slider(props: Props) {
  const dimensions = useMemo(() => {
    if (props.isMobile) {
      return props.showSlider ? 'visible w-full h-full' : 'invisible w-full h-0'
    } else {
      return props.showSlider ? 'visible w-64 h-full' : 'invisible w-0 h-full'
    }
  }, [props.isMobile, props.showSlider])
  return (
    <div className='relative' >
      <div className={`fixed z-50 right-0 ${props.headerCollapsed ? 'top-20' : 'top-36'} transition-all duration-500 ${props.isMobile ? 'bg-bb-teal' : 'slider-gradient'} ${dimensions}`} >
        {props.links.map((link) => {
          if (isLinkObject(link)) {
            return (
              <Link
                className={`block w-full p-8 text-xl hover:text-bb-tan transition-all duration-300 ${props.isMobile ? 'text-center' : 'text-right'} ${props.showSlider ? 'opacity-100' : 'opacity-0'}`}
                href={link.href}
                key={link.href}
                onClick={() => props.closeSlider()}
              >
                {link.text}
              </Link>
            )
          } else {
            return (
              <button
                className={`block w-full p-8 text-xl hover:text-bb-tan transition-all duration-300 ${props.isMobile ? 'text-center' : 'text-right'} ${props.showSlider ? 'opacity-100' : 'opacity-0'}`}
                onClick={() => link.onClick()}
                key={link.text}
              >
                {link.text}
              </button>
            )

          }
        })}
      </div>
    </div>
  )
}