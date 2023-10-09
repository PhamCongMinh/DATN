import { Alert, Layout } from 'antd'
import CustomHeader from '../../components/layouts/header'
import { Content } from 'antd/lib/layout/layout'
import CustomFooter from '../../components/layouts/footer'
import SignUpContent from '../../components/modules/signup'
import SignInContent from '../../components/modules/signin'
import RentOutContent from '../../components/modules/rentout'
import React from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

function RentOut() {
  return (
    <Layout>
      <CustomHeader />
      <Content className="site-layout" style={{ padding: '0px', margin: '0px', minHeight: 1100 }}>
        <RentOutContent />
      </Content>
      <CustomFooter />
    </Layout>
  )
}

export default React.memo(RentOut)
