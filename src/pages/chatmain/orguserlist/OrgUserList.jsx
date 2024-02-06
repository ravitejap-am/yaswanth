import React, { useState, useEffect } from "react";
import Styles from "./OrgUserList.module.css";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/AmChatSuperAdmin/plus-sm.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import editIcon from "../../../asset/AmChatSuperAdmin/pencil-alt.png";
import deleteIcon from "../../../asset/AmChatSuperAdmin/Frame 2302.png";
import { Link } from "react-router-dom";
import styles from "../../../pages/AMChatAdmin/OrganizationList/Organization.module.css";
import Search from "../../../components/common/search/Search";
import SerchImages from "../../../asset/AmChatSuperAdmin/Group2305.png";
import { Pagination } from "antd";
import { FormControl, MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import { setUser, selectUser } from "../../../store/authSlice";
import { useSelector } from "react-redux";
import upload from "../../../asset/uploadlatesticon.png";

function OrgUserList() {
  const [documents, setDocuments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("documentName");

  const user = useSelector(selectUser);
  const jwt = user.userToken;

  console.log("====================================");
  console.log(jwt);
  console.log("====================================");
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(
          `http://54.161.113.196:8080/document/?page=0&size=10&sortField=uploadDate&sortDirection=desc&name=java&isActive=1&version=&fileSize=`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch documents");
        }

        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error.message);
      }
    };

    fetchDocuments();
  }, [page, rowsPerPage, order, orderBy, jwt]);

  const searchStyles = {
    width: "300px",
    height: "45px",
    borderRadius: "42px",
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#EEF2FF",
    display: "flex",
    alignItems: "center",
    marginRight: "18px",
  };
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const rows = [
    {
      id: 1,
      documentName: "Passbook",
      size: "3 MB",
      version: "v1.0",
      status: "Active",
    },
    {
      id: 2,
      documentName: "Passbook",
      size: "2.5 MB",
      version: "v2.0",
      status: "Inactive",
    },
    {
      id: 3,
      documentName: "Passbook",
      size: "3 MB",
      version: "v1.0",
      status: "Active",
    },
    {
      id: 4,
      documentName: "Passbook",
      size: "2.5 MB",
      version: "v2.0",
      status: "Inactive",
    },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <div>
            <p className={Styles.superAdminOrganizationListName}>
              Document List
            </p>
          </div>
          <div
            className={Styles.superAdminProfileImgNameStyle}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={profile} alt="" className={Styles.AdminProfileStyle} />
            <span className={Styles.SuperAdminProfileStyle}>Lian Vendiar</span>
          </div>
        </div>

        <div className={Styles.bannerBtn}>
          <div className={Styles.OrganizationListFilterSerchBox}>
            <Search
              name={"Search name here."}
              styles={searchStyles}
              searchImage={SerchImages}
              imageHeight={"46px"}
              imageMarginLeft={20}
            />
          </div>
          <div className={Styles.bannerButton}>
            <Link to="/orgadddocument" style={{ textDecoration: "none" }}>
              <GeneralButton
                name={"Add Document"}
                type={"submit"}
                color={"#f8fafc"}
                borderRadius={"30px"}
                backgroundColor={"#6366f1"}
                icons={frame}
                width={"158px"}
                height={"48px"}
              />
            </Link>
          </div>
        </div>

        <div className={Styles.OrganizationListTable}>
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
                    <TableCell padding="checkbox">
                      <Checkbox
                        indeterminate={false}
                        inputProps={{ "aria-label": "select all documents" }}
                      />
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        onClick={(e) => handleRequestSort(e, "documentName")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Document Name
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: "bold" }}
                      >
                        Size
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: "bold" }}
                      >
                        Version
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: "bold" }}
                      >
                        Status
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: "bold", marginLeft: "20px" }}
                      >
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            inputProps={{ "aria-labelledby": row.documentName }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.documentName}
                        </TableCell>
                        <TableCell>{row.size}</TableCell>
                        <TableCell>{row.version}</TableCell>
                        <TableCell>
                          <FormControl style={{ width: "110px" }}>
                            <Select
                              style={{ border: "none", borderRadius: "none" }}
                              value={row.status}
                              onChange={(e) => {
                                console.log(e.target.value);
                              }}
                            >
                              <MenuItem value="Active">Active</MenuItem>
                              <MenuItem value="Inactive">Inactive</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <Link to="/editdocument">
                            <IconButton aria-label="edit">
                              <img src={editIcon} alt="Edit" />
                            </IconButton>
                          </Link>
                          <Link to="/updatedocument">
                            <IconButton aria-label="Upload">
                              <img
                                className={Styles.uploadicon}
                                src={upload}
                                alt="Uploaddocument"
                              />
                            </IconButton>
                          </Link>

                          <IconButton aria-label="delete">
                            <img src={deleteIcon} alt="Delete" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
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
              }}
            >
              <div>Total {rows.length} items</div>
              <Pagination
                total={rows.length}
                itemRender={itemRender}
                pageSize={rowsPerPage}
                current={page}
                onChange={(newPage) => setPage(newPage)}
              />
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default OrgUserList;
