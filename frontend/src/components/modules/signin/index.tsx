import ListIcon from '../../layouts/content/components/list-icon'
import { Carousel, Divider } from 'antd'
import styles from './style.module.scss'
import Image from 'next/image'
import ImageInCarousel1 from '../../../assets/images/house4.jpeg'
import ImageInCarousel2 from '../../../assets/images/list_image_header_2.png'
import SignInForm from './components/subcontent'
import React from 'react'

function SignInContent() {
  return (
    <div>
      <div className={styles.container}>
        <Carousel autoplay={true}>
          <div>
            <Image src={ImageInCarousel1} alt="House1" className={styles.image1} />
          </div>
          <div>
            <Image src={ImageInCarousel2} alt="House2" className={styles.image2} />
          </div>
        </Carousel>
        <SignInForm />
      </div>
      <ListIcon />
    </div>
  )
}

export default React.memo(SignInContent)
