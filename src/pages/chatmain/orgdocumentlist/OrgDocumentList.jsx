import React from "react";
import Styles from "../../AMChatAdmin/OrganizationAdminList/OrganizationAdminList.module.css";
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

function OrgDocumentList() {
  const rows = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      lastChat: "12:00 PM",
      totalChat: 20,
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@example.com",
      lastChat: "12:00 PM",
      totalChat: 15,
      status: "Inactive",
    },
    {
      id: 3,
      name: "Alice Smith",
      email: "alice.smith@example.com",
      lastChat: "9:00 PM",
      totalChat: 30,
      status: "Active",
    },
    {
      id: 4,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      lastChat: "1:00 PM",
      totalChat: 25,
      status: "Active",
    },
    {
      id: 5,
      name: "Eve Wilson",
      email: "eve.wilson@example.com",
      lastChat: "10:00 AM",
      totalChat: 10,
      status: "Inactive",
    },
    // Add more entries with similar structure
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");

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
            <p className={Styles.superAdminProfileName}>User List</p>
          </div>
          <div
            className={Styles.superAdminProfileImgNameStyle}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img src={profile} alt="" className={Styles.AdminProfileStyle} />
            <span className={Styles.SuperAdminProfileStyle}>Lian Vendiar</span>
          </div>
        </div>

        <div>
          <div className={Styles.bannerBtn}>
            <div className={Styles.bannerButton}>
              <Link
                to="/dashboardadmin/addorganizationadmin"
                style={{ textDecoration: "none" }}
              >
                <GeneralButton
                  name={"Add User"}
                  type={"submit"}
                  color={"#f8fafc"}
                  borderRadius={"30px"}
                  backgroundColor={"#6366f1"}
                  icons={frame}
                  width={"132px"}
                  height={"45px"}
                />
              </Link>
            </div>
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
                  {/* Map through the data and create rows */}
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            inputProps={{ "aria-labelledby": row.name }}
                          />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.lastChat}</TableCell>
                        <TableCell>{row.totalChat}</TableCell>
                        <TableCell>{row.status}</TableCell>
                        <TableCell>
                          <IconButton aria-label="edit">
                            <img src={editIcon} alt="Edit" />
                          </IconButton>
                          <IconButton aria-label="delete">
                            <img src={deleteIcon} alt="Delete" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={7} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default OrgDocumentList;
