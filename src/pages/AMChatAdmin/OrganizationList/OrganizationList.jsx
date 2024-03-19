import React, { useEffect, useState } from "react";
import axios from "axios";
import Styles from "./Organization.module.css";
import profile from "../../../asset/AmChatSuperAdmin/profile.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import frame from "../../../asset/AmChatSuperAdmin/plus-sm.png";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import editIcon from "../../../asset/AmChatSuperAdmin/pencil-alt.png";
import deleteIcon from "../../../asset/AmChatSuperAdmin/Frame 2302.png";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Link, useNavigate } from "react-router-dom";
import Search from "../../../components/common/search/Search";
import IconButton from "@mui/material/IconButton";
import SerchImages from "../../../asset/AmChatSuperAdmin/Group2305.png";
import { Pagination, Popconfirm } from "antd";
// import "antd/dist/antd.css";
import CustomerSupportPopUp from "../../errorHandler/InternalServerError/CustomerSupportPopUp";
import { Modal } from "antd";

import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  setOrganisationStatus,
  setOrganisationData,
  setErrorMsg,
} from "../../../store/authSlice";
import { BASE_API_URL, BASE_ORG_API_URL } from "../../../constants/Constant";
import { useMessageState } from "../../../hooks/useapp-message";
import CircularProgress from "@mui/material/CircularProgress";
import SuperAdminHeader from "../SuperAdminHeader/SuperAdminHeader";
import Skeleton from "@mui/material/Skeleton";
import { EllipsisText } from "antd";
import PageLoader from "../../../components/loader/loader";
import Tables from "../../../components/common/muiTable/Tables";
import DataGridTable from "../../../components/common/muiTable/DataGridTable";

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
  let { showNotifyMessage, hideNotifyMessage } = useMessageState();

  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const jwt = user.userToken;
  const [rows, setRows] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const dispatch = useDispatch();
  const [loadingId, setLoadingId] = useState(null);

  const [fullName, setFullName] = useState("");
  const [pageInfo, setPageInfo] = useState({
    pageSize: 10,
    page: 0,
    totalCount: null,
    totalPages: null,
  });
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("createdAt");
  const [tableloading, setTableLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // const [backDropLoading,setBackDropLoading] = useState(false);

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    setFullName(storedFullName);
  }, []);

  useEffect(() => {
    fetchlist();
  }, [jwt, order, searchValue]);

  const fetchlist = async (page = 0) => {
    // setLoading(true);

    setTableLoading(true);
    try {
      const documentUrl = `${BASE_ORG_API_URL}`;
      const response = await axios.get(documentUrl, {
        params: {
          page: page,
          size: pageInfo.pageSize,
          sortField: orderBy,
          sortDirection: order,
          organisationName: searchValue,
          isActive: 1,
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.data || !response.data.data) {
        throw new Error("Failed to fetch documents");
      }

      console.log("----response", response);
      if (
        response?.data?.message == "list is empty" ||
        response?.data?.data == null ||
        response?.data?.data.length == 0
      ) {
        setPageInfo({
          ...pageInfo,
          pageSize: 5,
          page: 0,
          totalCount: 0,
          totalPages: 0,
        });
        setRows([]);
        return;
      }
      let organisationData = response?.data?.data;
      let responseData = response?.data;
      setResponseData(organisationData);

      setPageInfo({
        ...pageInfo,
        pageSize: responseData?.pageSize,
        page: responseData?.page,
        totalCount: responseData?.totalCount,
        totalPages: responseData?.totalPages,
      });
      console.log("-----organisationData", organisationData);
      let allOrgansisation = [];
      organisationData?.map((org) => {
        let address = `${
          org?.address?.address1 ? org.address?.address1 : ""
        }, ${org.address?.address2 ? org.address?.address2 : ""}, ${
          org?.address?.city ? org?.address?.city : ""
        }, ${
          org?.address?.state?.stateName ? org?.address?.state?.stateName : ""
        }, ${
          org?.address?.country?.countryName
            ? org?.address?.country?.countryName
            : ""
        }-${org?.address?.postCode ? org?.address?.postCode : ""}`;
        let individuvalOrg = {
          id: org.id,
          name: org.name,
          address: address,
          contactPerson: `${
            org?.contact?.firstName ? org?.contact?.firstName : ""
          }  ${org?.contact?.lastName ? org?.contact?.lastName : ""}`,

          plans: "Basic",
          status: org?.active ? "Active" : "Inactive",
        };
        allOrgansisation.push(individuvalOrg);
      });
      // setLoading(false);
      setRows(allOrgansisation);
      setTableLoading(false);
    } catch (error) {
      console.log("error---->", error);
      if (error?.response?.status === 500) {
        const errorMsgprops = {
          message: {
            title: "Something went wrong",
            content: "Please contact our customer support team",
          },
          handleCancelVerification: handleCancelVerification,
          handleVerification: handleVerification,
          onOkButtonText: "Retry",
        };
        dispatch(setErrorMsg({ ...errorMsgprops }));
      }
      setPageInfo({
        ...pageInfo,
        pageSize: 0,
        page: 0,
        totalCount: 0,
        totalPages: 0,
      });
      setRows([]);
      console.error("Error fetching documents:", error.message);
      setTableLoading(false);
    }
  };

  const messageHandler = () => {
    hideNotifyMessage();
  };
  const deleteOrganisation = async (id) => {
    console.log(jwt);
    let body = { orgId: id };
    setTableLoading(true);

    try {
      const response = await axios.delete(`${BASE_ORG_API_URL}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        // data: JSON.stringify(body),
        data: JSON.stringify(body),
      });
      setLoadingId(null);

      fetchlist();
      showNotifyMessage("success", response?.data?.message, messageHandler);
      console.log("API Response:", response.data);
      // navigate('/dashboardadmin/organizationlist');
      setTableLoading(false);
    } catch (error) {
      console.error("Error occurred:", error);
      if (error?.response?.status == 500 || error?.response?.status == "500") {
        const errorMsgprops = {
          message: {
            title: "Something went wrong",
            content: "Please contact our customer support team",
          },
          handleCancelVerification: handleCancelVerification,
          handleVerification: handleVerification,
          onOkButtonText: "Retry",
        };
        dispatch(setErrorMsg({ ...errorMsgprops }));
      }
      setLoadingId(null);
      console.log(error);
      setTableLoading(false);
      showNotifyMessage("error", error?.message, messageHandler);
    }
  };

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

  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleVerification = () => {
    const isValidJwtToken = true;
    if (isValidJwtToken) {
      // navigate("/dashboardadmin")
      console.log("valid jwt token");
      // verify jwt token
      navigate("/dashboardadmin");
    } else {
      localStorage.clear();
      navigate("/signin");
    }
  };

  const handleCancelVerification = () => {
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    setLoadingId(id);
    deleteOrganisation(id);
  };

  const handleEdit = (id) => {
    console.log("editing");
    console.log(id);
    const orgObject = responseData.find((obj) => obj.id === id);
    navigate("/organisation");
    dispatch(setOrganisationStatus("edit"));
    dispatch(setOrganisationData(orgObject));
  };

  const columns = [
    {
      field: "organisationName",
      headerName: "Organisation Name",
      flex: 1,
      minWidth: 200,
      maxWidth: 400,
      sortable: false,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
      minWidth: 450,
      maxWidth: 900,
      sortable: false,
    },
    {
      field: "organisationAdmin",
      headerName: "Organisation Admin",
      flex: 1,
      minWidth: 200,
      maxWidth: 400,
      sortable: false,
    },
    {
      field: "plans",
      headerName: "Plans",
      flex: 1,
      minWidth: 100,
      maxWidth: 200,
      sortable: false,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 100,
      maxWidth: 200,
      sortable: false,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 100,
      maxWidth: 200,
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
            {loadingId == rows.id && loadingId != null ? (
              <CircularProgress />
            ) : (
              <Popconfirm
                key={params.row.id || "amchat"}
                title="Am Chat"
                description={
                  "Do you Really want to delete this organization '" +
                  params.row.name +
                  "'"
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
    organisationName: item?.name,
    organisationAdmin: item?.contactPerson,
    address: item?.address,
    plans: item?.plans,
    status: item?.status,
  }));

  return (
    <div
      className={Styles.superAdminMainCardDivStyle}
      style={{ minHeight: "100vh" }}
    >
      {tableloading && <PageLoader loadingStatus={tableloading} />}
      <div className={Styles.superAdminMiddleParentDiv}>
        <div className={Styles.superAdminProfileCardStyle}>
          <SuperAdminHeader
            componentName="Organisations"
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
              searchValue={searchValue}
              handleChangeSearch={handleChangeSearch}
            />
          </div>
          <div className={Styles.bannerButton}>
            <Link to="/organisation" style={{ textDecoration: "none" }}>
              <GeneralButton
                name={"Add Organisation"}
                type={"submit"}
                color={"#f8fafc"}
                borderRadius={"30px"}
                backgroundColor={"#6366f1"}
                icons={frame}
                width={"158px"}
                height={"45px"}
                buttonHandler={() => {
                  console.log("getting");
                  dispatch(setOrganisationStatus("add"));
                }}
              />
            </Link>
          </div>
        </div>
        <div className={Styles.OrganizationListTable}>
          {/* <Paper>
            <TableContainer>
              <Table
                sx={{ width: "100%" }}
                aria-labelledby="tableTitle"
                size={"medium"}
                aria-label="enhanced table"
              >
                <TableHead style={{ borderBottom: "2px solid #0F172A" }}>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        onClick={(e) => handleRequestSort(e, "name")}
                      >
                        <Typography
                          variant="body1"
                          style={{ fontWeight: "bold" }}
                        >
                          Organisation Name
                        </Typography>
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: "bold" }}
                      >
                        Address
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: "bold" }}
                      >
                        Organisation Admin
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{ fontWeight: "bold" }}
                      >
                        Plans
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
                        style={{ fontWeight: "bold" }}
                      >
                        Actions
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    {rows.length > 0 ? (
                      rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              <span className={Styles.tableText}>
                                {" "}
                                {row.name}
                              </span>
                            </TableCell>
                            <TableCell style={{ width: "250px" }}>
                              <span className={Styles.tableText}>
                                {row.address}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={Styles.tableText}>
                                {row.contactPerson}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={Styles.tableText}>
                                {row.plans}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={Styles.tableText}>
                                {row.status}
                              </span>
                            </TableCell>
                            <TableCell>
                              <IconButton
                                aria-label="edit"
                                onClick={() => handleEdit(row?.id)}
                              >
                                <img src={editIcon} alt="Edit" />
                              </IconButton>
                              <IconButton aria-label="delete">
                                {loadingId == rows.id && loadingId != null ? (
                                  <CircularProgress />
                                ) : (
                                  <Popconfirm
                                    key={row?.id || "amchat"}
                                    title="Am Chat"
                                    description={
                                      "Do you Really want to delete this organization '" +
                                      row?.name +
                                      "'"
                                    }
                                    onConfirm={() => handleDelete(row?.id)}
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
                          <h2>No data available</h2>
                        </TableCell>
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
                padding: "15px",
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
                  fetchlist(newPage - 1);
                }}
                showSizeChanger={false}
              />
            </div>
          </Paper> */}
          <DataGridTable
            rows={data}
            columns={columns}
            showOrHide={false}
            pageInfo={pageInfo}
            setPageInfo={setPageInfo}
            itemRender={itemRender}
            fetchlist={fetchlist}
          />
        </div>
      </div>
    </div>
  );
}

export default OrganizationList;
