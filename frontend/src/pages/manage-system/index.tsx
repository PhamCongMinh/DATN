import { Layout } from 'antd'
import CustomHeader from '../../components/layouts/header'
import { Content } from 'antd/lib/layout/layout'
import CustomFooter from '../../components/layouts/footer'
import React from 'react'
import ManageSystemContent from '../../components/modules/manage-system'

function ManageSystem() {
  return (
    <Layout>
      <CustomHeader />
      <Content className="site-layout" style={{ padding: '0px', margin: '0px', minHeight: 1100 }}>
        <ManageSystemContent />
      </Content>
      <CustomFooter />
    </Layout>
  )
}

export default ManageSystem
