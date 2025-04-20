import { Users, Package, FileText, ShoppingCart, Pencil, ArrowRight } from "lucide-react";
import { ModuleCard } from "@/components/ui/module-card";
import { StatCard } from "@/components/ui/stat-card";
import { ProcessFlow } from "@/components/ui/process-flow";
export default function Dashboard() {
  const modules = [{
    title: "Customer Management",
    description: "Add, search and manage customer information",
    icon: <Users size={24} className="text-customer-dark" />,
    linkTo: "/customers",
    color: "bg-customer-light",
    actions: [{
      label: "Add Customer",
      href: "/customers/new"
    }, {
      label: "Search",
      href: "/customers"
    }]
  }, {
    title: "Product Management",
    description: "Add standard or custom products to catalog",
    icon: <Package size={24} className="text-product-dark" />,
    linkTo: "/products",
    color: "bg-product-light",
    actions: [{
      label: "Add Product",
      href: "/products/new"
    }]
  }, {
    title: "Quotation Management",
    description: "Create quotations and track customer responses",
    icon: <FileText size={24} className="text-quotation-dark" />,
    linkTo: "/quotations",
    color: "bg-quotation-light",
    actions: [{
      label: "New Quote",
      href: "/quotations/new"
    }]
  }, {
    title: "Procurement Workflow",
    description: "Manage vendor quotes for non-standard items",
    icon: <ShoppingCart size={24} className="text-procurement-dark" />,
    linkTo: "/procurement",
    color: "bg-procurement-light"
  }, {
    title: "Design Workflow",
    description: "Manage design workflow for standard items",
    icon: <Pencil size={24} className="text-design-dark" />,
    linkTo: "/design",
    color: "bg-design-light"
  }];
  const recentWorkflowSteps = [{
    id: "1",
    title: "Customer Inquiry",
    description: "Initial customer contact",
    status: "completed" as const
  }, {
    id: "2",
    title: "Product Selection",
    description: "Choose product type",
    status: "completed" as const
  }, {
    id: "3",
    title: "Quotation Creation",
    description: "Generate customer quote",
    status: "current" as const
  }, {
    id: "4",
    title: "Customer Approval",
    description: "Await customer decision",
    status: "upcoming" as const
  }, {
    id: "5",
    title: "Purchase Order",
    description: "Process purchase order",
    status: "upcoming" as const
  }];
  return <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Product Path Nexus - your complete procurement solution.</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Customers" value="246" icon={<Users size={20} />} trend={{
        value: 12,
        positive: true
      }} />
        <StatCard title="Products" value="1,284" icon={<Package size={20} />} description="Standard: 1,053 | Custom: 231" />
        <StatCard title="Active Quotations" value="47" icon={<FileText size={20} />} trend={{
        value: 4,
        positive: false
      }} />
        <StatCard title="Conversion Rate" value="68%" icon={<ArrowRight size={20} />} trend={{
        value: 8,
        positive: true
      }} />
      </div>

      {/* Process Flow */}
      <div className="dashboard-card mx-0">
        <h2 className="text-xl font-semibold mb-4">Product Workflow</h2>
        <ProcessFlow steps={recentWorkflowSteps} />
      </div>

      {/* Module Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, index) => <ModuleCard key={index} title={module.title} description={module.description} icon={module.icon} linkTo={module.linkTo} color={module.color} actions={module.actions} />)}
      </div>
    </div>;
}