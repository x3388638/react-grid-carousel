import React, { useState } from 'react'
import Carousel from '../../dist/bundle'
import styled from 'styled-components'

const randomImageUrl = 'https://picsum.photos/800/600?random='

const Item = styled.div`
  background-image: ${({ img }) => `url(${img})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 200px;
`

const App = () => {
  const [cols, setCols] = useState(3)
  const [rows, setRows] = useState(1)
  const [gap, setGap] = useState(10)
  const [pages, setPages] = useState(2)

  return (
    <div>
      <h1>Simple sample</h1>
      <div>
        Cols:{' '}
        <input
          type="range"
          min="1"
          max="20"
          value={cols}
          onChange={e => {
            setCols(+e.target.value)
          }}
        />{' '}
        {cols}
      </div>
      <div>
        Rows:{' '}
        <input
          type="range"
          min="1"
          max="3"
          value={rows}
          onChange={e => {
            setRows(+e.target.value)
          }}
        />{' '}
        {rows}
      </div>
      <div>
        Pages:{' '}
        <input
          type="range"
          min="1"
          max="4"
          value={pages}
          onChange={e => {
            setPages(+e.target.value)
          }}
        />{' '}
        {pages}
      </div>
      <div>
        Gap:{' '}
        <input
          type="range"
          min="0"
          max="20"
          value={gap}
          onChange={e => {
            setGap(+e.target.value)
          }}
        />{' '}
        {gap}
      </div>
      <hr />
      <Carousel cols={cols} rows={rows} gap={gap}>
        {[...Array(cols * rows * pages)].map((_, i) => (
          <Carousel.Item key={i}>
            <Item img={randomImageUrl + i} />
          </Carousel.Item>
        ))}
      </Carousel>
      Photo by{' '}
      <a
        href="https://picsum.photos/"
        rel="noreferrer noopener"
        target="_blank"
      >
        https://picsum.photos/
      </a>
    </div>
  )
}

export default App
