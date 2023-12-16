export enum LessonType {
  video = 'video',
  pdf = 'pdf',
  text = 'text',
  audio = 'audio',
  quiz = 'quiz',
  survey = 'survey',
  assignment = 'assignment',
  exam = 'exam'
}

export interface ILesson {
  _id?: number
  course_id?: string
  section_id?: string
  order?: number
  name?: string
  description?: string
  documents?: string[]
}
