import Link from "next/link"
import { useRouter } from 'next/router'
import Hamburger from "./Hamburger"

interface Props {
  toggleSlider: Function,
}

export default function Navbar(props: Props) {
  const toggleSlider = () => {
    props.toggleSlider()
  }
  const router = useRouter()
  const content = () => {
    return (
      <div className="flex justify-end w-full">
        <Link href="/"
          className="text-left w-full"
        >
          Home
        </Link>
        <Hamburger handleClick={toggleSlider} />
      </div>
    )
    // }
  }

  return (
    <div className="relative h-8">
      <div className="fixed flex justify-end bg-green-700 w-full z-50 py-1 px-4 h-8">
        {content()}
      </div>
    </div>
  )
}
