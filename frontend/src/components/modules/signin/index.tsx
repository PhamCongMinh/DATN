import ListIcon from '../../layouts/content/components/list-icon'
import { Carousel, Divider } from 'antd'
import styles from './style.module.scss'
import Image from 'next/image'
import Image4 from '../../../assets/images/test4.png'
import Image5 from '../../../assets/images/test7.png'
import SignInForm from './components/subcontent'
import React from 'react'

function SignInContent() {
  return (
    <div>
      <div className={styles.container}>
        <Carousel autoplay={true}>
          <div>
            <Image src={Image4} alt="House1" className={styles.image1} />
          </div>
          <div>
            <Image src={Image5} alt="House2" className={styles.image2} />
          </div>
        </Carousel>
        <SignInForm />
      </div>
      <ListIcon />
    </div>
  )
}

export default React.memo(SignInContent)
