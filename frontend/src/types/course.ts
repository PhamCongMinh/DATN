import { IFile } from './file'

export interface ICourse {
  _id?: number
  name?: string
  tags?: string
  course_image?: IFile
  status?: string
  start_time?: Date
  end_time?: Date
  summary?: string
  start_registration?: Date
  end_registration?: Date
  introduction?: string
  content_introduction?: string
  teacher_introduction?: string
}
