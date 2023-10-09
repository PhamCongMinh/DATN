import { Layout } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import ErrorPage from 'next/error'
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'

import CustomHeader from '../../components/layouts/header'
import CustomFooter from '../../components/layouts/footer'
import { AxiosService } from '../../utils/axios'
import BlogContent from '../../components/modules/blog'
import { BlogType } from '../../types'
import React from 'react'

type IProps = {
  blog: BlogType[]
}
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const axiosService = new AxiosService('application/json')
  const response = await axiosService.get('/blog')
  const data: BlogType[] = response['data']

  return {
    props: { blog: data }
  }
}

const Blog: NextPage<IProps> = props => {
  if (!props.blog) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout>
      <CustomHeader />
      <Content className="site-layout" style={{ padding: '0px', margin: '0px' }}>
        <BlogContent data={props.blog} />
      </Content>
      <CustomFooter />
    </Layout>
  )
}

export default React.memo(Blog)
