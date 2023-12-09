import ModalCustom, { ModalCustomProps } from '../modal'
// import { ReactComponent as DeleteFormIcon } from 'assets/icons/admin/trash-form.svg'
// import { ReactComponent as CloseIcon } from 'assets/icons/admin/close.svg'
import ButtonOutlined from '../button-custom/ButtonOutlined'
import ButtonContained from '../button-custom/ButtonContainer'
import PropTypes from 'prop-types'
import styles from './style.module.scss'
import { Button } from 'antd'

interface IProps extends ModalCustomProps {
  handleDeleteAdmin: () => void
  content: string | React.ReactNode
}

const RemovedModal = ({ content, handleDeleteAdmin, ...props }: IProps) => {
  const { onCancel } = props
  return (
    <ModalCustom {...props} className={styles['remove-admin-modal']}>
      {/*<DeleteFormIcon />*/}

      <h2 className={styles['remove-admin-modal-title']}>Are you sure?</h2>
      <p className={styles['remove-admin-modal-subtitle']}>{content}</p>

      <span className={styles['remove-admin-modal-action']}>
        <ButtonOutlined className={styles['btn cancel-btn']} btnType="text-dark" height={44} onClick={onCancel}>
          Cancel
        </ButtonOutlined>
        <ButtonContained className={styles['btn']} btnType="green" onClick={() => handleDeleteAdmin()}>
          Remove
        </ButtonContained>
      </span>

      <Button type="link" className={styles['close-btn']} onClick={onCancel}>
        {/*<CloseIcon />*/}
      </Button>
    </ModalCustom>
  )
}

RemovedModal.propTypes = {
  onCancel: PropTypes.func
}

export default RemovedModal
