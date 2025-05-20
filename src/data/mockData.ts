
import { Student, Assignment, AssignmentSubmission, Exam, ExamResult } from "../types";

export const students: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    grade: "10",
    section: "A",
    rollNo: "10A01",
    contactNumber: "123-456-7890",
    address: "123 Main St, Anytown",
    dateOfBirth: "2005-05-15",
    gender: "Male",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    grade: "10",
    section: "A",
    rollNo: "10A02",
    contactNumber: "123-456-7891",
    address: "456 Oak St, Anytown",
    dateOfBirth: "2005-08-22",
    gender: "Female",
  },
  {
    id: "3",
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    grade: "10",
    section: "B",
    rollNo: "10B01",
    contactNumber: "123-456-7892",
    address: "789 Pine St, Anytown",
    dateOfBirth: "2005-03-10",
    gender: "Male",
  },
  {
    id: "4",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    grade: "10",
    section: "B",
    rollNo: "10B02",
    contactNumber: "123-456-7893",
    address: "101 Elm St, Anytown",
    dateOfBirth: "2005-11-27",
    gender: "Female",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    grade: "11",
    section: "A",
    rollNo: "11A01",
    contactNumber: "123-456-7894",
    address: "202 Cedar St, Anytown",
    dateOfBirth: "2004-07-14",
    gender: "Male",
  }
];

export const assignments: Assignment[] = [
  {
    id: "1",
    title: "Math Problem Set",
    subject: "Mathematics",
    description: "Complete problems 1-20 from Chapter 5",
    dueDate: "2025-05-25",
    status: "upcoming",
    totalMarks: 50,
    assignedTo: ["1", "2", "3", "4", "5"],
  },
  {
    id: "2",
    title: "Science Lab Report",
    subject: "Science",
    description: "Write a lab report for the plant growth experiment",
    dueDate: "2025-05-28",
    status: "upcoming",
    totalMarks: 100,
    assignedTo: ["1", "2", "3", "4", "5"],
  },
  {
    id: "3",
    title: "History Essay",
    subject: "History",
    description: "Write a 1000-word essay on the Industrial Revolution",
    dueDate: "2025-06-05",
    status: "upcoming",
    totalMarks: 75,
    assignedTo: ["1", "2", "5"],
  },
  {
    id: "4",
    title: "English Book Report",
    subject: "English",
    description: "Write a book report on 'To Kill a Mockingbird'",
    dueDate: "2025-06-10",
    status: "upcoming",
    totalMarks: 60,
    assignedTo: ["3", "4", "5"],
  }
];

export const assignmentSubmissions: AssignmentSubmission[] = [
  {
    id: "1",
    assignmentId: "1",
    studentId: "1",
    studentName: "John Doe",
    submissionDate: "2025-05-24",
    status: "graded",
    obtainedMarks: 45,
    feedback: "Excellent work. Clear presentation of solutions."
  },
  {
    id: "2",
    assignmentId: "1",
    studentId: "2",
    studentName: "Jane Smith",
    submissionDate: "2025-05-23",
    status: "graded",
    obtainedMarks: 48,
    feedback: "Outstanding! All problems correctly solved."
  },
  {
    id: "3",
    assignmentId: "2",
    studentId: "1",
    studentName: "John Doe",
    submissionDate: "2025-05-27",
    status: "pending"
  }
];

export const exams: Exam[] = [
  {
    id: "1",
    name: "Mid-Term Mathematics",
    subject: "Mathematics",
    date: "2025-05-15",
    totalMarks: 100,
    examType: "midterm"
  },
  {
    id: "2",
    name: "Science Quiz 1",
    subject: "Science",
    date: "2025-05-10",
    totalMarks: 50,
    examType: "quiz"
  },
  {
    id: "3",
    name: "English Literature Test",
    subject: "English",
    date: "2025-05-18",
    totalMarks: 75,
    examType: "midterm"
  },
  {
    id: "4",
    name: "History Midterm",
    subject: "History",
    date: "2025-05-20",
    totalMarks: 100,
    examType: "midterm"
  }
];

export const examResults: ExamResult[] = [
  {
    id: "1",
    examId: "1",
    studentId: "1",
    studentName: "John Doe",
    obtainedMarks: 85,
    percentage: 85,
    grade: "A",
    remarks: "Excellent performance"
  },
  {
    id: "2",
    examId: "1",
    studentId: "2",
    studentName: "Jane Smith",
    obtainedMarks: 92,
    percentage: 92,
    grade: "A+",
    remarks: "Outstanding"
  },
  {
    id: "3",
    examId: "1",
    studentId: "3",
    studentName: "Michael Johnson",
    obtainedMarks: 78,
    percentage: 78,
    grade: "B+",
    remarks: "Good work"
  },
  {
    id: "4",
    examId: "1",
    studentId: "4",
    studentName: "Emily Brown",
    obtainedMarks: 88,
    percentage: 88,
    grade: "A",
    remarks: "Very good"
  },
  {
    id: "5",
    examId: "2",
    studentId: "1",
    studentName: "John Doe",
    obtainedMarks: 42,
    percentage: 84,
    grade: "B+",
    remarks: "Good performance"
  },
  {
    id: "6",
    examId: "2",
    studentId: "2",
    studentName: "Jane Smith",
    obtainedMarks: 46,
    percentage: 92,
    grade: "A+",
    remarks: "Excellent"
  }
];
