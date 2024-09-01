import {
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";

const fallbackData = [];

const columnsDef = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Price",
    accessorKey: "price",
    cell: ({ cell, row }) => {
      const valueBRL = new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "BRL",
      }).format(Number(cell.getValue()) / 100);
      return `${valueBRL}`;
    },
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
];

function ProductTable({ dataList }) {
  const columns = useMemo(() => columnsDef, []);

  const table = useReactTable({
    columns,
    data: dataList ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;
