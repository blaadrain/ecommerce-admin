import prismadb from "@/lib/prismadb";
import BillboardForm from "./_components/billboards-form";

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  const billboard = await prismadb.billboard?.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm />
      </div>
    </div>
  );
};

export default BillboardPage;