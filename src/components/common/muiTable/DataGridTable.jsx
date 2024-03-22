import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";


const DataGridTable = ({
  rows,
  columns,
  showOrHide,
  pageInfo,
  setPageInfo,
  itemRender,
  fetchlist,
}) => {

  const onPageHandler = ({page,pageSize})=>{
    const newPage = pageSize !== pageInfo.pageSize ? 0 : page;
    setPageInfo({ ...pageInfo, page: newPage });
    fetchlist(newPage , pageSize);
  }
  return (
    <div style={{ maxWidth: "1800px" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={{ pageSize: pageInfo?.pageSize , page: pageInfo?.page}}
        onPaginationModelChange={onPageHandler}
        checkboxSelection={showOrHide}
        paginationMode="server"
        disableColumnMenu={true}
        rowCount={pageInfo?.totalCount}
        pageSizeOptions={[10, 25, 50, 100]}
      />
    </div>
  );
};

export default DataGridTable;
