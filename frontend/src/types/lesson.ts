import { IFile } from './file'

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
  _id?: string
  course_id?: string
  section_id?: string
  order?: number
  name?: string
  embed_file?: string
  description?: string
  documents?: IFile
  exam?: string
  type?: LessonType
}
