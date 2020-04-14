import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ArrowButton from './ArrowButton'
import Dot from './Dot'
import smoothscroll from 'smoothscroll-polyfill'
import useResponsiveLayout from '../hooks/responsiveLayoutHook'
import { addResizeHandler, removeResizeHandler } from '../utils/resizeListener'

const Container = styled.div`
  position: relative;
`

const RailWrapper = styled.div`
  overflow: hidden;
  margin: ${({ showDots }) => (showDots ? '0 20px 15px 20px' : '0 20px')};

  @media screen and (max-width: ${({ mobileBreakpoint }) =>
      mobileBreakpoint}px) {
    overflow-x: auto;
    margin: 0;
    scroll-snap-type: ${({ scrollSnap }) => (scrollSnap ? 'x mandatory' : '')};
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const Rail = styled.div`
  display: grid;
  grid-column-gap: ${({ gap }) => `${gap}px`};
  position: relative;
  transition: transform 0.5s cubic-bezier(0.2, 1, 0.3, 1) 0s;
  grid-template-columns: ${({ page }) => `repeat(${page}, 100%)`};
  transform: ${({ currentPage, gap }) =>
    `translateX(calc(${-100 * currentPage}% - ${gap * currentPage}px))`};

  @media screen and (max-width: ${({ mobileBreakpoint }) =>
      mobileBreakpoint}px) {
    padding-left: ${({ gap }) => `${gap}px`};
    grid-template-columns: ${({ page }) => `repeat(${page}, 90%)`};
    grid-column-gap: ${({ cols, rows, gap }) =>
      `calc(${(cols * rows - 1) * 90}% + ${cols * rows * gap}px)`};
    transform: translateX(0);
  }
`

const ItemSet = styled.div`
  display: grid;
  grid-template-columns: ${({ cols }) => `repeat(${cols}, 1fr)`};
  grid-template-rows: ${({ rows }) => `repeat(${rows}, 1fr)`};
  grid-gap: ${({ gap }) => `${gap}px`};

  @media screen and (max-width: ${({ mobileBreakpoint }) =>
      mobileBreakpoint}px) {
    grid-template-columns: ${({ cols, rows }) =>
      `repeat(${cols * rows}, 100%)`};
    grid-template-rows: 1fr;

    &:last-of-type > ${/* sc-sel */ Item}:last-of-type {
      padding-right: ${({ gap }) => `${gap}px`};
      margin-right: ${({ gap }) => `-${gap}px`};
    }
  }
`

const Dots = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: -12px;
  height: 10px;
  width: 100%;
  line-height: 10px;
  text-align: center;

  @media screen and (max-width: ${({ mobileBreakpoint }) =>
      mobileBreakpoint}px) {
    display: none;
  }
`

const Item = styled.div`
  scroll-snap-align: ${({ scrollSnap }) => (scrollSnap ? 'center' : '')};
`

const CAROUSEL_ITEM = 'CAROUSEL_ITEM'
const Carousel = ({
  cols: colsProp = 1,
  rows: rowsProp = 1,
  gap: gapProp = 10,
  loop: loopProp = false,
  scrollSnap = true,
  hideArrow = false,
  showDots = false,
  autoplay: autoplayProp,
  dotColorActive = '#795548',
  dotColorInactive = '#ccc',
  responsiveLayout,
  mobileBreakpoint = 767,
  arrowLeft,
  arrowRight,
  dot,
  containerClassName = '',
  containerStyle = {},
  children
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isHover, setIsHover] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const [cols, setCols] = useState(colsProp)
  const [rows, setRows] = useState(rowsProp)
  const [gap, setGap] = useState(0)
  const [loop, setLoop] = useState(loopProp)
  const [autoplay, setAutoplay] = useState(autoplayProp)
  const [railWrapperWidth, setRailWrapperWidth] = useState(0)
  const [hasSetResizeHandler, setHasSetResizeHandler] = useState(false)
  const railWrapperRef = useRef(null)
  const autoplayIntervalRef = useRef(null)
  const breakpointSetting = useResponsiveLayout(responsiveLayout)
  const randomKey = useMemo(() => `${Math.random()}-${Math.random()}`, [])

  useEffect(() => {
    smoothscroll.polyfill()
  }, [])

  useEffect(() => {
    const { cols, rows, gap, loop, autoplay } = breakpointSetting || {}
    setCols(cols || colsProp)
    setRows(rows || rowsProp)
    setGap(parseGap(gap || gapProp))
    setLoop(loop || loopProp)
    setAutoplay(autoplay || autoplayProp)
    setCurrentPage(0)
  }, [
    breakpointSetting,
    colsProp,
    rowsProp,
    gapProp,
    loopProp,
    autoplayProp,
    parseGap
  ])

  const handleRailWrapperResize = useCallback(() => {
    railWrapperRef.current &&
      setRailWrapperWidth(railWrapperRef.current.offsetWidth)
  }, [railWrapperRef])

  const setResizeHandler = useCallback(() => {
    addResizeHandler(`gapCalculator-${randomKey}`, handleRailWrapperResize)
    setHasSetResizeHandler(true)
  }, [randomKey, handleRailWrapperResize])

  const rmResizeHandler = useCallback(() => {
    removeResizeHandler(`gapCalculator-${randomKey}`)
    setHasSetResizeHandler(false)
  }, [randomKey])

  const parseGap = useCallback(
    gap => {
      let parsed = gap
      let shouldSetResizeHandler = false

      if (typeof gap !== 'number') {
        switch (/\D*$/.exec(gap)[0]) {
          case 'px': {
            parsed = +gap.replace('px', '')
            break
          }
          case '%': {
            let wrapperWidth =
              railWrapperWidth || railWrapperRef.current
                ? railWrapperRef.current.offsetWidth
                : 0

            parsed = (wrapperWidth * gap.replace('%', '')) / 100
            shouldSetResizeHandler = true
            break
          }
          default: {
            parsed = 0
            console.error(
              `Doesn't support the provided measurement unit: ${gap}`
            )
          }
        }
      }

      shouldSetResizeHandler && !hasSetResizeHandler && setResizeHandler()
      !shouldSetResizeHandler && hasSetResizeHandler && rmResizeHandler()
      return parsed
    },
    [
      railWrapperWidth,
      railWrapperRef,
      hasSetResizeHandler,
      setResizeHandler,
      rmResizeHandler
    ]
  )

  const itemList = useMemo(
    () =>
      React.Children.toArray(children).filter(
        child => child.type.displayName === CAROUSEL_ITEM
      ),
    [children]
  )

  const itemAmountPerSet = cols * rows
  const itemSetList = useMemo(
    () =>
      itemList.reduce((result, item, i) => {
        const itemComponent = (
          <Item key={i} scrollSnap={scrollSnap}>
            {item}
          </Item>
        )

        if (i % itemAmountPerSet === 0) {
          result.push([itemComponent])
        } else {
          result[result.length - 1].push(itemComponent)
        }

        return result
      }, []),
    [itemList, itemAmountPerSet, scrollSnap]
  )

  const page = Math.ceil(itemList.length / itemAmountPerSet)

  const handlePrev = useCallback(() => {
    setCurrentPage(p => {
      const prevPage = p - 1
      if (loop && prevPage < 0) {
        return page - 1
      }

      return prevPage
    })
  }, [loop, page])

  const handleNext = useCallback(
    (isMobile = false) => {
      const railWrapper = railWrapperRef.current
      if (isMobile && railWrapper) {
        if (!scrollSnap) {
          return
        }

        const { scrollLeft, offsetWidth, scrollWidth } = railWrapper
        railWrapper.scrollBy({
          top: 0,
          left:
            loop && scrollLeft + offsetWidth >= scrollWidth
              ? -scrollLeft
              : scrollLeft === 0
              ? gap +
                (offsetWidth - gap) * 0.9 -
                (offsetWidth * 0.1 - gap * 1.1) / 2
              : (offsetWidth - gap) * 0.9 + gap,
          behavior: 'smooth'
        })
      } else {
        setCurrentPage(p => {
          const nextPage = p + 1
          if (nextPage >= page) {
            return loop ? 0 : p
          }

          return nextPage
        })
      }
    },
    [loop, page, gap, railWrapperRef, scrollSnap]
  )

  const startAutoplayInterval = useCallback(() => {
    if (autoplayIntervalRef.current === null && typeof autoplay === 'number') {
      autoplayIntervalRef.current = setInterval(() => {
        handleNext(window.innerWidth <= mobileBreakpoint)
      }, autoplay)
    }
  }, [autoplay, autoplayIntervalRef, handleNext, mobileBreakpoint])

  useEffect(() => {
    startAutoplayInterval()

    return () => {
      if (autoplayIntervalRef.current !== null) {
        clearInterval(autoplayIntervalRef.current)
        autoplayIntervalRef.current = null
      }
    }
  }, [startAutoplayInterval, autoplayIntervalRef])

  useEffect(() => {
    if (isHover || isTouch) {
      clearInterval(autoplayIntervalRef.current)
      autoplayIntervalRef.current = null
    } else {
      startAutoplayInterval()
    }
  }, [isHover, isTouch, autoplayIntervalRef, startAutoplayInterval])

  const turnToPage = useCallback(page => {
    setCurrentPage(page)
  }, [])

  const handleHover = useCallback(() => {
    setIsHover(hover => !hover)
  }, [])

  const handleTouch = useCallback(() => {
    setIsTouch(touch => !touch)
  }, [])

  return (
    <Container
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      onTouchStart={handleTouch}
      onTouchEnd={handleTouch}
      className={containerClassName}
      style={containerStyle}
    >
      <ArrowButton
        type="prev"
        mobileBreakpoint={mobileBreakpoint}
        hidden={hideArrow || (!loop && currentPage <= 0)}
        CustomBtn={arrowLeft}
        onClick={handlePrev}
      />
      <RailWrapper
        mobileBreakpoint={mobileBreakpoint}
        scrollSnap={scrollSnap}
        showDots={showDots}
        ref={railWrapperRef}
      >
        <Rail
          cols={cols}
          rows={rows}
          page={page}
          gap={gap}
          currentPage={currentPage}
          mobileBreakpoint={mobileBreakpoint}
        >
          {itemSetList.map((set, i) => (
            <ItemSet
              key={i}
              cols={cols}
              rows={rows}
              gap={gap}
              mobileBreakpoint={mobileBreakpoint}
            >
              {set}
            </ItemSet>
          ))}
        </Rail>
      </RailWrapper>
      {showDots && (
        <Dots mobileBreakpoint={mobileBreakpoint}>
          {[...Array(page)].map((_, i) => (
            <Dot
              key={i}
              index={i}
              isActive={i === currentPage}
              dotColorInactive={dotColorInactive}
              dotColorActive={dotColorActive}
              dot={dot}
              onClick={turnToPage}
            />
          ))}
        </Dots>
      )}
      <ArrowButton
        type="next"
        mobileBreakpoint={mobileBreakpoint}
        hidden={hideArrow || (!loop && currentPage === page - 1)}
        CustomBtn={arrowRight}
        onClick={handleNext.bind(null, false)}
      />
    </Container>
  )
}

const positiveNumberValidator = (props, propName, componentName) => {
  const prop = props[propName]
  if ((prop !== undefined && typeof prop !== 'number') || prop <= 0) {
    return new Error(
      `Invalid prop \`${propName}\`: ${props[propName]} supplied to \`${componentName}\`. expected positive \`number\``
    )
  }
}

Carousel.propTypes = {
  cols: positiveNumberValidator,
  rows: positiveNumberValidator,
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  loop: PropTypes.bool,
  scrollSnap: PropTypes.bool,
  hideArrow: PropTypes.bool,
  showDots: PropTypes.bool,
  autoplay: PropTypes.number,
  dotColorActive: PropTypes.string,
  dotColorInactive: PropTypes.string,
  responsiveLayout: PropTypes.arrayOf(
    PropTypes.shape({
      breakpoint: PropTypes.number.isRequired,
      cols: positiveNumberValidator,
      rows: positiveNumberValidator,
      gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      loop: PropTypes.bool,
      autoplay: PropTypes.number
    })
  ),
  mobileBreakpoint: PropTypes.number,
  arrowLeft: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType
  ]),
  arrowRight: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType
  ]),
  dot: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType
  ]),
  containerClassName: PropTypes.string,
  containerStyle: PropTypes.object
}

Carousel.Item = ({ children }) => children
Carousel.Item.displayName = CAROUSEL_ITEM
export default Carousel
