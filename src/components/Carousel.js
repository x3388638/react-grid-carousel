import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const RailWrapper = styled.div`
  overflow: hidden;
  margin: ${({ showDots }) => (showDots ? '0 20px 15px 20px' : '0 20px')};

  @media screen and (max-width: 768px) {
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
  grid-column-gap: 10px;
  position: relative;
  transition: left 0.5s cubic-bezier(0.2, 1, 0.3, 1) 0s;
  grid-template-columns: ${({ page }) => `repeat(${page}, 100%)`};
  left: ${({ currentPage }) =>
    `calc(${-100 * currentPage}% - ${10 * currentPage}px)`};

  @media screen and (max-width: 768px) {
    padding-left: ${({ gap }) => `${gap}px`};
    grid-template-columns: ${({ page }) => `repeat(${page}, 90%)`};
    grid-column-gap: ${({ cols, rows, gap }) =>
      `calc(${(cols * rows - 1) * 90}% + ${cols * rows * gap}px)`};
  }
`

const ItemSet = styled.div`
  display: grid;
  grid-template-columns: ${({ cols }) => `repeat(${cols}, 1fr)`};
  grid-template-rows: ${({ rows }) => `repeat(${rows}, 1fr)`};
  grid-gap: ${({ gap }) => `${gap}px`};

  @media screen and (max-width: 768px) {
    grid-template-columns: ${({ cols, rows }) =>
      `repeat(${cols * rows}, 100%)`};
    grid-template-rows: 1fr;

    &:last-of-type > ${Item}:last-of-type {
      padding-right: ${({ gap }) => `${gap}px`};
    }
  }
`

const DotContainer = styled.div`
  position: absolute;
  bottom: -12px;
  height: 10px;
  width: 100%;
  line-height: 10px;
  text-align: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Dot = styled.div`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 0 5px;
  background: ${({ color }) => color};
`

const Item = ({ scrollSnap, children }) => {
  return (
    <div
      css={`
        scroll-snap-align: ${scrollSnap ? 'center' : ''};
      `}
    >
      {children}
    </div>
  )
}

const CAROUSEL_ITEM = 'CAROUSEL_ITEM'
const Carousel = ({
  cols = 1,
  rows = 1,
  gap = 10,
  loop = false,
  scrollSnap = true,
  hideArrow = false,
  showDots = false,
  dotColorActive = '#795548',
  dotColorInactive = '#ccc',
  containerClassName = '',
  containerStyle = {},
  children
}) => {
  const [currentPage, setCurrentPage] = useState(0)
  const itemList = React.Children.toArray(children).filter(
    child => child.type.displayName === CAROUSEL_ITEM
  )

  const itemAmountPerSet = cols * rows
  const itemSetList = itemList.reduce((result, item, i) => {
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
  }, [])

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

  const handleNext = useCallback(() => {
    setCurrentPage(p => {
      const nextPage = p + 1
      if (loop && nextPage >= page) {
        return 0
      }

      return nextPage
    })
  }, [loop, page])

  return (
    <Container className={containerClassName} style={containerStyle}>
      <NextBtn
        type="prev"
        hidden={hideArrow || (!loop && currentPage <= 0)}
        onClick={handlePrev}
      />
      <RailWrapper scrollSnap={scrollSnap} showDots={showDots}>
        <Rail
          cols={cols}
          rows={rows}
          page={page}
          gap={gap}
          currentPage={currentPage}
        >
          {itemSetList.map((set, i) => {
            return (
              <ItemSet key={i} cols={cols} rows={rows} gap={gap}>
                {set}
              </ItemSet>
            )
          })}
        </Rail>
      </RailWrapper>
      {showDots && (
        <DotContainer>
          {[...Array(page)].map((_, i) => (
            <Dot
              key={i}
              color={i === currentPage ? dotColorActive : dotColorInactive}
            />
          ))}
        </DotContainer>
      )}
      <NextBtn
        type="next"
        hidden={hideArrow || (!loop && currentPage === page - 1)}
        onClick={handleNext}
      />
    </Container>
  )
}

Carousel.propTypes = {
  cols: PropTypes.number,
  rows: PropTypes.number,
  gap: PropTypes.number,
  loop: PropTypes.bool,
  scrollSnap: PropTypes.bool,
  hideArrow: PropTypes.bool,
  showDots: PropTypes.bool,
  dotColorActive: PropTypes.string,
  dotColorInactive: PropTypes.string,
  containerClassName: PropTypes.string,
  containerStyle: PropTypes.object
}

Carousel.Item = ({ children }) => children
Carousel.Item.displayName = CAROUSEL_ITEM
export default Carousel
