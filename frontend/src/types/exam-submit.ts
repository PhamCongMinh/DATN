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
