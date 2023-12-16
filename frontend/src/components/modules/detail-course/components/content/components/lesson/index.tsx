// import React, { useState } from 'react'
// import produce from 'immer'
// import { UploadOutlined } from '@ant-design/icons'
// import { serialize } from 'object-to-formdata'
// import {
//   Button,
//   Col,
//   DatePicker,
//   DatePickerProps,
//   Input,
//   message,
//   Modal,
//   Row,
//   Select,
//   Typography,
//   Upload,
//   UploadProps
// } from 'antd'
//
// import { AxiosService } from '../../../../../../../utils/axios'
// import styles from './style.module.scss'
// import { useSelector } from 'react-redux'
// import dayjs, { Dayjs } from 'dayjs'
// import { RentNewsType } from '../../../../../../../types'
// import { ICourse } from '../../../../../course'
// import { TSearchCourse } from '../../../../../course/components/management-course'
// import { InboxOutlined } from '@ant-design/icons'
//
// const { Dragger } = Upload
//
// const { TextArea } = Input
// const { Text } = Typography
//
// interface IProps {
//   // open: boolean
//   // onOk: () => void
//   // onCancel: () => void
//   // setReload: () => void
//   // openDetailCourse: (course: any) => void
// }
//
// interface ICreateRentalNews {}
//
// const initialState: ICreateRentalNews = {}
//
// const Lesson: React.FC<IProps> = (props): JSX.Element => {
//   const [state, setState] = useState<ICreateRentalNews>(initialState)
//   const [image, setImage] = useState<any>()
//   const jwt = useSelector((state: any) => state.auth?.user?.jwt)
//   const axiosService = new AxiosService('multipart/form-data', jwt)
//
//   // const handleChange = (
//   //   key: string,
//   //   e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
//   // ) => {
//   //   setState((prev: ICreateRentalNews) =>
//   //     produce(prev, draft => {
//   //       // @ts-ignore
//   //       draft[key] = (key === 'pricePerMonth') | (key === 'area') ? Number(e.target.value) : e.target.value
//   //     })
//   //   )
//   // }
//   //
//   // const handleChangeDate = (date: Dayjs | null, dateString: string, key: string) => {
//   //   setState((prev: ICreateRentalNews) =>
//   //     produce(prev, draft => {
//   //       // @ts-ignore
//   //       draft[key] = dateString
//   //     })
//   //   )
//   // }
//   //
//   // const handleSelectRentNewsType = (value: string) => {
//   //   setState((prev: ICreateRentalNews) =>
//   //     produce(prev, draft => {
//   //       // @ts-ignore
//   //       draft['rentNewsType'] = value
//   //     })
//   //   )
//   // }
//   //
//   // const props: UploadProps = {
//   //   name: 'file',
//   //   // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//   //   // headers: {
//   //   //   authorization: 'authorization-text'
//   //   // },
//   //   multiple: false,
//   //   // showUploadList: false,
//   //   accept: 'image/png,image/gif,image/jpeg',
//   //   onChange(info) {
//   //     if (info.file.status !== 'uploading') {
//   //       console.log(info.file, info.fileList)
//   //     }
//   //     if (info.file.status === 'done') {
//   //       message.success(`${info.file.name} file uploaded successfully`)
//   //       setImage(info.file.originFileObj)
//   //     } else if (info.file.status === 'error') {
//   //       message.error(`${info.file.name} file upload failed.`)
//   //     }
//   //   }
//   // }
//   //
//   // const checkUpdatedInfo = async () => {
//   //   const response = await axiosService.get('/auth/check-updated-information')
//   //   console.log(response)
//   //   return response.data.isUpdatedInfo
//   // }
//   //
//   // const handleSubmit = async () => {
//   //   const isUpdatedInfo = await checkUpdatedInfo()
//   //   if (!isUpdatedInfo) {
//   //     alert(
//   //       'Bạn chưa cập nhật thêm thông tin cá nhân cần thiết, vui lòng truy cập mục Quản lý tài khoản -> Cập nhật thông tin cá nhân để cập nhật thêm thông tin'
//   //     )
//   //     return
//   //   }
//   //
//   //   try {
//   //     const formData = serialize(state)
//   //     formData.append('image', image)
//   //     console.log(formData)
//   //     const response = await axiosService.post('/rent-out', formData)
//   //     console.log(response)
//   //     message.success(`Tạo tin thành công`)
//   //   } catch (error) {
//   //     alert('Tạo tin thất bại, vui lòng kiểm tra lại thông tin trước khi thử lại')
//   //     console.log(error)
//   //   }
//   // }
//
//   const uploadProps1: UploadProps = {
//     name: 'file',
//     // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//     // headers: {
//     //   authorization: 'authorization-text'
//     // },
//     multiple: false,
//     // showUploadList: false,
//     accept: 'image/png,image/gif,image/jpeg',
//     onChange(info) {
//       if (info.file.status !== 'uploading') {
//         console.log(info.file, info.fileList)
//       }
//       if (info.file.status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully`)
//         setImage(info.file.originFileObj)
//       } else if (info.file.status === 'error') {
//         message.error(`${info.file.name} file upload failed.`)
//       }
//     }
//   }
//
//   const uploadProps: UploadProps = {
//     name: 'file',
//     multiple: true,
//     action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
//     onChange(info) {
//       const { status } = info.file
//       if (status !== 'uploading') {
//         console.log(info.file, info.fileList)
//       }
//       if (status === 'done') {
//         message.success(`${info.file.name} file uploaded successfully.`)
//       } else if (status === 'error') {
//         message.error(`${info.file.name} file upload failed.`)
//       }
//     },
//     onDrop(e) {
//       console.log('Dropped files', e.dataTransfer.files)
//     }
//   }
//
//   return (
//     <>
//       <Text className={styles.title3} style={{ marginTop: 20 }}>
//         Tên bài học
//         <br />
//       </Text>
//     </>
//   )
// }
//
// export default Lesson
