
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Student } from "@/types";
import { students as mockStudents } from "@/data/mockData";
import { useToast } from "@/components/ui/use-toast";

const Students = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  
  const [formData, setFormData] = useState<Partial<Student>>({
    name: "",
    email: "",
    grade: "",
    section: "",
    rollNo: "",
    contactNumber: "",
    address: "",
    dateOfBirth: "",
    gender: "Male",
  });

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateStudent = () => {
    const newStudent: Student = {
      id: (students.length + 1).toString(),
      name: formData.name || "",
      email: formData.email || "",
      grade: formData.grade || "",
      section: formData.section || "",
      rollNo: formData.rollNo || "",
      contactNumber: formData.contactNumber || "",
      address: formData.address || "",
      dateOfBirth: formData.dateOfBirth || "",
      gender: formData.gender || "Male",
    };

    setStudents([...students, newStudent]);
    setFormData({
      name: "",
      email: "",
      grade: "",
      section: "",
      rollNo: "",
      contactNumber: "",
      address: "",
      dateOfBirth: "",
      gender: "Male",
    });
    setIsCreating(false);
    
    toast({
      title: "Student Created",
      description: `${newStudent.name} has been added successfully.`,
    });
  };

  const handleEditStart = (student: Student) => {
    setCurrentStudent(student);
    setFormData({ ...student });
    setIsEditing(true);
  };

  const handleUpdateStudent = () => {
    if (!currentStudent) return;

    const updatedStudents = students.map((student) =>
      student.id === currentStudent.id ? { ...student, ...formData } : student
    );

    setStudents(updatedStudents);
    setCurrentStudent(null);
    setFormData({
      name: "",
      email: "",
      grade: "",
      section: "",
      rollNo: "",
      contactNumber: "",
      address: "",
      dateOfBirth: "",
      gender: "Male",
    });
    setIsEditing(false);
    
    toast({
      title: "Student Updated",
      description: `${formData.name} has been updated successfully.`,
    });
  };

  const handleDeleteStudent = (id: string) => {
    const studentToDelete = students.find(student => student.id === id);
    if (studentToDelete) {
      setStudents(students.filter((student) => student.id !== id));
      toast({
        title: "Student Deleted",
        description: `${studentToDelete.name} has been removed.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Students</h1>
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>Add New Student</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Enter the details of the new student below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade</Label>
                  <Input id="grade" name="grade" value={formData.grade} onChange={handleInputChange} placeholder="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Input id="section" name="section" value={formData.section} onChange={handleInputChange} placeholder="A" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rollNo">Roll Number</Label>
                  <Input id="rollNo" name="rollNo" value={formData.rollNo} onChange={handleInputChange} placeholder="10A01" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} placeholder="123-456-7890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="123 Main St, Anytown" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
              <Button onClick={handleCreateStudent}>Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Student</DialogTitle>
              <DialogDescription>
                Update the details of the student below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input id="edit-name" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" name="email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-grade">Grade</Label>
                  <Input id="edit-grade" name="grade" value={formData.grade} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-section">Section</Label>
                  <Input id="edit-section" name="section" value={formData.section} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-rollNo">Roll Number</Label>
                  <Input id="edit-rollNo" name="rollNo" value={formData.rollNo} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-contactNumber">Contact Number</Label>
                  <Input id="edit-contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-dateOfBirth">Date of Birth</Label>
                  <Input
                    id="edit-dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-gender">Gender</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleSelectChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address">Address</Label>
                <Input id="edit-address" name="address" value={formData.address} onChange={handleInputChange} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleUpdateStudent}>Update Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 pb-4 mb-4 border-b">
            <Input
              placeholder="Search by name, email, or roll number..."
              className="w-full md:max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade & Section</TableHead>
                  <TableHead>Roll No</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No students found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge>{student.grade}-{student.section}</Badge>
                      </TableCell>
                      <TableCell>{student.rollNo}</TableCell>
                      <TableCell>{student.contactNumber}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditStart(student)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteStudent(student.id)}
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
        </CardContent>
      </Card>
    </div>
  );
};

export default Students;
