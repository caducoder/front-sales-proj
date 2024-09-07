import { Button } from "@mantine/core";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";

import classes from "./ProductTable.module.css";

const fallbackData = [];

function ProductTable({ dataList, columns }) {
  const columnsDef = useMemo(() => columns, []);
  const [rowSelection, setRowSelection] = useState({});
  const numOfSelectedRows = Object.keys(rowSelection).map(Number).length;

  const table = useReactTable({
    columns: columnsDef,
    data: dataList ?? fallbackData,
    state: {
      rowSelection,
    },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleProductDelete = () => {
    console.log("Delete", Object.keys(rowSelection).map(Number));
  };

  return (
    <div>
      <div
        className={`${classes.fadeIn} ${
          numOfSelectedRows > 0 ? classes.fadeInVisible : ""
        }`}
      >
        <Button color="red" onClick={handleProductDelete}>
          Deletar {numOfSelectedRows} produto{numOfSelectedRows > 1 ? "s" : ""}
        </Button>
      </div>

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
