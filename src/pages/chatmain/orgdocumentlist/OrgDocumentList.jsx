import React, { useState, useEffect } from "react";
import Styles from "./OrgDocument.module.css";
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
import Search from "../../../components/common/search/Search";
import SerchImages from "../../../asset/AmChatSuperAdmin/Group2305.png";
import Select from "@mui/material/Select";
import { FormControl, MenuItem } from "@mui/material";
import { setUser, selectUser } from "../../../store/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as constants from "../../../constants/Constant";
import axios from "axios";
import { toast } from "react-toastify";
import NotifyMessage from "../../../components/common/toastMessages/NotifyMessage";
import AMChatHeader from "../../AMChatAdmin/AMChatHeader/AMChatHeader";
import Pagination from "@mui/material/Pagination"; // Import MUI Pagination
import OrganizationAdminHeader from "../organizationadmin/OrganizationAdminHeader/OrganizationAdminHeader";

function OrgDocumentList() {
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const navigate = useNavigate();

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

  const [filters, setFilters] = useState({
    email: "",
    active: true,
    name: "",
    sortDirection: "desc",
    sortField: "createdAt",
    page: 0,
    size: "",
  });

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [loading, setLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    // Retrieve firstName from localStorage
    const storedFirstName = localStorage.getItem("firstNameOrganisation");
    setFirstName(storedFirstName);
  }, []);

  const filteredRows = rows.filter(
    (row) =>
      (row.firstName &&
        row.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (row.lastName &&
        row.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (row.email && row.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    fetchUserList();
  }, [filters]);

  const fetchUserList = async () => {
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(
        `${constants.BASE_API_URL}${constants.USER_LIST_ENDPOINT}?${queryParams}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (!response.ok) {
        if (response.status === 404) {
          console.log("400 error ");
        } else if (response.status === 405) {
          console.log("response 405");
        } else {
          console.log("response 405");
        }
        return;
      }
      const responseData = await response.json();
      const users = responseData.data.users;
      setRows(users);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      navigate("/maintenance");
    }
  };

  const handleEdit = (userId) => {
    navigate(`/edituser/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${constants.BASE_API_URL}/user/disable/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setRows(rows.filter((row) => row.id !== userId));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

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

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleStatusChange = (event, userId) => {
    const updatedRows = rows.map((row) =>
      row.id === userId ? { ...row, status: event.target.value } : row
    );
  };

  const handleCheckboxClick = async (userId, isChecked) => {
    try {
      let roleId = isChecked ? "19" : "17";
      await axios.put(
        `${constants.BASE_API_URL}/user/role`,
        {
          userId: userId,
          roleId: roleId,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Update the 'active' property of the row in the local state
      setRows(
        rows.map((row) =>
          row.id === userId ? { ...row, active: isChecked } : row
        )
      );

      // Show different messages based on the roleId
      if (roleId === "17") {
        toast.success("Admin role assigned successfully");
      } else if (roleId === "19") {
        toast.success("User role assigned successfully");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Error updating role");
    }
  };

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <OrganizationAdminHeader
            componentName="User List"
            name={firstName || ""}
            profileImageSrc={profile}
            customStyle={{
              containerStyle: {
                display: "flex",
                borderRadius: "8px",
              },
              imageStyle: {
                width: "50%",
                height: "70%",
              },
              textStyle: {
                color: "blue",
                fontWeight: "bold",
              },
            }}
          />
        </div>
        <div className={Styles.bannerBtn}>
          <div className={Styles.OrganizationListFilterSerchBox}>
            <div className={Styles.OrganizationListFilterSerchBox}>
              <Search
                name={"Search name here."}
                styles={searchStyles}
                searchImage={SerchImages}
                imageHeight={"46px"}
                imageMarginLeft={20}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className={Styles.bannerButton}>
            <Link to="/adduser" style={{ textDecoration: "none" }}>
              <GeneralButton
                name={"Add User"}
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
                        inputProps={{ "aria-label": "select all desserts" }}
                      />
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        onClick={(e) => handleRequestSort(e, "name")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Name
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "email"}
                        direction={orderBy === "email" ? order : "asc"}
                        onClick={(e) => handleRequestSort(e, "email")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Email
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "lastChat"}
                        direction={orderBy === "lastChat" ? order : "asc"}
                        onClick={(e) => handleRequestSort(e, "lastChat")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Last Chat
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "totalChat"}
                        direction={orderBy === "totalChat" ? order : "asc"}
                        onClick={(e) => handleRequestSort(e, "totalChat")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Total Chat
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "status"}
                        direction={orderBy === "status" ? order : "asc"}
                        onClick={(e) => handleRequestSort(e, "status")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Status
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: "bold" }}
                      >
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {filteredRows.length > 0 ? (
                        filteredRows
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row) => (
                            <TableRow key={row.id}>
                              <TableCell padding="checkbox">
                                <Checkbox />
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {`${row.firstName} ${row.lastName}`}
                              </TableCell>
                              <TableCell>
                                <div className={Styles.emailWithCheckbox}>
                                  <span style={{ marginTop: "10px" }}>
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
                              <TableCell>{row.createdAt}</TableCell>
                              <TableCell>{row.updatedAt}</TableCell>
                              <TableCell>
                                <FormControl style={{ width: "110px" }}>
                                  <Select
                                    style={{
                                      border: "none",
                                      borderRadius: "none",
                                    }}
                                    value={row.active ? "Active" : "Inactive"}
                                    onChange={(e) =>
                                      handleStatusChange(e, row.id)
                                    }
                                  >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="Inactive">
                                      Inactive
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  aria-label="edit"
                                  onClick={() => handleEdit(row.id)}
                                >
                                  <img src={editIcon} alt="Edit" />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => handleDelete(row.id)}
                                >
                                  <img src={deleteIcon} alt="Delete" />
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
                count={Math.ceil(rows.length / rowsPerPage)}
                page={page + 1}
                onChange={(event, value) => setPage(value - 1)}
                shape="rounded"
              />
            </div>
          </Paper>
        </div>
        <NotifyMessage messageHandler={toast.dismiss} />
      </div>
    </div>
  );
}

export default OrgDocumentList;
