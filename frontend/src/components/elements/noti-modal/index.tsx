import { ReactComponent as SuccessIcon } from 'assets/icons/common/success-icon.svg'
import { ReactComponent as FailedIcon } from 'assets/icons/common/failed-icon.svg'
import { Modal, ModalProps } from 'antd'
import styles from './style.module.scss'

interface INotiModal extends ModalProps {
  open: boolean
  type: 'success' | 'failed'
  title?: string
  text: string
}

const NotiModal = ({ type, title, text, open, ...props }: INotiModal) => {
  const renderContent = () => {
    switch (type) {
      case 'success':
        return (
          <>
            <SuccessIcon />
            <h1 className={styles['noti-modal-title']}>{title ? title : 'Success'}</h1>
            <span className={styles['noti-modal-text']}>{text}</span>
          </>
        )
      case 'failed':
        return (
          <>
            <FailedIcon />
            <h1 className={styles['noti-modal-title']}>{title ? title : 'Failed'}</h1>
            <span className={styles['noti-modal-text']}>{text}</span>
          </>
        )
    }
  }

  return (
    <Modal {...props} width={400} open={open} footer={false} closeIcon={false} centered>
      <div className={styles['noti-modal']}>{renderContent()}</div>
    </Modal>
  )
}

export default NotiModal
