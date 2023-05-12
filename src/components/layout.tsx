import { selectIsMobile, setIsMobile } from 'store/windowSlice'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar'
import Slider from './Slider'

const links = [
  { href: '/', text: 'Home' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useSelector(selectIsMobile)
  const dispatch = useDispatch()
  const slider = useRef<HTMLDivElement>(null)
  const [showSlider, setShowSlider] = useState(false)
  const toggleSlider = () => {
    setShowSlider(!showSlider)
  }

  useEffect(() => {
    if (!showSlider) return;
    const handleClick = (event: React.PointerEvent<HTMLElement>) => {
      if (slider.current && !slider?.current.contains(event.target as Node)) {
        setShowSlider(false);
      }
    }
    window.addEventListener("click", () => handleClick);
    return () => window.removeEventListener("click", () => handleClick);
  }, [showSlider]);

  useEffect(() => {
    const isMobile = window?.innerWidth < 768
    dispatch(setIsMobile(isMobile))
    const handleWindowResize = () => {
      if (window?.innerWidth < 768 && isMobile) return
      if (window?.innerWidth >= 768 && !isMobile) return
      dispatch(setIsMobile(window?.innerWidth < 768))
    }
    window?.addEventListener('resize', handleWindowResize)
    return () => {
      window?.removeEventListener('resize', handleWindowResize)
    }
  }, [isMobile, dispatch])

  return (
    <div className='w-full layout'>
      <div ref={slider}>
        <Navbar toggleSlider={toggleSlider} />
        <Slider
          isMobile={isMobile}
          links={links}
          showSlider={showSlider} />
      </div>
      {children}
    </div >
  )
}