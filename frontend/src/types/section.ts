import { ILesson } from './lesson'

export interface ISection {
  _id?: string
  name?: string
  course_id?: string
  order?: number
  visible?: boolean
  lessons?: ILesson[]
}
