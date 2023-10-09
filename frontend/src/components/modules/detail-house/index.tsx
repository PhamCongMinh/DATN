import Image from 'next/image'
import RentOutImage from '../../../assets/images/image_introduction_rentout.png'
import styles from './style.module.scss'
import { Breadcrumb, Button, Card, Col, Divider, Input, Rate, Row, Typography } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import React, { useCallback, useState } from 'react'
import { CommentType, RentNews } from '../../../types'
import { NextPage } from 'next'
import Comments from './components/comments'
import { useDispatch, useSelector } from 'react-redux'
import AxiosService from '../../../utils/axios'
import { useRouter } from 'next/router'
import House1 from '../../../assets/images/house1.jpeg'
import ConfirmationForm from './components/confirmation-form'

const { Text, Title } = Typography

const characteristic = 'Đối tượng thuê:\tTất cả\n' + 'Gói tin:\tTin VIP nổi bật\n'

type IProps = {
  rentNews: RentNews
  handleClickBack: () => void
  setReload: () => void
}

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

export interface IComment {
  comment: string
  rate: number
}

const initialComment: IComment = {
  comment: '',
  rate: 3
}

const DetailHouseContent: NextPage<IProps> = props => {
  const { rentNews } = props
  const [comment, setComment] = useState<IComment>(initialComment)
  const jwt = useSelector((state: any) => state.auth?.user?.jwt)
  const axiosService = new AxiosService('application/json', jwt)
  const router = useRouter()

  const handleChangeRate = useCallback(
    (value: number) => {
      setComment({ ...comment, rate: value })
    },
    [comment]
  )

  const handleChangeComment = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setComment({ ...comment, comment: e.target.value })
    },
    [comment]
  )

  const handleSubmitComment = useCallback(async () => {
    try {
      let isMissingInfo: boolean = false
      Object.values(comment).forEach(value => {
        if (!value) {
          alert('Bạn phải nhập đầy đủ thông tin')
          isMissingInfo = true
        }
      })
      if (isMissingInfo) return

      await axiosService.post('/comment', {
        content: comment.comment,
        rate: comment.rate,
        rentNewsId: rentNews._id
      })
      await props.setReload()
    } catch (e) {
      alert('Bạn phải đăng nhập mới có thể bình luận')
      await router.push('signin')
      console.log(e)
    }
  }, [comment, axiosService, rentNews._id, props.setReload, router])

  return (
    <div className={styles.content}>
      <Breadcrumb>
        <Breadcrumb.Item onClick={props.handleClickBack}>
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item onClick={props.handleClickBack}>
          <UserOutlined />
          <span>Thuê trọ</span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Thông tin chi tiết</Breadcrumb.Item>
      </Breadcrumb>
      <Text className={styles.title1}>
        Thông tin chi tiết nhà trọ
        <br />
      </Text>
      <Row>
        <Col span={14}>
          <Image src={House1} alt="House1" style={{ width: 800, height: 400 }} />
        </Col>
        <Col span={6} offset={2}>
          <Card title="" className={styles.card}>
            <p className={styles.text2}>
              - Nếu bạn đã tìm kiếm, liên hệ và thuê được nhà trọ trong hệ thống, hãy vui lòng cho chúng tôi biết
            </p>
            <p className={styles.text2}>
              - Hãy điền vào form dưới đây để cho chúng tôi biết bạn đã thuê nhà trọ nào để chúng tôi có thể phục vụ tốt
              hơn
            </p>
            <p className={styles.text2}>
              - Trước đó bạn cần cập nhật đầy đủ thông tin cá nhân ở mục Quản lý tài khoản để có thể điền form này{' '}
            </p>
            <ConfirmationForm setReload={props.setReload} />
          </Card>
        </Col>
      </Row>
      <div>
        <Title ellipsis={{ rows: 1 }} className={styles.title2}>
          {rentNews.title}
        </Title>
        <Text className={styles.price}>
          {'=> Địa chỉ: ' +
            rentNews.specificAddress +
            ', ' +
            rentNews.commune +
            ', ' +
            rentNews.district +
            ', ' +
            rentNews.city}{' '}
          <br />
        </Text>
        <Text className={styles.price}>
          {'=> Giá: ' + rentNews.pricePerMonth + '/tháng'}
          <br />
        </Text>
        <Text className={styles.price}>
          {'=> Diện tích: ' + rentNews.area + ' m2'}
          <br />
        </Text>
        <Text className={styles.price}>
          {'=> Mã tin đăng: ' + rentNews._id}
          <br />
        </Text>
        <Text className={styles.title3}>
          Thông tin mô tả <br />
        </Text>
        <pre className={styles.text} style={{ width: 800, whiteSpace: 'initial' }}>
          {rentNews.description}
        </pre>
        <Text className={styles.title3}>
          Đặc điểm tin đăng <br />
        </Text>
        <pre className={styles.text}>{characteristic}</pre>
        <Text className={styles.text}>
          {'Loại tin rao: ' + rentNews.rentNewsType} <br />
        </Text>
        <Text className={styles.text}>
          {'Ngày đăng: ' + rentNews.startDay} <br />
        </Text>
        <Text className={styles.text}>
          {'Ngày hết hạn: ' + rentNews.startDay}
          <br />
        </Text>
        <Text className={styles.title3}>
          Thông tin liên hệ <br />
        </Text>
        <Text className={styles.text}>
          {'Liên hệ: ' + rentNews.ownerId.username} <br />
        </Text>
        <Text className={styles.text}>
          {'Điện thoại: ' + rentNews.ownerId.numberPhone}
          <br />
        </Text>
        <Text className={styles.text}>
          {'Email: ' + rentNews.ownerId.email}
          <br />
        </Text>

        <Text className={styles.title3}>
          Bình luận <br />
        </Text>
        <Rate tooltips={desc} onChange={handleChangeRate} value={comment.rate} />
        {comment.rate ? <span className="ant-rate-text">{desc[comment.rate - 1]}</span> : ''}
        <br />
        <Input
          style={{ width: 800, marginBottom: 30, marginTop: 20 }}
          placeholder="Comment"
          onChange={e => handleChangeComment(e)}
        />
        <Button style={{ backgroundColor: '#6078f7', color: '#fff', marginLeft: 30 }} onClick={handleSubmitComment}>
          Gửi
        </Button>
        {rentNews.comments &&
          rentNews.comments.map(comment => (
            <div key={comment._id}>
              <Comments commentData={comment} />
              <Divider />
            </div>
          ))}
      </div>
    </div>
  )
}

export default DetailHouseContent
