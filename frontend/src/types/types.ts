export enum MeetingSortBy {
  CREATED_AT = 'created_at',
  UPDATED_AT = 'updated_at',
  ID = 'id',
  CONFERENCE_NAME = 'conference_name',
}

export enum MeetingSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum MeetingTimeFilter {
  ALL = '',
  LASTWEEK = 'LAST_WEEK',
  LASTMONTH = 'LAST_MONTH',
}

export enum EventFiter {
  UPCOMING = 'UPCOMING',
  PAST = 'PAST',
}

export interface ConferencePrams {
  eventName: string;
  location: string;
  eventType: string;
  hostedBy: string;
  startDate: string;
  endDate: string;
  organizerURL: string;
  lat: string;
  lng: string;
  city: string;
  country: string;
}

export interface MeetingListParams {
  limit: number;
  page: number;
  sort_by: MeetingSortBy;
  direction: MeetingSortDirection;
  time_filter?: MeetingTimeFilter;
  event_filter?: EventFiter;
  search_filter?: string;
}

export interface IConference {
  id: number;
  created_at: string;
  updated_at: string;
  conference_name: string;
  start_date: string;
  end_date: string;
  cme_provider: string;
  area: string;
  country: string;
  city: string;
  lat: string;
  lng: string;
  description: string;
  instructors: string;
  cme_credit: string;
  self_assessment_module: boolean;
  crawl_url: string;
  cme_course_webpage_url: string;
  course_type: string;
  profession: string;
  conference_background_image: string;
  price: string;
  event_type: string;
}
