import React, { useCallback, useState } from 'react'
import { Breadcrumb, Card, Col, Divider, Input, List, Row, Space, Typography } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'

import styles from './style.module.scss'
import SubContent from '../../../rent/components/subcontent'
import Course from '../../../../elements/course'
import { CommentType, RentalStatus, RentNews, RentNewsType, User } from '../../../../../types'
import { TSearch } from '../../../rent'

const { Text, Title } = Typography

interface IProps {
  data: CourseOverview[]
  handleSearch: (searchData: TSearchCourse) => void
  appliedFilter: TSearchCourse
  setReload: () => void
  openDetailCourse: (course: any) => void
}

export type TSearchCourse = {
  status?: string
  tag?: string
  author?: string
}

export type CourseOverview = {
  _id: string
  author: string
  name: string
  tag: string
  status: string
}

const initialState: TSearchCourse = {}

const ManagementCourse: React.FC<IProps> = (props): JSX.Element => {
  const [extendedFilter, setExtendedFilter] = useState<boolean>(false)
  const [state, setState] = useState<TSearchCourse>(initialState)
  // const [isOpenDetailCourse, setIsOpenDetailCourse] = useState<boolean>(false)
  const [detailHouse, setDetailHouse] = useState<any>({} as any)

  const handleClickCourseDetail = useCallback(
    (course: any) => {
      setDetailHouse(course)
      props.openDetailCourse(true)
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
        <Divider style={{ width: 1350, margin: 0 }}></Divider>
        <Space className={styles.sub_content}>
          {props.data.length !== 0 ? (
            <List
              grid={{ gutter: 15, column: 4 }}
              dataSource={props.data}
              renderItem={course => (
                <List.Item>
                  <Course
                    key={course._id}
                    name={course.name}
                    tag={course.tag}
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
