import React, { useState, useCallback } from 'react'
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
  left: ${({ type }) => (type === 'prev' ? '5px' : 'initial')};
  right: ${({ type }) => (type === 'next' ? '5px' : 'initial')};

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
`

const RailWrapper = styled.div`
  overflow: hidden;
  margin: 0 20px;
`

const Rail = styled.div`
  display: grid;
  grid-column-gap: 10px;
  position: relative;
  transition: left 0.5s cubic-bezier(0.2, 1, 0.3, 1) 0s;
  grid-template-columns: ${({ page }) => `repeat(${page}, 100%)`};
  left: ${({ currentPage }) =>
    `calc(${-100 * currentPage}% - ${10 * currentPage}px)`};
`

const ItemSet = styled.div`
  display: grid;
  grid-template-columns: ${({ cols }) => `repeat(${cols}, auto)`};
  grid-template-rows: ${({ rows }) => `repeat(${rows}, auto)`};
  grid-gap: ${({ gap }) => `${gap}px`};
`

const Item = ({ children }) => {
  return <div className="itemllalala">{children}</div>
}

const CAROUSEL_ITEM = 'CAROUSEL_ITEM'
const Carousel = ({ cols = 1, rows = 1, gap = 10, children }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const itemList = React.Children.toArray(children).filter(
    child => child.type.displayName === CAROUSEL_ITEM
  )

  const itemAmountPerSet = cols * rows
  const itemSetList = itemList.reduce((result, item, i) => {
    if (i % itemAmountPerSet === 0) {
      result.push([<Item key={i}>{item}</Item>])
    } else {
      result[result.length - 1].push(<Item key={i}>{item}</Item>)
    }

    return result
  }, [])

  const page = Math.ceil(itemList.length / itemAmountPerSet)

  const handlePrev = useCallback(() => {
    setCurrentPage(p => p - 1)
  }, [])

  const handleNext = useCallback(() => {
    setCurrentPage(p => p + 1)
  }, [])

  return (
    <Container>
      <NextBtn type="prev" hidden={currentPage <= 0} onClick={handlePrev} />
      <RailWrapper>
        <Rail page={page} currentPage={currentPage}>
          {itemSetList.map((set, i) => {
            return (
              <ItemSet key={i} cols={cols} rows={rows} gap={gap}>
                {set}
              </ItemSet>
            )
          })}
        </Rail>
      </RailWrapper>
      <NextBtn
        type="next"
        hidden={currentPage === page - 1}
        onClick={handleNext}
      />
    </Container>
  )
}

Carousel.Item = ({ children }) => children
Carousel.Item.displayName = CAROUSEL_ITEM
export default Carousel
