
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardContent className="p-6 md:p-10">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Welcome to EduTrack</h1>
              <p className="text-muted-foreground text-lg">
                Your comprehensive student management system
              </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Button onClick={() => navigate("/dashboard")} className="h-24 text-lg">
                Go to Dashboard
              </Button>
              <Button onClick={() => navigate("/students")} variant="outline" className="h-24 text-lg">
                Manage Students
              </Button>
              <Button onClick={() => navigate("/assignments")} variant="outline" className="h-24 text-lg">
                Assignments
              </Button>
              <Button onClick={() => navigate("/exams")} variant="outline" className="h-24 text-lg">
                Exams & Marks
              </Button>
              <Button onClick={() => navigate("/analysis")} variant="outline" className="h-24 text-lg">
                View Analysis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
