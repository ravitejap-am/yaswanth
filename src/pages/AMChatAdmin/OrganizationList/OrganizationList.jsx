import React from "react";
import Styles from "./Organization.module.css";
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
import dropdownIcon from "../../../asset/AmChatSuperAdmin/dropDownIcon.png";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import Search from "../../../components/common/search/Search";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SerchImages from "../../../asset/AmChatSuperAdmin/Group2305.png";
import eyesolid from "../../../asset/AmChatSuperAdmin/eye-solid.svg";

function OrganizationList() {
  const searchStyles = {
    width: "300px",
    height: "45px",
    borderRadius: "42px",
    fontFamily: "Inter, sans-serif",
    backgroundColor: "#EEF2FF",
    display: "flex",
    alignItems: "center",
  };

  const rows = [
    {
      id: 1,
      name: "Org 1",
      address: "Address 1",
      contactPerson: "John Doe",
      plans: "Basic",
      status: "Active",
    },
    {
      id: 2,
      name: "Org 2",
      address: "Address 2",
      contactPerson: "Jane Doe",
      plans: "Premium",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Org 2",
      address: "Address 2",
      contactPerson: "Jane Doe",
      plans: "Premium",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Org 2",
      address: "Address 2",
      contactPerson: "Jane Doe",
      plans: "Premium",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Org 2",
      address: "Address 2",
      contactPerson: "Jane Doe",
      plans: "Premium",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Org 2",
      address: "Address 2",
      contactPerson: "Jane Doe",
      plans: "Premium",
      status: "Inactive",
    },
    // Add 8 more entries with similar structure
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

  const handlePreviousPageButtonClick = () => {
    setPage((prevPage) => Math.max(0, prevPage - 1));
  };

  const handleNextPageButtonClick = () => {
    setPage((prevPage) =>
      Math.min(rows.length / rowsPerPage - 1, prevPage + 1)
    );
  };
  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <div>
            <p className={Styles.superAdminOrganizationListName}>
              Organization List
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
            <Link
              to="/dashboardadmin/addorganizationadmin"
              style={{ textDecoration: "none" }}
            >
              <GeneralButton
                name={"Add Organization"}
                type={"submit"}
                color={"#f8fafc"}
                borderRadius={"30px"}
                backgroundColor={"#6366f1"}
                icons={frame}
                width={"158px"}
                height={"45px"}
              />
            </Link>
          </div>
        </div>

        <div className={Styles.OrganizationListTable}>
          <Paper>
            <TableContainer>
              <Table
                sx={{ width: "100%" }}
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
                          Organization Name
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "address"}
                        direction={orderBy === "address" ? order : "asc"}
                        onClick={(e) => handleRequestSort(e, "address")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Address
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "contactPerson"}
                        direction={orderBy === "contactPerson" ? order : "asc"}
                        onClick={(e) => handleRequestSort(e, "contactPerson")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Contact Person
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={orderBy === "plans"}
                        direction={orderBy === "plans" ? order : "asc"}
                        onClick={(e) => handleRequestSort(e, "plans")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Plans
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
                        <TableCell>{row.address}</TableCell>
                        <TableCell>{row.contactPerson}</TableCell>
                        <TableCell>{row.plans}</TableCell>
                        <TableCell>
                          <FormControl>
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
                          <IconButton aria-label="view">
                            <img
                              src={eyesolid}
                              alt="View"
                              style={{ width: 24, height: 24 }}
                            />
                          </IconButton>
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
              ActionsComponent={(props) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "16px",
                  }}
                >
                  <IconButton
                    onClick={handlePreviousPageButtonClick}
                    disabled={page === 0}
                  >
                    <NavigateBeforeIcon />
                  </IconButton>
                  <div>
                    {props.page + 1} of {Math.ceil(rows.length / rowsPerPage)}
                  </div>
                  <IconButton
                    onClick={handleNextPageButtonClick}
                    disabled={page === Math.ceil(rows.length / rowsPerPage) - 1}
                  >
                    <NavigateNextIcon />
                  </IconButton>
                </div>
              )}
            />
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default OrganizationList;
