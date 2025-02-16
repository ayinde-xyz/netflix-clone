import prismadb from "@/lib/prismadb";
import BillboardClient from "./components/client";
import { OrderColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";

const OrdersPage = async ({
  params,
}: {
  params: Promise<{ storeId: string }>;
}) => {
  const { storeId } = await params;
  const orders = await prismadb.order.findMany({
    where: { storeId: storeId },
    orderBy: { createdAt: "desc" },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce(
        (total, item) =>
          total + Number(item.product.price) * item.orderQuantity,
        0
      )
    ),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
    isPaid: item.isPaid,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
