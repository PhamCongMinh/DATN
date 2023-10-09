import { Card, Col, Row, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import Image from 'next/image'

import House1 from '../../../../../assets/images/house1.jpeg'
import House2 from '../../../../../assets/images/house2.jpeg'
import House3 from '../../../../../assets/images/house3.jpeg'

import styles from './style.module.scss'
import React from 'react'

const { Text } = Typography
function ListHouse() {
  return (
    <div>
      <Typography style={{ marginTop: 50, marginBottom: 50, textAlign: 'center' }}>
        <Text className={styles.text}>Nhà trọ nổi bật</Text>
      </Typography>
      <Row>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={<Image src={House1} alt="House1" style={{ height: 290, width: 300 }} />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={<Image src={House2} alt="House2" style={{ height: 290, width: 300 }} />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={<Image src={House3} alt="House3" style={{ height: 290, width: 300 }} />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col span={6} style={{ display: 'flex', justifyContent: 'center' }}>
          <Card
            hoverable
            style={{ width: 300 }}
            cover={<Image src={House2} alt="House2" style={{ height: 290, width: 300 }} />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default React.memo(ListHouse)
