import React, { useState, useEffect } from "react";
import Styles from "./OrgDocument.module.css";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/AmChatSuperAdmin/plus-sm.png";
import editIcon from "../../../asset/AmChatSuperAdmin/pencil-alt.png";
import deleteIcon from "../../../asset/AmChatSuperAdmin/Frame 2302.png";
import { Link } from "react-router-dom";
import Search from "../../../components/common/search/Search";
import SerchImages from "../../../asset/AmChatSuperAdmin/Group2305.png";
import { selectUser } from "../../../store/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as constants from "../../../constants/Constant";
import axios from "axios";
import { toast } from "react-toastify";
import NotifyMessage from "../../../components/common/toastMessages/NotifyMessage";
import OrganizationAdminHeader from "../organizationadmin/OrganizationAdminHeader/OrganizationAdminHeader";
import PageLoader from "../../../components/loader/loader";
import Tables from "../../../components/common/muiTable/Tables";
import { useMessageState } from "../../../hooks/useapp-message";

function OrgDocumentList(props) {
  let { showNotifyMessage, hideNotifyMessage } = useMessageState();
  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const navigate = useNavigate();
  console.log("user props----->", props);
  const navigationRoute = props.navigationRoute;
  console.log("navigationRoute---->", navigationRoute);

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

  const fetchUserList = async (page = 0) => {
    try {
      console.log("filters", filters);
      const queryParams = new URLSearchParams({
        page: page,
        size: pageInfo?.pageSize,
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
      showNotifyMessage("success", "User deleted successfully",messageHandler)
      setShow
    } catch (error) {
      setTableLoading(false);
      console.error("Error deleting user:", error);
      // toast.error("Error deleting user");
      showNotifyMessage("success", "Error deleting user",messageHandler)
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
        showNotifyMessage("success", "Admin role assigned successfully",messageHandler)
      } else if (roleId === "19") {
        showNotifyMessage("success", "User role assigned successfully",messageHandler)
        // toast.success("User role assigned successfully");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      showNotifyMessage("error", "Error updating role",messageHandler)
      // toast.error("Error updating role");
    }
  };

  const tableHead = [
    {
      label: "Name",
      key: "name",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Last Chat",
      key: "lastChat",
    },
    {
      label: "Total Chat",
      key: "totalChat",
    },
    {
      label: "Status",
      key: "status",
    },
    {
      label: "Actions",
      key: "actions",
    },
  ];
  console.log("pageInfo---->", pageInfo);
  return (
    <div className={Styles.superAdminMainCardDivStyle}>
      {tableloading && <PageLoader loadingStatus={tableloading} />}
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <OrganizationAdminHeader
            componentName={"Your Organisation User"}
            name={fullName || ""}
            profileImageSrc={localStorage.getItem("userImageUrl")}
            customStyle={{
              containerStyle: {
                display: "flex",
                borderRadius: "8px",
              },
              imageStyle: {
                width: "44px",
                height: "44px",
              },
              textStyle: {
                color: "black",
                fontWeight: "600",
                fontSize: "18px",
              },
            }}
            navigationRoute={navigationRoute}
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
                handleChangeSearch={handleSearchChange}
                searchValue={searchQuery}
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
          <Tables
            tableHead={tableHead}
            handleRequestSort={handleRequestSort}
            rows={rows}
            page={page}
            rowsPerPage={rowsPerPage}
            emptyRows={emptyRows}
            handleDelete={handleDelete}
            handleCheckboxClick={handleCheckboxClick}
            handleEdit={handleEdit}
            itemRender={itemRender}
            pageInfo={pageInfo}
            setPageInfo={setPageInfo}
            fetchUserList={fetchUserList}
            order={order}
            orderBy={orderBy}
          />
        </div>
        <NotifyMessage messageHandler={toast.dismiss} />
      </div>
    </div>
  );
}

export default OrgDocumentList;
