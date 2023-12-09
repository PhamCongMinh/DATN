// export enum MeetingSortBy {
//   CREATED_AT = 'created_at',
//   UPDATED_AT = 'updated_at',
//   ID = 'id',
//   CONFERENCE_NAME = 'conference_name'
// }

export enum MeetingSortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export enum MeetingTimeFilter {
  ALL = '',
  LASTWEEK = 'LAST_WEEK',
  LASTMONTH = 'LAST_MONTH'
}

export enum EventFiter {
  UPCOMING = 'UPCOMING',
  PAST = 'PAST'
}

// export interface ConferencePrams {
//   eventName: string
//   location: string
//   eventType: string
//   hostedBy: string
//   startDate: string
//   endDate: string
//   organizerURL: string
//   lat: string
//   lng: string
//   city: string
//   country: string
// }

// export interface MeetingListParams {
//   limit: number
//   page: number
//   sort_by: MeetingSortBy
//   direction: MeetingSortDirection
//   time_filter?: MeetingTimeFilter
//   event_filter?: EventFiter
//   search_filter?: string
// }

export interface IQuestion {
  _id?: number
  title?: string
  status?: EQuestionStatus
  type?: EQuestionType
  created_at?: string
  updated_at?: string
  comment?: string
  difficulty_level?: EQuestionDifficultyLevel
  author_id?: string
  custom_question_id?: string
  course_id?: string
  description?: string
  points?: number
}

export enum EQuestionStatus {
  DRAFT = 'DRAFT',
  READY = 'READY'
}

export enum EQuestionDifficultyLevel {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD'
}

export enum EQuestionType {
  PROGRAMMING = 'PROGRAMMING',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK',
  SHORT_ANSWER = 'SHORT_ANSWER',
  MATCHING = 'MATCHING',
  ESSAY = 'ESSAY',
  CODE_SNIPPET = 'CODE_SNIPPET',
  MULTIPLE_ANSWER = 'MULTIPLE_ANSWER',
  ORDERING = 'ORDERING',
  EQUATION = 'EQUATION',
  HOTSPOT = 'HOTSPOT',
  QUIZ = 'QUIZ'
}

export interface IQuestionChoice {
  _id?: number
  content?: string
  point?: number
  order?: number
  description?: string
  is_correct?: boolean
  author_id?: string
}

export interface IQuestionQuiz extends IQuestion {
  question_choice?: IQuestionChoice[]
}
