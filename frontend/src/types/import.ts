import { IFile } from './file'

export interface IImportFile {
  asset_url?: string
  course_id?: string
  documents?: IFile
}

export interface IQuestionDataFromAI {
  question: string
  answers: string[]
}
