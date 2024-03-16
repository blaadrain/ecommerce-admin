import prismadb from "@/lib/prismadb";
import { ColorColumn } from "./_components/columns";
import { format } from "date-fns";
import ColorClient from "./_components/color-client";

const ColorsPage = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map(
    ({ id, name, value, createdAt }) => ({
      id,
      name,
      value,
      createdAt: format(createdAt, "MMMM do, yyyy"),
    }),
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient colors={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
