import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  PlusCircle, 
  Pencil, 
  MoreHorizontal,
  ListChecks,
  FileSymlink,
  Upload
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { NewDesignForm } from "@/components/teams/design/NewDesignForm";

// Mock data for assigned designs
const assignedDesigns = [
  {
    id: "DSG001",
    name: "Hydraulic Control System",
    assignedTo: "Jane Cooper",
    status: "In Progress",
    deadline: "2025-05-01",
    materialListStatus: "Pending",
    manufacturingInfoStatus: "Not Started"
  },
  {
    id: "DSG002",
    name: "Pressure Valve Assembly",
    assignedTo: "Robert Fox",
    status: "Review Required",
    deadline: "2025-05-03",
    materialListStatus: "Completed",
    manufacturingInfoStatus: "Pending"
  }
];

export default function DesignTeamView() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Badge className="bg-blue-600">In Progress</Badge>;
      case "Review Required":
        return <Badge variant="destructive">Review Required</Badge>;
      case "Completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTaskStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      case "Pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "Not Started":
        return <Badge variant="outline">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Design Team Dashboard</h1>
          <p className="text-muted-foreground">Manage your assigned design tasks and specifications</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload Specs
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Design
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Design</DialogTitle>
                <DialogDescription>
                  Fill in the details for the new design specification.
                </DialogDescription>
              </DialogHeader>
              <NewDesignForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Design Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Assigned Designs</CardTitle>
          <CardDescription>
            View and manage your assigned design specifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Design Name</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Material List</TableHead>
                <TableHead>Manufacturing Info</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedDesigns.map((design) => (
                <TableRow key={design.id}>
                  <TableCell className="font-medium">{design.id}</TableCell>
                  <TableCell>{design.name}</TableCell>
                  <TableCell>{design.assignedTo}</TableCell>
                  <TableCell>{getStatusBadge(design.status)}</TableCell>
                  <TableCell>{getTaskStatusBadge(design.materialListStatus)}</TableCell>
                  <TableCell>{getTaskStatusBadge(design.manufacturingInfoStatus)}</TableCell>
                  <TableCell>{design.deadline}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/teams/design/${design.id}`}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Design
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/teams/design/${design.id}/materials`}>
                            <ListChecks className="mr-2 h-4 w-4" />
                            Update Materials
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/teams/design/${design.id}/manufacturing`}>
                            <FileSymlink className="mr-2 h-4 w-4" />
                            Manufacturing Info
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/teams/design/${design.id}/documents`}>
                            <FileText className="mr-2 h-4 w-4" />
                            View Documents
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
