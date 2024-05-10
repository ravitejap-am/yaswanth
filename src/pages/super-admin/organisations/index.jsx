import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../Layout";
import { Box, Grid, IconButton, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  setOrganisationStatus,
  setOrganisationData,
  setErrorMsg,
} from "../../../store/authSlice";
import styles from "./index.module.css";
import PageLoader from "../../../components/loader/loader";
import Search from "../../../components/common/common-searchInput";
import { BASE_ORG_API_URL, BUTTON_COLOUR } from "../../../constants/Constant";
import { useMessageState } from "../../../hooks/useapp-message";
import frame from "../../../asset/AmChatSuperAdmin/plus-sm.png";
import editIcon from "../../../asset/AmChatSuperAdmin/pencil-alt.png";
import deleteIcon from "../../../asset/AmChatSuperAdmin/Frame 2302.png";
import GeneralButton from "../../../components/common/buttons/GeneralButton";
import DataGridTable from "../../../components/common/muiTable/DataGridTable";
import { Modal } from "antd";
import eye1 from "../../../asset/eye1.png";
import MobileViewOrganisationAccordin from "../../../components/MobileComponent/MobileViewOrganisationAccordin";
import { tokenDecodeJWT } from "../../../utils/authUtils";
import { scopes } from "../../../constants/scopes";

const tempData = ["UU", "UR", "UD", "UC", "OGU", "OGR", "OGC", "OGD"];

function Organisations() {
  let { showNotifyMessage, hideNotifyMessage } = useMessageState();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const jwt = user.userToken;
  const permittedScopes = tokenDecodeJWT(jwt).scopes;
  // const permittedScopes = tempData;
  const [rows, setRows] = useState([]);
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("createdAt");
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
  const [tableloading, setTableLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [deleteProps, setDeleteProps] = useState({});
  const [previousSearchQuery, setPreviousSearchQuery] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    setFullName(storedFullName);
  }, []);

  useEffect(() => {
    fetchlist();
  }, [jwt, order]);

  useEffect(() => {
    const trimmedQuery = searchValue.trim();
    if (
      (trimmedQuery.length >= 3 && trimmedQuery !== previousSearchQuery) ||
      (trimmedQuery.length === 0 && previousSearchQuery.length > 0)
    ) {
      fetchlist();
      setPreviousSearchQuery(trimmedQuery);
    }
  }, [searchValue, previousSearchQuery]);

  const fetchlist = async (page = 0, pageSize) => {
    setTableLoading(true);
    try {
      const documentUrl = `${BASE_ORG_API_URL}`;
      const response = await axios.get(documentUrl, {
        params: {
          page: page,
          size: pageSize || pageInfo.pageSize,
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
          pageSize: pageInfo.pageSize,
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
        pageSize: pageInfo.pageSize,
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
        data: JSON.stringify(body),
      });
      setLoadingId(null);

      fetchlist();
      showNotifyMessage("success", response?.data?.message, messageHandler);
      console.log("API Response:", response.data);
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

  const handleChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleVerification = () => {
    const isValidJwtToken = true;
    if (isValidJwtToken) {
      console.log("valid jwt token");
      navigate("/dashboardadmin");
    } else {
      localStorage.clear();
      navigate("/signin");
    }
  };

  const handleCancelVerification = () => {
    setIsOpen(false);
  };

  const handleYes = (id) => {
    setOpenDeletePopUp(false);
    deleteOrganisation(id);
    setDeleteProps({});
  };

  const handleConfirmationPopUp = (props) => {
    setDeleteProps({ ...props });
    setOpenDeletePopUp(true);
  };

  const handleEdit = (id) => {
    console.log("editing");
    console.log(id);
    const orgObject = responseData.find((obj) => obj.id === id);
    navigate("/organisation");
    dispatch(setOrganisationStatus("edit"));
    dispatch(setOrganisationData(orgObject));
  };

  const handleViewOrganisation = (id) => {
    const orgObject = responseData.find((obj) => obj.id === id);
    const organisationName = orgObject?.name.replace(/\s+/g, "-");
    console.log(orgObject, "org object");
    navigate(`/organisation/${encodeURIComponent(organisationName)}`);
    dispatch(setOrganisationStatus("view"));
    dispatch(setOrganisationData(orgObject));
  };

  const handleNo = () => {
    setDeleteProps({});
    setOpenDeletePopUp(false);
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
        <div style={{ backgroundColor: "transparent" }}>
          {permittedScopes?.includes(scopes.OGU) && (
            <IconButton
              aria-label="edit"
              onClick={() => handleEdit(params.row.id)}
            >
              <img src={editIcon} alt="Edit" />
            </IconButton>
          )}
          {permittedScopes?.includes(scopes.OGD) && (
            <IconButton
              aria-label="delete"
              onClick={() => {
                const props = {
                  id: params.row.id,
                  name: params.row.organisationName,
                };
                handleConfirmationPopUp(props);
              }}
            >
              <img src={deleteIcon} alt="Delete" />
            </IconButton>
          )}

          {permittedScopes?.includes(scopes.OGR) && (
            <IconButton
              aria-label="eye"
              onClick={() => handleViewOrganisation(params.row.id)}
            >
              <img src={eye1} alt="eye" />
            </IconButton>
          )}
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

  const mobileProps = {
    data: data,
    handleEdit: handleEdit,
    handleConfirmationPopUp: handleConfirmationPopUp,
    handleViewOrganisation: handleViewOrganisation,
  };

  return (
    <Layout componentName="Organisations">
      {tableloading && <PageLoader loadingStatus={tableloading} />}
      <Grid container spacing={2} sx={{ marginTop: isMobile ? "5px" : "0px" }}>
        <Grid item xs={12} md={12} lg={12}>
          <Box className={styles.search_container}>
            <Box>
              <Search
                inputLabel={"Search organisation by name"}
                handleSearchChange={handleChangeSearch}
                inputValue={searchValue}
              />
            </Box>
            <Box>
              {permittedScopes?.includes(scopes.OGC) && (
                <Link to="/organisation" style={{ textDecoration: "none" }}>
                  <GeneralButton
                    name={"Add Organisation"}
                    type={"submit"}
                    color={"#f8fafc"}
                    borderRadius={"30px"}
                    backgroundColor={BUTTON_COLOUR}
                    icons={frame}
                    width={"180px"}
                    height={"45px"}
                    buttonHandler={() => {
                      console.log("getting");
                      dispatch(setOrganisationStatus("add"));
                    }}
                  />
                </Link>
              )}
            </Box>
          </Box>
        </Grid>
        {openDeletePopUp && (
          <Modal
            title={"Confirmation"}
            centered
            open={openDeletePopUp}
            onOk={() => {
              handleYes(deleteProps?.id);
            }}
            okText={"Yes"}
            cancelText={"No"}
            onCancel={() => {
              handleNo();
            }}
          >
            <p>{`Are you sure you want to delete organisation "${deleteProps.name}" ?`}</p>
          </Modal>
        )}
        <Grid item xs={12} md={12} lg={12}>
          {isMobile ? (
            <MobileViewOrganisationAccordin {...mobileProps} />
          ) : (
            <DataGridTable
              rows={data}
              columns={columns}
              showOrHide={false}
              pageInfo={pageInfo}
              setPageInfo={setPageInfo}
              itemRender={itemRender}
              fetchlist={fetchlist}
            />
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Organisations;
