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
  _id?: string
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
  question_choice?: IQuestionChoice[]

  memory_limit?: number
  time_limit?: number
  example_output?: string
  example_input?: string
  test_cases?: string[]
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
  ONE_CHOICE = 'ONE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SHORT_ANSWER = 'SHORT_ANSWER',
  ESSAY = 'ESSAY',

  PROGRAMMING = 'PROGRAMMING',
  SELECT_MISSING_WORD = 'SELECT_MISSING_WORD',
  CALCULATED_SIMPLE = 'CALCULATED_SIMPLE',
  MATCHING = 'MATCHING',
  ORDERING = 'ORDERING'
}

export interface IQuestionChoice {
  _id?: string
  content?: string
  point?: number
  order?: number
  description?: string
  is_correct?: boolean
  author_id?: string
}
