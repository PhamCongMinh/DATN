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
  id: number
  title?: string
  status?: EQuestionStatus
  type?: string
  created_at?: string
  updated_at?: string
  comment?: string
  difficulty_level?: EQuestionDifficultyLevel
  author_id?: string
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
