import prismadb from "@/lib/prismadb";
import OrderClient from "./_components/order-client";
import { OrderColumn } from "./_components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedOrders: OrderColumn[] = orders.map(
    ({ id, phone, address, orderItems, isPaid, createdAt }) => ({
      id,
      phone,
      address,
      products: orderItems.map(({ product }) => product.name).join(", "),
      totalPrice: formatter.format(
        orderItems.reduce((total, item) => {
          return total + +item.product.price;
        }, 0),
      ),
      isPaid,
      createdAt: format(createdAt, "MMMM do, yyyy"),
    }),
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient orders={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
