import React, { useCallback, useState } from 'react'
import { Breadcrumb, Card, Col, Divider, Input, List, Row, Space, Typography } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'

import styles from './style.module.scss'
import SubContent from '../../../rent/components/subcontent'
import Course from '../../../../elements/course'
import { CommentType, RentalStatus, RentNews, RentNewsType, User } from '../../../../../types'
import { TSearch } from '../../../rent'
import { ICourse } from '../../index'

const { Text, Title } = Typography

interface IProps {
  data: ICourse[]
  handleSearch: (searchData: TSearchCourse) => void
  appliedFilter: TSearchCourse
  setReload: () => void
  openDetailCourse: (course: ICourse) => void
}

export type TSearchCourse = {
  status?: string
  tag?: string
  author?: string
}

const initialState: TSearchCourse = {}

const ManagementCourse: React.FC<IProps> = (props): JSX.Element => {
  const [extendedFilter, setExtendedFilter] = useState<boolean>(false)
  const [state, setState] = useState<TSearchCourse>(initialState)
  // const [isOpenDetailCourse, setIsOpenDetailCourse] = useState<boolean>(false)
  const [detailHouse, setDetailHouse] = useState<any>({} as any)

  const handleClickCourseDetail = useCallback(
    (course: ICourse) => {
      setDetailHouse(course)
      props.openDetailCourse(course)
    },
    [props]
  )

  return (
    <div>
      <div className={styles.content}>
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">
            <UserOutlined />
            <span>Quản lý</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Khóa học</Breadcrumb.Item>
        </Breadcrumb>
        <Text className={styles.title1}>Danh sách khóa học</Text>
        <Divider style={{ width: 1215, margin: 0 }}></Divider>
        <Space className={styles.sub_content}>
          {props.data.length !== 0 ? (
            <List
              grid={{ gutter: 30 }}
              dataSource={props.data}
              renderItem={(course: ICourse) => (
                <List.Item key={course._id}>
                  <Course
                    key={course._id}
                    name={course.name}
                    tag={course.tags}
                    status={course.status}
                    author={course.author}
                    onClick={() => handleClickCourseDetail(course)}
                  />
                </List.Item>
              )}
              pagination={{ position: 'bottom' }}
            />
          ) : (
            <Text className={styles.text}>{'Dữ liệu không tồn tại'}</Text>
          )}
        </Space>
      </div>
    </div>
  )
}

export default ManagementCourse
