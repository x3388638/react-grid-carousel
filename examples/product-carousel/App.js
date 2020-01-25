import React from 'react'
import styled from 'styled-components'
import Carousel from '../../dist/bundle'
import products from './mockProductList.json'

const Body = styled.div`
  background: #f3f3f3;
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
`

const CarouselContainer = styled.div`
  padding: 20px 0;
`

const Row = styled.div`
  max-width: 1000px;
  margin: 10px auto;
  border-radius: 8px;
  background: #fff;

  @media screen and (max-width: 767px) {
    margin: 10px;
  }
`

const RowHead = styled.div`
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
`

const Card = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
  }

  span:first-of-type {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  span:last-of-type {
    color: gray;
    font-size: 12px;
    text-decoration-line: line-through;
    margin-left: 10px;
  }

  @media screen and (max-width: 767px) {
    background: #f3f3f3;
    border: 1px solid #f3f3f3;
  }
`

const Title = styled.div`
  font-size: 14px;
  line-height: 16px;
  height: 32px;
  overflow: hidden;
  margin-bottom: 5px;
`

const Mask = styled.div`
  opacity: 0;
  height: 100%;
  width: 100%;
  cursor: pointer;
  background: #0000000a;
  position: absolute;
  border-radius: 8px;
  top: 0;
  left: 0;

  &:hover {
    opacity: 1;
  }
`

const Code = styled.pre`
  max-width: 1000px;
  margin: 10px auto;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
`

const Reference = styled.div`
  margin: 50px auto;
  width: 100%;
  max-width: 1000px;
  border-top: 1px solid #666;

  img {
    width: 100%;
  }
`

const App = () => {
  return (
    <Body>
      <h2 align="center">
        Use{' '}
        <span
          css={`
            background: lightgray;
          `}
        >
          &nbsp;react-grid-carousel&nbsp;
        </span>{' '}
        to build product carousel
      </h2>
      <Row>
        <RowHead>每日好康</RowHead>
        <CarouselContainer>
          <Carousel cols={5} showDots loop>
            {products.map((val, i) => (
              <Carousel.Item key={i}>
                <Card>
                  <img src={val.img} />
                  <div>
                    <Title>{val.title}</Title>
                    <span>{val.specialPrice}</span>
                    <span>{val.oriPrice}</span>
                  </div>
                  <Mask />
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </CarouselContainer>
      </Row>
      <Code>
        {`<Carousel cols={5} showDots loop>
  {products.map((val, i) => (
    <Carousel.Item key={i}>
      <Card>
        <img src={val.img} />
        <div>
          <Title>{val.title}</Title>
          <span>{val.specialPrice}</span>
          <span>{val.oriPrice}</span>
        </div>
        <Mask />
      </Card>
    </Carousel.Item>
  ))}
</Carousel>`}
      </Code>
      <Reference>
        <h2 align="center">
          Product carousel on{' '}
          <a
            href="https://tw.buy.yahoo.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Yahoo! Shopping
          </a>
        </h2>

        <a
          href="https://i.imgur.com/LLv7S1g.png"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src="https://i.imgur.com/LLv7S1g.png" />
        </a>
      </Reference>
    </Body>
  )
}

export default App
