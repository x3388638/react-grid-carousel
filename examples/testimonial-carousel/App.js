import React from 'react'
import styled from 'styled-components'
import Carousel from '../../dist/bundle'
import testimonials from './mockTestimonialList.json'

const Container = styled.div`
  background: #f7f8fa;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
`

const Card = styled.div`
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(20, 23, 28, 0.15);
  height: 100%;
  min-height: 240px;
  padding: 32px;
  margin: 5px;
`
const User = styled.div`
  display: flex;
`
const Avatar = styled.div`
  width: 64px;
  height: 64px;
  background: rgb(104, 111, 122);
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: #fff;
  display: flex;
  font-weight: bold;
  margin-right: 10px;
`

const Username = styled.div`
  display: flex;
  align-items: center;
`

const Text = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #333;
`

const Code = styled.pre`
  max-width: 1300px;
  margin: 15px auto;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
`

const Reference = styled.div`
  margin: 50px auto;
  width: 100%;
  max-width: 1300px;
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
        to build testimonial carousel
      </h2>
      <Carousel
        cols={3}
        containerStyle={{ maxWidth: '1300px', margin: '0 auto' }}
      >
        {testimonials.map(({ name, text }, i) => (
          <Carousel.Item key={i}>
            <Card>
              <User>
                <Avatar>{name[0]}</Avatar>
                <Username>{name}</Username>
              </User>
              <Text>{text}</Text>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
      <Code>{`<Carousel
  cols={3}
  containerStyle={{ maxWidth: '1300px', margin: '0 auto' }}
>
  {testimonials.map(({ name, text }, i) => (
    <Carousel.Item key={i}>
      <Card>
        <User>
          <Avatar>{name[0]}</Avatar>
          <Username>{name}</Username>
        </User>
        <Text>{text}</Text>
      </Card>
    </Carousel.Item>
  ))}
</Carousel>`}</Code>
      <Reference>
        <h2 align="center">
          Testimonial carousel on{' '}
          <a
            href="https://www.udemy.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Udemy
          </a>
        </h2>
        <a href="https://i.imgur.com/VrAnPOT.png" rel="noreferrer noopener">
          <img src="https://i.imgur.com/VrAnPOT.png" />
        </a>
      </Reference>
    </Container>
  )
}

export default App
