import React from 'react'
import styled from 'styled-components'
import Carousel from '../../dist/bundle'

const brandLogo = 'https://fakeimg.pl/320x180/?text=Brand%20logo%20'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  background: #f5f5f5;
`

const Row = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Logo = styled.div`
  height: 110px;
  background-image: ${({ img }) => `url(${img})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;

  &:hover {
    border: 1px solid #a9a9a9;
    width: calc(100% - 2px);
    height: 108px;
  }
`

const More = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  font-weight: bold;
  cursor: pointer;
  background: #fff;

  &:hover {
    border: 1px solid #a9a9a9;
    width: calc(100% - 2px);
    height: 108px;
  }
`

const Code = styled.pre`
  max-width: 1200px;
  margin: 15px auto;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
`

const Reference = styled.div`
  margin: 50px auto;
  width: 100%;
  max-width: 1200px;
  border-top: 1px solid #666;

  img {
    width: 100%;
  }
`

const App = () => {
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
        to build multiple rows carousel
      </h2>
      <Row>
        <Carousel
          cols={6}
          rows={2}
          gap={1}
          containerStyle={{ background: 'transparent' }}
        >
          {[...Array(23)].map((_, i) => (
            <Carousel.Item key={i}>
              <Logo img={brandLogo + i} />
            </Carousel.Item>
          ))}
          <Carousel.Item key={23}>
            <More>See All &gt;</More>
          </Carousel.Item>
        </Carousel>
      </Row>
      <Code>{`<Carousel
  cols={6}
  rows={2}
  gap={1}
  containerStyle={{ background: 'transparent' }}
>
  {[...Array(23)].map((_, i) => (
    <Carousel.Item key={i}>
      <Logo img={brandLogo + i} />
    </Carousel.Item>
  ))}
  <Carousel.Item key={23}>
    <More>See All ></More>
  </Carousel.Item>
</Carousel>`}</Code>
      <Reference>
        <h2 align="center">
          Multiple rows carousel on{' '}
          <a href="https://shopee.tw" target="_blank" rel="noreferrer noopener">
            Shopee
          </a>
        </h2>
        <a href="https://i.imgur.com/oMyEj0m.png" rel="noreferrer noopener">
          <img src="https://i.imgur.com/oMyEj0m.png" />
        </a>
      </Reference>
    </Container>
  )
}

export default App
