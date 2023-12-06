import ModalCustom, { ModalCustomProps } from '../Modal'
import { ReactComponent as DeleteFormIcon } from 'assets/icons/admin/trash-form.svg'
import { ReactComponent as CloseIcon } from 'assets/icons/admin/close.svg'
import ButtonOutlined from '../ButtonCustom/ButtonOutlined'
import ButtonContained from '../ButtonCustom/ButtonContainer'
import PropTypes from 'prop-types'
import './style.module.scss'
import { Button } from 'antd'

interface IProps extends ModalCustomProps {
  handleDeleteAdmin: () => void
  content: string | React.ReactNode
}

const RemovedModal = ({ content, handleDeleteAdmin, ...props }: IProps) => {
  const { onCancel } = props
  return (
    <ModalCustom {...props} className="remove-admin-modal">
      <DeleteFormIcon />

      <h2 className="remove-admin-modal-title">Are you sure?</h2>
      <p className="remove-admin-modal-subtitle">{content}</p>

      <span className="remove-admin-modal-action">
        <ButtonOutlined className="btn cancel-btn" btnType="text-dark" height={44} onClick={onCancel}>
          Cancel
        </ButtonOutlined>
        <ButtonContained className="btn" btnType="green" onClick={() => handleDeleteAdmin()}>
          Remove
        </ButtonContained>
      </span>

      <Button type="link" className="close-btn" onClick={onCancel}>
        <CloseIcon />
      </Button>
    </ModalCustom>
  )
}

RemovedModal.propTypes = {
  onCancel: PropTypes.func
}

export default RemovedModal
