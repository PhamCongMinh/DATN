/* eslint-disable react/prop-types */
// // import { ReactComponent as CelanderIcon } from 'assets/icons/admin/calendar.svg'
// import ModalCustom, { ModalCustomProps } from 'components/elements/modal'
// import ButtonContained from 'components/elements/button-custom/ButtonContainer'
// import { Col, Form, Row } from 'antd'
// import CustomFormItem from 'components/elements/form-item'
// import CustomInput from 'components/elements/Input'
// import CustomDatePicker from 'components/elements/date-picker'
// import CustomSelect from 'components/elements/select'
// import ButtonOutlined from 'components/elements/button-custom/ButtonOutlined'
// import { FormInstance } from 'antd/es/form/Form'
// import styles from './style.module.scss'
// import { URL_REGEX } from 'utils/regex'
// import { handleDisableEndDate } from 'utils/functions'
// import { useEffect, useState } from 'react'
// import dayjs from 'dayjs'
// import { NextPage } from 'next'
// import { IQuestion } from '../../../../../../types/types'
//
// type Location = {
//   address: string
//   lat: number
//   lng: number
//   country: string
//   city: string
//   title: string
// }
// interface IProps extends ModalCustomProps {
//   form: FormInstance<any>
//   handleAddEvent: () => void
//   data?: IQuestion
// }
//
// const AddQuestionModal: NextPage<IProps> = ({ form, handleAddEvent, data, ...props }) => {
//   const { onCancel } = props
//
//   const [location, setLocation] = useState<Location | null>(null)
//
//   const options = [
//     { value: 'on-site-meeting', label: 'On-site meeting' },
//     { value: 'webinars', label: 'Webinars' },
//     { value: 'courses', label: 'Courses' }
//   ]
//
//   const handleSubmit = () => {
//     if (location) handleAddEvent()
//     else {
//       form.setFields([
//         {
//           name: 'location',
//           errors: ['Please select Location']
//         }
//       ])
//     }
//   }
//
//   useEffect(() => {
//     if (data) {
//       setLocation({
//         address: data.area,
//         lat: Number(data.lat),
//         lng: Number(data.lng),
//         country: data.country,
//         city: data.city,
//         title: data.area
//       })
//     }
//   }, [data])
//
//   return (
//     <ModalCustom
//       {...props}
//       width={'738px'}
//       className={styles['update-meeting-modal']}
//       headerComp={
//         <span className={styles['update-meeting-modal-title']}>
//           {/*<CelanderIcon />*/}
//           Add Meeting/Event
//         </span>
//       }
//     >
//       <Form
//         form={form}
//         className={styles['update-meeting-modal-form']}
//         onFinish={handleSubmit}
//         initialValues={{
//           event: data?.conference_name || '',
//           hostedBy: data?.cme_provider || '',
//           eventType: data?.event_type || '',
//           startDate: data?.start_date ? dayjs(data.start_date) : undefined,
//           endDate: data?.end_date ? dayjs(data.end_date) : undefined,
//           organizerURL: data?.cme_course_webpage_url,
//           location: data?.area,
//           lat: data?.lat,
//           lng: data?.lng,
//           city: data?.city,
//           country: data?.country
//         }}
//       >
//         <div className={styles['update-meeting-modal-form-input']}>
//           <Row gutter={[20, 32]}>
//             <Col span={12}>
//               <CustomFormItem
//                 mode="vertical"
//                 label="Events"
//                 name={'event'}
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Please enter event name'
//                   }
//                 ]}
//               >
//                 <CustomInput autoComplete="off" placeholder="Enter Event Name" />
//               </CustomFormItem>
//             </Col>
//             <Col span={12}>
//               <CustomFormItem
//                 mode="vertical"
//                 label="Hosted By"
//                 name="hostedBy"
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Please enter organizer name'
//                   }
//                 ]}
//               >
//                 <CustomInput placeholder="Enter Organizer Name" />
//               </CustomFormItem>
//             </Col>
//           </Row>
//           <Row gutter={[20, 32]}>
//             <Col span={12}>
//               <CustomFormItem
//                 mode="vertical"
//                 label="Event Type"
//                 name={'eventType'}
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Please select event type'
//                   }
//                 ]}
//               >
//                 <CustomSelect placeholder="Select Event Type" options={options} />
//               </CustomFormItem>
//             </Col>
//             <Col span={12} className={styles['form-date']}>
//               <label htmlFor="" className={styles['form-date-label']}>
//                 Select Date
//               </label>
//               <div className={styles['form-date-input-wrap']}>
//                 <CustomFormItem
//                   name={'startDate'}
//                   rules={[
//                     {
//                       required: true,
//                       message: 'Please select start date'
//                     }
//                   ]}
//                 >
//                   <CustomDatePicker
//                     format={'DD-MM-YYYY'}
//                     suffixIcon={<></>}
//                     disabledDate={curDate => handleDisableEndDate(curDate, form)}
//                   />
//                 </CustomFormItem>
//
//                 <span className={styles['form-date-text']}>to</span>
//
//                 <CustomFormItem
//                   name={'endDate'}
//                   rules={[
//                     {
//                       required: true,
//                       message: 'Please select end date'
//                     }
//                   ]}
//                 >
//                   <CustomDatePicker
//                     format={'DD-MM-YYYY'}
//                     suffixIcon={<></>}
//                     disabledDate={curDate => handleDisableEndDate(curDate, form)}
//                   />
//                 </CustomFormItem>
//               </div>
//             </Col>
//           </Row>
//           <Row gutter={[20, 32]}>
//             <Col span={12}>
//               <CustomFormItem
//                 mode="vertical"
//                 label="Select Location"
//                 name={'location'}
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Please select location'
//                   }
//                 ]}
//               ></CustomFormItem>
//             </Col>
//             <Col span={12}>
//               <CustomFormItem
//                 mode="vertical"
//                 label="Organizer URL"
//                 name={'organizerURL'}
//                 rules={[
//                   () => ({
//                     validator: (_, value) => {
//                       if (!value) {
//                         return Promise.reject('Please enter organizer URL')
//                       }
//                       if (!URL_REGEX.test(value)) {
//                         return Promise.reject('Invalid URL')
//                       }
//                       return Promise.resolve()
//                     }
//                   })
//                 ]}
//               >
//                 <CustomInput autoComplete="off" placeholder="https://www.anyevent.com/event/" />
//               </CustomFormItem>
//             </Col>
//           </Row>
//         </div>
//         <div className={styles['update-meeting-modal-form-action']}>
//           <ButtonOutlined onClick={onCancel} className={styles['cancel-btn']} type="link">
//             Cancel
//           </ButtonOutlined>
//           <ButtonContained className={styles['continue-btn']} btnType="dark" onClick={() => form.submit()}>
//             {data ? 'Edit Event' : 'Add Event'}
//           </ButtonContained>
//         </div>
//       </Form>
//     </ModalCustom>
//   )
// }
//
// export default AddQuestionModal

export const Test = () => {
  return (
    <div>
      <h1>Test</h1>
    </div>
  )
}
