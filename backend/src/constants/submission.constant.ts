export enum ESubmissionLanguage {
  C_PLUS = 'C++',
  JAVASCRIPT = 'JAVASCRIPT',
}

export enum ESubmissionStatus {
  PENDING = 'PENDING',
  COMPILE_ERROR = 'COMPILE_ERROR',
  TIME_LIMIT_EXCEEDED = 'TIME_LIMIT_EXCEEDED',
  MEMORY_LIMIT_EXCEEDED = 'MEMORY_LIMIT_EXCEEDED',
  ACCEPTED = 'ACCEPTED',
  NOT_CORRECT_WITH_ALL_TEST_CASES = 'NOT_CORRECT_WITH_ALL_TEST_CASES',
  WRONG_ANSWER = 'WRONG_ANSWER',
}
