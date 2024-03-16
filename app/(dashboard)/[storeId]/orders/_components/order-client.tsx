"use client";

import Heading from "@/components/heading";
import { OrderColumn, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

type OrderClientProps = {
  orders: OrderColumn[];
};

const OrderClient: React.FC<OrderClientProps> = ({ orders }) => {
  return (
    <>
      <Heading
        title={`Orders (${orders.length})`}
        description="Manage orders for your store"
      />
      <Separator />
      <DataTable columns={columns} data={orders} searchKey="products" />
    </>
  );
};

export default OrderClient;
