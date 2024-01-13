import ButtonOutlined from '../button-custom/ButtonOutlined'
import styles from '../noti-modal/style.module.scss'
import { Space } from 'antd'

interface IProps {
  totalPage: number
  page: number
  onBack: () => void
  onNext: () => void
}

export const PageNumberCustom = ({ totalPage, page, onBack, onNext }: IProps) => {
  return (
    <Space style={{ marginTop: 10 }}>
      <ButtonOutlined onClick={onBack} size="small">
        Back
      </ButtonOutlined>
      <div>
        {page} of {totalPage}
      </div>
      <ButtonOutlined onClick={onNext} size="small">
        Next
      </ButtonOutlined>
    </Space>
  )
}
