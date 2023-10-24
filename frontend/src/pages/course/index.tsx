import { Layout } from 'antd'
import CustomHeader from '../../components/layouts/header'
import { Content } from 'antd/lib/layout/layout'
import CustomFooter from '../../components/layouts/footer'
import React from 'react'
import CourseContent from '../../components/modules/course'

function Course() {
  return (
    <Layout>
      <CustomHeader />
      <Content className="site-layout" style={{ padding: '0px', margin: '0px', minHeight: 1100 }}>
        <CourseContent />
      </Content>
      <CustomFooter />
    </Layout>
  )
}

export default React.memo(Course)
