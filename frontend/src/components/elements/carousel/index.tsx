import { Carousel } from 'antd'
import Image from 'next/image'

import Search from '../search/index'
import Home1 from '../../../assets/images/home1.png'

import styles from './style.module.scss'
import React from 'react'

function ImagesCarousel() {
  return (
    <div className={styles.container}>
      <Carousel autoplay={true}>
        <div>
          <Image src={Home1} alt="Home1" className={styles.image1} />
        </div>
        {/*<div>*/}
        {/*  <Image src={Home3} alt="House2" className={styles.image2} />*/}
        {/*</div>*/}
      </Carousel>
      <Search />
    </div>
  )
}

export default React.memo(ImagesCarousel)
