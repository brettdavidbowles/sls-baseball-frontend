import Link from "next/link"
import { useRouter } from 'next/router'
import Hamburger from "./Hamburger"
import { useMemo } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { selectIsMobile, setIsMobile } from 'store/windowSlice'
import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { useMutation, useQuery } from "@apollo/client"
import { LogoutMutation } from 'gql/mutations/Logout.gql'
import { GetAuth } from 'gql/queries/GetAuth.gql'
import { privateRoutes } from 'constants/privateRoutes.js'
import Slider from './Slider'

export default function Header() {
  const router = useRouter()
  const isMobile = useSelector(selectIsMobile)
  const dispatch = useDispatch()
  const slider = useRef<HTMLDivElement>(null)
  const [showSlider, setShowSlider] = useState(false)
  const [collapseHeader, setCollapseHeader] = useState(router.asPath !== '/')

  const { loading, error, data, refetch } = useQuery(GetAuth)

  const [logoutMutation] = useMutation(LogoutMutation, {
    update(cache, { data: { logout } }) {
      if (logout) {
        cache.modify({
          fields: {
            auth() {
              return null
            }
          }
        })
      }
    }
  })
  const logout = async () => {
    console.log(router)
    const { data } = await logoutMutation()
    if (data.logout && privateRoutes.includes(router.pathname)) {
      router.push('/')
    }
    // error handling?
    setTimeout(() => {
      closeSlider()
    }, 300)
  }
  const links =
    data?.auth?.id
      ? [
        { href: '/', text: 'Home' },
        { href: '/profile', text: 'Profile' },
        { onClick: logout, text: 'Logout' }
      ]
      : [
        { href: '/', text: 'Home' },
        { href: '/login', text: 'Login' }
      ]

  const toggleSlider = () => {
    setShowSlider(!showSlider)
  }
  const closeSlider = () => {
    setShowSlider(false)
  }

  useLayoutEffect(() => {
    if (router.asPath !== '/') {
      setCollapseHeader(true)
    }
    // if (collapseHeader) {
    //   if (window.pageYOffset < 64) {
    //     window.scrollTo(0, 64)
    //   }
    // }
    refetch()
  }, [router.asPath, refetch, collapseHeader])
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
  const hideSubtitle = useMemo(() => {
    return collapseHeader && isMobile
  }, [collapseHeader, isMobile])

  useLayoutEffect(() => {
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

  const callbackFunction = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) setCollapseHeader(false)
      if (!entry.isIntersecting) setCollapseHeader(true)
    })
  }

  useLayoutEffect(() => {
    if (!document || router.asPath !== '/') return
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }
    const observer = new IntersectionObserver(callbackFunction, options)
    const target = document?.querySelector('#obdiv')
    if (target) {
      observer.observe(target)
    }
    return () => {
      if (target) {
        observer.unobserve(target)
        observer.disconnect()
      }
    }
  })

  const content = () => {
    return (
      <div className="relative w-full">
        <div className={`py-5 z-20 transition-all duration-500 -mx-24 absolute ${collapseHeader ? 'translate-x-24' : 'translate-x-1/2'} w-full`}>

          <h1><Link href="/">Baseball Simulator</Link></h1>

        </div>
        <Hamburger handleClick={toggleSlider} />
        <div className={`fixed top-0 left-0 w-full transition-all duration-500 ${collapseHeader ? 'h-20' : 'h-36'} header-gradient`} />
        <div className={`fixed top-0 left-0 transition-all duration-500 ${collapseHeader ? 'pt-7' : 'pt-24'} w-full`}>
          <p className={`transition-all duration-500 ${hideSubtitle ? 'opacity-0' : 'opacity-100'} w-full text-center`}>
            An interactive baseball simulator.
          </p>
        </div>
        <Slider
          isMobile={isMobile}
          links={links}
          showSlider={showSlider}
          closeSlider={closeSlider}
          headerCollapsed={collapseHeader}
        />
      </div>
    )
  }

  return (
    <div
      id='header'
      className="relative h-8"
      ref={slider}
    >
      <div id="obdiv" className='h-1 absolute top-0' />
      <div className="fixed z-10 flex justify-end bg-bb-black w-full py-1 px-4">
        {content()}
      </div>
    </div>
  )
}
