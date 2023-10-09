import { Layout, Skeleton, Spin } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import { NextPage } from 'next'

import CustomHeader from '../../components/layouts/header'
import RentContent, { TSearch } from '../../components/modules/rent'
import CustomFooter from '../../components/layouts/footer'
import { RentNews } from '../../types'
import { handleURLWhenClickSearchButton, parseUrlToJson, parseUrlToJson2 } from '../../utils/url'
import { AxiosService } from '../../utils/axios'
import React, { useEffect, useState } from 'react'

// type IProps = {
//   rentNews: RentNews[]
//   appliedFilter: TSearch
// }
// export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
//   const url = parseUrlToJson(context)
//   const axiosService = new AxiosService('application/json')
//   const response = await axiosService.get('/rent', { params: url })
//   const data: RentNews[] = response['data']
//
//   return {
//     props: { rentNews: data, appliedFilter: url }
//   }
// }

const Rent: NextPage = props => {
  const router = useRouter()
  const initialUrl = '/rent'
  const [reload, setReload] = useState<boolean>(false)
  const [rentNews, setRentNews] = useState<RentNews[]>()
  const [appliedFilter, setAppliedFilter] = useState<TSearch>({})
  console.log('reload', reload)

  useEffect(() => {
    const url = parseUrlToJson2(router.query)
    const axiosService = new AxiosService('application/json')
    const fetchData = async () => {
      const response = await axiosService.get('/rent', { params: url })
      const data: RentNews[] = response.data
      setRentNews(data)
      setReload(false)
      setAppliedFilter(url)
    }
    fetchData()
  }, [reload])

  if (!rentNews) {
    return (
      <Layout>
        <CustomHeader />
        <Content className="site-layout" style={{ padding: '0px', margin: '0px' }}></Content>
      </Layout>
    )
  }

  const handleClickSearchButton = async (searchData: TSearch) => {
    console.log('searchData', searchData)
    const url = handleURLWhenClickSearchButton(initialUrl, searchData)
    await router.push(url)
  }

  const handleReload = () => {
    setReload(true)
  }

  return (
    <Layout>
      <CustomHeader />
      <Content className="site-layout" style={{ padding: '0px', margin: '0px' }}>
        <RentContent
          data={rentNews}
          handleSearch={handleClickSearchButton}
          appliedFilter={appliedFilter}
          setReload={handleReload}
        />
      </Content>
      <CustomFooter />
    </Layout>
  )
}

export default Rent
