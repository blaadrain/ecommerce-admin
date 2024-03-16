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
import { Color } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

type ColorFormProps = {
  color: Color | null;
};

type ColorFormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  name: z.string().min(1, { message: "Field required" }),
  value: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6})$/, { message: "Invalid hex-code format" }),
});

const ColorForm: React.FC<ColorFormProps> = ({ color }) => {
  const params = useParams();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title = color ? "Edit color" : "Create color";
  const description = color ? "Edit a color" : "Add a new color to your store";
  const toastMessage = color ? "Color updated" : "Color created";
  const action = color ? "Save changes" : "Create";

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: color || { name: "", value: "" },
  });

  const onSubmit = async (values: ColorFormValues) => {
    try {
      setIsLoading(true);

      if (color) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          values,
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, values);
      }

      router.push(`/${params.storeId}/colors`);
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
      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
      router.push(`/${params.storeId}/colors/`);
      router.refresh();
      toast({ title: "Color deleted" });
    } catch (error) {
      toast({
        title: "Failed to delete a color",
        description:
          "Make sure you removed all products using this color first",
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
        {color && (
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
                      placeholder="Color name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color (hex-code)</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={isLoading}
                        placeholder="#AAF0D1"
                        {...field}
                      />
                      <div
                        className="h-[40px] w-[40px] shrink-0 rounded-md border"
                        style={{ backgroundColor: field.value || "#AAF0D1" }}
                      />
                    </div>
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

export default ColorForm;
