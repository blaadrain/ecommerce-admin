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
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Billboard } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type BillboardFormProps = {
  billboard: Billboard | null;
};

type BillboardFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  label: z.string().min(1, { message: "Field required" }),
  backgroundColor: z.string().refine(
    (value) => {
      if (value === "") return true;
      else return /^#([A-Fa-f0-9]{6})$/.test(value);
    },
    { message: "Invalid hex-code format" },
  ),
});

const BillboardForm: React.FC<BillboardFormProps> = ({ billboard }) => {
  const params = useParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title = billboard ? "Edit billboard" : "Create billboard";
  const description = billboard
    ? "Edit a billboard"
    : "Add a new billboard to your store";
  const toastMessage = billboard ? "Billboard updated" : "Billboard created";
  const action = billboard ? "Save changes" : "Create";

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: billboard || { label: "", backgroundColor: "" },
  });

  const onSubmit = async (values: BillboardFormValues) => {
    try {
      setIsLoading(true);

      if (billboard) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          values,
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, values);
      }

      router.push(`/${params.storeId}/billboards`);
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
        `/api/${params.storeId}/billboards/${params.billboardId}`,
      );
      router.push(`/${params.storeId}/billboards/`);
      router.refresh();
      toast({ title: "Billboard deleted" });
    } catch (error) {
      toast({
        title: "Failed to delete a billboard",
        description:
          "Make sure you removed all categories using this billboard first",
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
        {billboard && (
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="backgroundColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background color (hex)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="#AAF0D1"
                      {...field}
                    />
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
