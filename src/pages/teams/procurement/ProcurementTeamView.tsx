
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  PlusCircle, 
  MoreHorizontal,
  Building,
  FileCheck,
  ClipboardCheck
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data for procurement tasks
const procurementTasks = [
  {
    id: "PRC001",
    productName: "Custom Hydraulic System",
    assignedTo: "Alice Johnson",
    status: "Quotes Needed",
    quotesReceived: 1,
    requiredQuotes: 3,
    deadline: "2025-05-01",
    estimatedBudget: "$15,000"
  },
  {
    id: "PRC002",
    productName: "Specialized Control Panel",
    assignedTo: "Mark Wilson",
    status: "Under Review",
    quotesReceived: 3,
    requiredQuotes: 3,
    deadline: "2025-05-03",
    estimatedBudget: "$8,500"
  }
];

export default function ProcurementTeamView() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Quotes Needed":
        return <Badge variant="destructive">Quotes Needed</Badge>;
      case "Under Review":
        return <Badge className="bg-blue-600">Under Review</Badge>;
      case "Completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Procurement Team Dashboard</h1>
          <p className="text-muted-foreground">Manage vendor quotes and procurement tasks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Building className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Quote Request
          </Button>
        </div>
      </div>

      {/* Procurement Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Active Procurement Tasks</CardTitle>
          <CardDescription>
            View and manage procurement requests and vendor quotes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Quotes</TableHead>
                <TableHead>Est. Budget</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {procurementTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>{task.productName}</TableCell>
                  <TableCell>{task.assignedTo}</TableCell>
                  <TableCell>{getStatusBadge(task.status)}</TableCell>
                  <TableCell>
                    {task.quotesReceived}/{task.requiredQuotes}
                  </TableCell>
                  <TableCell>{task.estimatedBudget}</TableCell>
                  <TableCell>{task.deadline}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/teams/procurement/${task.id}/quotes`}>
                            <FileText className="mr-2 h-4 w-4" />
                            Manage Quotes
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/teams/procurement/${task.id}/vendors`}>
                            <Building className="mr-2 h-4 w-4" />
                            View Vendors
                          </Link>
                        </DropdownMenuItem>
                        {task.quotesReceived >= task.requiredQuotes && (
                          <DropdownMenuItem asChild>
                            <Link to={`/teams/procurement/${task.id}/compare`}>
                              <ClipboardCheck className="mr-2 h-4 w-4" />
                              Compare Quotes
                            </Link>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem asChild>
                          <Link to={`/teams/procurement/${task.id}/approve`}>
                            <FileCheck className="mr-2 h-4 w-4" />
                            Submit for Approval
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
