
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { 
  BarChart, LineChart, AreaChart, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, Bar, Line, Area, ResponsiveContainer 
} from 'recharts';

const Dashboard = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState(65);
  const [assignments, setAssignments] = useState(24);
  const [exams, setExams] = useState(12);

  const attendanceData = [
    { name: 'Mon', attendance: 92 },
    { name: 'Tue', attendance: 88 },
    { name: 'Wed', attendance: 95 },
    { name: 'Thu', attendance: 90 },
    { name: 'Fri', attendance: 85 },
  ];

  const performanceData = [
    { name: 'Math', average: 78, highest: 95, lowest: 45 },
    { name: 'Science', average: 82, highest: 98, lowest: 60 },
    { name: 'English', average: 75, highest: 90, lowest: 55 },
    { name: 'History', average: 80, highest: 92, lowest: 62 },
    { name: 'Arts', average: 88, highest: 100, lowest: 70 },
  ];

  const recentActivities = [
    { id: 1, activity: "New student added: Emma Johnson", time: "2 hours ago" },
    { id: 2, activity: "Assignment 'Physics Project' due tomorrow", time: "5 hours ago" },
    { id: 3, activity: "Math exam results published", time: "Yesterday" },
    { id: 4, activity: "Parent-teacher meeting scheduled", time: "2 days ago" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <div className="space-x-2">
          <span className="text-sm text-muted-foreground">Last updated: May 20, 2025</span>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignments}</div>
            <p className="text-xs text-muted-foreground">5 due this week</p>
            <Progress value={40} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exams}</div>
            <p className="text-xs text-muted-foreground">2 this week</p>
            <Progress value={25} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">90%</div>
            <p className="text-xs text-muted-foreground">+2% from last week</p>
            <Progress value={90} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={attendanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="attendance" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="average" fill="#8884d8" />
                  <Bar dataKey="highest" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 border-b pb-4 last:border-0">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {activity.id}
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.activity}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
