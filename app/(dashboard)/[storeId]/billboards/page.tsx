import prismadb from "@/lib/prismadb";
import BillboardClient from "./_components/billboard-client";
import { BillboardColumn } from "./_components/columns";
import { format } from "date-fns";

const BillboardsPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(
    ({ id, label, backgroundColor, createdAt }) => ({
      id,
      label,
      backgroundColor,
      createdAt: format(createdAt, "MMMM do, yyyy"),
    }),
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient billboards={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
