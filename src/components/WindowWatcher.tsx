import { selectIsMobile, setIsMobile } from 'store/windowSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export default function WindowWatcher() {
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
  return (
    <div></div>
  )
}