
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, FileText, Users, Building, MoreHorizontal, ClipboardCheck } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for procurement items
const procurementItems = [
  {
    id: "PROC001",
    name: "Custom Valve Controller",
    product: "PRD002",
    status: "Waiting for Quotes",
    quotes: 1,
    requiredQuotes: 3,
    created: "2025-04-01",
    targetDate: "2025-04-15",
  },
  {
    id: "PROC002",
    name: "Custom Gearbox",
    product: "PRD004",
    status: "In Review",
    quotes: 3,
    requiredQuotes: 3,
    created: "2025-03-25",
    targetDate: "2025-04-10",
  },
  {
    id: "PROC003",
    name: "Specialized Hydraulic System",
    product: "PRD007",
    status: "Vendor Selected",
    quotes: 4,
    requiredQuotes: 3,
    created: "2025-03-15",
    targetDate: "2025-03-30",
    selectedVendor: "Industrial Supplies Co."
  },
  {
    id: "PROC004",
    name: "Custom Power Unit",
    product: "PRD013",
    status: "Engineering Approval",
    quotes: 3,
    requiredQuotes: 3,
    created: "2025-03-20",
    targetDate: "2025-04-05",
  },
  {
    id: "PROC005",
    name: "Specialized Control Panel",
    product: "PRD019",
    status: "Completed",
    quotes: 3,
    requiredQuotes: 3,
    created: "2025-03-10",
    targetDate: "2025-03-25",
    selectedVendor: "ElectroTech Systems"
  }
];

// Mock data for vendors
const vendors = [
  { id: "VND001", name: "Industrial Supplies Co.", location: "Chicago, IL", products: 15, rating: 4.8 },
  { id: "VND002", name: "ElectroTech Systems", location: "Austin, TX", products: 8, rating: 4.5 },
  { id: "VND003", name: "Global Manufacturing Solutions", location: "Seattle, WA", products: 21, rating: 4.2 },
  { id: "VND004", name: "Precision Parts Ltd.", location: "Detroit, MI", products: 12, rating: 4.6 },
];

export default function ProcurementDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Waiting for Quotes":
        return <Badge variant="outline" className="text-amber-600 border-amber-600">Waiting for Quotes</Badge>;
      case "In Review":
        return <Badge variant="secondary">In Review</Badge>;
      case "Vendor Selected":
        return <Badge className="bg-blue-600">Vendor Selected</Badge>;
      case "Engineering Approval":
        return <Badge className="bg-purple-600">Engineering Approval</Badge>;
      case "Completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Count items by status
  const waitingForQuotes = procurementItems.filter(item => item.status === "Waiting for Quotes").length;
  const inReview = procurementItems.filter(item => item.status === "In Review").length;
  const approvalPending = procurementItems.filter(item => item.status === "Engineering Approval").length;
  const completed = procurementItems.filter(item => item.status === "Completed").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-procurement-dark">Procurement Workflow</h1>
          <p className="text-muted-foreground">Manage vendor quotes for non-standard items</p>
        </div>
        <div className="flex gap-2">
          <Link to="/procurement/vendors/new">
            <Button variant="outline">
              <Building className="mr-2 h-4 w-4" />
              Add Vendor
            </Button>
          </Link>
          <Link to="/products/type">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Procurement
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Waiting for Quotes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{waitingForQuotes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inReview}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approval Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvalPending}</div>
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

      {/* Tabs for Procurement Items and Vendors */}
      <Tabs defaultValue="procurements" className="w-full">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="procurements">Procurements</TabsTrigger>
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="procurements">
          <Card>
            <CardHeader>
              <CardTitle>Non-Standard Product Procurements</CardTitle>
              <CardDescription>
                Manage quotes and vendor selection for non-standard products
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Quotes</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Target Date</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {procurementItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        {item.quotes}/{item.requiredQuotes}
                      </TableCell>
                      <TableCell>{item.created}</TableCell>
                      <TableCell>{item.targetDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/procurement/${item.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/procurement/${item.id}/quotes`}>
                                <FileText className="mr-2 h-4 w-4" />
                                Manage Quotes
                              </Link>
                            </DropdownMenuItem>
                            {item.status === "In Review" && (
                              <DropdownMenuItem asChild>
                                <Link to={`/procurement/${item.id}/compare`}>
                                  <ClipboardCheck className="mr-2 h-4 w-4" />
                                  Compare Quotes
                                </Link>
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="vendors">
          <Card>
            <CardHeader>
              <CardTitle>Vendors</CardTitle>
              <CardDescription>
                Manage your vendor database for non-standard procurements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Vendor Name</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="font-medium">{vendor.id}</TableCell>
                      <TableCell>{vendor.name}</TableCell>
                      <TableCell>{vendor.location}</TableCell>
                      <TableCell>{vendor.products}</TableCell>
                      <TableCell>{vendor.rating}/5</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link to={`/procurement/vendors/${vendor.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/procurement/vendors/${vendor.id}/edit`}>
                                Edit Vendor
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link to={`/procurement/vendors/${vendor.id}/quotes`}>
                                <FileText className="mr-2 h-4 w-4" />
                                View Quotes
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
