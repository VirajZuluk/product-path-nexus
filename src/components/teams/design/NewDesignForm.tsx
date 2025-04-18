
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface DesignFormData {
  name: string;
  description: string;
  designer: string;
  estimatedTime: string;
}

export function NewDesignForm() {
  const { toast } = useToast();
  const form = useForm<DesignFormData>({
    defaultValues: {
      name: "",
      description: "",
      designer: "",
      estimatedTime: "",
    },
  });

  const onSubmit = (data: DesignFormData) => {
    console.log("Design Form Data:", data);
    toast({
      title: "Design Created",
      description: "New design has been created successfully.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Design Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter design name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter design description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="designer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned Designer</FormLabel>
              <FormControl>
                <Input placeholder="Enter designer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="estimatedTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estimated Time (days)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter estimated days" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Create Design</Button>
      </form>
    </Form>
  );
}
