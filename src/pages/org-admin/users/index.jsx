import React, { useState, useEffect } from "react";
import axios from "axios";
import { Popconfirm } from "antd";
import Layout from "../../../Layout";
import { Box, Grid, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  setOrganisationStatus,
  setOrganisationData,
  setErrorMsg,
} from "../../../store/authSlice";
import styles from "./index.module.css";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import PageLoader from "../../../components/loader/loader";
import Search from "../../../components/common/common-searchInput";
import { BASE_ORG_API_URL } from "../../../constants/Constant";
import { useMessageState } from "../../../hooks/useapp-message";
import frame from "../../../asset/AmChatSuperAdmin/plus-sm.png";
import editIcon from "../../../asset/AmChatSuperAdmin/pencil-alt.png";
import deleteIcon from "../../../asset/AmChatSuperAdmin/Frame 2302.png";
import SearchImages from "../../../asset/AmChatSuperAdmin/Group 2307.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import DataGridTable from "../../../components/common/muiTable/DataGridTable";
import * as constants from "../../../constants/Constant";
import NotifyMessage from "../../../components/common/toastMessages/NotifyMessage";
import { AM_CHAT } from "../../../constants/Constant";

function Users() {
  let { showNotifyMessage, hideNotifyMessage } = useMessageState();
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [firstName, setFirstName] = useState("");
  const profileSrc = localStorage.getItem("profileImage");
  const [fullName, setFullName] = useState("");
  const [tableloading, setTableLoading] = useState(false);

  const [pageInfo, setPageInfo] = useState({
    pageSize: 10,
    page: 0,
    totalCount: null,
    totalPages: null,
  });

  const [filters, setFilters] = useState({
    page: page,
    size: pageInfo?.pageSize,
    sortField: "createdAt",
    sortDirection: "desc",
    email: "",
    active: true,
    name: "",
  });

  const messageHandler = () => {
    hideNotifyMessage();
  };

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    setFullName(storedFullName);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery?.length >= 3) {
      setLoading(true);
      fetchUserList();
    } else if (searchQuery?.length === 0) {
      setLoading(true);
      fetchUserList();
    }
  }, [searchQuery, order]);

  const fetchUserList = async (page = 0, pageSize) => {
    try {
      console.log("filters", filters);
      const queryParams = new URLSearchParams({
        page: page,
        size: pageSize || pageInfo.pageSize,
        sortField: orderBy,
        sortDirection: order,
        email: "",
        active: true,
        name: searchQuery,
      });
      setTableLoading(true);
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
      setTableLoading(false);
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
      console.log("users-------->", responseData);
      setPageInfo({
        ...pageInfo,
        pageSize: responseData?.pageSize,
        page: responseData?.page,
        totalCount: responseData?.totalCount,
        totalPages: responseData?.totalPages,
      });
      const users = responseData.data.users;
      setRows(users);
      setLoading(false);
    } catch (error) {
      setTableLoading(false);
      setLoading(false);
      navigate("/maintenance");
    }
  };

  const handleEdit = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleDelete = async (userId) => {
    try {
      setTableLoading(true);
      await axios.delete(`${constants.BASE_API_URL}/user/disable/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setRows(rows.filter((row) => row.id !== userId));
      setTableLoading(false);
      // toast.success("User deleted successfully");
      showNotifyMessage("success", "User deleted successfully", messageHandler);
    } catch (error) {
      setTableLoading(false);
      console.error("Error deleting user:", error);
      // toast.error("Error deleting user");
      showNotifyMessage("error", "Error deleting user", messageHandler);
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
        // toast.success("Admin role assigned successfully");
        showNotifyMessage("success", "Admin role assigned successfully", messageHandler);
      } else if (roleId === "19") {
        // toast.success("User role assigned successfully");
        showNotifyMessage("success", "User role assigned successfully", messageHandler);
      }
    } catch (error) {
      console.error("Error updating role:", error);
      // toast.error("Error updating role");
      showNotifyMessage("error", "Error updating role", messageHandler);
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1, 
      minWidth: 150, 
      maxWidth: 300, 
      sortable: false,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 200,
      maxWidth: 400,
      sortable: false,
    },
    {
      field: "lastChat",
      headerName: "Last Chat",
      flex: 1,
      minWidth: 200,
      maxWidth: 400,
      sortable: false,
    },
    {
      field: "totalChat",
      headerName: "Total Chat",
      flex: 1,
      minWidth: 200,
      maxWidth: 400,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      sortable: false,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-label="edit"
            onClick={() => handleEdit(params.row.id)}
          >
            <img src={editIcon} alt="Edit" />
          </IconButton>
          <IconButton aria-label="delete">
            {params?.row?.status === "Active" && (
              <Popconfirm
                key={params.row.id || "amchat"}
                title={AM_CHAT}
                description={
                  <span style={{ whiteSpace: 'nowrap' }}>{"Do you really want to delete this user '" +
                  params.row.name +"'"}</span>
                }
                onConfirm={() => handleDelete(params.row.id)}
                okText="Submit"
                cancelText="Close"
              >
                <img src={deleteIcon} alt="Delete" />
              </Popconfirm>
            )}
          </IconButton>
        </div>
      ),
    },
  ];

  const data = rows.map((item) => ({
    id: item?.id,
    name: `${item.firstName} ${item.lastName}`,
    email: item?.email,
    lastChat: item?.createdAt,
    totalChat: item?.updatedAt,
    status: item?.active ? "Active" : "Inactive",
  }));

  return (
    <Layout componentName="Users">
      {tableloading && <PageLoader loadingStatus={tableloading} />}
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={12}>
          <Box className={styles.search_container}>
            <Box>
              <Search
                inputLabel={"Search"}
                handleSearchChange={handleSearchChange}
                inputValue={searchQuery}
              />
            </Box>
            <Box>
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
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <DataGridTable
            rows={data}
            columns={columns}
            showOrHide={false}
            pageInfo={pageInfo}
            setPageInfo={setPageInfo}
            itemRender={itemRender}
            fetchlist={fetchUserList}
          />
        </Grid>
        <NotifyMessage messageHandler={toast.dismiss} />
      </Grid>
    </Layout>
  );
}

export default Users;
