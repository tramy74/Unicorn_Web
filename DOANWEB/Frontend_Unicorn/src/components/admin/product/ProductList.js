"use client";
import ListTablePagination from "@/components/generals/ListTablePagination";
import { LoadingContent } from "@/components/generals/LoadingBox";
import { convertDateTime } from "@/utils/convertDate";
import { ConvertMoney } from "@/utils/convertMoney";

import useGetListProducts from "@/customHooks/admin/useGetListProducts";
import { convertProductGender } from "@/utils/convertGender";
import { convertProductStatus } from "@/utils/convertStatus";
import { convertStatus } from "@/utils/convertTables";
import { PencilIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@mui/material";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import ListTable from "../../generals/ListTable";
import SearchListBar from "../generals/SearchListBar";
import RemoveProductButton from "./RemoveProductButton";

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};
const PAGE = {
  PAGE_SIZE: 10,
  PAGE_INDEX: 0,
};

const ProductList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageSizeParam = searchParams.get("pageSize") * 1 || PAGE.PAGE_SIZE;
  const pageIndexParam = searchParams.get("pageIndex") * 1 || PAGE.PAGE_INDEX;

  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo(
    () => [
      {
        header: "ID",
        footer: (props) => props.column.id,
        cell: (cell) => cell.getValue(),
        accessorKey: "_id",
      },
      {
        header: "Tên sản phẩm",
        footer: (props) => props.column.id,
        accessorKey: "product_name",
      },
      {
        header: "Danh mục",
        footer: (props) => props.column.id,
        accessorKey: "product_categories",
        accessorFn: (row) =>
          row.product_categories
            .map((item) => item.product_category_name)
            .join(", "),
      },

      {
        header: "Giá gốc",
        footer: (props) => props.column.id,
        accessorKey: "product_original_price",
        cell: (cell) => <ConvertMoney money={cell.getValue()} />,
      },
      {
        header: "Màu sắc",
        footer: (props) => props.column.id,
        accessorKey: "product_color.product_color_name",
      },
      {
        header: "Giới tính",
        footer: (props) => props.column.id,
        accessorKey: "product_gender",
        accessorFn: (row) => `${convertProductGender(row.product_gender)}`,
      },
      {
        header: "Trạng thái",
        footer: (props) => props.column.id,
        accessorKey: "status",
        accessorFn: (row) => `${convertProductStatus(row.status)}`,

        cell: (cell) => {
          return convertStatus(cell.row.original.status, cell.getValue());
        },
      },
      {
        header: "Thời gian tạo",
        footer: (props) => props.column.id,
        accessorKey: "createdAt",

        cell: (row) => `${convertDateTime(row.getValue())}`,
      },
      {
        header: "Hành động",

        cell: ({ row: { original } }) => (
          <div className="flex items-center gap-4">
            <Link href={`${original._id}`}>
              <IconButton>
                <PencilIcon className="h-[2rem] w-[2rem] cursor-pointer" />
              </IconButton>
            </Link>

            <RemoveProductButton product={original} />
          </div>
        ),
      },
    ],
    []
  );

  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: pageIndexParam,
    pageSize: pageSizeParam,
  });
  const defaultData = useMemo(() => [], []);

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  useEffect(() => {
    router.replace(`?pageIndex=${pageIndex}&pageSize=${pageSize}`, {
      scroll: false,
    });
  }, [pageSize, pageIndex]);

  const { data, isLoading, isError, error, isFetching, refetch } =
    useGetListProducts({
      pageIndex,
      pageSize,
    });

  const table = useReactTable({
    data: data?.data ?? defaultData,
    columns,
    pageCount: data?.metadata?.pageCount ?? -1,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      pagination,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  const tableContainerRef = useRef(null);
  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer({
    getScrollElement: () => tableContainerRef.current,
    count: rows.length,

    estimateSize: () => 10,
  });
  const virtualRows = rowVirtualizer.getVirtualItems();

  return (
    <>
      {isLoading && <LoadingContent />}
      {!isLoading && (
        <>
          <SearchListBar
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(String(e.target.value))}
          />

          <ListTable
            table={table}
            isVirtual={true}
            virtualRows={virtualRows}
            tableContainerRef={tableContainerRef}
          />
          <ListTablePagination
            table={table}
            allResults={data?.metadata?.allResults || 0}
          />
        </>
      )}
    </>
  );
};
export default ProductList;
