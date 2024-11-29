'use client';

import { ExportToExcel } from '@/components/export-to-excel';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import {
   ColumnDef,
   ColumnFiltersState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function DataResponses({ data }: any) {
   const head = Object.keys(data[0]);
   type QuestionKeys = (typeof head)[number];
   type DynamicQuestionType = {
      submittedBy: string;
   } & Record<QuestionKeys, string>;
   const columns: ColumnDef<DynamicQuestionType>[] = head.map((el) => ({
      accessorKey: el,
      header: () => <div>{`${el[0].toUpperCase()}${el.slice(1)}`}</div>,
      cell: ({ row }) => {
         const value = row.getValue(el) as string;
         const words = value.split(' ');
         const limitedWords =
            words.length > 4
               ? words.slice(0, 4).join(' ') + '...'
               : words.join(' ');

         return <div className="lowercase">{limitedWords}</div>;
      },
   }));

   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
      {},
   );

   const table = useReactTable({
      data,
      columns,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      state: {
         columnFilters,
         columnVisibility,
      },
   });

   return (
      <div className="w-full">
         <div className="flex items-center justify-between py-4">
            <Input
               placeholder="Filter emails..."
               value={
                  (table
                     .getColumn('submittedBy')
                     ?.getFilterValue() as string) ?? ''
               }
               onChange={(event) =>
                  table
                     .getColumn('submittedBy')
                     ?.setFilterValue(event.target.value)
               }
               className="max-w-sm"
            />

            <div className="flex gap-x-3">
               <ExportToExcel apiData={data} fileName="Responses" />

               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline" className="ml-auto">
                        Columns <ChevronDown />
                     </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">
                     {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                           return (
                              <DropdownMenuCheckboxItem
                                 key={column.id}
                                 className="capitalize"
                                 checked={column.getIsVisible()}
                                 onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                 }
                              >
                                 {column.id}
                              </DropdownMenuCheckboxItem>
                           );
                        })}
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>

         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext(),
                                      )}
                              </TableHead>
                           );
                        })}
                     </TableRow>
                  ))}
               </TableHeader>

               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           data-state={row.getIsSelected() && 'selected'}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                 )}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell
                           colSpan={columns.length}
                           className="h-24 text-center"
                        >
                           No results.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>

         <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 font-bold">
               {table.getFilteredRowModel().rows.length} Responses.
            </div>

            <div className="space-x-2">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
               >
                  Previous
               </Button>

               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
               >
                  Next
               </Button>
            </div>
         </div>
      </div>
   );
}
