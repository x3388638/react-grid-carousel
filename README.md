<h1 align="center">React Grid Carousel</h1>
<p align="center">Flexible carousel layout w/ css grid<br />to easily create a carousel like photo gallery, shopping product card or anything you want</p>
<p align="center">
<img src="https://github.com/x3388638/react-grid-carousel/blob/master/demo2.gif?raw=true" width="400px" />
<img src="https://github.com/x3388638/react-grid-carousel/blob/master/demo1.gif?raw=true" width="100%" />
</p>

## Features

- RWD
- Multiple items
- Multiple rows
- Infinite loop
- Support any component as a item to put into grid
- Show/hide dots
- Show/hide arrow buttons
- Auto play
- Enable/Disable `scroll-snap` for each item on mobile device

## Install

```bash
$ npm install react-grid-carousel --save
```

## Usage

Just import the `Carousel` component from `react-grid-carousel`  
and put your item into `Carousel.Item`

```javascript
import React from 'react'
import Carousel from 'react-grid-carousel'

const Gallery = () => {
  return (
    <Carousel cols={3} rows={3} gap={10} loop>
      <Carousel.Item>
        <img width="100%" src="https://picsum.photos/800/600?random=1" />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%" src="https://picsum.photos/800/600?random=2" />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%" src="https://picsum.photos/800/600?random=3" />
      </Carousel.Item>
      <Carousel.Item>
        {/* anything you want to show in the grid */}
      </Carousel.Item>
      {/* ... */}
    </Carousel>
  )
}
```

## Props

| Prop               | Type    | Default | Description                                               |
| ------------------ | ------- | ------- | --------------------------------------------------------- |
| cols               | Number  | 1       | Column amount rendered per page                           |
| rows               | Number  | 1       | Row amount rendered per page                              |
| gap                | Number  | 10      | Margin (grid-gap) between each item/grid (px)             |
| loop               | Boolean | false   | Infinite loop or not                                      |
| scrollSnap         | Boolean | true    | `true` for applying `scroll-snap` to items on mobile      |
| hideArrow          | Boolean | false   | Show/hide the arrow prev/next buttons                     |
| showDots           | Boolean | false   | Show dots indicate the current page on desktop mode       |
| autoplay           | Number  |         | Autoplay timeout in ms; `undefined` for autoplay disabled |
| dotColorActive     | String  | #795548 | Valid css color value for active dot                      |
| dotColorInactive   | String  | #ccc    | Valid css color value for inactive dot                    |
| containerClassName | String  |         | Classname for carousel container                          |
| containerStyle     | Object  |         | Style object for carousel container                       |

## Example

Storybook (Don't forget to try on different viewport size)

```bash
$ git clone https://github.com/x3388638/react-grid-carousel
$ cd react-grid-carousel
$ npm ci
$ npm run storybook
```

Use case in real world

```bash
# clone & install packages
$ npm run dev
# open localhost:8080
```

or visit https://react-grid-carousel.now.sh/#use-case-in-real-world

## Licence

MIT
