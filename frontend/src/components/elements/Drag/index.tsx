import { UploadProps } from 'antd'
import Dragger from 'antd/es/upload/Dragger'
import { DraggerProps } from 'antd/lib/upload'
// import { UploadImageIcon } from 'assets/icons'
import styles from './style.module.scss'

interface IProps extends DraggerProps {
  img?: string
  dragProps: UploadProps
  textFile?: string
}

const CustomDrag = ({
  // img = UploadImageIcon,
  className,
  textFile = 'SVG, PNG, JPG or GIF (max. 800x400px)',
  dragProps
}: IProps) => {
  return (
    <Dragger {...dragProps} className={styles[`custom-drag-container ${className}`]}>
      {/*<p className={styles['ant-upload-drag-icon']}>*/}
      {/*  <img src={img} alt="upload-icon" />*/}
      {/*</p>*/}
      <div className={styles['ant-upload-text']}>
        <p className={styles['first-text']}>
          <span>Click to upload</span>or drag and drop
        </p>
        <p className={styles['second-text']}>{textFile}</p>
      </div>
    </Dragger>
  )
}

export default CustomDrag
