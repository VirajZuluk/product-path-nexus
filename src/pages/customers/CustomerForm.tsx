
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function CustomerForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Generate a unique customer ID
  const generatedId = `CUST${Math.floor(1000 + Math.random() * 9000)}`;
  
  const [formData, setFormData] = useState({
    id: generatedId,
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: ""
    },
    industry: "",
    notes: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof typeof formData] as Record<string, unknown>,
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Customer created",
        description: `${formData.name} has been added with ID ${formData.id}`,
      });
      setIsSubmitting(false);
      navigate("/customers");
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-customer-dark">New Customer</h1>
        <p className="text-muted-foreground">Add a new customer to your database</p>
      </div>
      
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-section">
          <h2 className="section-header">Basic Information</h2>
          <div className="form-row">
            <div className="space-y-2">
              <Label htmlFor="id">Customer ID</Label>
              <Input
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                disabled
              />
              <p className="text-xs text-muted-foreground">Auto-generated ID</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                id="contactPerson"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h2 className="section-header">Address</h2>
          <div className="space-y-2">
            <Label htmlFor="address.street">Street Address</Label>
            <Input
              id="address.street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-row">
            <div className="space-y-2">
              <Label htmlFor="address.city">City</Label>
              <Input
                id="address.city"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address.state">State/Province</Label>
              <Input
                id="address.state"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="space-y-2">
              <Label htmlFor="address.zipCode">Zip/Postal Code</Label>
              <Input
                id="address.zipCode"
                name="address.zipCode"
                value={formData.address.zipCode}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address.country">Country</Label>
              <Input
                id="address.country"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        
        <div className="form-section">
          <h2 className="section-header">Additional Information</h2>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/customers")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Customer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
