import { Breadcrumb, Divider, Space, Typography } from 'antd'
import React, { useCallback, useEffect, useState } from 'react'

import styles from './style.module.scss'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import DetailDiscussContent from './components/detail-discuss'
import { ICourse } from '../../../course'
import { useSelector } from 'react-redux'
import AxiosService from '../../../../../utils/axios'
import DiscussElement from '../../../../elements/discuss'
import ButtonContained from '../../../../elements/button-custom/ButtonContainer'
import AddDiscussModal from './components/add-discuss-modal'

const { Text } = Typography

type IProps = {
  course: ICourse
}

export type IComment = {
  _id?: string
  content?: string
  author_id?: string
  rate?: number
}

export type IDiscuss = {
  _id?: string
  title?: string
  content?: string
  comments?: IComment[]
  author_id?: string
}

const Discuss: React.FC<IProps> = (props): JSX.Element => {
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isAddDiscuss, setIsAddDiscuss] = useState(false)
  const [discussData, setDiscussData] = useState<IDiscuss[]>()

  const [isOpenDetailDiscuss, setIsOpenDetailDiscuss] = useState<boolean>(false)
  const [detailDiscuss, setDetailDiscuss] = useState<IDiscuss>({} as IDiscuss)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosService.get(`/discuss/course/${props.course._id}`)
      setDiscussData(response.data)
    }
    fetchData().catch(console.error)
    setLoading(false)
  }, [isLoading, props.course._id])

  const handleClickDiscussDetail = (discuss: IDiscuss) => {
    setDetailDiscuss(discuss)
    setIsOpenDetailDiscuss(true)
  }

  const handleClickBack = () => {
    setIsOpenDetailDiscuss(false)
  }

  const handleAddDiscuss = () => {
    setIsAddDiscuss(false)
    setLoading(true)
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles['meeting-page-container']}>
          <div className={styles['meeting-page-container-head']}>
            <div className={styles['head-text']}>
              <h1 className={styles['head-text-title']}>
                Trang diễn đàn
                <span className={styles['total']}> Tổng số</span>
              </h1>
              <h2 className={styles['head-text-subtitle']}>
                Thông báo, trao đổi thông tin và thảo luận liên quan đến khóa học
              </h2>
            </div>
            <div className={styles['head-action']}>
              <ButtonContained
                onClick={() => {
                  setIsAddDiscuss(true)
                }}
                btnType="green"
                height={40}
              >
                Thêm thảo luận mới
              </ButtonContained>
            </div>
          </div>
          {isOpenDetailDiscuss === false && (
            <Space className={styles.content}>
              <div style={{ minWidth: 1008, maxHeight: 1000, overflowY: 'scroll', textAlign: 'center', marginTop: 30 }}>
                {discussData && discussData.length !== 0 ? (
                  discussData.map(discuss => (
                    <DiscussElement
                      key={discuss._id}
                      title={discuss.title}
                      content={discuss.content}
                      onClick={() => handleClickDiscussDetail(discuss)}
                    />
                  ))
                ) : (
                  <Text className={styles.text}>{'Dữ liệu không tồn tại'}</Text>
                )}
              </div>
            </Space>
          )}

          <AddDiscussModal
            open={isAddDiscuss}
            onCancel={() => {
              setIsOpenDetailDiscuss(false)
              setIsAddDiscuss(false)
              setLoading(true)
            }}
            onOk={handleAddDiscuss}
            course={props.course}
          />
        </div>
      </div>
      {isOpenDetailDiscuss === true && (
        <DetailDiscussContent discuss={detailDiscuss} handleClickBack={handleClickBack} />
      )}
    </div>
  )
}

export default React.memo(Discuss)
