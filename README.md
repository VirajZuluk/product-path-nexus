
# Product Path Nexus - Comprehensive Procurement Solution

## Overview
Product Path Nexus is a comprehensive web application designed to streamline the entire product procurement and management process, from initial customer inquiry to final purchase order.

## Workflow Stages

### 1. Customer Management
- **Entry Point**: Customer Inquiry Dashboard
  - Add new customers
  - Search existing customer database
- **Customer Form**
  - Create and edit customer details
  - Auto-generation of customer registration ID

### 2. Product Management
- **Product Type Selection**
  - Choose between Standard and Non-standard products
- **Routing Logic**
  - Standard Products → Design Workflow
  - Non-standard Products → Procurement Workflow

### 3. Quotation Management
- **Quotation Creation**
  - Add customer details
  - Select and add products
  - Input additional queries/feedback
- **Costing Process**
  - Input manufacturing costs
  - Add vendor pricing
  - Calculate total with additional charges
- **Terms & Conditions**
  - Editable review of terms
- **Final Quotation**
  - Generate unique quotation ID
  - Options to email or download PDF
- **Customer Feedback**
  - Accept or reject quotation
  - Add comments

### 4. Procurement Workflow (Non-Standard Items)
- **Vendor Management**
  - Upload and manage vendor information
- **Vendor Quotation Collection**
  - Gather at least 3 quotes
  - Compare pricing and lead times
- **Quotation Comparison**
  - Evaluate cost, quality, and lead time
- **Engineering Approval**
  - Engineering team selects best vendor
- **Final Vendor Selection**
  - System records final vendor choice

### 5. Design Workflow (Standard Items)
- **Design Team Interface**
  - Input raw material list
  - Attach manufacturing information
  - Auto-generate design ID

### 6. Purchase Order (PO) Management
- **Customer PO Upload**
  - Upload or manually enter PO information
  - Auto-generate PO ID
- **Confirmation**
  - Display summary of purchase
- **Project Completion**
  - System status changes to STOP

## Technical Stack
- Framework: React
- Language: TypeScript
- Styling: Tailwind CSS
- UI Components: Shadcn/UI
- State Management: React Query
- Routing: React Router

## Key Features
- Modular design
- Seamless workflow integration
- Automated ID generation
- Comprehensive tracking
- Flexible product management

## Getting Started
1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## Deployment
Deploy through Lovable platform or your preferred hosting service.

## License
[Your License Information]

## Contact
[Your Contact Information]
