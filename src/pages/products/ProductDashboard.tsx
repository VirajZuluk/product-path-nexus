import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Search, PlusCircle, FileUp, MoreHorizontal, Check, X } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for products
const mockProducts = [{
  id: "PRD001",
  name: "Hydraulic Pump Assembly",
  type: "Standard",
  category: "Hydraulic Systems",
  price: 1299.99,
  inventory: 24,
  hasDesign: true
}, {
  id: "PRD002",
  name: "Custom Valve Controller",
  type: "Non-standard",
  category: "Control Systems",
  price: 3499.99,
  inventory: 5,
  hasDesign: false
}, {
  id: "PRD003",
  name: "Standard Pressure Sensor",
  type: "Standard",
  category: "Sensors",
  price: 199.99,
  inventory: 122,
  hasDesign: true
}, {
  id: "PRD004",
  name: "Custom Gearbox",
  type: "Non-standard",
  category: "Transmission",
  price: 4750.00,
  inventory: 2,
  hasDesign: false
}, {
  id: "PRD005",
  name: "Industrial Flow Meter",
  type: "Standard",
  category: "Measurement",
  price: 675.50,
  inventory: 38,
  hasDesign: true
}];
export default function ProductDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const filteredProducts = mockProducts.filter(product => (product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.id.toLowerCase().includes(searchQuery.toLowerCase()) || product.type.toLowerCase().includes(searchQuery.toLowerCase())) && (activeTab === "all" || activeTab === "standard" && product.type === "Standard" || activeTab === "nonstandard" && product.type === "Non-standard"));
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-product-dark">Product Management</h1>
          <p className="text-muted-foreground">Manage your products catalog</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileUp className="mr-2 h-4 w-4" />
            Import Products
          </Button>
          <Link to="/products/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Product stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProducts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Standard Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockProducts.filter(p => p.type === "Standard").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Non-Standard Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockProducts.filter(p => p.type === "Non-standard").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and tabs */}
      <div className="flex gap-2 flex-col sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." className="pl-8" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <Tabs defaultValue="all" className="w-full sm:w-auto" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Products</TabsTrigger>
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="nonstandard">Non-standard</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Products table */}
      <div className="rounded-md border px-[10px] py-[8px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Design</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? filteredProducts.map(product => <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <Badge variant={product.type === "Standard" ? "outline" : "secondary"}>
                      {product.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {product.hasDesign ? <Check className="h-4 w-4 text-green-600" /> : <X className="h-4 w-4 text-red-500" />}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/products/${product.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/products/${product.id}/edit`}>
                            Edit Product
                          </Link>
                        </DropdownMenuItem>
                        {product.type === "Standard" ? <DropdownMenuItem asChild>
                            <Link to={`/design/${product.id}`}>
                              View Design
                            </Link>
                          </DropdownMenuItem> : <DropdownMenuItem asChild>
                            <Link to={`/procurement/${product.id}`}>
                              Procurement Info
                            </Link>
                          </DropdownMenuItem>}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to={`/quotations/new?product=${product.id}`}>
                            Create Quote
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>) : <TableRow>
                <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                  No products found
                </TableCell>
              </TableRow>}
          </TableBody>
        </Table>
      </div>
    </div>;
}