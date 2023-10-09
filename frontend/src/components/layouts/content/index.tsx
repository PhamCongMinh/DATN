import ImagesCarousel from '../../elements/carousel'
import { Content } from 'antd/lib/layout/layout'
import ListHouse from './components/listhouse'
import IntroductionRent from './components/introduction-rent'
import IntroductionRentout from './components/introduction-rentout'
import { Divider } from 'antd'
import ListIcon from './components/list-icon'
import React from 'react'

function CustomContent() {
  return (
    <div>
      <ImagesCarousel />
      <ListIcon />
      <IntroductionRent />
      <Divider style={{ marginTop: 100 }} />
      <ListHouse />
      <Divider style={{ marginTop: 100 }} />
      <IntroductionRentout />
    </div>
  )
}
export default React.memo(CustomContent)
