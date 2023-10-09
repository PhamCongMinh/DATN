import React from 'react'
import ListIcon from '../../layouts/content/components/list-icon'
import { Carousel, Divider } from 'antd'
import styles from './style.module.scss'
import Image from 'next/image'
import ImageInCarousel1 from '../../../assets/images/house4.jpeg'
import SignUpForm from './components/subcontent'

function SignUpContent() {
  return (
    <div>
      <div className={styles.container}>
        <Carousel autoplay={true}>
          <div>
            <Image src={ImageInCarousel1} alt="House1" className={styles.image1} />
          </div>
        </Carousel>
        <SignUpForm />
      </div>
      <ListIcon />
    </div>
  )
}

export default React.memo(SignUpContent)
