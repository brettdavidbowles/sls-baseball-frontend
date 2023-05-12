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
  // make these ternaries based on showslider and if else on ismobile
  const dimensions = useMemo(() => {
    if (props.showSlider) {
      return props.isMobile ? 'w-full h-full' : 'w-64 h-full'
    } else {
      return props.isMobile ? 'w-full h-0' : 'w-0 h-full'
    }
  }, [props.isMobile, props.showSlider])
  return (
    <div className='relative' >

      <span>{!!props.showSlider}</span>
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