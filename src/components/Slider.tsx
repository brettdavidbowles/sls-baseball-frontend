import Link from "next/link"
import { useMemo } from "react"

interface linkObject {
  href: string,
  text: string
}

interface Props {
  showSlider: boolean
  links: linkObject[]
  isMobile: boolean
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
      <div className={`fixed z-50 right-0 overflow-y-hidden transition-all duration-500 bg-green-700 ${dimensions}`} >
        {props.links.map((link: linkObject) => (
          <Link
            className={`block w-full p-8 ${props.isMobile ? 'text-center' : 'text-right'} text-xl hover:text-black}`}
            href={link.href}
            key={link.href}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  )
}