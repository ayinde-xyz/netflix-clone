"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Billboard } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface SizesClientProps {
  data: SizeColumn[];
}

const SizesClient: React.FC<SizesClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Sizes (${data.length})`}
          description="Manage sizes for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          <span className="sm:inline-block hidden">Add New</span>
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for sizes" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
};

export default SizesClient;
