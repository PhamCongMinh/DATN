import { Alert, Layout } from 'antd'
import CustomHeader from '../../components/layouts/header'
import { Content } from 'antd/lib/layout/layout'
import CustomFooter from '../../components/layouts/footer'
import React from 'react'
import ManageAccountContent from '../../components/modules/manage-account'

function ManageAccount() {
  return (
    <Layout>
      <CustomHeader />
      <Content className="site-layout" style={{ padding: '0px', margin: '0px', minHeight: 1100 }}>
        <ManageAccountContent />
      </Content>
      <CustomFooter />
    </Layout>
  )
}

export default React.memo(ManageAccount)
