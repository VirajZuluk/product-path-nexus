
import { Link } from "react-router-dom";
import { Boxes, Sparkles, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductTypeSelection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-product-dark">Select Product Type</h1>
        <p className="text-muted-foreground">Choose the appropriate product type to continue</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Standard Product Card */}
        <Card className="border-2 border-product hover:border-product-dark transition-all">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-full bg-product-light flex items-center justify-center mb-2">
              <Boxes className="text-product-dark h-6 w-6" />
            </div>
            <CardTitle className="text-2xl">Standard Product</CardTitle>
            <CardDescription>
              Products with predefined specifications and designs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-product mr-2 shrink-0" />
                <span>Products manufactured according to your standard designs</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-product mr-2 shrink-0" />
                <span>Follows your established design workflow</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-product mr-2 shrink-0" />
                <span>Typically has shorter lead times</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-product mr-2 shrink-0" />
                <span>Design team handles raw material specifications</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/design/new">Continue with Standard Product</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Non-Standard Product Card */}
        <Card className="border-2 border-procurement hover:border-procurement-dark transition-all">
          <CardHeader className="pb-4">
            <div className="w-12 h-12 rounded-full bg-procurement-light flex items-center justify-center mb-2">
              <Sparkles className="text-procurement-dark h-6 w-6" />
            </div>
            <CardTitle className="text-2xl">Non-Standard Product</CardTitle>
            <CardDescription>
              Custom or unique products requiring special procurement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-procurement mr-2 shrink-0" />
                <span>Custom products requiring unique specifications</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-procurement mr-2 shrink-0" />
                <span>Follows the procurement workflow with vendor quotes</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-procurement mr-2 shrink-0" />
                <span>Requires engineering approval process</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-5 w-5 text-procurement mr-2 shrink-0" />
                <span>May have longer lead times and multiple vendors</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <Link to="/procurement/new">Continue with Non-Standard Product</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="flex justify-center mt-6">
        <Button variant="ghost" asChild>
          <Link to="/products">Cancel</Link>
        </Button>
      </div>
    </div>
  );
}
