
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { exams, students, assignments, assignmentSubmissions } from "@/data/mockData";
import { ChartContainer } from "@/components/ui/chart";
import { BarChart as ChartBarIcon } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  RadialBarChart,
  RadialBar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Exam, ExamResult } from "@/types";

// Import the examResults from mockData
import { examResults } from "@/data/mockData";

const Analysis = () => {
  const { toast } = useToast();
  const [selectedExam, setSelectedExam] = useState("");
  
  // Calculate average marks per subject
  const subjectPerformance = exams.map(exam => {
    const results = examResults.filter(result => result.examId === exam.id);
    const avgMarks = results.length > 0 
      ? results.reduce((sum, result) => sum + result.obtainedMarks, 0) / results.length 
      : 0;
    
    return {
      subject: exam.subject,
      exam: exam.name,
      average: Number(avgMarks.toFixed(2)),
      totalMarks: exam.totalMarks,
      percentage: Number(((avgMarks / exam.totalMarks) * 100).toFixed(2))
    };
  });
  
  // Calculate grade distribution
  const gradeDistribution = (() => {
    const grades = { "A+": 0, "A": 0, "B": 0, "C": 0, "D": 0, "F": 0 };
    
    examResults.forEach(result => {
      if (grades.hasOwnProperty(result.grade)) {
        grades[result.grade as keyof typeof grades]++;
      }
    });
    
    return Object.entries(grades).map(([grade, count]) => ({
      grade,
      count,
      percentage: Number(((count / examResults.length) * 100).toFixed(2))
    }));
  })();
  
  // Assignment submission status
  const assignmentStatus = (() => {
    const total = assignments.length * students.length;
    const submitted = assignmentSubmissions.length;
    const pending = total - submitted;
    const onTime = assignmentSubmissions.filter(sub => {
      const assignment = assignments.find(a => a.id === sub.assignmentId);
      if (!assignment) return false;
      return new Date(sub.submissionDate) <= new Date(assignment.dueDate);
    }).length;
    const late = submitted - onTime;
    
    return [
      { name: "Submitted", value: submitted },
      { name: "Pending", value: pending },
      { name: "On Time", value: onTime },
      { name: "Late", value: late }
    ];
  })();
  
  // Calculate top performers
  const topPerformers = (() => {
    const studentScores = students.map(student => {
      const studentResults = examResults.filter(result => result.studentId === student.id);
      
      if (studentResults.length === 0) {
        return { 
          id: student.id,
          name: student.name,
          averageScore: 0,
          averagePercentage: 0
        };
      }
      
      const totalScore = studentResults.reduce((sum, result) => sum + result.percentage, 0);
      const averagePercentage = totalScore / studentResults.length;
      
      return { 
        id: student.id,
        name: student.name,
        averageScore: Number(averagePercentage.toFixed(2)),
        averagePercentage: Number(averagePercentage.toFixed(2))
      };
    });
    
    return studentScores.sort((a, b) => b.averagePercentage - a.averagePercentage).slice(0, 5);
  })();
  
  // Calculate improvement trends
  const improvementData = [
    { month: "Jan", performance: 65 },
    { month: "Feb", performance: 68 },
    { month: "Mar", performance: 73 },
    { month: "Apr", performance: 75 },
    { month: "May", performance: 78 }
  ];

  // Generate exam-specific data when an exam is selected
  const [examSpecificData, setExamSpecificData] = useState<any[]>([]);
  
  useEffect(() => {
    if (selectedExam) {
      const exam = exams.find(e => e.id === selectedExam);
      if (!exam) return;
      
      const specificResults = examResults.filter(r => r.examId === selectedExam)
        .map(result => ({
          name: result.studentName,
          marks: result.obtainedMarks,
          percentage: result.percentage
        }));
      
      setExamSpecificData(specificResults);
    }
  }, [selectedExam]);
  
  // Colors for charts
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ChartBarIcon className="h-6 w-6" />
          <h1 className="text-2xl md:text-3xl font-bold">Performance Analysis</h1>
        </div>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="examwise">Exam-wise Analysis</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Average marks across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="average" fill="#8884d8" name="Average Marks" />
                      <Bar dataKey="totalMarks" fill="#82ca9d" name="Total Marks" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Distribution of grades across all exams</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={gradeDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ grade, percentage }) => `${grade}: ${percentage}%`}
                      >
                        {gradeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Assignment Submission Status</CardTitle>
                <CardDescription>Overview of assignment submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                      cx="50%"
                      cy="50%"
                      innerRadius="10%"
                      outerRadius="80%"
                      barSize={10}
                      data={assignmentStatus}
                    >
                      <RadialBar
                        label={{ position: 'insideStart', fill: '#fff' }}
                        background
                        dataKey="value"
                      />
                      <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={{ lineHeight: '24px' }} />
                      <Tooltip />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>Class average performance over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={improvementData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="performance" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
                <CardDescription>Students with highest average scores</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rank</TableHead>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Average Score</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPerformers.map((student, index) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.averageScore}%</TableCell>
                        <TableCell>
                          <div className="w-full h-2 bg-gray-200 rounded-full">
                            <div 
                              className="h-full rounded-full bg-primary" 
                              style={{ width: `${student.averagePercentage}%` }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="examwise">
          <Card>
            <CardHeader>
              <CardTitle>Exam-specific Analysis</CardTitle>
              <CardDescription>Select an exam to view detailed performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="space-y-2 w-full md:w-64">
                  <Label htmlFor="exam-select">Select Exam</Label>
                  <Select
                    value={selectedExam}
                    onValueChange={setSelectedExam}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an exam" />
                    </SelectTrigger>
                    <SelectContent>
                      {exams.map((exam) => (
                        <SelectItem key={exam.id} value={exam.id}>
                          {exam.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {selectedExam ? (
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={examSpecificData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="marks" fill="#8884d8" name="Marks" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart outerRadius={90} data={examSpecificData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Percentage" dataKey="percentage" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        <Legend />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <div className="h-80 flex items-center justify-center">
                  <p className="text-muted-foreground">Select an exam to view analysis</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>Compare performance across different parameters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Assignment vs Exam Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { name: 'Math', assignment: 75, exam: 70 },
                            { name: 'Science', assignment: 80, exam: 85 },
                            { name: 'English', assignment: 65, exam: 60 },
                            { name: 'History', assignment: 90, exam: 75 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="assignment" fill="#8884d8" name="Assignment Score" />
                          <Bar dataKey="exam" fill="#82ca9d" name="Exam Score" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Class Section Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { month: 'Jan', sectionA: 65, sectionB: 60 },
                            { month: 'Feb', sectionA: 70, sectionB: 65 },
                            { month: 'Mar', sectionA: 68, sectionB: 72 },
                            { month: 'Apr', sectionA: 75, sectionB: 75 },
                            { month: 'May', sectionA: 78, sectionB: 80 },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="sectionA" stroke="#8884d8" activeDot={{ r: 8 }} name="Section A" />
                          <Line type="monotone" dataKey="sectionB" stroke="#82ca9d" activeDot={{ r: 8 }} name="Section B" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analysis;
