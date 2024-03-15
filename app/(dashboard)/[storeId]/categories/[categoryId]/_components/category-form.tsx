"use client";

import Heading from "@/components/heading";
import AlertModal from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard, Category } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type CategoryFormProps = {
  category: Category | null;
  billboards: Billboard[];
};

type CategoryFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(1, { message: "Field required" }),
  billboardId: z.string().min(1, { message: "Field required" }),
});

const BillboardForm: React.FC<CategoryFormProps> = ({
  category,
  billboards,
}) => {
  const params = useParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title = category ? "Edit category" : "Create category";
  const description = category
    ? "Edit a category"
    : "Add a new category to your store";
  const toastMessage = category ? "Category updated" : "Category created";
  const action = category ? "Save changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: category || { name: "", billboardId: "" },
  });

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      setIsLoading(true);

      if (category) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          values,
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, values);
      }

      router.push(`/${params.storeId}/categories`);
      router.refresh();
      toast({ title: toastMessage });
    } catch (error) {
      console.error(error);
      toast({ title: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`,
      );
      router.push(`/${params.storeId}/categories/`);
      router.refresh();
      toast({ title: "Category deleted" });
    } catch (error) {
      toast({
        title: "Failed to delete a category",
        description:
          "Make sure you removed all products using this category first",
      });
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        isLoading={isLoading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {category && (
          <Button
            disabled={isLoading}
            onClick={() => setIsOpen(true)}
            variant="destructive"
            size="icon"
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Select a billboard"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {billboards.map(({ id, label }) => (
                          <SelectItem key={id} value={id}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BillboardForm;
