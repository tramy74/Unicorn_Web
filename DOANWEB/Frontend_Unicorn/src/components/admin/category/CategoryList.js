"use client";
import ListTablePagination from "@/components/generals/ListTablePagination";
import { LoadingContent } from "@/components/generals/LoadingBox";
import useGetListCategories from "@/customHooks/admin/useGetListCategories";
import { convertProductGender } from "@/utils/convertGender";
import { convertUserStatus } from "@/utils/convertStatus";
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
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import ListTable from "../../generals/ListTable";
import SearchListBar from "../generals/SearchListBar";

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
const CategoryList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageSizeParam = searchParams.get("pageSize") * 1 || PAGE.PAGE_SIZE;
  const pageIndexParam = searchParams.get("pageIndex") * 1 || PAGE.PAGE_INDEX;
  const columns = useMemo(
    () => [
      {
        header: "Tên danh mục",
        footer: (props) => props.column.id,

        cell: (cell) => cell.getValue(),
        accessorKey: "product_category_name",
      },
      {
        header: "Từ khóa",
        footer: (props) => props.column.id,
        accessorKey: "product_category_keyword",
      },
      {
        header: "Giới tính",
        footer: (props) => props.column.id,
        accessorFn: (row) =>
          `${convertProductGender(row.product_category_gender)}`,
      },
      {
        header: "Hình ảnh",
        footer: (props) => props.column.id,
        accessorKey: "product_category_image",

        cell: (cell) => {
          return (
            <div className="relative h-8 w-8">
              <Image
                src={cell.getValue()}
                alt={cell.row.original.product_category_name}
                fill
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          );
        },
      },
      {
        header: "Status",
        footer: (props) => props.column.id,
        accessorFn: (row) => `${convertUserStatus(row.status)}`,
        accessorKey: "status",
        cell: (cell) => {
          return convertStatus(cell.row.original.status, cell.getValue());
        },
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
    useGetListCategories({
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
export default CategoryList;
