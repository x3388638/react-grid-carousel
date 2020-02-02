import { useEffect, useCallback, useState, useMemo } from 'react'
import debounce from 'lodash.debounce'

const useResize = (breakpointList = []) => {
  const [currentBreakpointSetting, setCurrentBreakpointSetting] = useState()

  const sortedBreakpointList = useMemo(
    () =>
      [...breakpointList].sort(
        (a, b) => (b.breakpoint || 0) - (a.breakpoint || 0)
      ),
    [breakpointList]
  )

  const handleResize = useCallback(
    debounce(() => {
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
    }, 250),
    [sortedBreakpointList]
  )

  useEffect(() => {
    if (breakpointList.length) {
      handleResize()
      window.addEventListener('resize', handleResize)

      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [breakpointList, handleResize])

  return currentBreakpointSetting
}

export default useResize
