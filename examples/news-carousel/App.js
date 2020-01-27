import React from 'react'
import styled from 'styled-components'
import Carousel from '../../dist/bundle'
import newsList from './mockNewsList.json'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  max-width: 500px;
  background: #f3f3f3;
`

const Notice = styled.div`
  margin: 10px;
  color: lightcoral;
`

const Item = styled.div`
  position: relative;
  height: 205px;
  background-image: ${({ img }) => `url(${img})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 8px;
`

const Index = styled.div`
  position: absolute;
  background: #232323bf;
  color: #ffffffc9;
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 20px;
  top: 5px;
  right: 5px;
`

const Detail = styled.div`
  position: absolute;
  bottom: 0;
  color: #fff;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
  background: linear-gradient(0deg, black, transparent);
  padding-top: 120px;
  border-radius: 8px;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`
const Comment = styled.div`
  font-size: 16px;
  font-weight: bold;
`

const Code = styled.pre`
  background: #fff;
  padding: 20px;
  font-size: 12px;
  overflow: auto;
`

const Reference = styled.div`
  margin: 50px auto;
  border-top: 1px solid #666;
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
        to build news carousel
      </h2>
      <Notice>Notice: You should try this demo on mobile viewport size</Notice>
      <Carousel>
        {newsList.map(({ imageSrc, title, comment }, i) => (
          <Carousel.Item key={i}>
            <Item img={imageSrc}>
              <Index>
                {i + 1}/{newsList.length}
              </Index>
              <Detail>
                <Title>{title}</Title>
                {!!comment && <Comment>{comment.count} comments</Comment>}
              </Detail>
            </Item>
          </Carousel.Item>
        ))}
      </Carousel>
      <Code>{`<Carousel>
  {newsList.map(({ imageSrc, title, comment }, i) => (
    <Carousel.Item key={i}>
      <Item img={imageSrc}>
        <Index>
          {i + 1}/{newsList.length}
        </Index>
        <Detail>
          <Title>{title}</Title>
          {!!comment && <Comment>{comment.count} comments</Comment>}
        </Detail>
      </Item>
    </Carousel.Item>
  ))}
</Carousel>`}</Code>
      <Reference>
        <h2 align="center">
          News carousel on{' '}
          <a
            href="https://tw.mobi.yahoo.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Yahoo! mobile home page
          </a>
        </h2>
        <div
          style={{ position: 'relative', paddingBottom: 'calc(77.50% + 44px)' }}
        >
          <iframe
            src="https://gfycat.com/ifr/WellwornFittingChinchilla"
            frameBorder="0"
            scrolling="no"
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            allowFullScreen
          ></iframe>
        </div>
      </Reference>
    </Container>
  )
}

export default App
