"use client";

import { ColorColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, Trash } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import AlertModal from "@/components/modals/alert-modal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

type CellActionProps = {
  row: ColorColumn;
};

const CellAction: React.FC<CellActionProps> = ({ row }) => {
  const router = useRouter();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({ title: "Color ID copied to the clipboard" });
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${row.id}`);
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
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(`/${params.storeId}/colors/${row.id}`)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Update</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => onCopy(row.id)}>
              <Copy className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy ID</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
              <Trash className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </>
  );
};

export default CellAction;
