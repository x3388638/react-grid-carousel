import React, { useState, useCallback } from 'react'
import Carousel from '../src/components/Carousel'
import styled from 'styled-components'
import { withKnobs, number, boolean } from '@storybook/addon-knobs'

const randomImageUrl = 'https://picsum.photos/800/600?random='

const Item = styled.div`
  height: 300px;
  border-radius: 8px;
  background-image: ${({ img }) => `url(${img})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`

export const SingleColumn = () => {
  return (
    <Carousel cols={1} rows={1}>
      {[...Array(5)].map((_, i) => (
        <Carousel.Item key={i}>
          <Item img={randomImageUrl + i} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export const MultiColumns = () => {
  return (
    <Carousel cols={3} rows={1}>
      {[...Array(8)].map((_, i) => (
        <Carousel.Item key={i}>
          <Item img={randomImageUrl + i} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export const MultiRows = () => {
  return (
    <Carousel cols={3} rows={3}>
      {[...Array(25)].map((_, i) => (
        <Carousel.Item key={i}>
          <Item img={randomImageUrl + i} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export const WithDots = () => {
  return (
    <Carousel cols={3} rows={1} showDots>
      {[...Array(9)].map((_, i) => (
        <Carousel.Item key={i}>
          <Item img={randomImageUrl + i} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export const ShowArrowOnHover = () => {
  const [showArrow, setShowArrow] = useState(false)

  const handleHover = useCallback(() => {
    setShowArrow(show => !show)
  }, [])

  return (
    <div onMouseEnter={handleHover} onMouseLeave={handleHover}>
      <Carousel cols={2} rows={1} loop hideArrow={!showArrow}>
        {[...Array(6)].map((_, i) => (
          <Carousel.Item key={i}>
            <Item img={randomImageUrl + i} />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export const Autoplay = () => {
  return (
    <Carousel cols={3} rows={1} autoplay={2000} showDots>
      {[...Array(15)].map((_, i) => (
        <Carousel.Item key={i}>
          <Item img={randomImageUrl + i} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export const ResponsiveLayout = () => {
  return (
    <Carousel
      cols={6}
      rows={2}
      showDots
      responsiveLayout={[
        { breakpoint: 1000, cols: 5, gap: 5 },
        { breakpoint: 800, cols: 4, rows: 1, gap: 2 }
      ]}
      mobileBreakpoint={499}
    >
      {[...Array(24)].map((_, i) => (
        <Carousel.Item key={i}>
          <Item img={randomImageUrl + i} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

const StyledBtn = styled.div`
  position: absolute;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  font-size: 20px;
  color: red;
  opacity: 0.6;
  cursor: pointer;
  top: 50%;
  z-index: 10;
  transition: all 0.25s;
  transform: ${({ type }) =>
    `translateY(-50%) ${type === 'left' ? 'rotate(180deg)' : ''}`};
  left: ${({ type }) => (type === 'left' ? '20px' : 'initial')};
  right: ${({ type }) => (type === 'right' ? '20px' : 'initial')};

  &:hover {
    background: red;
    color: #fff;
    opacity: 0.5;
  }
`

const CustomDot = styled.span`
  display: inline-block;
  height: ${({ isActive }) => (isActive ? '8px' : '5px')};
  width: ${({ isActive }) => (isActive ? '8px' : '5px')};
  background: ${({ isActive }) => (isActive ? '#1890ff' : '#1890ff78')};
  transition: all 0.2s;
`

export const CustomArrowAndDot = () => {
  const LeftBtn = <StyledBtn type="left">➜</StyledBtn>
  const RightBtn = <StyledBtn type="right">➜</StyledBtn>

  return (
    <Carousel
      cols={3}
      rows={1}
      gap="1%"
      responsiveLayout={[
        {
          breakpoint: 999,
          gap: 5
        },
        {
          breakpoint: 899,
          gap: '15%'
        },
        {
          breakpoint: 799,
          gap: '15px'
        }
      ]}
      mobileBreakpoint={699}
      showDots
      arrowLeft={LeftBtn}
      arrowRight={RightBtn}
      dot={CustomDot}
    >
      {[...Array(15)].map((_, i) => (
        <Carousel.Item key={i}>
          <Item img={randomImageUrl + i} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

const Card = styled.div`
  cursor: pointer;
  padding: 5px;

  &:hover {
    background: #f3f3f3;
  }

  img {
    width: 100%;
    border-radius: 8px;
  }

  div {
    margin-top: 5px;
    font-size: 12px;
  }

  span:first-of-type {
    color: red;
    font-weight: bold;
    font-size: 16px;
  }

  span:last-of-type {
    color: gray;
    margin-left: 5px;
    text-decoration-line: line-through;
  }
`

export const ProductCard = () => {
  return (
    <Carousel cols={5} rows={1}>
      {[...Array(15)].map((_, i) => (
        <Carousel.Item key={i}>
          <Card>
            <img src={randomImageUrl + i} />
            <div>
              Apple AirPods with Wireless Charging Case (Latest Model)
              <br />
              <span>$5880</span>
              <span>$6990</span>
            </div>
          </Card>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

const NewsItem = styled.div`
  cursor: pointer;
  position: relative;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 8px;
  }

  div {
    font-size: 12px;
  }

  @media screen and (max-width: 767px) {
    span {
      position: absolute;
      left: 0;
      bottom: 0;
      border-radius: 8px;
      padding: 110px 10px 10px 10px;
      display: inline-block;
      width: 100%;
      box-sizing: border-box;
      background: linear-gradient(0deg, #000, transparent);
      margin-top: 12px;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
    }
  }
`

const ReadMore = styled.div`
  cursor: pointer;
  border-radius: 8px;
  background: gray;
  color: #fff;
  align-items: center;
  justify-content: center;
  display: flex;
  height: 100%;
`

export const NewsCarousel = () => {
  return (
    <Carousel cols={4} rows={1}>
      {[...Array(11), 'READ_MORE'].map((val, i) => {
        return (
          <Carousel.Item key={i}>
            {val === 'READ_MORE' ? (
              <ReadMore>Read More</ReadMore>
            ) : (
              <NewsItem>
                <img src={randomImageUrl + i} />
                <div>
                  {`Trump downplays soldiers' head injuries in Iraq attacks`}
                </div>
              </NewsItem>
            )}
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export const CustomProps = () => {
  const cols = number('cols', 1, {
    min: 1,
    max: 10,
    step: 1,
    range: true
  })

  const rows = number('rows', 1, {
    min: 1,
    max: 5,
    step: 1,
    range: true
  })

  const gap = number('gap (px)', 10, {
    min: 0,
    max: 20,
    step: 1,
    range: true
  })

  const pages = number('pages', 2, {
    min: 1,
    max: 5,
    step: 1,
    range: true
  })

  const loop = boolean('loop', false)

  const scrollSnap = boolean('scrollSnap', true)

  return (
    <Carousel
      cols={cols}
      rows={rows}
      gap={gap}
      loop={loop}
      scrollSnap={scrollSnap}
    >
      {[...Array(cols * rows * pages)].map((_, i) => (
        <Carousel.Item key={i}>
          <Item img={randomImageUrl + i} />
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default {
  title: 'Carousel',
  component: Carousel,
  decorators: [
    withKnobs,
    story => (
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {story()}
        <span style={{ position: 'absolute', bottom: '0', right: '0' }}>
          Photo source{' '}
          <a href="https://picsum.photos/" rel="noreferrer noopener">
            https://picsum.photos/
          </a>
        </span>
      </div>
    )
  ]
}
