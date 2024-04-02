"use client";
import ListTablePagination from "@/components/generals/ListTablePagination";
import { LoadingContent } from "@/components/generals/LoadingBox";
import useGetListOrders from "@/customHooks/admin/useGetListOrders";
import { convertDateTime } from "@/utils/convertDate";
import { ConvertMoney } from "@/utils/convertMoney";
import {
  convertOrderDeliveryStatus,
  convertOrderPaymentMethod,
  convertOrderStatus,
} from "@/utils/convertOrders";

import {
  convertOrderStatus as convertOrderStatusTable,
  convertStatus,
} from "@/utils/convertTables";
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
import RemoveOrderButton from "./RemoveOrderButton";
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
const OrderList = () => {
  const [globalFilter, setGlobalFilter] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageSizeParam = searchParams.get("pageSize") * 1 || PAGE.PAGE_SIZE;
  const pageIndexParam = searchParams.get("pageIndex") * 1 || PAGE.PAGE_INDEX;
  const columns = useMemo(
    () => [
      {
        header: "Mã đơn hàng",
        footer: (props) => props.column.id,
        cell: (cell) => cell.getValue(),
        accessorKey: "_id",
      },
      {
        header: "Email",
        footer: (props) => props.column.id,
        accessorKey: "user.email",
      },
      {
        header: "Tổng cộng",
        footer: (props) => props.column.id,
        accessorKey: "total",
        cell: (cell) => <ConvertMoney money={cell.getValue()} />,
      },
      {
        header: "Phương thức thanh toán",
        footer: (props) => props.column.id,
        accessorFn: (row) => `${convertOrderPaymentMethod(row.order_method)}`,
      },
      {
        header: "Tình trạng đơn hàng",
        footer: (props) => props.column.id,
        accessorFn: (row) => `${convertOrderDeliveryStatus(row.order_status)}`,
        accessorKey: "order_status",

        cell: (cell) => {
          return convertOrderStatusTable(
            cell.row.original.order_status,
            cell.getValue()
          );
        },
      },

      {
        header: "Trạng thái",
        footer: (props) => props.column.id,
        accessorFn: (row) => `${convertOrderStatus(row.status)}`,
        accessorKey: "status",
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

            <RemoveOrderButton order={original} />
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
    useGetListOrders({
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
export default OrderList;
