import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Popconfirm } from 'antd';
import Layout from '../../../Layout';
import { Box, Grid, IconButton, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUser,
  setOrganisationStatus,
  setOrganisationData,
  setErrorMsg,
} from '../../../store/authSlice';
import styles from './index.module.css';
import { CircularProgress } from '@mui/material';
import PageLoader from '../../../components/loader/loader';
import Search from '../../../components/common/common-searchInput';
import { BASE_DOC_API_URL } from '../../../constants/Constant';
import * as constants from '../../../constants/Constant';
import { useMessageState } from '../../../hooks/useapp-message';
import frame from '../../../asset/AmChatSuperAdmin/plus-sm.png';
import editIcon from '../../../asset/AmChatSuperAdmin/pencil-alt.png';
import deleteIcon from '../../../asset/AmChatSuperAdmin/Frame 2302.png';
import GeneralButton from '../../../components/common/buttons/GeneralButton';
import DataGridTable from '../../../components/common/muiTable/DataGridTable';
import { AM_CHAT } from '../../../constants/Constant';
import { Modal } from 'antd';
import MobileViewDocumentAccordin from '../../../components/MobileComponent/MobileViewDocumentAccordin';
import { bytesToMB, documentStatus } from '../../../utils/fileNameExtraction';
import { scopes } from '../../../constants/scopes';
import { tokenDecodeJWT } from '../../../utils/authUtils';

const tempData = [
  'CHU',
  'CHR',
  'CHD',
  'CHC',
  'UU',
  'UR',
  'UD',
  'UC',
  'DCQR',
  // 'DCR',
  // 'DCC',
  // 'DCD',
  // 'DCU',
];

function Documents() {
  let {
    buttonLoading,
    setButtonLoading,
    isReset,
    setIsReset,
    showNotifyMessage,
    hideNotifyMessage,
  } = useMessageState();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [documents, setDocuments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('uploadDate');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const profileSrc = localStorage.getItem('profileImage');
  const navigate = useNavigate();
  const [previousSearchQuery, setPreviousSearchQuery] = useState('');

  const [pageInfo, setPageInfo] = useState({
    pageSize: 10,
    page: 0,
    totalCount: null,
    totalPages: null,
  });

  const user = useSelector(selectUser);
  const jwt = user.userToken;
  const permittedScopes = tokenDecodeJWT(jwt).scopes;
  // const permittedScopes = tempData;
  const [fullName, setFullName] = useState('');
  const [tableloading, setTableLoading] = useState(false);
  const [openDeletePopUp, setOpenDeletePopUp] = useState(false);
  const [deleteProps, setDeleteProps] = useState({});

  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName');
    setFullName(storedFullName);
  }, []);

  const filterDocuments = () => {
    return documents.filter((doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((char) => {
            return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  };

  const fetchDocuments = async (page = 0, pageSize) => {
    setLoading(true);
    try {
      console.log('api called');
      const organizationId = decodeJWT(jwt).organisationId;
      setTableLoading(true);
      const documentUrl = `${constants.BASE_DOC_API_URL}`;
      const response = await axios.get(documentUrl, {
        params: {
          page: page,
          size: pageSize || pageInfo.pageSize,
          sortField: orderBy,
          sortDirection: order,
          name: searchQuery,
          isActive: 1,
          version: '',
          fileSize: '',
        },
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.data || !response.data.data) {
        throw new Error('Failed to fetch documents');
      }
      console.log('response----->', response);
      setDocuments(response.data.data);
      setPageInfo({
        ...pageInfo,
        pageSize: response?.data?.pageSize,
        page: response?.data?.page,
        totalCount: response?.data?.totalCount,
        totalPages: response?.data?.totalPages,
      });
      setLoading(false);
      setTableLoading(false);
    } catch (error) {
      setDocuments([]);
      setTableLoading(false);
      console.error('Error fetching documents:', error.message);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    if (
      (trimmedQuery.length >= 3 && trimmedQuery !== previousSearchQuery) ||
      (trimmedQuery.length === 0 && previousSearchQuery.length > 0)
    ) {
      fetchDocuments();
      setPreviousSearchQuery(trimmedQuery);
    }
  }, [searchQuery, previousSearchQuery]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const messageHandler = () => {
    setIsReset(false);
    hideNotifyMessage();
  };

  const handleDelete = async (documentId) => {
    try {
      setTableLoading(true);
      const response = await axios.put(
        `${BASE_DOC_API_URL}${documentId}/status`,
        { isActive: false },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('delete response--->', response);
      if (response.status === 200) {
        setDocuments(documents.filter((doc) => doc.id !== documentId));
        showNotifyMessage('success', response?.data?.message, messageHandler);
        setTableLoading(false);
      } else {
        setTableLoading(false);
        throw new Error('Failed to delete document');
      }
    } catch (error) {
      setTableLoading(false);
      console.error('Error deleting document:', error.message);
    }
  };

  const handleEdit = (documentId, params) => {
    if (isMobile) {
      console.log(params?.documentName);
      localStorage.setItem('documentName', params?.documentName);
      navigate(`/document/${documentId}`);
    } else {
      console.log(params?.row?.documentName);
      localStorage.setItem('documentName', params?.row?.documentName);
      navigate(`/document/${documentId}`);
    }
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, documents.length - page * rowsPerPage);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log('searchQuery', e.target.value);
    setPage(0);
  };

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const handleConfirmationPopUp = (props) => {
    setDeleteProps({ ...props });
    setOpenDeletePopUp(true);
  };

  const columns = [
    {
      field: 'documentName',
      headerName: 'Document Name',
      flex: 1,
      minWidth: 300,
      maxWidth: 600,
      sortable: false,
    },
    {
      field: 'size',
      headerName: 'Size',
      flex: 1,
      minWidth: 300,
      maxWidth: 600,
      sortable: false,
    },
    {
      field: 'version',
      headerName: 'Version',
      flex: 1,
      minWidth: 100,
      maxWidth: 150,
      sortable: false,
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 200,
      maxWidth: 500,
      sortable: false,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      minWidth: 200,
      maxWidth: 400,
      sortable: false,
      renderCell: (params) => (
        <div>
          {permittedScopes?.includes(scopes.DCR) && (
            <IconButton
              aria-label="edit"
              onClick={() => handleEdit(params.row.id, params)}
            >
              <img src={editIcon} alt="Edit" />
            </IconButton>
          )}
          {permittedScopes?.includes(scopes.DCD) && (
            <IconButton
              aria-label="delete"
              onClick={() => {
                const props = {
                  id: params.row.id,
                  name: params.row.documentName,
                };
                handleConfirmationPopUp(props);
              }}
            >
              <img src={deleteIcon} alt="Delete" />
            </IconButton>
          )}
        </div>
      ),
    },
  ];

  const data = documents.map((item) => ({
    id: item?.id,
    documentName: item?.name,
    size: `${bytesToMB(item?.fileSize) || 0}${' '}${'MB'}`,
    version: item?.version,
    status: documentStatus[item?.status],
  }));

  const handleYes = (id) => {
    handleDelete(id);
    setOpenDeletePopUp(false);
    setDeleteProps({});
  };

  const handleNo = () => {
    setOpenDeletePopUp(false);
    setDeleteProps({});
  };
  const mobileProps = {
    data: data,
    handleEdit: handleEdit,
    handleConfirmationPopUp: handleConfirmationPopUp,
  };
  return (
    <Layout componentName="Documents">
      {tableloading && <PageLoader loadingStatus={tableloading} />}
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: isMobile ? '5px' : '0px',
        }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Box className={styles.search_container}>
            <Box>
              <Search
                inputLabel={'Search by document name'}
                handleSearchChange={handleSearch}
                inputValue={searchQuery}
              />
            </Box>

            <Box>
              {permittedScopes?.includes(scopes.DCC) && (
                <Link to="/document" style={{ textDecoration: 'none' }}>
                  <GeneralButton
                    name={'Add Document'}
                    type={'submit'}
                    color={'#f8fafc'}
                    borderRadius={'30px'}
                    backgroundColor={'#6366f1'}
                    icons={frame}
                    width={'168px'}
                    height={'48px'}
                  />
                </Link>
              )}
            </Box>
          </Box>
        </Grid>
        {openDeletePopUp && (
          <Modal
            title={'Confirmation'}
            centered
            open={openDeletePopUp}
            onOk={() => {
              handleYes(deleteProps?.id);
            }}
            okText={'Yes'}
            cancelText={'No'}
            onCancel={() => {
              handleNo();
            }}
          >
            <p>{`Are you sure you want to delete "${deleteProps.name}" ?`}</p>
          </Modal>
        )}
        <Grid item xs={12} md={12} lg={12}>
          {isMobile ? (
            <MobileViewDocumentAccordin {...mobileProps} />
          ) : (
            <DataGridTable
              rows={data}
              columns={columns}
              showOrHide={false}
              pageInfo={pageInfo}
              setPageInfo={setPageInfo}
              itemRender={itemRender}
              fetchlist={fetchDocuments}
            />
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Documents;
