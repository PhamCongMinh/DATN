import { Breadcrumb, Divider, Space, Typography } from 'antd'
import React, { useCallback, useState } from 'react'
import { BlogType } from '../../../types'

import styles from './style.module.scss'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import Blog from '../../elements/blog'
import DetailBlogContent from './components/detail-blog'

const { Text } = Typography

interface IProps {
  data: BlogType[]
}

const BlogContent: React.FC<IProps> = (props): JSX.Element => {
  const [isOpenDetailBlog, setIsOpenDetailBlog] = useState<boolean>(false)
  const [detailBlog, setDetailBlog] = useState<BlogType>({} as BlogType)

  const handleClickHouseDetail = useCallback((blogType: BlogType) => {
    setDetailBlog(blogType)
    setIsOpenDetailBlog(true)
    console.log('blogType', blogType)
  }, [])

  const handleClickBack = useCallback(() => {
    setIsOpenDetailBlog(false)
  }, [])

  return (
    <div>
      {isOpenDetailBlog === false && (
        <div className={styles.container}>
          <Breadcrumb style={{ marginLeft: 150 }}>
            <Breadcrumb.Item>
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <UserOutlined />
              <span>Trang chủ</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Blog</Breadcrumb.Item>
          </Breadcrumb>
          <Text className={styles.title1} style={{ marginLeft: 150 }}>
            Blog
          </Text>
          <Divider style={{ marginTop: 10 }} />

          <Space className={styles.content}>
            <div style={{ minWidth: 1008, textAlign: 'center' }}>
              {props.data.length !== 0 ? (
                props.data.map(blog => (
                  <Blog
                    key={blog._id}
                    title={blog.title}
                    description={blog.content}
                    onClick={() => handleClickHouseDetail(blog)}
                  />
                ))
              ) : (
                <Text className={styles.text}>{'Dữ liệu không tồn tại'}</Text>
              )}
            </div>
          </Space>
        </div>
      )}
      {isOpenDetailBlog === true && <DetailBlogContent rentNews={detailBlog} handleClickBack={handleClickBack} />}
    </div>
  )
}

export default React.memo(BlogContent)
