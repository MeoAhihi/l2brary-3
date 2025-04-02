import { Payment, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return Array.from({ length: 30 }, (_, index) => ({
    id: "728ed52f",
    amount: 100 * index,
    status: index % 2 ? "success" : "pending",
    email: index + "m@example.com",
  }))
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} title="Payments" createPage="/dashboard/create" filterField="status" />
    </div>
  )
}
