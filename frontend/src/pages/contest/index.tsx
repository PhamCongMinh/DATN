import { Divider, Layout } from 'antd'
import CustomHeader from '../../components/layouts/header'
import { Content } from 'antd/lib/layout/layout'
import CustomFooter from '../../components/layouts/footer'
import React from 'react'
import ContestContent from '../../components/modules/contest'

function Course() {
  return (
    <Layout>
      <CustomHeader />
      <Divider style={{ margin: 0 }} />
      <Content className="site-layout" style={{ padding: '0px', margin: '0px', minHeight: 1100 }}>
        <ContestContent />
      </Content>
      <CustomFooter />
    </Layout>
  )
}

export default React.memo(Course)
