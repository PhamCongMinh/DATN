import React from 'react'
import { Layout } from 'antd'
import CustomHeader from '../../components/layouts/header'
import { Content } from 'antd/lib/layout/layout'
import CustomFooter from '../../components/layouts/footer'
import SignUpContent from '../../components/modules/signup'

function SignUp() {
  return (
    <Layout>
      <CustomHeader />
      <Content className="site-layout" style={{ padding: '0px', margin: '0px' }}>
        <SignUpContent />
      </Content>
      <CustomFooter />
    </Layout>
  )
}

export default React.memo(SignUp)
