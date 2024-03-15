import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Pagination } from "antd";

const DataGridTable = ({
  rows,
  columns,
  showOrHide,
  pageInfo,
  setPageInfo,
  itemRender,
  fetchlist,
}) => {
  return (

      <DataGrid
        rows={rows}
        columns={columns}
        pagination={
          <Pagination
            defaultCurrent={1}
            total={pageInfo?.totalPages * 10}
            itemRender={itemRender}
            current={pageInfo?.page + 1}
            onChange={(newPage) => {
              setPageInfo({ ...pageInfo, page: newPage - 1 });
              fetchlist(newPage - 1);
            }}
            showSizeChanger={false}
          />
        }
        pageSizeOptions={[10]}
        checkboxSelection={showOrHide}
        disableColumnMenu={true}
      />
   
  );
};

export default DataGridTable;
