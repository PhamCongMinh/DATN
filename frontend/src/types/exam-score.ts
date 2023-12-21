import { IExamSubmit } from './exam-submit'
import { IExam } from './exam'

export interface IExamScore {
  _id?: number
  author_id?: IUser
  exam?: IExam
  exam_submit?: IExamSubmit
  total_point?: number
  correct_answer?: number
  score?: number
  created_at?: string
  updated_at?: string
}

export interface IUser {
  _id?: string
  email?: string
  username?: string
  password?: string
  role?: string
  numberPhone?: string
  zaloPhone?: string
  facebookUrl?: string
  avatarUrl?: string
}
