
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Search, PlusCircle, MoreHorizontal, FileDown, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock data for quotations
const mockQuotations = [
  { 
    id: "Q2025-001", 
    customer: "Acme Corporation",
    customerId: "CUST001",
    date: "2025-04-01", 
    status: "Pending",
    products: 3,
    value: 4250.75,
  },
  { 
    id: "Q2025-002", 
    customer: "TechSoft Solutions",
    customerId: "CUST002",
    date: "2025-04-03", 
    status: "Approved",
    products: 1,
    value: 1299.99,
  },
  { 
    id: "Q2025-003", 
    customer: "Global Industries",
    customerId: "CUST003",
    date: "2025-04-05", 
    status: "Rejected",
    products: 4,
    value: 8750.50,
    reason: "Budget constraints"
  },
  { 
    id: "Q2025-004", 
    customer: "Quantum Dynamics",
    customerId: "CUST004", 
    date: "2025-04-08", 
    status: "Draft",
    products: 2,
    value: 3450.00,
  },
  { 
    id: "Q2025-005", 
    customer: "Summit Manufacturing",
    customerId: "CUST005",
    date: "2025-04-12", 
    status: "Sent",
    products: 5,
    value: 12750.25,
  },
];

export default function QuotationsDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredQuotations = mockQuotations.filter(
    quote => 
      quote.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate statistics
  const totalQuotes = mockQuotations.length;
  const approvedQuotes = mockQuotations.filter(q => q.status === "Approved").length;
  const pendingQuotes = mockQuotations.filter(q => q.status === "Pending" || q.status === "Sent").length;
  const totalValue = mockQuotations.reduce((sum, q) => sum + q.value, 0);
  const approvedValue = mockQuotations.filter(q => q.status === "Approved").reduce((sum, q) => sum + q.value, 0);
  const conversionRate = totalQuotes ? Math.round((approvedQuotes / totalQuotes) * 100) : 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return <Badge className="bg-green-600">Approved</Badge>;
      case "Pending":
        return <Badge variant="outline" className="text-amber-600 border-amber-600">Pending</Badge>;
      case "Rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "Draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "Sent":
        return <Badge className="bg-blue-600">Sent</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-quotation-dark">Quotation Management</h1>
          <p className="text-muted-foreground">Create and manage customer quotations</p>
        </div>
        <Link to="/quotations/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Quotation
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <Progress value={conversionRate} className="h-2 mt-2" />
          </CardContent>
          <CardFooter className="pt-2">
            <p className="text-xs text-muted-foreground">
              {approvedQuotes} approved out of {totalQuotes} quotations
            </p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Quotes</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">{pendingQuotes}</div>
          </CardContent>
          <CardFooter className="pt-2">
            <p className="text-xs text-muted-foreground">
              Total value: ${pendingQuotes ? totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "0.00"}
            </p>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved Value</CardTitle>
          </CardHeader>
          <CardContent className="py-2">
            <div className="text-2xl font-bold">
              ${approvedValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <p className="text-xs text-muted-foreground">
              From {approvedQuotes} approved quotations
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search quotations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Quotations table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Quotation ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead># Products</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotations.length > 0 ? (
              filteredQuotations.map((quote) => (
                <TableRow key={quote.id}>
                  <TableCell className="font-medium">{quote.id}</TableCell>
                  <TableCell>
                    <Link 
                      to={`/customers/${quote.customerId}`}
                      className="hover:underline text-quotation-dark"
                    >
                      {quote.customer}
                    </Link>
                  </TableCell>
                  <TableCell>{quote.date}</TableCell>
                  <TableCell>{quote.products}</TableCell>
                  <TableCell className="text-right">${quote.value.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(quote.status)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/quotations/${quote.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        
                        {quote.status !== "Approved" && quote.status !== "Rejected" && (
                          <DropdownMenuItem asChild>
                            <Link to={`/quotations/${quote.id}/edit`}>
                              Edit Quote
                            </Link>
                          </DropdownMenuItem>
                        )}

                        <DropdownMenuItem asChild>
                          <Link to={`/quotations/${quote.id}/download`}>
                            <FileDown className="mr-2 h-4 w-4" />
                            Download PDF
                          </Link>
                        </DropdownMenuItem>

                        {quote.status === "Draft" && (
                          <DropdownMenuItem asChild>
                            <Link to={`/quotations/${quote.id}/send`}>
                              <Send className="mr-2 h-4 w-4" />
                              Send to Customer
                            </Link>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No quotations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
