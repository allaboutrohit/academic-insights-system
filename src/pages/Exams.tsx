
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Exam, ExamResult } from "@/types";
import { exams as mockExams, examResults as mockResults, students } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";
import { FileText } from "lucide-react";

const Exams = () => {
  const { toast } = useToast();
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [results, setResults] = useState<ExamResult[]>(mockResults);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isAddingResult, setIsAddingResult] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExam, setCurrentExam] = useState<Exam | null>(null);
  
  const [examFormData, setExamFormData] = useState<Partial<Exam>>({
    name: "",
    subject: "",
    date: "",
    totalMarks: 100,
    examType: "midterm",
  });
  
  const [resultFormData, setResultFormData] = useState({
    studentId: "",
    obtainedMarks: 0,
    remarks: "",
  });

  const filteredExams = exams.filter(
    (exam) =>
      exam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredResults = currentExam 
    ? results.filter((result) => result.examId === currentExam.id)
    : [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setExamFormData({ ...examFormData, [name]: value });
  };
  
  const handleResultInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResultFormData({ ...resultFormData, [name]: name === "obtainedMarks" ? Number(value) : value });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExamFormData({ ...examFormData, [name]: Number(value) });
  };

  const handleSelectChange = (name: string, value: string) => {
    setExamFormData({ ...examFormData, [name]: value });
  };
  
  const handleResultSelectChange = (name: string, value: string) => {
    setResultFormData({ ...resultFormData, [name]: value });
  };

  const handleCreateExam = () => {
    const newExam: Exam = {
      id: (exams.length + 1).toString(),
      name: examFormData.name || "",
      subject: examFormData.subject || "",
      date: examFormData.date || "",
      totalMarks: examFormData.totalMarks || 100,
      examType: (examFormData.examType as "quiz" | "midterm" | "final" | "other") || "midterm",
    };

    setExams([...exams, newExam]);
    setExamFormData({
      name: "",
      subject: "",
      date: "",
      totalMarks: 100,
      examType: "midterm",
    });
    setIsCreating(false);
    
    toast({
      title: "Exam Created",
      description: `${newExam.name} has been created successfully.`,
    });
  };
  
  const handleAddResult = () => {
    if (!currentExam) return;
    
    const student = students.find(s => s.id === resultFormData.studentId);
    if (!student) return;
    
    const obtainedMarks = resultFormData.obtainedMarks;
    const percentage = (obtainedMarks / currentExam.totalMarks) * 100;
    
    // Calculate grade based on percentage
    let grade = "";
    if (percentage >= 90) grade = "A+";
    else if (percentage >= 80) grade = "A";
    else if (percentage >= 70) grade = "B";
    else if (percentage >= 60) grade = "C";
    else if (percentage >= 50) grade = "D";
    else grade = "F";
    
    const newResult: ExamResult = {
      id: (results.length + 1).toString(),
      examId: currentExam.id,
      studentId: resultFormData.studentId,
      studentName: student.name,
      obtainedMarks: resultFormData.obtainedMarks,
      percentage: Number(percentage.toFixed(2)),
      grade,
      remarks: resultFormData.remarks,
    };
    
    setResults([...results, newResult]);
    setResultFormData({
      studentId: "",
      obtainedMarks: 0,
      remarks: "",
    });
    setIsAddingResult(false);
    
    toast({
      title: "Result Added",
      description: `Result for ${student.name} has been added successfully.`,
    });
  };

  const handleEditStart = (exam: Exam) => {
    setCurrentExam(exam);
    setExamFormData({ ...exam });
    setIsEditing(true);
  };

  const handleUpdateExam = () => {
    if (!currentExam) return;

    const updatedExams = exams.map((exam) =>
      exam.id === currentExam.id ? { ...exam, ...examFormData } : exam
    );

    setExams(updatedExams);
    setCurrentExam(null);
    setExamFormData({
      name: "",
      subject: "",
      date: "",
      totalMarks: 100,
      examType: "midterm",
    });
    setIsEditing(false);
    
    toast({
      title: "Exam Updated",
      description: `${examFormData.name} has been updated successfully.`,
    });
  };

  const handleDeleteExam = (id: string) => {
    const examToDelete = exams.find(exam => exam.id === id);
    if (examToDelete) {
      setExams(exams.filter((exam) => exam.id !== id));
      setResults(results.filter((result) => result.examId !== id));
      toast({
        title: "Exam Deleted",
        description: `${examToDelete.name} has been removed.`,
        variant: "destructive",
      });
    }
  };
  
  const handleDeleteResult = (id: string) => {
    const resultToDelete = results.find(result => result.id === id);
    if (resultToDelete) {
      setResults(results.filter((result) => result.id !== id));
      toast({
        title: "Result Deleted",
        description: `Result for ${resultToDelete.studentName} has been removed.`,
        variant: "destructive",
      });
    }
  };
  
  const viewExamResults = (exam: Exam) => {
    setCurrentExam(exam);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-2xl md:text-3xl font-bold">Exams & Marks</h1>
        </div>
        
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>Create Exam</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Exam</DialogTitle>
              <DialogDescription>
                Enter the details of the new exam below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="name">Exam Name</Label>
                  <Input id="name" name="name" value={examFormData.name} onChange={handleInputChange} placeholder="Midterm Examination" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" value={examFormData.subject} onChange={handleInputChange} placeholder="Mathematics" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Exam Date</Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={examFormData.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    name="totalMarks"
                    type="number"
                    value={examFormData.totalMarks}
                    onChange={handleNumberInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="examType">Exam Type</Label>
                  <Select
                    value={examFormData.examType as string}
                    onValueChange={(value) => handleSelectChange("examType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="midterm">Midterm</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateExam}>Create Exam</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Exam</DialogTitle>
              <DialogDescription>
                Update the details of the exam.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="edit-name">Exam Name</Label>
                  <Input id="edit-name" name="name" value={examFormData.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-subject">Subject</Label>
                  <Input id="edit-subject" name="subject" value={examFormData.subject} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Exam Date</Label>
                  <Input
                    id="edit-date"
                    name="date"
                    type="date"
                    value={examFormData.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-totalMarks">Total Marks</Label>
                  <Input
                    id="edit-totalMarks"
                    name="totalMarks"
                    type="number"
                    value={examFormData.totalMarks}
                    onChange={handleNumberInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-examType">Exam Type</Label>
                  <Select
                    value={examFormData.examType as string}
                    onValueChange={(value) => handleSelectChange("examType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="midterm">Midterm</SelectItem>
                      <SelectItem value="final">Final</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateExam}>Update Exam</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isAddingResult} onOpenChange={setIsAddingResult}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add Exam Result</DialogTitle>
              <DialogDescription>
                {currentExam && `Adding result for ${currentExam.name}`}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="studentId">Student</Label>
                <Select
                  value={resultFormData.studentId}
                  onValueChange={(value) => handleResultSelectChange("studentId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} ({student.rollNo})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="obtainedMarks">Obtained Marks</Label>
                <Input
                  id="obtainedMarks"
                  name="obtainedMarks"
                  type="number"
                  value={resultFormData.obtainedMarks}
                  onChange={handleResultInputChange}
                  max={currentExam?.totalMarks}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Input
                  id="remarks"
                  name="remarks"
                  value={resultFormData.remarks}
                  onChange={handleResultInputChange}
                  placeholder="Excellent performance"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingResult(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddResult}>Add Result</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="exams">
            <TabsList className="mb-4">
              <TabsTrigger value="exams">Exams</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="exams">
              <div className="flex items-center gap-4 pb-4 mb-4 border-b">
                <Input
                  placeholder="Search exams..."
                  className="w-full md:max-w-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Exam Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Total Marks</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredExams.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No exams found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredExams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell className="font-medium">{exam.name}</TableCell>
                          <TableCell>{exam.subject}</TableCell>
                          <TableCell>{exam.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                exam.examType === "final"
                                  ? "destructive"
                                  : exam.examType === "midterm"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {exam.examType}
                            </Badge>
                          </TableCell>
                          <TableCell>{exam.totalMarks}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewExamResults(exam)}
                            >
                              View Results
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditStart(exam)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteExam(exam.id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="results">
              <div className="flex items-center justify-between gap-4 pb-4 mb-4 border-b">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold">
                    {currentExam ? `Results for ${currentExam.name}` : "Select an exam to view results"}
                  </h3>
                </div>
                
                {currentExam && (
                  <Button onClick={() => setIsAddingResult(true)}>
                    Add Result
                  </Button>
                )}
              </div>
              
              {!currentExam ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Select an exam from the "Exams" tab to view its results.
                  </p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Obtained Marks</TableHead>
                        <TableHead>Percentage</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Remarks</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredResults.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-4">
                            No results found for this exam
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredResults.map((result) => (
                          <TableRow key={result.id}>
                            <TableCell className="font-medium">
                              {result.studentName}
                            </TableCell>
                            <TableCell>
                              {result.obtainedMarks}/{currentExam.totalMarks}
                            </TableCell>
                            <TableCell>{result.percentage}%</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  result.grade === "F"
                                    ? "destructive"
                                    : result.grade.startsWith("A")
                                    ? "default"
                                    : "outline"
                                }
                              >
                                {result.grade}
                              </Badge>
                            </TableCell>
                            <TableCell>{result.remarks}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteResult(result.id)}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Exams;
