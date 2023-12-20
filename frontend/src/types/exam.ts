export interface IExam {
  _id?: number
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
  question_point?: IQuestionPoint[]
  author_id?: string
  comment?: string
  course_id?: string
}

export interface IQuestionPoint {
  _id?: number
  point?: number
  order?: number
  question_id?: boolean
  author_id?: string
  automatically_graded?: boolean
  created_at?: string
  updated_at?: string
}
