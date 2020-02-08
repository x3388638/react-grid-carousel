import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useResize from '../hooks/resizeHook'
const css = require('styled-components').css

const Container = styled.div`
  position: relative;
`

const NextBtn = styled.span`
  position: absolute;
  top: calc(50% - 17.5px);
  height: 35px;
  width: 35px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 5px 0px #0009;
  z-index: 10;
  cursor: pointer;
  font-size: 10px;
  opacity: 0.6;
  transition: opacity 0.25s;
  left: ${({ type }) => (type === 'prev' ? '5px' : 'initial')};
  right: ${({ type }) => (type === 'next' ? '5px' : 'initial')};

  &:hover {
    opacity: 1;
  }

  &::before {
    content: '';
    height: 10px;
    width: 10px;
    background: transparent;
    border-top: 2px solid #000;
    border-right: 2px solid #000;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${({ type }) =>
      type === 'prev'
        ? 'translate(-25%, -50%) rotate(-135deg)'
        : 'translate(-75%, -50%) rotate(45deg)'};
  }

  ${({ mobileBreakpoint }) => css`
    @media screen and (max-width: ${mobileBreakpoint}px) {
      display: none;
    }
  `}
`

const RailWrapper = styled.div`
  overflow: hidden;
  margin: ${({ showDots }) => (showDots ? '0 20px 15px 20px' : '0 20px')};

  ${({ mobileBreakpoint }) => css`
    @media screen and (max-width: ${mobileBreakpoint}px) {
      overflow-x: auto;
      margin: 0;
      scroll-snap-type: ${({ scrollSnap }) =>
        scrollSnap ? 'x mandatory' : ''};
      scrollbar-width: none;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  `}
`

const Rail = styled.div`
  display: grid;
  grid-column-gap: 10px;
  position: relative;
  transition: left 0.5s cubic-bezier(0.2, 1, 0.3, 1) 0s;
  grid-template-columns: ${({ page }) => `repeat(${page}, 100%)`};
  left: ${({ currentPage }) =>
    `calc(${-100 * currentPage}% - ${10 * currentPage}px)`};

  ${({ mobileBreakpoint }) => css`
    @media screen and (max-width: ${mobileBreakpoint}px) {
      padding-left: ${({ gap }) => `${gap}px`};
      grid-template-columns: ${({ page }) => `repeat(${page}, 90%)`};
      grid-column-gap: ${({ cols, rows, gap }) =>
        `calc(${(cols * rows - 1) * 90}% + ${cols * rows * gap}px)`};
    }
  `}
`

const ItemSet = styled.div`
  display: grid;
  grid-template-columns: ${({ cols }) => `repeat(${cols}, 1fr)`};
  grid-template-rows: ${({ rows }) => `repeat(${rows}, 1fr)`};
  grid-gap: ${({ gap }) => `${gap}px`};

  ${({ mobileBreakpoint }) => css`
    @media screen and (max-width: ${mobileBreakpoint}px) {
      grid-template-columns: ${({ cols, rows }) =>
        `repeat(${cols * rows}, 100%)`};
      grid-template-rows: 1fr;

      &:last-of-type > ${Item}:last-of-type {
        padding-right: ${({ gap }) => `${gap}px`};
        margin-right: ${({ gap }) => `-${gap}px`};
      }
    }
  `}
`

const DotContainer = styled.div`
  position: absolute;
  bottom: -12px;
  height: 10px;
  width: 100%;
  line-height: 10px;
  text-align: center;

  ${({ mobileBreakpoint }) => css`
    @media screen and (max-width: ${mobileBreakpoint}px) {
      display: none;
    }
  `}
`

const Dot = styled.div`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 0 5px;
  cursor: pointer;
  background: ${({ color }) => color};
`

const Item = styled.div`
  scroll-snap-align: ${({ scrollSnap }) => (scrollSnap ? 'center' : '')};
`

const CAROUSEL_ITEM = 'CAROUSEL_ITEM'
const Carousel = ({
  cols: colsProp = 1,
  rows: rowsProp = 1,
  gap: gapProp = 10,
  loop = false,
  scrollSnap = true,
  hideArrow = false,
  showDots = false,
  autoplay,
  dotColorActive = '#795548',
  dotColorInactive = '#ccc',
  responsiveLayout,
  mobileBreakpoint = 767,
  containerClassName = '',
  containerStyle = {},
  children
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [isHover, setIsHover] = useState(false)
  const [cols, setCols] = useState(colsProp)
  const [rows, setRows] = useState(rowsProp)
  const [gap, setGap] = useState(gapProp)
  const autoplayIntervalRef = useRef(null)
  const breakpointSetting = useResize(responsiveLayout)

  useEffect(() => {
    setCols(colsProp)
  }, [colsProp])

  useEffect(() => {
    setRows(rowsProp)
  }, [rowsProp])

  useEffect(() => {
    setGap(gapProp)
  }, [gapProp])

  useEffect(() => {
    if (breakpointSetting) {
      setCols(breakpointSetting.cols || colsProp)
      setRows(breakpointSetting.rows || rowsProp)
      setGap(breakpointSetting.gap || gapProp)
    } else {
      setCols(colsProp)
      setRows(rowsProp)
      setGap(gapProp)
    }

    setCurrentPage(0)
  }, [breakpointSetting, colsProp, rowsProp, gapProp])

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

  const startAutoplayInterval = useCallback(() => {
    if (autoplayIntervalRef.current === null && typeof autoplay === 'number') {
      autoplayIntervalRef.current = setInterval(() => {
        if (window.innerWidth > mobileBreakpoint) {
          handleNext()
        } else {
          // TODO:
        }
      }, autoplay)
    }
  }, [autoplay, autoplayIntervalRef, handleNext])

  useEffect(() => {
    startAutoplayInterval()

    return () => {
      if (autoplayIntervalRef.current !== null) {
        clearInterval(autoplayIntervalRef.current)
      }
    }
  }, [startAutoplayInterval, autoplayIntervalRef])

  useEffect(() => {
    if (isHover) {
      clearInterval(autoplayIntervalRef.current)
      autoplayIntervalRef.current = null
    } else {
      startAutoplayInterval()
    }
  }, [isHover, autoplayIntervalRef, startAutoplayInterval])

  const handlePrev = useCallback(() => {
    setCurrentPage(p => {
      const prevPage = p - 1
      if (loop && prevPage < 0) {
        return page - 1
      }

      return prevPage
    })
  }, [loop, page])

  const handleNext = useCallback(() => {
    setCurrentPage(p => {
      const nextPage = p + 1
      if (nextPage >= page) {
        return loop ? 0 : p
      }

      return nextPage
    })
  }, [loop, page])

  const handlePage = useCallback(e => {
    setCurrentPage(+e.target.getAttribute('data-index'))
  }, [])

  const handleHover = useCallback(() => {
    setIsHover(hover => !hover)
  }, [])

  return (
    <Container
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
      className={containerClassName}
      style={containerStyle}
    >
      <NextBtn
        type="prev"
        mobileBreakpoint={mobileBreakpoint}
        hidden={hideArrow || (!loop && currentPage <= 0)}
        onClick={handlePrev}
      />
      <RailWrapper
        mobileBreakpoint={mobileBreakpoint}
        scrollSnap={scrollSnap}
        showDots={showDots}
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
        <DotContainer mobileBreakpoint={mobileBreakpoint}>
          {[...Array(page)].map((_, i) => (
            <Dot
              key={i}
              data-index={i}
              onClick={handlePage}
              color={i === currentPage ? dotColorActive : dotColorInactive}
            />
          ))}
        </DotContainer>
      )}
      <NextBtn
        type="next"
        mobileBreakpoint={mobileBreakpoint}
        hidden={hideArrow || (!loop && currentPage === page - 1)}
        onClick={handleNext}
      />
    </Container>
  )
}

const numberValidator = (props, propName, componentName, type) => {
  PropTypes.checkPropTypes(
    {
      [propName]: PropTypes.number
    },
    props,
    propName,
    componentName
  )

  if (props[propName] <= 0) {
    if (
      type === 'positive' ||
      (props[propName] < 0 && type === 'non-negative')
    ) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. expected ${type} \`number\``
      )
    }
  }
}

Carousel.propTypes = {
  cols: (...args) => {
    args.splice(3, 0, 'positive')
    return numberValidator(...args)
  },
  rows: (...args) => {
    args.splice(3, 0, 'positive')
    return numberValidator(...args)
  },
  gap: (...args) => {
    args.splice(3, 0, 'non-negative')
    return numberValidator(...args)
  },
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
      cols: PropTypes.number,
      rows: PropTypes.number,
      gap: PropTypes.number
    })
  ),
  mobileBreakpoint: PropTypes.number,
  containerClassName: PropTypes.string,
  containerStyle: PropTypes.object
}

Carousel.Item = ({ children }) => children
Carousel.Item.displayName = CAROUSEL_ITEM
export default Carousel
