import { selectIsMobile, setIsMobile } from 'store/windowSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { GetLoginState } from "gql/queries/GetLoginState.gql"
import { useQuery } from "@apollo/client"

export default function Layout({ children }: { children: React.ReactNode }) {
  // const { data } = useQuery(GetLoginState)
  // console.log('auth', data)
  const isMobile = useSelector(selectIsMobile)
  const dispatch = useDispatch()
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

  // const isLoggedIn = useRef<boolean>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const auth = localStorage.getItem('auth')
      if (auth) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }
    const checkAuth = () => {
      const auth = localStorage.getItem('auth')
      if (auth) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }
    window?.addEventListener('storage', checkAuth)
    return () => {
      window?.removeEventListener('storage', checkAuth)
    }
  }, [isLoggedIn])

  return (
    <div className='w-full layout'>
      <Navbar isLoggedIn={isLoggedIn} />
      {children}
    </div >
  )
}