import React from 'react'
import Carousel from 'react-grid-carousel'
import styled from 'styled-components'

const Item = styled.div`
  background: #eee;
`

const App = () => {
  return (
    <div>
      Carousel demo:
      <Carousel>
        <Carousel.Item>
          <Item>123</Item>
        </Carousel.Item>
        <Carousel.Item>
          <Item>123</Item>
        </Carousel.Item>
        <Carousel.Item>
          <Item>123</Item>
        </Carousel.Item>
        <Carousel.Item>
          <Item>123</Item>
        </Carousel.Item>
        <Carousel.Item>
          <Item>123</Item>
        </Carousel.Item>
        <Carousel.Item>
          <Item>123</Item>
        </Carousel.Item>
        <Carousel.Item>
          <Item>123</Item>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default App
