import React, { useEffect, useState } from "react";
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
import editIcon from "../../../asset/AmChatSuperAdmin/pencil-alt.png";
import deleteIcon from "../../../asset/AmChatSuperAdmin/Frame 2302.png";
import dropdownIcon from "../../../asset/AmChatSuperAdmin/dropDownIcon.png";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import Search from "../../../components/common/search/Search";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SerchImages from "../../../asset/AmChatSuperAdmin/Group2305.png";
import eyesolid from "../../../asset/AmChatSuperAdmin/eye-solid.svg";
import { Pagination } from "antd";
// import "antd/dist/antd.css";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { useSelector } from "react-redux";
import { setUser, selectUser } from "../../../store/authSlice";
import { BASE_API_URL } from "../../../constants/Constant";
import axios from "axios";
import AMChatHeader from "../AMChatHeader/AMChatHeader";

const style = {
  py: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

function OrganizationList() {
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchlist = async () => {
      // setLoading(true);
      try {
        const documentUrl = `${BASE_API_URL}/organisation`;
        const response = await axios.get(documentUrl, {
          params: {
            page: 0,
            size: 10,
            sortField: "createdAt",
            sortDirection: "desc",
            organisationName: "",
            isActive: 1,
            version: "",
            // fileSize: "",
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.data || !response.data.data) {
          throw new Error("Failed to fetch documents");
        }

        console.log(response?.data?.data);
        let organisationData = response?.data?.data;
        let allOrgansisation = [];
        organisationData?.map((org) => {
          let individuvalOrg = {
            id: org.id,
            name: org.name,
            address: org.address?.address1,
            contactPerson:
              org?.contact?.firstName != undefined
                ? org?.contact?.firstName
                : "" + "" + org?.contact?.lastName != undefined
                ? org?.contact?.lastName
                : "",
            plans: "Basic",
            status: org?.active,
          };
          allOrgansisation.push(individuvalOrg);
        });
        // setLoading(false);
        setRows(allOrgansisation);
      } catch (error) {
        console.error("Error fetching documents:", error.message);
      }
    };

    fetchlist();
  }, [jwt]);

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

  // const rows = [
  //   {
  //     id: 1,
  //     name: 'Org 1',
  //     address: 'Address 1',
  //     contactPerson: 'John Doe',
  //     plans: 'Basic',
  //     status: 'Active',
  //   },
  //   {
  //     id: 2,
  //     name: 'Org 2',
  //     address: 'Address 2',
  //     contactPerson: 'Jane Doe',
  //     plans: 'Premium',
  //     status: 'Inactive',
  //   },
  //   {
  //     id: 3,
  //     name: 'Org 2',
  //     address: 'Address 2',
  //     contactPerson: 'Jane Doe',
  //     plans: 'Premium',
  //     status: 'Inactive',
  //   },
  //   {
  //     id: 4,
  //     name: 'Org 2',
  //     address: 'Address 2',
  //     contactPerson: 'Jane Doe',
  //     plans: 'Premium',
  //     status: 'Inactive',
  //   },
  //   {
  //     id: 5,
  //     name: 'Org 2',
  //     address: 'Address 2',
  //     contactPerson: 'Jane Doe',
  //     plans: 'Premium',
  //     status: 'Inactive',
  //   },
  //   {
  //     id: 6,
  //     name: 'Org 2',
  //     address: 'Address 2',
  //     contactPerson: 'Jane Doe',
  //     plans: 'Premium',
  //     status: 'Inactive',
  //   },
  //   // Add 8 more entries with similar structure
  // ];

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

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <AMChatHeader
            componentName="Organization List"
            name="Sanjeev"
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
            <Search
              name={"Search name here."}
              styles={searchStyles}
              searchImage={SerchImages}
              imageHeight={"47px"}
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
                          <IconButton aria-label="view">
                            <img
                              src={eyesolid}
                              alt="View"
                              style={{ width: 24, height: 24 }}
                            />
                          </IconButton>
                          <Link to="/EditAddOrganizationAdmin">
                            <IconButton aria-label="edit">
                              <img src={editIcon} alt="Edit" />
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
                      <TableCell colSpan={7} />
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

export default OrganizationList;
