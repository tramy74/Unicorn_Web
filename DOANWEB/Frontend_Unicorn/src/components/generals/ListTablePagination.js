import TablePaginationActions from "@/components/generals/TablePaginationActions";
import { TablePagination } from "@mui/material";

const ListTablePagination = ({ table, allResults = 0 }) => {
  return (
    <>
      <TablePagination
        sx={{
          "& .MuiToolbar-root": {
            flexWrap: "wrap",
            justifyContent: "center",
          },
        }}
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: allResults }]}
        component="div"
        count={allResults}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        SelectProps={{
          inputProps: { "aria-label": "rows per page" },
          native: true,
        }}
        onPageChange={(_, page) => {
          table.setPageIndex(page);
        }}
        onRowsPerPageChange={(e) => {
          const size = e.target.value ? Number(e.target.value) : 10;
          table.setPageSize(size);
        }}
        ActionsComponent={TablePaginationActions}
      />
    </>
  );
};
export default ListTablePagination;
