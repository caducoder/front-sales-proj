import { Button } from "@mantine/core";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React, { useMemo, useState } from "react";

import classes from "./ProductTable.module.css";

const fallbackData = [];

function ProductTable({ dataList, columns }) {
  const columnsDef = useMemo(() => columns, []);

  const table = useReactTable({
    columns: columnsDef,
    data: dataList ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table className={classes.table}>
        <thead className={classes.thead}>
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
