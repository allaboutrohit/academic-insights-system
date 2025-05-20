
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Assignment, AssignmentSubmission } from "@/types";
import { assignments as mockAssignments, assignmentSubmissions as mockSubmissions, students } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";
import { FilePlus, Award } from "lucide-react";

const Assignments = () => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [submissions, setSubmissions] = useState<AssignmentSubmission[]>(mockSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAssignment, setCurrentAssignment] = useState<Assignment | null>(null);
  const [currentSubmission, setCurrentSubmission] = useState<AssignmentSubmission | null>(null);
  
  const [formData, setFormData] = useState<Partial<Assignment>>({
    title: "",
    subject: "",
    description: "",
    dueDate: "",
    status: "upcoming",
    totalMarks: 100,
    assignedTo: [],
  });
  
  const [gradeData, setGradeData] = useState({
    obtainedMarks: 0,
    feedback: "",
  });

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: Number(value) });
  };
  
  const handleGradeInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setGradeData({ ...gradeData, [name]: name === "obtainedMarks" ? Number(value) : value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateAssignment = () => {
    const newAssignment: Assignment = {
      id: (assignments.length + 1).toString(),
      title: formData.title || "",
      subject: formData.subject || "",
      description: formData.description || "",
      dueDate: formData.dueDate || "",
      status: (formData.status as "upcoming" | "ongoing" | "completed") || "upcoming",
      totalMarks: formData.totalMarks || 100,
      assignedTo: formData.assignedTo || [],
    };

    setAssignments([...assignments, newAssignment]);
    setFormData({
      title: "",
      subject: "",
      description: "",
      dueDate: "",
      status: "upcoming",
      totalMarks: 100,
      assignedTo: [],
    });
    setIsCreating(false);
    
    toast({
      title: "Assignment Created",
      description: `${newAssignment.title} has been created successfully.`,
    });
  };

  const handleEditStart = (assignment: Assignment) => {
    setCurrentAssignment(assignment);
    setFormData({ ...assignment });
    setIsEditing(true);
  };

  const handleUpdateAssignment = () => {
    if (!currentAssignment) return;

    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === currentAssignment.id ? { ...assignment, ...formData } : assignment
    );

    setAssignments(updatedAssignments);
    setCurrentAssignment(null);
    setFormData({
      title: "",
      subject: "",
      description: "",
      dueDate: "",
      status: "upcoming",
      totalMarks: 100,
      assignedTo: [],
    });
    setIsEditing(false);
    
    toast({
      title: "Assignment Updated",
      description: `${formData.title} has been updated successfully.`,
    });
  };

  const handleDeleteAssignment = (id: string) => {
    const assignmentToDelete = assignments.find(assignment => assignment.id === id);
    if (assignmentToDelete) {
      setAssignments(assignments.filter((assignment) => assignment.id !== id));
      setSubmissions(submissions.filter((submission) => submission.assignmentId !== id));
      toast({
        title: "Assignment Deleted",
        description: `${assignmentToDelete.title} has been removed.`,
        variant: "destructive",
      });
    }
  };

  const handleGradeSubmission = (submission: AssignmentSubmission) => {
    setCurrentSubmission(submission);
    setGradeData({
      obtainedMarks: submission.obtainedMarks || 0,
      feedback: submission.feedback || "",
    });
    setIsGrading(true);
  };
  
  const handleSubmitGrade = () => {
    if (!currentSubmission) return;
    
    const updatedSubmissions = submissions.map((sub) =>
      sub.id === currentSubmission.id
        ? {
            ...sub,
            status: "graded",
            obtainedMarks: gradeData.obtainedMarks,
            feedback: gradeData.feedback,
          }
        : sub
    );
    
    setSubmissions(updatedSubmissions);
    setCurrentSubmission(null);
    setGradeData({ obtainedMarks: 0, feedback: "" });
    setIsGrading(false);
    
    toast({
      title: "Submission Graded",
      description: `The submission has been graded successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilePlus className="h-6 w-6" />
          <h1 className="text-2xl md:text-3xl font-bold">Assignments</h1>
        </div>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>Create Assignment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>
                Fill in the details for the new assignment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="Math Assignment 1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Mathematics" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    name="totalMarks"
                    type="number"
                    value={formData.totalMarks}
                    onChange={handleNumberInputChange}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status as string}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter assignment details here..."
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateAssignment}>Create Assignment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Assignment</DialogTitle>
              <DialogDescription>
                Update the details of the assignment.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Title</Label>
                  <Input id="edit-title" name="title" value={formData.title} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-subject">Subject</Label>
                  <Input id="edit-subject" name="subject" value={formData.subject} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-dueDate">Due Date</Label>
                  <Input
                    id="edit-dueDate"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-totalMarks">Total Marks</Label>
                  <Input
                    id="edit-totalMarks"
                    name="totalMarks"
                    type="number"
                    value={formData.totalMarks}
                    onChange={handleNumberInputChange}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={formData.status as string}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateAssignment}>Update Assignment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isGrading} onOpenChange={setIsGrading}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Grade Submission</DialogTitle>
              <DialogDescription>
                {currentSubmission && `Grading ${currentSubmission.studentName}'s submission`}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="obtainedMarks">Obtained Marks</Label>
                <Input
                  id="obtainedMarks"
                  name="obtainedMarks"
                  type="number"
                  value={gradeData.obtainedMarks}
                  onChange={handleGradeInputChange}
                  max={currentAssignment?.totalMarks}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  value={gradeData.feedback}
                  onChange={handleGradeInputChange}
                  placeholder="Provide feedback on the submission..."
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsGrading(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitGrade}>Submit Grade</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="assignments">
            <TabsList className="mb-4">
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="assignments">
              <div className="flex items-center gap-4 pb-4 mb-4 border-b">
                <Input
                  placeholder="Search assignments..."
                  className="w-full md:max-w-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total Marks</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssignments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No assignments found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAssignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell className="font-medium">{assignment.title}</TableCell>
                          <TableCell>{assignment.subject}</TableCell>
                          <TableCell>{assignment.dueDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                assignment.status === "completed"
                                  ? "default"
                                  : assignment.status === "ongoing"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {assignment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{assignment.totalMarks}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditStart(assignment)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteAssignment(assignment.id)}
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
            
            <TabsContent value="submissions">
              <div className="flex items-center gap-4 pb-4 mb-4 border-b">
                <h3 className="text-lg font-semibold">Assignment Submissions</h3>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Submission Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          No submissions found
                        </TableCell>
                      </TableRow>
                    ) : (
                      submissions.map((submission) => {
                        const assignment = assignments.find(
                          (a) => a.id === submission.assignmentId
                        );
                        return (
                          <TableRow key={submission.id}>
                            <TableCell className="font-medium">
                              {submission.studentName}
                            </TableCell>
                            <TableCell>
                              {assignment ? assignment.title : "Unknown Assignment"}
                            </TableCell>
                            <TableCell>{submission.submissionDate}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  submission.status === "graded"
                                    ? "default"
                                    : "outline"
                                }
                              >
                                {submission.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {submission.status === "graded"
                                ? `${submission.obtainedMarks}/${
                                    assignment?.totalMarks || "--"
                                  }`
                                : "--"}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setCurrentAssignment(assignment || null);
                                  handleGradeSubmission(submission);
                                }}
                              >
                                <Award className="h-4 w-4 mr-2" />
                                Grade
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assignments;
