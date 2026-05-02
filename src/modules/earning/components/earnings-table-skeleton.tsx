import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const COLUMNS = [
  { header: "Data", width: 140, skeleton: "h-8 w-24" },
  { header: "Aplicativos", width: 160, skeleton: "h-5 w-28" },
  { header: "Horas", width: 80, skeleton: "h-4 w-8" },
  { header: "Km", width: 80, skeleton: "h-4 w-12" },
  { header: "Bruto", width: 120, skeleton: "h-4 w-20" },
  { header: "Despesas", width: 120, skeleton: "h-4 w-16" },
  { header: "Líquido", width: 120, skeleton: "h-4 w-20" },
  { header: "", width: 160, skeleton: "h-8 w-32" },
] as const;

export default function EarningsTableSkeleton() {
  return (
    <div className="w-full rounded-lg border">
      <Table className="w-full table-fixed">
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {COLUMNS.map((col, i) => (
              <TableHead
                key={i}
                className="text-xs font-medium"
                style={{ width: col.width }}
              >
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 6 }).map((_, rowIdx) => (
            <TableRow key={rowIdx}>
              {COLUMNS.map((col, colIdx) => (
                <TableCell key={colIdx}>
                  <Skeleton className={col.skeleton} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
