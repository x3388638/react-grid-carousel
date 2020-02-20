import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Carousel from '../../dist/bundle'

const randomImgUrl = 'https://picsum.photos/{x}/{y}?random='

const CustomBtn = styled.div`
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
  height: 8px;
  width: ${({ isActive }) => (isActive ? '16px' : '8px')};
  opacity: ${({ isActive }) => (isActive ? '0.8' : '0.5')};
  border-radius: 8px;
  background: red;
  transition: all 0.2s;
`

const App = () => {
  const [isHover, setIshover] = useState(false)

  const handleHover = useCallback(() => {
    setIshover(state => !state)
  }, [])

  return (
    <div>
      <h4 className="thin">Single column</h4>
      <Carousel showDots containerStyle={{ maxWidth: '500px' }}>
        {[...Array(4)].map((_, i) => (
          <Carousel.Item key={i}>
            <img
              width="100%"
              src={randomImgUrl.replace('{x}', 400).replace('{y}', 280) + i}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <h4 className="thin">Multiple columns</h4>
      <Carousel showDots cols={5}>
        {[...Array(15)].map((_, i) => (
          <Carousel.Item key={i}>
            <img
              width="100%"
              src={randomImgUrl.replace('{x}', 350).replace('{y}', 170) + i * 2}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <h4 className="thin">Multiple cols + multiple rows</h4>
      <Carousel
        showDots
        cols={3}
        rows={2}
        containerStyle={{ maxWidth: '800px' }}
      >
        {[...Array(18)].map((_, i) => (
          <Carousel.Item key={i}>
            <img
              width="100%"
              src={randomImgUrl.replace('{x}', 250).replace('{y}', 158) + i * 3}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <h4 className="thin">
        Show/hide arrow buttons and dots w/ infinite loop
      </h4>
      <div onMouseEnter={handleHover} onMouseLeave={handleHover}>
        <Carousel
          showDots={isHover}
          hideArrow={!isHover}
          cols={3}
          loop
          containerStyle={{ maxWidth: '1000px', marginBottom: '20px' }}
        >
          {[...Array(9)].map((_, i) => (
            <Carousel.Item key={i}>
              <img
                width="100%"
                src={
                  randomImgUrl.replace('{x}', 250).replace('{y}', 128) + i * 4
                }
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <h4 className="thin">Autoplay w/ customized arrow buttons and dots</h4>
      <Carousel
        showDots
        cols={4}
        rows={1}
        gap="2%"
        loop
        autoplay={5000}
        arrowLeft={<CustomBtn type="left">➜</CustomBtn>}
        arrowRight={<CustomBtn type="right">➜</CustomBtn>}
        dot={CustomDot}
      >
        {[...Array(20)].map((_, i) => (
          <Carousel.Item key={i}>
            <img
              width="100%"
              src={randomImgUrl.replace('{x}', 250).replace('{y}', 158) + i * 5}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <h4 className="thin">
        Customized layout for RWD (max-width: 1000px/750px/500px)
      </h4>
      <details>
        <summary>responsiveLayout settings</summary>
        <pre>{`[
  { breakpoint: 1000, cols: 3 },
  { breakpoint: 750, cols: 2, rows: 1, gap: 5 },
  { breakpoint: 499, autoplay: 2000, loop: true }
]`}</pre>
      </details>
      <Carousel
        showDots
        cols={5}
        rows={2}
        mobileBreakpoint={499}
        responsiveLayout={[
          { breakpoint: 1000, cols: 3 },
          { breakpoint: 750, cols: 2, rows: 1, gap: 5 },
          { breakpoint: 499, autoplay: 2000, loop: true }
        ]}
      >
        {[...Array(20)].map((_, i) => (
          <Carousel.Item key={i}>
            <img
              width="100%"
              src={randomImgUrl.replace('{x}', 250).replace('{y}', 158) + i * 6}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="text-secondary small">
        *Photo source:{' '}
        <a
          href="https://picsum.photos/"
          target="_blank"
          rel="noreferrer noopener"
        >
          https://picsum.photos/
        </a>
      </div>
    </div>
  )
}

export default App
