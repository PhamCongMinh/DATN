import { IQuestion } from './types'

export interface IExamSubmit {
  _id?: number
  author_id?: string
  exam?: string
  answers?: IAnswer[]
  status?: EExamSubmitStatus
  score?: number
  correct_answer?: number
  start_time?: Date
  end_time?: Date
  created_at?: string
  updated_at?: string
}

export enum EExamSubmitStatus {
  DOING = 'DOING',
  DONE = 'DONE'
}

export interface IAnswer {
  _id?: number
  author_id?: string
  question_point?: string
  is_correct_answer?: boolean
  submitted_time?: Date
  question_choice?: string[]
  answer?: string
  created_at?: string
  updated_at?: string
}

export interface IDetailExam {
  _id?: string
  name?: string
  exam_id?: string
  password?: string
  exam_time?: number
  created_at?: string
  updated_at?: string
  point_ladder?: number
  pass_point?: number
  description?: string
  evaluation_criteria?: string
  retry_times_number?: number
  start_time?: string
  end_time?: string
  question_point?: IDetailQuestionPoint[]
  author_id?: string
  comment?: string
  course_id?: string
}

export interface IDetailQuestionPoint {
  _id?: string
  point?: number
  order?: number
  question_id?: IQuestion
  author_id?: string
  automatically_graded?: boolean
  created_at?: string
  updated_at?: string
}
