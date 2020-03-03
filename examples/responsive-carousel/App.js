import React from 'react'
import styled from 'styled-components'
import Carousel from '../../dist/bundle'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
`

const Row = styled.div`
  max-width: 1100px;
  padding: 0 50px;
  margin: 50px auto;

  @media screen and (max-width: 670px) {
    padding: 0;
  }
`

const ArrowBtn = styled.span`
  display: inline-block;
  position: absolute;
  top: 50%;
  right: ${({ type }) => (type === 'right' ? '-40px' : 'unset')};
  left: ${({ type }) => (type === 'left' ? '-40px' : 'unset')};
  width: 45px;
  height: 45px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.15);
  cursor: pointer;

  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${({ type }) =>
      type === 'right'
        ? 'translate(-75%, -50%) rotate(45deg)'
        : 'translate(-25%, -50%) rotate(-135deg)'};
    width: 10px;
    height: 10px;
    border-top: 2px solid #666;
    border-right: 2px solid #666;
  }

  &:hover::after {
    border-color: #333;
  }
`

const Card = styled.div`
  margin: 2px;
  border-radius: 6px;
  border: 1px solid #eaeaea;
  overflow: hidden;
  cursor: pointer;
  transition: box-shadow 0.25s;

  :hover {
    box-shadow: 0 0 2px 0 #00000063;
  }
`

const Img = styled.div`
  height: 160px;
  margin-bottom: 4px;
  background-image: ${({ img }) => `url(${img})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const Title = styled.div`
  margin: 0 10px 10px;
  font-size: 15px;
  font-weight: bold;
`

const Star = styled.div`
  float: left;
  margin: 10px;
  color: #26bec9;
  font-size: 15px;
`

const Price = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #999;
  float: right;
  margin: 10px;

  span {
    font-size: 15px;
    color: #26bec9;
  }
`

const Code = styled.pre`
  max-width: 1100px;
  margin: 15px auto;
  background: lightblue;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
`

const Reference = styled.div`
  margin: 50px auto;
  width: 100%;
  max-width: 1100px;
  border-top: 1px solid #666;

  img {
    width: 100%;
  }
`

const App = () => (
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
      to build responsive carousel
    </h2>
    <Row>
      <h2
        css={`
          margin: 20px;
        `}
      >
        Hit The Slopes
      </h2>
      <Carousel
        cols={4}
        rows={1}
        gap={11}
        responsiveLayout={[
          {
            breakpoint: 1200,
            cols: 3
          },
          {
            breakpoint: 990,
            cols: 2
          }
        ]}
        mobileBreakpoint={670}
        arrowRight={<ArrowBtn type="right" />}
        arrowLeft={<ArrowBtn type="left" />}
      >
        {[...Array(8)].map((_, i) => (
          <Carousel.Item key={i}>
            <Card>
              <Img img={`https://picsum.photos/200/160?random=${i}`} />
              <Title>
                Day Tour From Tokyo: Tambara Ski Park &amp; Strawberry Picking
              </Title>
              <Star>★★★★★</Star>
              <Price>
                TWD <span>2,500</span>
              </Price>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </Row>
    <Code>{`<Carousel
  cols={4}
  rows={1}
  gap={11}
  responsiveLayout={[
    {
      breakpoint: 1200,
      cols: 3
    },
    {
      breakpoint: 990,
      cols: 2
    }
  ]}
  mobileBreakpoint={670}
  arrowRight={<ArrowBtn type="right" />}
  arrowLeft={<ArrowBtn type="left" />}
>
  {[...Array(8)].map((_, i) => (
    <Carousel.Item key={i}>
      <Card>
        <Img img={\`https://picsum.photos/200/160?random=\${i}\`} />
        <Title>
          Day Tour From Tokyo: Tambara Ski Park &amp; Strawberry Picking
        </Title>
        <Star>★★★★★</Star>
        <Price>
          TWD <span>2,500</span>
        </Price>
      </Card>
    </Carousel.Item>
  ))}
</Carousel>`}</Code>
    <Reference>
      <h2 align="center">
        Responsive carousel on{' '}
        <a
          href="https://www.kkday.com/en"
          target="_blank"
          rel="noreferrer noopener"
        >
          KKday
        </a>
      </h2>
      <a
        href="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/9c482afe303a6c7160340cfcf4c2b4500e15c9b3/kkday.gif"
        rel="noreferrer noopener"
      >
        <img src="https://gist.githubusercontent.com/x3388638/82e341b43990c7851c9438dfdec43e3b/raw/9c482afe303a6c7160340cfcf4c2b4500e15c9b3/kkday.gif" />
      </a>
    </Reference>
  </Container>
)

export default App
