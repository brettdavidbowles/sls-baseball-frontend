import { selectIsMobile, setIsMobile } from 'store/windowSlice'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState, useRef } from 'react'
import Navbar from './Navbar'
import Slider from './Slider'
import { useRouter } from 'next/router'

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const isMobile = useSelector(selectIsMobile)
  const dispatch = useDispatch()
  const slider = useRef<HTMLDivElement>(null)
  const [showSlider, setShowSlider] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const loginUrl = process.env.NEXT_PUBLIC_ENV === 'development' ? 'http://localhost:8000/login/' : `${process.env.NEXT_PUBLIC_BASE_URL}/login/`

  const checkAuth = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, {
      method: "GET"
    })
    const { data } = await response.json()
    setIsLoggedIn(!!data?.auth?.id)
  }

  const logout = async () => {
    const response = await fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    })
    const data = await response.json()
    // error handling?
    checkAuth()

    setTimeout(() => {
      closeSlider()
    }, 300)
  }

  const links = isLoggedIn
    ? [
      { href: '/', text: 'Home' },
      { onClick: logout, text: 'Logout' }
    ]
    : [
      { href: '/', text: 'Home' },
      { href: loginUrl, text: 'Login' }
    ]

  const toggleSlider = () => {
    setShowSlider(!showSlider)
  }
  const closeSlider = () => {
    setShowSlider(false)
  }
  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (!showSlider) return;
    const handleClick = (event: MouseEvent) => {
      if (slider.current && !slider?.current.contains(event.target as Node)) {
        setShowSlider(false);
      }
    }
    window.addEventListener("click", handleClick);
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener("click", handleClick);
      document.body.style.overflow = 'unset'
    }
  }, [showSlider, isMobile]);

  // possbily remove this
  useEffect(() => {
    if (showSlider) {
      setShowSlider(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

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
          showSlider={showSlider}
          closeSlider={closeSlider}
        />
      </div>
      {children}
    </div>
  )
}