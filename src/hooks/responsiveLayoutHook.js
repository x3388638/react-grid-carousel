import { useEffect, useCallback, useState, useMemo } from 'react'
import { addResizeHandler, removeResizeHandler } from '../utils/resizeListener'

const useResponsiveLayout = (breakpointList = []) => {
  const [currentBreakpointSetting, setCurrentBreakpointSetting] = useState()
  const random = useMemo(() => `${Math.random()}-${Math.random()}`, [])

  const sortedBreakpointList = useMemo(
    () =>
      [...breakpointList].sort(
        (a, b) => (b.breakpoint || 0) - (a.breakpoint || 0)
      ),
    [breakpointList]
  )

  const handleResize = useCallback(() => {
    const windowWidth = window.innerWidth
    let matchedSetting

    sortedBreakpointList.find(setting => {
      if (windowWidth <= setting.breakpoint) {
        matchedSetting = setting
      } else {
        return true
      }
    })

    setCurrentBreakpointSetting(matchedSetting)
  }, [sortedBreakpointList])

  useEffect(() => {
    if (breakpointList.length) {
      handleResize()
      addResizeHandler(`responsiveLayout-${random}`, handleResize)

      return () => {
        removeResizeHandler(`responsiveLayout-${random}`)
      }
    }
  }, [breakpointList, handleResize, random])

  return currentBreakpointSetting
}

export default useResponsiveLayout
