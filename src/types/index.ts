
export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  section: string;
  rollNo: string;
  contactNumber: string;
  address: string;
  dateOfBirth: string;
  gender: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  description: string;
  dueDate: string;
  status: "upcoming" | "ongoing" | "completed";
  totalMarks: number;
  assignedTo: string[];
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submissionDate: string;
  status: "pending" | "graded";
  obtainedMarks?: number;
  feedback?: string;
}

export interface Exam {
  id: string;
  name: string;
  subject: string;
  date: string;
  totalMarks: number;
  examType: "quiz" | "midterm" | "final" | "other";
}

export interface ExamResult {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  remarks: string;
}
