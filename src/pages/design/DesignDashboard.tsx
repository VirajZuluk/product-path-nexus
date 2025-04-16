
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, FileCheck, MoreHorizontal, FileSymlink, Upload } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

// Mock data for design items
const designItems = [
  {
    id: "DSN001",
    name: "Hydraulic Pump Assembly",
    product: "PRD001",
    designer: "Mark Johnson",
    status: "Completed",
    progress: 100,
    created: "2025-03-15",
    completed: "2025-03-28",
    materialList: true,
    manufacturingInfo: true,
  },
  {
    id: "DSN002",
    name: "Standard Pressure Sensor",
    product: "PRD003",
    designer: "Sarah Chen",
    status: "In Progress",
    progress: 75,
    created: "2025-03-20",
    materialList: true,
    manufacturingInfo: false,
  },
  {
    id: "DSN003",
    name: "Industrial Flow Meter",
    product: "PRD005",
    designer: "Michael Rodriguez",
    status: "In Progress",
    progress: 45,
    created: "2025-03-25",
    materialList: true,
    manufacturingInfo: false,
  },
  {
    id: "DSN004",
    name: "Pneumatic Control Valve",
    product: "PRD008",
    designer: "Emily Davis",
    status: "Pending Review",
    progress: 100,
    created: "2025-03-18",
    materialList: true,
    manufacturingInfo: true,
  },
  {
    id: "DSN005",
    name: "Temperature Monitor",
    product: "PRD011",
    designer: "James Wilson",
    status: "Draft",
    progress: 30,
    created: "2025-03-30",
    materialList: false,
    manufacturingInfo: false,
  }
];

export default function DesignDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Draft":
        return <Badge variant="outline">Draft</Badge>;
      case "In Progress":
        return <Badge className="bg-blue-600">In Progress</Badge>;
      case "Pending Review":
        return <Badge variant="secondary">Pending Review</Badge>;
      case "Completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Count items by status
  const draft = designItems.filter(item => item.status === "Draft").length;
  const inProgress = designItems.filter(item => item.status === "In Progress").length;
  const pendingReview = designItems.filter(item => item.status === "Pending Review").length;
  const completed = designItems.filter(item => item.status === "Completed").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-design-dark">Design Workflow</h1>
          <p className="text-muted-foreground">Manage design specifications for standard products</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import Design
          </Button>
          <Link to="/products/type">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Design
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draft}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReview}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Design Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Design Specifications</CardTitle>
          <CardDescription>
            Manage design specifications and documentation for standard products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Designer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Materials</TableHead>
                <TableHead>Manufacturing</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {designItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.designer}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell>
                    {item.materialList ? 
                      <FileCheck className="h-4 w-4 text-green-600" /> : 
                      <span className="text-muted-foreground">Missing</span>
                    }
                  </TableCell>
                  <TableCell>
                    {item.manufacturingInfo ? 
                      <FileCheck className="h-4 w-4 text-green-600" /> : 
                      <span className="text-muted-foreground">Missing</span>
                    }
                  </TableCell>
                  <TableCell className="w-[160px]">
                    <div className="flex items-center gap-2">
                      <Progress value={item.progress} className="h-2" />
                      <span className="text-xs">{item.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/design/${item.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/design/${item.id}/edit`}>
                            Edit Design
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/design/${item.id}/materials`}>
                            <FileSymlink className="mr-2 h-4 w-4" />
                            Material List
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
