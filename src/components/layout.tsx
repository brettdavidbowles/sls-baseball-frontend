import { selectIsMobile, setIsMobile } from 'store/windowSlice'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import Header from './Header'
import Slider from './Slider'
import { useRouter } from 'next/router'
import { privateRoutes } from 'constants/privateRoutes.js'
import { useMutation, useQuery } from "@apollo/client"
import { LogoutMutation } from 'gql/mutations/Logout.gql'
import { GetAuth } from 'gql/queries/GetAuth.gql'


export default function Layout({ children }: { children: React.ReactElement<any> }) {
  const router = useRouter()
  const isMobile = useSelector(selectIsMobile)
  const dispatch = useDispatch()
  const slider = useRef<HTMLDivElement>(null)
  const [showSlider, setShowSlider] = useState(false)
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [collapseHeader, setCollapseHeader] = useState(true)
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
    const { data } = await logoutMutation()
    if (data.logout && privateRoutes.includes(router.asPath)) {
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
  useEffect(() => {
    refetch()
  }, [router.asPath, refetch])

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

  const callbackFunction = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) setCollapseHeader(false)
      if (!entry.isIntersecting) setCollapseHeader(true)
    })
  }

  useEffect(() => {
    if (!document) return
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

  return (
    <div className='w-full layout'>
      <div ref={slider}>
        <Header
          collapsed={collapseHeader}
          toggleSlider={toggleSlider}
        />
        <Slider
          isMobile={isMobile}
          links={links}
          showSlider={showSlider}
          closeSlider={closeSlider}
          headerCollapsed={collapseHeader}
        />
      </div>
      <div className={`fixed top-0 w-full transition-all duration-500 ${collapseHeader ? 'h-20' : 'h-36'} header-gradient`} />
      <p className={`fixed top-0 transition-all duration-500 ${collapseHeader ? 'pt-7' : 'pt-24'} ${collapseHeader && isMobile ? 'opacity-0' : 'opacity-100'} w-full text-center`}>
        An interactive baseball simulator.
      </p>
      <div id="obdiv" className='h-8 absolute top-0'></div>
      <div className='pt-36 px-4'>
        {children}
        {/* {
          React.cloneElement(children, {
            isLoggedIn: isLoggedIn
          })
        } */}
      </div>
    </div>
  )
}