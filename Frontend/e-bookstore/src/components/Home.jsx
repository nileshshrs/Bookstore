import React from 'react'
import Carousel from './Carousels'
import Featured from './Featured'
import BestSelling from './BestSelling'


const Home = () => {
  return (
    <>
      <Carousel/>
      <Featured/>
      <BestSelling/>
    </>
  )
}

export default Home