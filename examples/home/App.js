import React from 'react'
import Carousel from '../../dist/bundle'

const randomImgUrl = 'https://picsum.photos/{x}/{y}?random='

const App = () => {
  return (
    <div>
      <h4 className="thin">Single column</h4>
      <Carousel showDots containerStyle={{ maxWidth: '500px' }}>
        {[...Array(4)].map((_, i) => (
          <Carousel.Item key={i}>
            <img
              width="100%"
              src={randomImgUrl.replace('{x}', 500).replace('{y}', 300) + i}
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
              src={randomImgUrl.replace('{x}', 600).replace('{y}', 400) + i * 2}
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
              src={randomImgUrl.replace('{x}', 400).replace('{y}', 250) + i * 3}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default App
