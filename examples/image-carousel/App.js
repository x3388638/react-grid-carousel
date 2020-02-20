import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import Carousel from '../../dist/bundle'

const images = [
  'https://a0.muscache.com/im/pictures/37e211bb-6ef8-44b6-8022-7427e7a241a5.jpg?aki_policy=large',
  'https://a0.muscache.com/im/pictures/c571ab10-d896-4095-b4be-4e57aa8b43cd.jpg?aki_policy=large',
  'https://a0.muscache.com/im/pictures/54b3eadc-e503-41da-a9fe-ba10d20d9aa6.jpg?aki_policy=large',
  'https://a0.muscache.com/im/pictures/b2d713c1-1304-4363-a34f-19fc3c94bcd5.jpg?aki_policy=large',
  'https://a0.muscache.com/im/pictures/6514fab6-a3c4-47b3-8f11-a736d6d3ff77.jpg?aki_policy=large'
]

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
`

const HotelRow = styled.div`
  max-width: 800px;
  border-top: 1px solid #ebebeb;
  border-bottom: 1px solid #ebebeb;
  padding: 20px 0;
  margin: 30px auto;
  display: flex;
  position: relative;

  @media screen and (max-width: 767px) {
    padding: 20px 10px;
    flex-direction: column;
  }
`

const CarouselWapeer = styled.div`
  width: 340px;

  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
    width: 100%;
  }
`

const Title = styled.div`
  font-size: 20px;
`

const Desc = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: gray;

  @media screen and (max-width: 767px) {
    margin-bottom: 50px;
  }
`
const Price = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;

  span {
    font-weight: bold;
    font-size: 18px;
  }
`

const Code = styled.pre`
  max-width: 800px;
  margin: 0 auto;
  background: floralwhite;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
`

const Reference = styled.div`
  margin: 50px auto;
  width: 100%;
  max-width: 800px;
  border-top: 1px solid #666;

  img {
    width: 100%;
  }
`

const App = () => {
  const [isHover, setIsHover] = useState(false)

  const handleHover = useCallback(() => {
    setIsHover(state => !state)
  }, [])

  return (
    <Container>
      <h2 align="center">
        Use{' '}
        <span
          css={`
            background: lightgray;
          `}
        >
          &nbsp;react-grid-carousel&nbsp;
        </span>{' '}
        to build image carousel
      </h2>
      <HotelRow onMouseLeave={handleHover} onMouseEnter={handleHover}>
        <CarouselWapeer>
          <Carousel hideArrow={!isHover} showDots>
            {images.map((img, i) => (
              <Carousel.Item key={i}>
                <img src={img} width="100%" height="200px" />
              </Carousel.Item>
            ))}
          </Carousel>
        </CarouselWapeer>
        <div>
          <Title>Sunny, Modern room in East Village!</Title>
          <Desc>
            1 guest · 1 bedroom · 1 bed · 1 shared bath
            <br />
            Wifi · Kitchen · Heating · Air conditioning
          </Desc>
          <Price>
            <span>$1,952 TWD</span> / night
          </Price>
        </div>
      </HotelRow>
      <Code>{`<Carousel hideArrow={!isHover} showDots>
  {images.map((img, i) => (
    <Carousel.Item key={i}>
      <img src={img} width="100%" height="200px" />
    </Carousel.Item>
  ))}
</Carousel>`}</Code>
      <Reference>
        <h2 align="center">
          Image carousel on{' '}
          <a
            href="https://www.airbnb.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Airbnb
          </a>
        </h2>
        <a href="https://i.imgur.com/vUVfmkr.png" rel="noreferrer noopener">
          <img src="https://i.imgur.com/vUVfmkr.png" />
        </a>
      </Reference>
    </Container>
  )
}

export default App
