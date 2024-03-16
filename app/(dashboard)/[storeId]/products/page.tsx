import prismadb from "@/lib/prismadb";
import ProductClient from "./_components/product-client";
import { ProductColumn } from "./_components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map(
    ({
      id,
      name,
      isFeatured,
      isArchived,
      price,
      category,
      size,
      color,
      createdAt,
    }) => ({
      id,
      name,
      isFeatured,
      isArchived,
      price: formatter.format(+price),
      category: category.name,
      size: size.value,
      color: color.value,
      createdAt: format(createdAt, "MMMM do, yyyy"),
    }),
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient products={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
