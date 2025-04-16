import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trash2, Plus, CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ProcessFlow } from "@/components/ui/process-flow";

// Mock data
const mockCustomers = [
  { id: "CUST001", name: "Acme Corporation" },
  { id: "CUST002", name: "TechSoft Solutions" },
  { id: "CUST003", name: "Global Industries" },
  { id: "CUST004", name: "Quantum Dynamics" },
  { id: "CUST005", name: "Summit Manufacturing" },
];

const mockProducts = [
  { id: "PRD001", name: "Hydraulic Pump Assembly", price: 1299.99 },
  { id: "PRD002", name: "Custom Valve Controller", price: 3499.99 },
  { id: "PRD003", name: "Standard Pressure Sensor", price: 199.99 },
  { id: "PRD004", name: "Custom Gearbox", price: 4750.00 },
  { id: "PRD005", name: "Industrial Flow Meter", price: 675.50 },
];

interface QuotationProduct {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export default function CreateQuotation() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Generate a quotation ID
  const generatedId = `Q2025-${String(Math.floor(100 + Math.random() * 900)).padStart(3, '0')}`;
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const [quotation, setQuotation] = useState({
    id: generatedId,
    customerId: "",
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    notes: "",
    termsAndConditions: "1. This quotation is valid for 30 days from the date of issue.\n2. All prices are exclusive of taxes.\n3. Delivery timeline starts from the date of order confirmation.\n4. Payment terms: 50% advance, 50% before delivery.",
    products: [] as QuotationProduct[]
  });
  
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    quantity: 1,
    discount: 0
  });
  
  // Steps for the quotation process
  const quotationSteps = [
    {
      id: "create",
      title: "Create Quotation",
      description: "Add products & details",
      status: "current" as const
    },
    {
      id: "costing",
      title: "Quotation Costing",
      description: "Calculate pricing",
      status: "upcoming" as const
    },
    {
      id: "terms",
      title: "Terms & Conditions",
      description: "Review legal terms",
      status: "upcoming" as const
    },
    {
      id: "review",
      title: "Final Quote",
      description: "Generate PDF quote",
      status: "upcoming" as const
    }
  ];
  
  const addProduct = () => {
    if (!currentProduct.id) {
      toast({
        title: "Please select a product",
        variant: "destructive"
      });
      return;
    }
    
    const selectedProduct = mockProducts.find(p => p.id === currentProduct.id);
    if (!selectedProduct) return;
    
    const quantity = currentProduct.quantity || 1;
    const unitPrice = selectedProduct.price;
    const discount = currentProduct.discount || 0;
    const total = quantity * unitPrice * (1 - discount / 100);
    
    const newProduct: QuotationProduct = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      quantity,
      unitPrice,
      discount,
      total
    };
    
    setQuotation({
      ...quotation,
      products: [...quotation.products, newProduct]
    });
    
    // Reset current product
    setCurrentProduct({
      id: "",
      quantity: 1,
      discount: 0
    });
  };
  
  const removeProduct = (productId: string) => {
    setQuotation({
      ...quotation,
      products: quotation.products.filter(p => p.id !== productId)
    });
  };
  
  const calculateTotal = () => {
    return quotation.products.reduce((sum, product) => sum + product.total, 0);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuotation({
      ...quotation,
      [name]: value
    });
  };
  
  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: name === "id" ? value : Number(value)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!quotation.customerId) {
      toast({
        title: "Please select a customer",
        variant: "destructive"
      });
      return;
    }
    
    if (quotation.products.length === 0) {
      toast({
        title: "Add at least one product",
        variant: "destructive"
      });
      return;
    }
    
    // Navigate to next step (costing)
    navigate("/quotations/costing", { state: { quotation } });
    
    toast({
      title: "Quotation details saved",
      description: "Proceeding to costing step"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-quotation-dark">Create Quotation</h1>
        <p className="text-muted-foreground">Add customer and product details for your quotation</p>
      </div>
      
      {/* Process flow */}
      <ProcessFlow steps={quotationSteps} className="mb-8" />
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id">Quotation ID</Label>
                  <Input
                    id="id"
                    name="id"
                    value={quotation.id}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerId">Customer</Label>
                <Select 
                  onValueChange={(value) => setQuotation({...quotation, customerId: value})}
                  value={quotation.customerId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCustomers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products */}
            <div className="mt-8 space-y-4">
              <h3 className="font-medium">Products</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productId">Product</Label>
                  <Select 
                    onValueChange={(value) => setCurrentProduct({...currentProduct, id: value})}
                    value={currentProduct.id}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProducts.map(product => (
                        <SelectItem key={product.id} value={product.id}>
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={currentProduct.quantity}
                    onChange={handleProductChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    name="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={currentProduct.discount}
                    onChange={handleProductChange}
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="button" 
                  onClick={addProduct} 
                  variant="outline"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </div>
              
              {quotation.products.length > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Unit Price</TableHead>
                        <TableHead className="text-right">Discount</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quotation.products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell className="text-right">{product.quantity}</TableCell>
                          <TableCell className="text-right">${product.unitPrice.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{product.discount}%</TableCell>
                          <TableCell className="text-right font-medium">${product.total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => removeProduct(product.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={4} className="text-right font-semibold">
                          Total
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ${calculateTotal().toFixed(2)}
                        </TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="bg-muted/50 rounded-md p-6 text-center text-muted-foreground">
                  No products added yet
                </div>
              )}
            </div>
            
            {/* Notes */}
            <div className="mt-8 space-y-2">
              <Label htmlFor="notes">Additional Notes or Queries</Label>
              <Textarea
                id="notes"
                name="notes"
                rows={4}
                value={quotation.notes}
                onChange={handleChange}
                placeholder="Enter any additional information, specifications or queries..."
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Actions */}
        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="ghost"
            onClick={() => navigate("/quotations")}
          >
            Cancel
          </Button>
          <Button type="submit">
            Continue to Costing
          </Button>
        </div>
      </form>
    </div>
  );
}
