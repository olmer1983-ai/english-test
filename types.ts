export interface AnswerOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: AnswerOption[];
  correctAnswerId: string;
}

export interface Test {
  id: string;
  title: string;
  teacherName: string;
  questions: Question[];
}

export interface StudentAnswer {
  questionId: string;
  selectedAnswerId: string;
}

export interface TestSubmission {
  id: string;
  studentName: string;
  testId: string;
  testTitle: string;
  answers: StudentAnswer[];
  score: number;
  totalQuestions: number;
  submittedAt: string;
}

export enum Role {
  NONE,
  TEACHER,
  STUDENT
}
