import React from "react";
import Styles from "./tables.module.css";
import { Pagination, Popconfirm } from "antd";
import deleteIcon from "../../../asset/AmChatSuperAdmin/Frame 2302.png";
import editIcon from "../../../asset/AmChatSuperAdmin/pencil-alt.png";
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";

const Tables = ({
  tableHead,
  handleRequestSort,
  rows,
  order,
  orderBy,
  page,
  rowsPerPage,
  emptyRows,
  handleDelete,
  handleCheckboxClick,
  handleEdit,
  itemRender,
  pageInfo,
  setPageInfo,
  fetchUserList,
}) => {
  return (
    <Paper>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={"medium"}
          aria-label="enhanced table"
        >
          <TableHead style={{ borderBottom: "2px solid #0F172A" }}>
            <TableRow>
              {tableHead &&
                tableHead.map((item) => (
                  <TableCell key={item.key}>
                    <TableSortLabel
                      onClick={(e) => {
                        if (item.key === "name") {
                          handleRequestSort(e, "createdAt");
                        } else {
                          handleRequestSort(e, item.key);
                        }
                      }}
                      active={
                        item.key !== "name" || item.key !== "action"
                          ? orderBy === item.key
                          : false
                      }
                      direction={
                        item.key !== "name" || item.key !== "action"
                          ? orderBy === item.key
                            ? order
                            : "asc"
                          : "asc"
                      }
                    >
                      <Typography
                        variant="body1"
                        style={{ fontWeight: "bold" }}
                      >
                        {item.label}
                      </Typography>
                    </TableSortLabel>
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {rows.length > 0 ? (
                rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        <span className={Styles.tableText}>
                          {" "}
                          {`${row.firstName} ${row.lastName}`}
                          {row.name}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={Styles.tableText}>
                          {row.createdAt}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={Styles.tableText}>
                          {" "}
                          {row.updatedAt}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span>{row.active ? "Active" : "Inactive"}</span>
                      </TableCell>
                      {/* {handleCheckboxClick && ( */}
                        <TableCell>
                          <div className={Styles.emailWithCheckbox}>
                            <span
                              style={{ marginTop: "10px" }}
                              className={Styles.tableText}
                            >
                              {row.email}
                            </span>
                            <Checkbox
                              inputProps={{
                                "aria-labelledby": row.firstName,
                              }}
                              onClick={() =>
                                handleCheckboxClick(row.id, !row.active)
                              }
                            />
                          </div>
                        </TableCell>
                      {/* )} */}
                      <TableCell>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEdit(row.id)}
                        >
                          <img src={editIcon} alt="Edit" />
                        </IconButton>
                        <IconButton aria-label="delete">
                          {row?.active === true && (
                            <Popconfirm
                              key={row?.id || "amchat"}
                              title="Am Chat"
                              description="Do you Really want to delete this user"
                              onConfirm={() => {
                                handleDelete(row.id);
                              }}
                              okText="Submit"
                              cancelText="Close"
                            >
                              <img src={deleteIcon} alt="Delete" />
                            </Popconfirm>
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={7} />
                </TableRow>
              )}
            </>
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "16px",
          gap: "20px",
          marginRight: "5px",
        }}
      >
        <div>Total {pageInfo?.totalCount} items</div>
        <Pagination
          defaultCurrent={1}
          total={pageInfo?.totalPages * 10}
          itemRender={itemRender}
          current={pageInfo?.page + 1}
          onChange={(newPage) => {
            setPageInfo({ ...pageInfo, page: newPage - 1 });
            fetchUserList(newPage - 1);
          }}
        />
      </div>
    </Paper>
  );
};

export default Tables;
