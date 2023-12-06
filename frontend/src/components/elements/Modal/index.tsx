import { Modal, ModalProps } from 'antd'
import React from 'react'
import styles from './style.module.scss'

export interface ModalCustomProps extends ModalProps {
  headerComp?: JSX.Element
}

const ModalCustom = ({ children, headerComp, footer, width, className, closeIcon, ...props }: ModalCustomProps) => {
  return (
    <Modal
      width={width ? width : '428px'}
      footer={footer ? footer : null}
      destroyOnClose={true}
      closeIcon={closeIcon ? closeIcon : false}
      className={styles[`awayday-modal ${className ? className : ''}`]}
      {...props}
    >
      {headerComp && <div className={styles['header-wrap']}>{headerComp}</div>}
      <div className={styles['modal-container']}>{children}</div>
    </Modal>
  )
}

export default ModalCustom
