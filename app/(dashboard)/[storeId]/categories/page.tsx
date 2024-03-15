import prismadb from "@/lib/prismadb";
import CategoryClient from "./_components/category-client";
import { CategoryColumn } from "./_components/columns";
import { format } from "date-fns";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map(
    ({ id, name, billboard, createdAt }) => ({
      id,
      name,
      billboardLabel: billboard.label,
      createdAt: format(createdAt, "MMMM do, yyyy"),
    }),
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient categories={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
